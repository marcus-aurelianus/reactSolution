import React from "react";
import { Link, withRouter } from "react-router-dom";
import '../styles/navbar.css';

function Navigation(props) {
  console.log(props);
  return (
    <div>
      <nav className="navgiBar">
        <div className="flexinbetween">
          <Link className="TitleItem" to="/">
            Additiv
          </Link>

          <div className="rightNav">
            <Link   className="HomeBar" to="/">
              <span className={`graytext ${
                props.location.pathname === "/" ? "active" : ""
              }`}>Home</span>
            </Link>
            <Link to = {`/overview/${props.searchBar}`}>
              <span className={`graytext ${
                props.location.pathname === `/overview/${props.searchBar}` ? "active" : ""
              }`}>ResultPage</span>
            </Link>
          </div>

        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);
