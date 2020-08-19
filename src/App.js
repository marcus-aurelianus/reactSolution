import React, { Component} from 'react';

import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { Navigation, Footer, Home, ResultPage } from "./components";



export default class App extends Component{
  constructor(props) 
  {
    super(props);
    this.state = {searchBar:"",employeeTree:{},employeeQuried:{},bossToEmployeeMap:{}};
    this.changeSeachBar = this.changeSeachBar.bind(this);
    this.getEmploymentData = this.getEmploymentData.bind(this);
    this.dealGridClick= this.dealGridClick.bind(this);
  }

  changeSeachBar(event){
    console.log(event.target.value);
    this.setState({searchBar:event.target.value});
  }


  dealGridClick(event){
    console.log(event);
    this.setState({searchBar:event.data.name});
  }


  //constructing the tree and save the query data in Cache
  async getEmploymentData(){
    let employeeTree = this.state.employeeTree;
    let employeeQuried = this.state.employeeQuried;
    let bossToEmployeeMap = this.state.bossToEmployeeMap;
    let bfs = [this.state.searchBar];
    while (bfs.length){
      let newbfs = [];
      for (const employeeToQuery of bfs)
      {
        if (!employeeQuried[employeeToQuery]){
          try {
            const url=`http://api.additivasia.io/api/v1/assignment/employees/${employeeToQuery}`;
            const response=await fetch(url,{method:"GET"});
            const responsedata=await response.json();

            if(responsedata.length){
              console.log(employeeToQuery,responsedata,responsedata.length);

              //if exist already, add in position params
              //if not then created
              if (!employeeTree[employeeToQuery]){
                employeeTree[employeeToQuery]={name:employeeToQuery,position:responsedata[0]};
              }else{
                employeeTree[employeeToQuery]["position"]=responsedata[0];
              }
  
              employeeQuried[employeeToQuery]=true;
              if (responsedata && responsedata.length==2 && responsedata[1]["direct-subordinates"]){

                //create subors to pass in child reference later
                employeeTree[employeeToQuery].subors=[];
                for (let employee of responsedata[1]["direct-subordinates"]){
                  if (!employeeQuried[employee]){

                    //if child not exist, create child object reference for the new tree


                    if (!employeeTree[employee]){
                      employeeTree[employee]={name:employee};
                    }

                    //pass in child object reference

                    newbfs.push(employee);
                  }
                  
                  employeeTree[employeeToQuery].subors.push(employeeTree[employee]);
                  
                }
              }
            }
    
          } catch (error) {
            console.log(error);
          }
        }
      }
      bfs=newbfs;
      console.log(newbfs,bfs);
    }
    this.setState({employeeTree});
    this.setState({employeeQuried});

    //function to destruct the data
    function destrucEmployeeData (nodeName){
      // if the record is already in cache, return the result
      if (bossToEmployeeMap[nodeName]){
        return bossToEmployeeMap[nodeName];
      }
      //if invalid nodenam,simply return
      if (!employeeTree[nodeName]){
        return;
      }
      //if no subors
      if (!employeeTree[nodeName].subors){
        bossToEmployeeMap[nodeName]=[];
        return [];
      }else{
        let res=[];
        for (const newnode of employeeTree[nodeName].subors){
          let temres=destrucEmployeeData(newnode.name);
          res.push(...temres,JSON.stringify({name:newnode.name,position:newnode.position}));
        }
        let finalres=[...new Set(res)];
        bossToEmployeeMap[nodeName]=finalres;
        return finalres;
      }
    }
    //if have not destruct the tree, destruct it right now
    if (!bossToEmployeeMap[this.state.searchBar]){
      destrucEmployeeData(this.state.searchBar);
      this.setState({bossToEmployeeMap});
    }
    console.log(bossToEmployeeMap);
  }

  render() 
  {
    return (
      <div className="App">
        <Router>
          <Navigation searchBar={this.state.searchBar}/>
          <Switch>
            <Route path="/" exact render={() => <Home searchBar={this.state.searchBar} changeSeachBar={this.changeSeachBar} navtoUserDeatils={this.navtoUserDeatils} getEmploymentData={this.getEmploymentData}/>} />
            <Route path={`/overview/${this.state.searchBar}`} exact render={() => <ResultPage boss={this.state.searchBar} bossToEmployeeMap={this.state.bossToEmployeeMap[this.state.searchBar]} dealGridClick={this.dealGridClick}/>} />
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }


};
