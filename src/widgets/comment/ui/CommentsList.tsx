import { Atom } from '@/shared/ui';
import { CommentsBox } from './CommentsList.css';

// TODO: separate entities interface
export interface Comment {
  userId: string;
  postId: string;
  commentId: string;
  content: string;
  updatedAt: string;
}

export const CommentsList = ({ comments }: { comments: Comment[] }) => {
  // check same ip
  // feature: control comment delete, modify
  // feature: control comment and comment

  return (
    <Atom>
      {comments.map((comment) => (
        <div key={comment.commentId} className={CommentsBox}>
          <div>
            <div>{comment.userId}</div>
            <div style={{ fontSize: '.75rem' }}>{comment.updatedAt}</div>
          </div>
          <span>{comment.content}</span>
        </div>
      ))}
    </Atom>
  );
};
