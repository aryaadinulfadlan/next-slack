import { useQueryState } from "nuqs";

export default function useProfileMemberId() {
  return useQueryState("profileMemberId");
}
