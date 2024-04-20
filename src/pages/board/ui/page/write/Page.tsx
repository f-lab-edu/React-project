import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import { Atom, Input } from '@/shared/ui';
import { TextArea } from '@/shared/ui/TextArea/TextArea';

interface WriteInputs {
  id: string;
  title: string | number;
  content: string | number;
}

export const BoardWritePage = () => {
  const { register, handleSubmit } = useForm<WriteInputs>();

  const { mutate } = useMutation({
    mutationFn: async (tt: WriteInputs) => {
      // instead user
      const response = await fetch('https://ipinfo.io/?callback=callback');
      const responseString = await response.text();

      const ipRegex = /"ip":"(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"/;
      const match = ipRegex.exec(responseString);

      const ip = match ? match[1] : 'unknown';

      const url = process.env.API_URL;

      await fetch(`${url}/news`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          ...tt,
          id: crypto.randomUUID(),
          writer: ip,
          views: 0,
        }),
      });
    },
    // onSuccess: (data) => {},
    onError: () => {},
  });

  const next = useCallback(
    (form: WriteInputs) => {
      mutate(form);
    },
    [mutate],
  );

  return (
    <div>
      <form onSubmit={handleSubmit(next)}>
        <Input {...register('title', { required: true })} />
        <Atom border="1" color="gray">
          <TextArea {...register('content')} />
        </Atom>
        <Input type="submit" />
      </form>
    </div>
  );
};
