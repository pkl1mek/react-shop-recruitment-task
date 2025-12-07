import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404</h1>
      <p>Strona, której szukasz, nie istnieje.</p>
      <Link to="/">Wróć na stronę główną</Link>
    </div>
  );
};