import { Link } from 'react-router-dom';
function Credits() {
  return (
    <div>
      <h1>Made with ❤️ by Hana and Mia</h1>

      <Link to="/" className="go-back-button">
        Go back
      </Link>
    </div>
  );
}

export default Credits;