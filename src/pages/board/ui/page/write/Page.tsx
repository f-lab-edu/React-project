import { FormEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useIp } from '@/shared/lib/ip/IpProvider';
import { Atom, Input } from '@/shared/ui';
import { TextArea } from '@/shared/ui/TextArea/TextArea';

interface WriteInputs {
  id: string;
  title: string;
  content: string;
  category: 'news' | 'question';
}

export const BoardWritePage = () => {
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const ip = useIp();

  const { mutate } = useMutation({
    mutationFn: async ({ category, ...form }: WriteInputs) => {
      const url = process.env.API_URL;

      const postResponse = await fetch(`${url}/${category}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          ...form,
          views: 0,
          id: crypto.randomUUID(),
          writer: ip,
        }),
      });

      if (!postResponse.ok) {
        throw new Error(`HTTP error!: ${postResponse.status}`);
      }

      return await postResponse.json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['news'] });
      await queryClient.invalidateQueries({ queryKey: ['question'] });
      navigate('/board', { replace: true });
    },
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const ref = formRef.current;
    if (!ref) return null;

    const formData = new FormData(ref);
    const formProps: Record<string, FormDataEntryValue> =
      Object.fromEntries(formData);

    mutate(formProps as unknown as WriteInputs);
  };

  return (
    <div>
      <form ref={formRef} onSubmit={handleSubmit}>
        <select name="category">
          <option value="news">뉴스</option>
          <option value="question">질문</option>
        </select>
        <Input name="title" placeholder="제목을 입력해주세요" />
        <Atom border="1" color="gray">
          <TextArea name="content" placeholder="내용을 입력해주세요" />
        </Atom>
        <button>Send</button>
      </form>
    </div>
  );
};
