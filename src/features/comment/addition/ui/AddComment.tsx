import { TextArea } from '@/shared/ui/TextArea/TextArea';
import { Atom } from '@/shared/ui';
import { FormEvent } from 'react';

export const AddComment = ({
  category,
  postId,
}: {
  category: string;
  postId: string;
}) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    JSON.stringify({ category, postId });
  };
  return (
    <form onSubmit={handleSubmit}>
      <Atom border="1" marginTop="10px">
        <TextArea name="add-comment" placeholder="답글 입력" />
        <button>등록</button>
      </Atom>
    </form>
  );
};
