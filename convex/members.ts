import { v } from "convex/values";
import { query, QueryCtx } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { Id } from "./_generated/dataModel";

const populateUser = (ctx: QueryCtx, id: Id<"users">) => {
  return ctx.db.get(id);
};

export const getMemberById = query({
  args: {
    memberId: v.id("members"),
  },
  async handler(ctx, args) {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }
    const member = await ctx.db.get(args.memberId);
    if (!member) {
      return null;
    }
    const currentMember = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", member.workspaceId).eq("userId", userId)
      )
      .unique();
    if (!currentMember) {
      return null;
    }
    const user = await populateUser(ctx, member.userId);
    if (!user) {
      return null;
    }
    return {
      ...member,
      user,
    };
  },
});

export const getMembersByWorkspaceIdIncludeRelatedUser = query({
  args: { workspaceId: v.id("workspaces") },
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
    const membersByWorkspaceId = await ctx.db
      .query("members")
      .withIndex("by_workspace_id", (q) =>
        q.eq("workspaceId", args.workspaceId)
      )
      .collect();
    const members = [];
    for (const member of membersByWorkspaceId) {
      const user = await populateUser(ctx, member.userId);
      if (user) {
        members.push({
          ...member,
          user,
        });
      }
    }
    return members;
  },
});

export const current = query({
  args: { workspaceId: v.id("workspaces") },
  async handler(ctx, args) {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }
    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", args.workspaceId).eq("userId", userId)
      )
      .unique();
    if (!member) {
      return null;
    }
    return member;
  },
});
