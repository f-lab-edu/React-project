import { FormEvent, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useIp } from '@/shared/lib/ip/IpProvider';
import { Atom } from '@/shared/ui';
import { TextArea } from '@/shared/ui/TextArea/TextArea';

export const CreateComment = ({
  category,
  postId,
}: {
  category: string;
  postId: string;
}) => {
  const queryClient = useQueryClient();
  const ip = useIp();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { mutate } = useMutation({
    mutationFn: async (content: string) => {
      const url = process.env.API_URL;

      const commentResponse = await fetch(`${url}/comments`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          userId: ip,
          postId,
          category,
          commentId: Date.now().toString(),
          updatedAt: new Date().toISOString(),
          content,
        }),
      });

      if (!commentResponse.ok) {
        throw new Error(`HTTP error!: ${commentResponse.status}`);
      }

      return await commentResponse.json();
    },
    onSuccess: () => {
      const ref = textareaRef.current;
      if (ref) ref.value = '';
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const ref = textareaRef.current;
    if (!ref) return null;

    const text = ref.value;
    if (!text) return null;

    mutate(text);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Atom border="1" marginTop="10px">
        <TextArea
          ref={textareaRef}
          name="create-comment"
          placeholder="댓글 입력"
        />
        <button>등록</button>
      </Atom>
    </form>
  );
};
