import { useMutation } from '@tanstack/react-query';
import { FormEvent, useCallback, useRef } from 'react';
import { Atom, Input } from '@/shared/ui';
import { TextArea } from '@/shared/ui/TextArea/TextArea';
import { useNavigate } from 'react-router-dom';

interface WriteInputs {
  id: string;
  title: string;
  content: string;
}

export const BoardWritePage = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async (tt: WriteInputs) => {
      // instead user
      const response = await fetch('https://ipinfo.io/?callback=callback');
      const responseString = await response.text();

      const ipRegex = /"ip":"(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"/;
      const match = ipRegex.exec(responseString);

      const ip = match ? match[1] : 'unknown';

      const url = process.env.API_URL;

      const postResponse = await fetch(`${url}/post1`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          ...tt,
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
    onSuccess: () => {
      navigate('/board', { replace: true });
    },
  });

  const next = useCallback(
    (form: WriteInputs) => {
      mutate(form);
    },
    [mutate],
  );

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const ref = formRef.current;
    if (!ref) return null;

    const formData = new FormData(ref);
    const formProps: Record<string, FormDataEntryValue> =
      Object.fromEntries(formData);

    next(formProps as unknown as WriteInputs);
  };

  return (
    <div>
      <form ref={formRef} onSubmit={handleSubmit}>
        <Input name="title" placeholder="제목을 입력해주세요" />
        <Atom border="1" color="gray">
          <TextArea name="content" placeholder="내용을 입력해주세요" />
        </Atom>
        <button>Send</button>
      </form>
    </div>
  );
};
