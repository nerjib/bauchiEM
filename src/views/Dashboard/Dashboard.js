import React,{useState, useEffect} from "react";
import axios from 'axios'
import { Link, Route, Redirect } from 'react-router-dom';

// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";

import MenuItem from "@material-ui/core/MenuItem";

import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
//import Warning from "@material-ui/icons/Warning";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Popup from '../reports/popUp';

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart, vipChart
 } from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const access = localStorage.getItem('login');

    const [allhpbh, setAllhpbh]= useState([])
    const [allsmbh, setAllsmbh]= useState([])
    const [allflbh, setAllflbh]= useState([])
    const [allvip, setAllvip]= useState([])
    const [status, setStatus] = useState([])
    const [phase, setPhase] = useState('6d')
    const [phaseData, setPhaseData] = useState('')
    const [contractors, setContractors] = useState('')
    let [cpage, setCpage] = useState(1);
    let [dataPerPage, setDataPerPage] = useState(20)
  let [apc, setApc] =useState(0)
  let [pdp, setPdp] =useState(0)
  let [others, setOthers] =useState(0)
  let [accredited, setAccredited] =useState(0)
  let [abadawa, setAbadawa] =useState(0)
  let [danalhaji, setDanalhaji] =useState(0)
  let [garu, setGaru] =useState(0)
  let [gure, setGure] =useState(0)
  let [kayarda, setKayarda] =useState(0)
  let [lazuru, setLazuru] =useState(0)
  let [lere, setLere] =useState(0)
  let [raminkura, setRaminkura] =useState(0)
  let [sabonbirni, setSabonbirni] =useState(0)
  let [saminaka, setSaminaka] =useState(0)
  let [yarkasuwa, setYarkasuwa] =useState(0)
  let [cunits, setCunits] =useState('')
  let [allcunits, setAllcunits] =useState('')
  const [isOpen, setIsOpen] = useState(false);
  const [img, setImg] = useState('')




    
  const [timer, setTimer] = useState(0)
  let events = ['fire','flood']
  let day1 = 1000 * 3600 * 24;
  let today = new Date();
  
  let date1= new Date("10/30/2020, 9:59:12")
  let date2= new Date().toLocaleString()
  
  const handleTimer = () =>{
  //this.inInterval2= setInterval( ()=>this.tick2(), 1000);
      setInterval(
        () => setTimer(new Date().toLocaleString()),
        1000
      )};
      useEffect(()=>handleTimer(),[])

      useEffect(()=>handleTimer(),[])

