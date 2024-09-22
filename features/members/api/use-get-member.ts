import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

interface Props {
  memberId: Id<"members">;
}

export default function useGetMemberById({ memberId }: Props) {
  const data = useQuery(api.members.getMemberById, {
    memberId,
  });
  const isLoading = data === undefined;
  return { data, isLoading };
}
