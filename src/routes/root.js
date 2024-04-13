import "./root.css";

import { Link, Outlet } from "react-router-dom";

import { categoryTitleMap } from "../utils/convert-category-title";

export default function Root() {
  return (
    <>
      <div className="App">
        <h1>Built In Jobs</h1>
        <nav className="nav">
          <ul>
            {Object.keys(categoryTitleMap).map((key) => (
              <li key={key}>
                <Link to={`/?cat=${key}`}>{categoryTitleMap[key]}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <Outlet />
      </div>
    </>
  );
}
