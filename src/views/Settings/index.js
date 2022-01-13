import React,{useState, useEffect} from "react";
import axios from 'axios'
import { Link, Route, Redirect } from 'react-router-dom';

// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";

import MenuItem from "@material-ui/core/MenuItem";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
  solarChart,
  vipChart,
  contractorChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const access = localStorage.getItem('login');

   const [phases, setPhases] = useState('')
    
  const [timer, setTimer] = useState(0)
  let events = ['fire','flood']
  let day1 = 1000 * 3600 * 24;
  let today = new Date();
  
  let date1= new Date("10/30/2020, 9:59:12")
  let date2= new Date().toLocaleString()
  

  useEffect(()=>{
    axios.get(`https://ruwassa.herokuapp.com/api/v1/phases`)
    .then(res=>{
     setPhases(res.data)
    }).catch(e=>{console.log(e)})
},[])
     

      if (access !== 'pass'){
       // return alert('nope')
        return <Redirect to='/login'></Redirect>
       };
   
   

const changPhase=(e)=>{
    alert(e.target.value)
}
  return (
    <div>
      <GridContainer>

      <GridItem xs={8} sm={8} md={2} onClick={()=>{alert('11')}}>
          <Card chart>
            
            <CardBody>
  <h4 className={classes.cardTitle}>Add Phase{phases.length} </h4>                   
              
            
            </CardBody>
           
          </Card>
        </GridItem>

        <GridItem xs={8} sm={8} md={2} onClick={()=>{alert('Remove Phase')}}>
          <Card chart>
            <CardBody>
              <h4 className={classes.cardTitle}>Remove Phase</h4>         
            
            </CardBody>
           
          </Card>
        </GridItem>

        <GridItem xs={8} sm={8} md={2} onClick={()=>{alert('Add admin')}}>
          <Card chart>
            
            <CardBody>
              <h4 className={classes.cardTitle}>Add Admin</h4>
            
            
            </CardBody>
           </Card>
        </GridItem>

        <GridItem xs={8} sm={8} md={2} onClick={()=>{alert('Add admin')}}>
          <Card chart>
            
            <CardBody>
              <h4 className={classes.cardTitle}>set default phase</h4>           
            </CardBody>
           </Card>
        </GridItem>

      </GridContainer>
      <GridContainer>
          
      <GridItem xs={8} sm={8} md={2} >
          <Card chart>
            
            <CardBody>
  <h4 className={classes.cardTitle}>Add Phase </h4>    
  <input name='fff' onChange={(e)=>{alert(e.target.value)}} />               
  <input />       
            </CardBody>
           
          </Card>
        </GridItem>
        <GridItem xs={8} sm={8} md={2} >
          <Card chart>
            
            <CardBody>
  <h4 className={classes.cardTitle}>Add Admin </h4>    
  <input placeholder='Email'  onChange={(e)=>{alert(e.target.value)}} />               
  <input  placeholder='Password'  />       
            </CardBody>
           
          </Card>
        </GridItem>
        <GridItem xs={8} sm={8} md={2} >
          <Card chart>
            
            <CardBody>
  <h4 className={classes.cardTitle}>Default Phase </h4>    
    <select onChange={changPhase}>
        {Object.keys(phases).map(i=>
            <option value={phases[i].phase}>{phases[i].phase=='6'?'6C':phases[i].phase}</option>
        )
    }
    </select>
            </CardBody>
           
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
