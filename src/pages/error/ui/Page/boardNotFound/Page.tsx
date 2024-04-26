import { Link } from 'react-router-dom';

export const BoardNotFoundPage = () => (
  <div>
    <h2>해당 게시글은 존재하지 않습니다!</h2>
    <Link to="/board">돌아가기</Link>
  </div>
);
