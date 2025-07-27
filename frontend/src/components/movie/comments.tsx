import { Separator } from '../ui';

interface CommentsType {
  username: string;
  comment: string;
}

interface CommentsProps {
  comment: CommentsType[];
}

export function Comments({ comment }: CommentsProps) {
  return comment.map((comment, index) => (
    <div
      key={index}
      className="mb-5 flex flex-col gap-3 rounded-md border py-2 shadow-md dark:text-white"
    >
      <div className="ml-5 font-semibold">@{comment.username}</div>
      <Separator />
      <p className="ml-2 dark:text-white/90">{comment.comment}</p>
    </div>
  ));
}
