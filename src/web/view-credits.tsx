import { Link } from 'react-router-dom';
function Credits() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Made with ❤️ by Hana and Mia</h1>

      <Link to="/" className="go-back-button" style={{ display: 'inline-block', marginTop: '20px' }}>
        Go back
      </Link>
    </div>
  );
}

export default Credits;