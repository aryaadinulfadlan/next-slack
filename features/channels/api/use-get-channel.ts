import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

interface Props {
  channelId: Id<"channels">;
}

export const useGetChannelById = ({ channelId }: Props) => {
  const data = useQuery(api.channels.getChannelById, { channelId });
  const isLoading = data === undefined;
  return { data, isLoading };
};
