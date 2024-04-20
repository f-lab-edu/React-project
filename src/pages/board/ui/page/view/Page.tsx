import { fetchGET } from '@/shared/api/base.api';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

interface PostItem {
  id: string;
  title: string;
  content: string;
  writer: string;
  views: number;
}

export const BoardViewPage = () => {
  const { data, isPending } = useQuery({
    queryKey: ['news'],
    queryFn: async () => await fetchGET('news'),
  });

  return (
    <div>
      {!isPending &&
        data.map((item: PostItem) => (
          <div key={item.id} style={{ border: '1px solid gray' }}>
            {item.title}
          </div>
        ))}
      <div>
        <Link to="/board/write">게시글 작성</Link>
      </div>
    </div>
  );
};
