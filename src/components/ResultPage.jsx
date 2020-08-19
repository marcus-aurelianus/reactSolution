import React from 'react';
import '../styles/resultPage.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {columnDefs} from "../constants/agGridConstant";
import { useHistory } from "react-router-dom";

function ResultPage(props) {
    let rowData=[];
    if (props && props.bossToEmployeeMap){
      for (const employeeInfo of props.bossToEmployeeMap){
        rowData.push(JSON.parse(employeeInfo));
      }
    }
    let history = useHistory();
    function navtoUserDeatils(event){
      history.push(`/overview/${event.data.name}`);
      props.dealGridClick(event);
    }
    return (
      <div className="resultPage">
        <div>
          <p>Employee Overview</p>
          <p>Subordinates of employee {props.boss}</p>
          <div
            className="ag-theme-alpine"
            style={{
            height: '400px',
            width: '425px' }}
          >
            <AgGridReact
              onCellClicked={navtoUserDeatils}
              columnDefs={columnDefs}
              rowData={rowData}>
            </AgGridReact>
          </div>
        </div>
      </div>
    );
  
};

export default ResultPage;