useEffect(()=>{
  axios.get(`https://bauchiem.herokuapp.com/api/v1/punits/apc`)
  .then(res=>{
     // alert(res.data[0].sum)
      setApc(res.data[0].sum)
  }).catch(e=>{console.log(e)})
  axios.get(`https://bauchiem.herokuapp.com/api/v1/punits/pdp`)
  .then(res=>{
    //  alert(res.data)
      setPdp(res.data[0].sum)
  }).catch(e=>{console.log(e)})
  axios.get(`https://bauchiem.herokuapp.com/api/v1/punits/others`)
  .then(res=>{
    //  alert(res.data)
      setOthers(res.data[0].sum)
  }).catch(e=>{console.log(e)})
  axios.get(`https://bauchiem.herokuapp.com/api/v1/punits/accredited`)
  .then(res=>{
    //  alert(res.data)
      setAccredited(res.data[0].sum)
  }).catch(e=>{console.log(e)})

  axios.get(`https://bauchiem.herokuapp.com/api/v1/punits/wards/ABADAWA`)
  .then(res=>{
    //  alert(res.data)
      setAbadawa(res.data[0])
  }).catch(e=>{console.log(e)})

  axios.get(`https://bauchiem.herokuapp.com/api/v1/punits/wards/DAN ALHAJI`)
  .then(res=>{
    //  alert(res.data)
      setDanalhaji(res.data[0])
  }).catch(e=>{console.log(e)})
  axios.get(`https://bauchiem.herokuapp.com/api/v1/punits/wards/GARU`)
  .then(res=>{
    //  alert(res.data)
      //setAbadawa(res.data[0])
      setGaru(res.data[0])
  }).catch(e=>{console.log(e)})
  axios.get(`https://bauchiem.herokuapp.com/api/v1/punits/wards/GURE`)
  .then(res=>{
    //  alert(res.data)
      //setAbadawa(res.data[0])
      setGure(res.data[0])
  }).catch(e=>{console.log(e)})
  axios.get(`https://bauchiem.herokuapp.com/api/v1/punits/wards/KAYARDA`)
  .then(res=>{
    //  alert(res.data)
      //setAbadawa(res.data[0])
      setKayarda(res.data[0])
  }).catch(e=>{console.log(e)})
  axios.get(`https://bauchiem.herokuapp.com/api/v1/punits/wards/LAZURU`)
  .then(res=>{
    //  alert(res.data)
      //setAbadawa(res.data[0])
      setLazuru(res.data[0])
  }).catch(e=>{console.log(e)})
  axios.get(`https://bauchiem.herokuapp.com/api/v1/punits/wards/LERE`)
  .then(res=>{
    //  alert(res.data)
      //setAbadawa(res.data[0])
      setLere(res.data[0])
  }).catch(e=>{console.log(e)})
  axios.get(`https://bauchiem.herokuapp.com/api/v1/punits/wards/RAMIN KURA`)
  .then(res=>{
    //  alert(res.data)
      //setAbadawa(res.data[0])
      setRaminkura(res.data[0])
  }).catch(e=>{console.log(e)})
  axios.get(`https://bauchiem.herokuapp.com/api/v1/punits/wards/SABON BIRNI`)
  .then(res=>{
    //  alert(res.data)
      //setAbadawa(res.data[0])
      setSabonbirni(res.data[0])
  }).catch(e=>{console.log(e)})
  axios.get(`https://bauchiem.herokuapp.com/api/v1/punits/wards/SAMINAKA`)
  .then(res=>{
    //  alert(res.data)
      //setAbadawa(res.data[0])
      setSaminaka(res.data[0])
  }).catch(e=>{console.log(e)})
  axios.get(`https://bauchiem.herokuapp.com/api/v1/punits/wards/YAR KASUWA`)
  .then(res=>{
    //  alert(res.data)
      //setAbadawa(res.data[0])
      setYarkasuwa(res.data[0])
  }).catch(e=>{console.log(e)})


  axios.get(`https://bauchiem.herokuapp.com/api/v1/results/cunits`)
  .then(res=>{
    //  alert(res.data)
      //setAbadawa(res.data[0])
      setCunits(res.data)
  }).catch(e=>{console.log(e)})
  axios.get(`https://bauchiem.herokuapp.com/api/v1/results/aggcunits`)
  .then(res=>{
    //  alert(res.data)
      //setAbadawa(res.data[0])
      setAllcunits(res.data[0])
  }).catch(e=>{console.log(e)})


}
,
      [])

   

      useEffect(()=>{
        const intervalId = setInterval(()=>{

        axios.get(`https://bauchiem.herokuapp.com/api/v1/punits/apc`)
        .then(res=>{
           // alert(res.data[0].sum)
            setApc(res.data[0].sum)
        }).catch(e=>{console.log(e)})
        axios.get(`https://bauchiem.herokuapp.com/api/v1/punits/pdp`)
        .then(res=>{
          //  alert(res.data)
            setPdp(res.data[0].sum)
        }).catch(e=>{console.log(e)})
        axios.get(`https://bauchiem.herokuapp.com/api/v1/punits/others`)
        .then(res=>{
          //  alert(res.data)
            setOthers(res.data[0].sum)
        }).catch(e=>{console.log(e)})
        axios.get(`https://bauchiem.herokuapp.com/api/v1/punits/accredited`)
        .then(res=>{
          //  alert(res.data)
            setAccredited(res.data[0].sum)
        }).catch(e=>{console.log(e)})
      
        axios.get(`https://bauchiem.herokuapp.com/api/v1/punits/wards/ABADAWA`)
        .then(res=>{
          //  alert(res.data)
            setAbadawa(res.data[0])
        }).catch(e=>{console.log(e)})
      
        axios.get(`https://bauchiem.herokuapp.com/api/v1/punits/wards/DAN ALHAJI`)
        .then(res=>{
          //  alert(res.data)
            setDanalhaji(res.data[0])
        }).catch(e=>{console.log(e)})
        axios.get(`https://bauchiem.herokuapp.com/api/v1/punits/wards/GARU`)
        .then(res=>{
          //  alert(res.data)
            //setAbadawa(res.data[0])
            setGaru(res.data[0])
        }).catch(e=>{console.log(e)})
        axios.get(`https://bauchiem.herokuapp.com/api/v1/punits/wards/GURE`)
        .then(res=>{
          //  alert(res.data)
            //setAbadawa(res.data[0])
            setGure(res.data[0])
        }).catch(e=>{console.log(e)})
        axios.get(`https://bauchiem.herokuapp.com/api/v1/punits/wards/KAYARDA`)
        .then(res=>{
          //  alert(res.data)
            //setAbadawa(res.data[0])
            setKayarda(res.data[0])
        }).catch(e=>{console.log(e)})
        axios.get(`https://bauchiem.herokuapp.com/api/v1/punits/wards/LAZURU`)
        .then(res=>{
          //  alert(res.data)
            //setAbadawa(res.data[0])
            setLazuru(res.data[0])
        }).catch(e=>{console.log(e)})
        axios.get(`https://bauchiem.herokuapp.com/api/v1/punits/wards/LERE`)
        .then(res=>{
          //  alert(res.data)
            //setAbadawa(res.data[0])
            setLere(res.data[0])
        }).catch(e=>{console.log(e)})
        axios.get(`https://bauchiem.herokuapp.com/api/v1/punits/wards/RAMIN KURA`)
        .then(res=>{
          //  alert(res.data)
            //setAbadawa(res.data[0])
            setRaminkura(res.data[0])
        }).catch(e=>{console.log(e)})
        axios.get(`https://bauchiem.herokuapp.com/api/v1/punits/wards/SABON BIRNI`)
        .then(res=>{
          //  alert(res.data)
            //setAbadawa(res.data[0])
            setSabonbirni(res.data[0])
        }).catch(e=>{console.log(e)})
        axios.get(`https://bauchiem.herokuapp.com/api/v1/punits/wards/SAMINAKA`)
        .then(res=>{
          //  alert(res.data)
            //setAbadawa(res.data[0])
            setSaminaka(res.data[0])
        }).catch(e=>{console.log(e)})
        axios.get(`https://bauchiem.herokuapp.com/api/v1/punits/wards/YAR KASUWA`)
        .then(res=>{
          //  alert(res.data)
            //setAbadawa(res.data[0])
            setYarkasuwa(res.data[0])
        }).catch(e=>{console.log(e)})
      
      
        axios.get(`https://bauchiem.herokuapp.com/api/v1/results/cunits`)
        .then(res=>{
          //  alert(res.data)
            //setAbadawa(res.data[0])
            setCunits(res.data)
        }).catch(e=>{console.log(e)})
        axios.get(`https://bauchiem.herokuapp.com/api/v1/results/aggcunits`)
        .then(res=>{
          //  alert(res.data)
            //setAbadawa(res.data[0])
            setAllcunits(res.data[0])
        }).catch(e=>{console.log(e)})

      },10*1000)
      return ()=>{ clearInterval(intervalId)}
  
      
      
      }
      ,
            [])
      
 
      const  allData = {
        labels: ["Accredited", "APC", "PDP", "Others"],
        series: [[accredited, apc, pdp, others]]
      }
      const  abadawaData = {
        labels: ["Accredited", "APC", "PDP", "Others"],
        series: [[abadawa.accredited, abadawa.apc, abadawa.pdp, abadawa.others]]
      }

      const danalhajiData  = {
        labels: ["Accredited", "APC", "PDP", "Others"],
        series: [[danalhaji.accredited, danalhaji.apc, danalhaji.pdp, danalhaji.others]]
      }   
      const garuData  = {
        labels: ["Accredited", "APC", "PDP", "Others"],
        series: [[garu.accredited, garu.apc, garu.pdp, garu.others]]
      }   
      const gureData  = {
        labels: ["Accredited", "APC", "PDP", "Others"],
        series: [[gure.accredited, gure.apc, gure.pdp, gure.others]]
      }   
      const  kayardaData = {
        labels: ["Accredited", "APC", "PDP", "Others"],
        series: [[kayarda.accredited, kayarda.apc, kayarda.pdp, kayarda.others]]
      }  
       const  lazuruData = {
        labels: ["Accredited", "APC", "PDP", "Others"],
        series: [[lazuru.accredited, lazuru.apc, lazuru.pdp, lazuru.others]]
      }   
      const lereData  = {
        labels: ["Accredited", "APC", "PDP", "Others"],
        series: [[lere.accredited, lere.apc, lere.pdp, lere.others]]
      }  
       const raminkuraData  = {
        labels: ["Accredited", "APC", "PDP", "Others"],
        series: [[raminkura.accredited, raminkura.apc, raminkura.pdp, raminkura.others]]
      }  
       const sabonbirniData  = {
        labels: ["Accredited", "APC", "PDP", "Others"],
        series: [[sabonbirni.accredited, sabonbirni.apc, sabonbirni.pdp, sabonbirni.others]]
      }   
      const  saminakaData  = {
        labels: ["Accredited", "APC", "PDP", "Others"],
        series: [[saminaka.accredited, saminaka.apc, saminaka.pdp, saminaka.others]]
      }  
       const  yarkasuwaData = {
        labels: ["Accredited", "APC", "PDP", "Others"],
        series: [[yarkasuwa.accredited, yarkasuwa.apc, yarkasuwa.pdp, yarkasuwa.others]]
      }
   
        let contaractorsLabel=[]
        let contaractorsSeries=[]

        let indexOfLastTodo = cpage * dataPerPage;
        let indexOfFirstTodo = indexOfLastTodo - dataPerPage;
     //   Object.keys(this.props.projects).map(e)
        let currentData = Object.keys(contractors).slice(indexOfFirstTodo, indexOfLastTodo);
    
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(Object.keys(contractors).length / dataPerPage); i++) {
          pageNumbers.push(<button key={i}   id={i} >{i}</button>);
        }

      // if(contractors.length>0){
          currentData.map((e,i)=>{
           contractors[e].company !=null && contaractorsLabel.push((contractors[e].company).substring(0,5))
           contaractorsSeries.push(Math.round(contractors[e].avg))
          })
       //}

     const  contractorsData={
         labels: contaractorsLabel,
        series: [contaractorsSeries]}


        const nextPage = () =>{
          //    alert('hello')
          setCpage(cpage + 1)
  
          }
    const      backPage =()=>{
        setCpage(cpage - 1)
          
          }

          const togglePopup = (e) => {
            if(e){
            setImg(e)
          setIsOpen(!isOpen);
        }else{
            alert('Resultsheet yet not uploaded')
          }
        }

          let cunitData=[]
          if(cunits.length>0){
            let kk = 0;
    
            Object.keys(cunits).map((e,i)=>
                {
                    kk++
                cunitData.push([ kk,cunits[e].ward,cunits[e].accredited,cunits[e].apc,cunits[e].pdp,cunits[e].others,
                <input disabled={cunits[e].resulturl?false:true}
          type="button" enabled={false}
          value='Result sheet'   
          onClick={()=>togglePopup(cunits[e].resulturl)}
      
        />
                ])
                
            })
            cunitData.push(['','Total',allcunits.accredited,allcunits.apc,allcunits.pdp,allcunits.others])
        }

     
