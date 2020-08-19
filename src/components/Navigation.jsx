import React,{Component} from "react";
import { Link, withRouter } from "react-router-dom";
import '../styles/navbar.css';


class Navigation extends Component{

  render(){
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
                  this.props.location.pathname === "/" ? "active" : ""
                }`}>Home</span>
              </Link>
              <Link to = {`/overview/${this.props.searchBar}`}>
                <span className={`graytext ${
                  this.props.location.pathname === `/overview/${this.props.searchBar}` ? "active" : ""
                }`}>ResultPage</span>
              </Link>
            </div>
  
          </div>
        </nav>
      </div>
    );
  }
  componentDidUpdate(){
  if (this.props.location.pathname !== "/"  &&  `/overview/${this.props.searchBar}` !== this.props.location.pathname){
    //this means we used history nav and now to sync by force render
    this.props.mainForceRender(this.props.location.pathname.slice(10));
  }
  }
  componentDidMount(){
    if (this.props.location.pathname !== "/"  &&  `/overview/${this.props.searchBar}` !== this.props.location.pathname){
      //this means we revert back to nothing when refresh
      this.props.mainForceRender(this.props.location.pathname.slice(10));
      this.props.getEmploymentData(this.props.location.pathname.slice(10));
    }
    }
}


export default withRouter(Navigation);