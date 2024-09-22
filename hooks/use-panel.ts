import useProfileMemberId from "@/features/members/store/use-profile-member-id";
import { useParentMessageId } from "@/features/messages/store/use-parent-message-id";

export default function usePanel() {
  const [parentMessageId, setParentMessageId] = useParentMessageId();
  const [profileMemberId, setProfileMemberId] = useProfileMemberId();

  const onOpenMessage = (messageId: string) => {
    setParentMessageId(messageId);
    setProfileMemberId(null);
  };
  const onOpenProfile = (profileId: string) => {
    setProfileMemberId(profileId);
    setParentMessageId(null);
  };
  const onClose = () => {
    setParentMessageId(null);
    setProfileMemberId(null);
  };
  return {
    parentMessageId,
    profileMemberId,
    onOpenMessage,
    onOpenProfile,
    onClose,
  };
}
