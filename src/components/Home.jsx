import React,{Component} from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import '../styles/home.css';
import {search} from "../assets/index";
import { useHistory } from "react-router-dom";

function Home(props){
    let history = useHistory();
    function navtoUserDeatils(event){
      
      history.push(`/overview/${props.searchBar}`);
      props.getEmploymentData();
    }
    return (
      <div className="home">
          <div>
            <p className="startingText">Employee Explorer</p>
            <div className="SearchbarWrapper">
              
              <input className="Searchbar" value={props.searchBar} onChange={props.changeSeachBar} type="search" placeholder="Search team name..."/>
              <button className="Searchbutton" onClick={navtoUserDeatils}>
                <img src={search} alt="search" width="28" height="28"/>
              </button>
            </div>
          </div>
      </div>
    );
  
}

export default Home;