let total = Number(apc)+Number(pdp)+Number(others)
let totalAbadawa = Number(abadawa.apc)+ Number(abadawa.pdp)
let totalDanalhaji = Number(danalhaji.apc)+Number(danalhaji.pdp)+Number(danalhaji.others)
let totalGaru = Number(garu.apc)+Number(garu.pdp)+Number(garu.others)
let totalGure = Number(gure.apc)+Number(gure.pdp)+Number(gure.others)
let totalKayarda = Number(kayarda.apc)+Number(kayarda.pdp)+Number(kayarda.others)
let totalLazuru = Number(lazuru.apc)+Number(lazuru.pdp)+Number(lazuru.others)
let totalLere = Number(lere.apc)+Number(lere.pdp)+Number(lere.others)
let totalRaminkura = Number(raminkura.apc)+Number(raminkura.pdp)+Number(raminkura.others)
let totalSabonbirni = Number(sabonbirni.apc)+Number(sabonbirni.pdp)+Number(sabonbirni.others)
let totalSaminaka = Number(saminaka.apc)+Number(saminaka.pdp)+Number(saminaka.others)
let totalYarkasuwa = Number(yarkasuwa.apc)+Number(yarkasuwa.pdp)+Number(yarkasuwa.others)
//let total = Number(apc)+Number(pdp)+Number(others)

  return (
    <div>
      <GridContainer>

      <GridItem xl={12} sm={12} md={12}>
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
  <h4 className={classes.cardTitle}> </h4>
              <Table
                 tableData={[
                   ["Accredited Voters",accredited],["APC", apc],["PDP", pdp],["Others",others], ["APC + PDP + Others",total]                 
                  ]}
               />
            
            </CardBody>
            {total<accredited?<Warning/>:total>accredited?<Warning/>:''}
           {total<accredited?'Sum total of result is less than accredited voters':total>accredited? 'Sum total of result is greater than accredited voters':' Sum total of resul equal sum total of accredited voters'}
          </Card>
        </GridItem>

{// wards
}
        <GridItem xl={4} sm={4} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={abadawaData}
                type="Bar"
                options={vipChart.options}
               
              />
            </CardHeader>
            <CardBody>
            <h4 className={classes.cardTitle}>Abadawa</h4>

  <h4 className={classes.cardTitle}> </h4>
              <Table
                 tableData={[
                   ["Accredited Voters",abadawa.accredited],["APC", abadawa.apc],["PDP", abadawa.pdp],["Others",abadawa.others], ["APC + PDP + Others",totalAbadawa]                 
                  ]}
               />
            
            </CardBody>
            {totalAbadawa<abadawa.accredited?<Warning/>:totalAbadawa>abadawa.accredited?<Warning/>:''}
           {totalAbadawa<abadawa.accredited?'Sum total of result is less than accredited voters':totalAbadawa>abadawa.accredited? 'Sum total of result is greater than accredited voters':' Sum total of resul equal sum total of accredited voters'}
          </Card>
        </GridItem>

        <GridItem xl={4} sm={4} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={danalhajiData}
                type="Bar"
                options={vipChart.options}
               
              />
            </CardHeader>
            <CardBody>
  <h4 className={classes.cardTitle}>DAN ALHAJI </h4>
              <Table
                 tableData={[
                   ["Accredited Voters",danalhaji.accredited],["APC", danalhaji.apc],["PDP", danalhaji.pdp],["Others",danalhaji.others], ["APC + PDP + Others",totalDanalhaji]                 
                  ]}
               />
            
            </CardBody>
            {totalDanalhaji<danalhaji.accredited?<Warning/>:totalDanalhaji>danalhaji.accredited?<Warning/>:''}
           {totalDanalhaji<danalhaji.accredited?'Sum total of result is less than accredited voters':totalDanalhaji>danalhaji.accredited? 'Sum total of result is greater than accredited voters':' Sum total of resul equal sum total of accredited voters'}
          </Card>
        </GridItem>
        <GridItem xl={4} sm={4} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={garuData}
                type="Bar"
                options={vipChart.options}
               
              />
            </CardHeader>
            <CardBody>
  <h4 className={classes.cardTitle}>GARU </h4>
              <Table
                 tableData={[
                   ["Accredited Voters",garu.accredited],["APC", garu.apc],["PDP", garu.pdp],["Others",garu.others], ["APC + PDP + Others",totalGaru]                 
                  ]}
               />
            
            </CardBody>
            {totalGaru<garu.accredited?<Warning/>:totalGaru>garu.accredited?<Warning/>:''}
           {totalGaru<garu.accredited?'Sum total of result is less than accredited voters':totalGaru>garu.accredited? 'Sum total of result is greater than accredited voters':' Sum total of resul equal sum total of accredited voters'}
          </Card>
        </GridItem>
        <GridItem xl={4} sm={4} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={gureData}
                type="Bar"
                options={vipChart.options}
               
              />
            </CardHeader>
            <CardBody>
  <h4 className={classes.cardTitle}>GURE </h4>
              <Table
                 tableData={[
                   ["Accredited Voters",gure.accredited],["APC", gure.apc],["PDP", gure.pdp],["Others",gure.others], ["APC + PDP + Others",totalGure]                 
                  ]}
               />
            
            </CardBody>
            {totalGure<gure.accredited?<Warning/>:totalGure>gure.accredited?<Warning/>:''}
           {totalGure<gure.accredited?'Sum total of result is less than accredited voters':totalGure>gure.accredited? 'Sum total of result is greater than accredited voters':' Sum total of resul equal sum total of accredited voters'}
          </Card>
        </GridItem>

        <GridItem xl={4} sm={4} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={kayardaData}
                type="Bar"
                options={vipChart.options}
               
              />
            </CardHeader>
            <CardBody>
  <h4 className={classes.cardTitle}>Kayarda </h4>
              <Table
                 tableData={[
                   ["Accredited Voters",kayarda.accredited],["APC", kayarda.apc],["PDP", kayarda.pdp],["Others",kayarda.others], ["APC + PDP + Others",totalKayarda]                 
                  ]}
               />
            
            </CardBody>
            {totalKayarda<kayarda.accredited?<Warning/>:totalKayarda>kayarda.accredited?<Warning/>:''}
           {totalKayarda<kayarda.accredited?'Sum total of result is less than accredited voters':totalKayarda>kayarda.accredited? 'Sum total of result is greater than accredited voters':' Sum total of resul equal sum total of accredited voters'}
          </Card>
        </GridItem>

        <GridItem xl={4} sm={4} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={lazuruData}
                type="Bar"
                options={vipChart.options}
               
              />
            </CardHeader>
            <CardBody>
  <h4 className={classes.cardTitle}>LAZURU </h4>
              <Table
                 tableData={[
                   ["Accredited Voters",lazuru.accredited],["APC", lazuru.apc],["PDP", lazuru.pdp],["Others",lazuru.others], ["APC + PDP + Others",totalLazuru]                 
                  ]}
               />
            
            </CardBody>
            {totalLazuru<lazuru.accredited?<Warning/>:totalLazuru>lazuru.accredited?<Warning/>:''}
           {totalLazuru<lazuru.accredited?'Sum total of result is less than accredited voters':totalLazuru>lazuru.accredited? 'Sum total of result is greater than accredited voters':' Sum total of resul equal sum total of accredited voters'}
          </Card>
        </GridItem>
        <GridItem xl={4} sm={4} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={lereData}
                type="Bar"
                options={vipChart.options}
               
              />
            </CardHeader>
            <CardBody>
  <h4 className={classes.cardTitle}> LERE </h4>
              <Table
                 tableData={[
                   ["Accredited Voters",lere.accredited],["APC", lere.apc],["PDP", lere.pdp],["Others",lere.others], ["APC + PDP + Others",totalLere]                 
                  ]}
               />
            
            </CardBody>
            {totalLere<lere.accredited?<Warning/>:totalLere>lere.accredited?<Warning/>:''}
           {totalLere<lere.accredited?'Sum total of result is less than accredited voters':totalLere>lere.accredited? 'Sum total of result is greater than accredited voters':' Sum total of resul equal sum total of accredited voters'}
          </Card>
        </GridItem>
       
        <GridItem xl={4} sm={4} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={raminkuraData}
                type="Bar"
                options={vipChart.options}
               
              />
            </CardHeader>
            <CardBody>
  <h4 className={classes.cardTitle}>RAMIN KURA </h4>
              <Table
                 tableData={[
                   ["Accredited Voters",raminkura.accredited],["APC", raminkura.apc],["PDP", raminkura.pdp],["Others",raminkura.others], ["APC + PDP + Others",totalRaminkura]                 
                  ]}
               />
            
            </CardBody>
            {totalRaminkura<raminkura.accredited?<Warning/>:totalRaminkura>raminkura.accredited?<Warning/>:''}
           {totalRaminkura<raminkura.accredited?'Sum total of result is less than accredited voters':totalRaminkura>raminkura.accredited? 'Sum total of result is greater than accredited voters':' Sum total of resul equal sum total of accredited voters'}
          </Card>
        </GridItem>
        <GridItem xl={4} sm={4} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={sabonbirniData}
                type="Bar"
                options={vipChart.options}
               
              />
            </CardHeader>
            <CardBody>
  <h4 className={classes.cardTitle}>SABON BIRNI </h4>
              <Table
                 tableData={[
                   ["Accredited Voters",sabonbirni.accredited],["APC", sabonbirni.apc],["PDP", sabonbirni.pdp],["Others",sabonbirni.others], ["APC + PDP + Others",totalSabonbirni]                 
                  ]}
               />
            
            </CardBody>
            {totalSabonbirni<sabonbirni.accredited?<Warning/>:totalSabonbirni>sabonbirni.accredited?<Warning/>:''}
           {totalSabonbirni<sabonbirni.accredited?'Sum total of result is less than accredited voters':totalSabonbirni>sabonbirni.accredited? 'Sum total of result is greater than accredited voters':' Sum total of resul equal sum total of accredited voters'}
          </Card>
        </GridItem>
        <GridItem xl={4} sm={4} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={saminakaData}
                type="Bar"
                options={vipChart.options}
               
              />
            </CardHeader>
            <CardBody>
  <h4 className={classes.cardTitle}> SAMINAKA</h4>
              <Table
                 tableData={[
                   ["Accredited Voters",saminaka.accredited],["APC", saminaka.apc],["PDP", saminaka.pdp],["Others",saminaka.others], ["APC + PDP + Others",totalSaminaka]                 
                  ]}
               />
            
            </CardBody>
            {totalSaminaka<saminaka.accredited?<Warning/>:totalSaminaka>saminaka.accredited?<Warning/>:''}
           {totalSaminaka<saminaka.accredited?'Sum total of result is less than accredited voters':totalSaminaka>saminaka.accredited? 'Sum total of result is greater than accredited voters':' Sum total of resul equal sum total of accredited voters'}
          </Card>
        </GridItem>
        <GridItem xl={4} sm={4} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={yarkasuwaData}
                type="Bar"
                options={vipChart.options}
               
              />
            </CardHeader>
            <CardBody>
  <h4 className={classes.cardTitle}>YAR KASUWA </h4>
              <Table
                 tableData={[
                   ["Accredited Voters",yarkasuwa.accredited],["APC", yarkasuwa.apc],["PDP", yarkasuwa.pdp],["Others",yarkasuwa.others], ["APC + PDP + Others",totalYarkasuwa]                 
                  ]}
               />
            
            </CardBody>
            {totalYarkasuwa<yarkasuwa.accredited?<Warning/>:totalYarkasuwa>yarkasuwa.accredited?<Warning/>:''}
           {totalYarkasuwa<yarkasuwa.accredited?'Sum total of result is less than accredited voters':totalYarkasuwa>yarkasuwa.accredited? 'Sum total of result is greater than accredited voters':' Sum total of resul equal sum total of accredited voters'}
          </Card>
        </GridItem>

        <GridItem xl={12} sm={12} md={12}>
          <h1>WARD  COLLATION CENTER RESULTS</h1>
        {isOpen && <Popup imgur={img}
      content={<>
        <b>Design your Popup</b>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
             sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
               Duis aute irure dolor in reprehenderit in voluptate 
               velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat 
               non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <button>Test button</button>
      </>}
      handleClose={togglePopup}
    />}
     
        <Table
                tableHeaderColor="warning"
                tableHead={["SN", "Ward","Accred.","APC","PDP","Others",""]}
                tableData={cunitData}
              />
</GridItem>
      </GridContainer>
    
    
      




    
    </div>
  );
}
