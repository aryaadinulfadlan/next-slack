interface Props {
  params: {
    workspaceId: string;
  };
}

export default function WorkspaceIdPage({ params: { workspaceId } }: Props) {
  return (
    <div>
      <div>WorksPcae ID: {workspaceId}</div>
    </div>
  );
}
