import { Link, Outlet } from 'react-router-dom';
import './root.css';

export default function Root() {
  return (
    <>
      <div className="App">
        <h1>Built In Jobs</h1>
        <nav className="nav">
          <ul>
            <li>
              <Link to={`/?cat=frontend`}>Frontend</Link>
            </li>
            <li>
              <Link to={`/?cat=hr`}>HR + Recruiting</Link>
            </li>
          </ul>
        </nav>
        <Outlet />
      </div>
    </>
  );
}
