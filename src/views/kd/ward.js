
import React,{useState, useEffect} from "react";

import axios from 'axios'


import {
    dailySalesChart, vipChart
   } from "../../variables/charts.js";
  
  import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";
  import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";

  
  import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Table from "../../components/Table/Table.js";
import Tasks from "../../components/Tasks/Tasks.js";
import CustomTabs from "../../components/CustomTabs/CustomTabs.js";
import Danger from "../../components/Typography/Danger.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardIcon from "../../components/Card/CardIcon.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import Popup from '../reports/popUp';


const Ward = (props) => {
let [LgaResult, setLgaResult]=useState('')
    const useStyles = makeStyles(styles);

    const classes = useStyles();
    
const onChangeLga =()=>{
    alert(props.selectedLga)
}

    useEffect(()=>{
        axios.get(`https://bauchiem.herokuapp.com/api/v1/kdpunits/lga/${props.selectedLga}`)
        .then(res=>{
           // alert(res.data[0].sum)
            setLgaResult(res.data[0])
        }).catch(e=>{console.log(e)})
    
    },[props.onChangeLga])

    const  allData = {
        labels: ["APC", "PDP", "Others"],
        series: [[props.apc, props.pdp, props.others]]
      }
    
      let total = Number(props.apc)+Number(props.pdp)+Number(props.others)

return(
    
  
<GridItem xl={4} sm={4} md={4}>
<Card chart>
 <CardHeader color="success">
   <ChartistGraph
     className="ct-chart"
     data={allData}
     type="Bar"
     options={dailySalesChart.options}
    
   />
 </CardHeader>
 <CardBody>
<h4 className={classes.cardTitle}>         {props.ward}
</h4>
  <Table
           tableData={[
             ["APC",props.apc],["PDP", props.pdp],["Others",props.others], ["APC + PDP + Others",total]                 
            ]}
         />
 
 </CardBody>
 </Card>
</GridItem>


)
 



    }


    export default Ward