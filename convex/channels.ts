import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const removeChannel = mutation({
  args: {
    channelId: v.id("channels"),
  },
  async handler(ctx, args) {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const channel = await ctx.db.get(args.channelId);
    if (!channel) {
      throw new Error("Channel not found");
    }
    // CHECK TO MEMBER TABLE FIRST
    // MEMBER HERE MEANS "MEMBER OF A WORKSPACE, NOT CHANNELS"
    // DEFINITELY EXISTS, BECAUSE WHEN CREATE WORKSPACE, MEMBER IS AUTOMATICALLY INSERTED
    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", channel.workspaceId).eq("userId", userId)
      )
      .unique();
    if (!member || member.role !== "admin") {
      throw new Error("Unauthorized");
    }
    // remove associated message
    await ctx.db.delete(args.channelId);
    return args.channelId;
  },
});

export const updateChannel = mutation({
  args: {
    name: v.string(),
    channelId: v.id("channels"),
  },
  async handler(ctx, args) {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const channel = await ctx.db.get(args.channelId);
    if (!channel) {
      throw new Error("Channel not found");
    }
    // CHECK TO MEMBER TABLE FIRST
    // MEMBER HERE MEANS "MEMBER OF A WORKSPACE, NOT CHANNELS"
    // DEFINITELY EXISTS, BECAUSE WHEN CREATE WORKSPACE, MEMBER IS AUTOMATICALLY INSERTED
    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", channel.workspaceId).eq("userId", userId)
      )
      .unique();
    if (!member || member.role !== "admin") {
      throw new Error("Unauthorized");
    }
    const parsedName = args.name.replace(/\s+/g, "-").toLowerCase();
    await ctx.db.patch(args.channelId, {
      name: parsedName,
    });
    return args.channelId;
  },
});

export const createChannel = mutation({
  args: {
    name: v.string(),
    workspaceId: v.id("workspaces"),
  },
  async handler(ctx, args) {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    // CHECK TO MEMBER TABLE FIRST
    // MEMBER HERE MEANS "MEMBER OF A WORKSPACE, NOT CHANNELS"
    // DEFINITELY EXISTS, BECAUSE WHEN CREATE WORKSPACE, MEMBER IS AUTOMATICALLY INSERTED
    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", args.workspaceId).eq("userId", userId)
      )
      .unique();
    if (!member || member.role !== "admin") {
      throw new Error("Unauthorized");
    }
    const parsedName = args.name.replace(/\s+/g, "-").toLowerCase();
    const channelId = await ctx.db.insert("channels", {
      name: parsedName,
      workspaceId: args.workspaceId,
    });
    return channelId;
  },
});

export const getChannelsByWorkspaceId = query({
  args: {
    workspaceId: v.id("workspaces"),
  },
  async handler(ctx, args) {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }
    // CHECK TO MEMBER TABLE FIRST
    // MEMBER HERE MEANS "MEMBER OF A WORKSPACE, NOT CHANNELS"
    // DEFINITELY EXISTS, BECAUSE WHEN CREATE WORKSPACE, MEMBER IS AUTOMATICALLY INSERTED
    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", args.workspaceId).eq("userId", userId)
      )
      .unique();
    if (!member) {
      return [];
    }
    const channelsByWorkspaceId = await ctx.db
      .query("channels")
      .withIndex("by_workspace_id", (q) =>
        q.eq("workspaceId", args.workspaceId)
      )
      .collect();
    return channelsByWorkspaceId;
  },
});

export const getChannelById = query({
  args: {
    channelId: v.id("channels"),
  },
  async handler(ctx, args) {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }
    const channel = await ctx.db.get(args.channelId);
    if (!channel) {
      return null;
    }
    // CHECK TO MEMBER TABLE FIRST
    // MEMBER HERE MEANS "MEMBER OF A WORKSPACE, NOT CHANNELS"
    // DEFINITELY EXISTS, BECAUSE WHEN CREATE WORKSPACE, MEMBER IS AUTOMATICALLY INSERTED
    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", channel.workspaceId).eq("userId", userId)
      )
      .unique();
    if (!member) {
      return null;
    }
    return channel;
  },
});
