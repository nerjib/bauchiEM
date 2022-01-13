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

import Ward from './ward';
import { bugs, website, server } from "../../variables/general.js";

import {
  dailySalesChart, vipChart
 } from "../../variables/charts.js";

import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function KDDashboard() {
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
  let [lgaList, setLgaList] = useState('')
  let [selectedLga, setSelectedLGA]= useState('ALKALERI')
  let [LgaResult, setLgaResult]=useState({apc:0,pdp:0,others:0})
  let [LgaWard, setLgaWard]=useState('')
  let [LgaWardAgg, setLgaWardAgg]=useState('')
  let [type, setType]=useState('GOVERNOR')
    let [allLgPuNo, setAllLgPuNo] = useState(0);
    let [AllLgVotedPuNo, setAllLgVotedPuNo] = useState(0)



    
  const [timer, setTimer] = useState(0)
  let events = ['fire','flood']
  let day1 = 1000 * 3600 * 24;
  let today = new Date();
  
  let date1= new Date("10/30/2020, 9:59:12")
  let date2= new Date().toLocaleString()
  
  const handleTimer = () => {
  //this.inInterval2= setInterval( ()=>this.tick2(), 1000);
      setInterval(
        () => setTimer(new Date().toLocaleString()),
        1000
      )};
      useEffect(()=>handleTimer(),[])

      useEffect(()=>handleTimer(),[])

useEffect(()=>{
    axios.get(`https://bauchiem.herokuapp.com/api/v1/baupunits/getlga`)
    .then(res=>{
       // alert(res.data[0].sum)
        setLgaList(res.data)
    }).catch(e=>{console.log(e)})

    axios.get(`https://bauchiem.herokuapp.com/api/v1/baupunits/lga/${selectedLga}/${type}`)
    .then(res=>{
       // alert(res.data[0].sum)
        setLgaResult(res.data[0])
    }).catch(e=>{console.log(e)})

    axios.get(`https://bauchiem.herokuapp.com/api/v1/baupunits/getward/${selectedLga}`)
    .then(res=>{
       // alert(res.data[0].sum)
        setLgaWard(res.data)
    }).catch(e=>{console.log(e)})

    axios.get(`https://bauchiem.herokuapp.com/api/v1/baupunits/lgabyward/${selectedLga}/${type}`)
    .then(res=>{
       // alert(res.data[0].sum)
        setLgaWardAgg(res.data)
    }).catch(e=>{console.log(e)})
    axios.get(`https://bauchiem.herokuapp.com/api/v1/baupunits/allpu/${selectedLga}`)
    .then(res=>{
       // alert(res.data[0].sum)
        setAllLgPuNo(res.data[0])
    }).catch(e=>{console.log(e)})
    axios.get(`https://bauchiem.herokuapp.com/api/v1/baupunits/votedpu/${selectedLga}/${type}`)
    .then(res=>{
       // alert(res.data[0].sum)
        setAllLgVotedPuNo(res.data[0])
    }).catch(e=>{console.log(e)})


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
      [selectedLga, type])

   

      
 
      const  allData = {
        labels: ["APC", "PDP", "Others"],
        series: [[LgaResult.apc, LgaResult.pdp, LgaResult.others]]
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

     
let total = Number(LgaResult.apc)+Number(LgaResult.pdp)+Number(LgaResult.others)
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




let wardd=[]

Object.keys(LgaWardAgg).map((e,i)=> {
    wardd.push(<Ward ward={LgaWardAgg[e].ward} apc={LgaWardAgg[e].apc} pdp={LgaWardAgg[e].pdp} others={LgaWardAgg[e].others} allData={allData} selectedLga={selectedLga} LgaWardAgg={LgaWardAgg} onChangeLga={onSelectLga}/>)
}
)

const onSelectLga =(e)=>{
    const { value } = e.target;

   // alert(value)
    setSelectedLGA(value)
}

const onElectionType =(e)=>{
    const { value } = e.target;

   // alert(value)
    setType(value)
}
function WardComp (){ 

return(
         Object.keys(LgaWard).map((e,i)=>

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
<h4 className={classes.cardTitle}>         {LgaWard[e].ward}
</h4>
        <Table
           tableData={[
             ["APC",LgaResult.apc],["PDP", LgaResult.pdp],["Others",LgaResult.others], ["APC + PDP + Others",total]                 
            ]}
         />
      
      </CardBody>
      {total<accredited?<Warning/>:total>accredited?<Warning/>:''}
     {total<accredited?'Sum total of result is less than accredited voters':total>accredited? 'Sum total of result is greater than accredited voters':' Sum total of resul equal sum total of accredited voters'}
    </Card>
  </GridItem>

    
   )
      

)
}


let Electiontype = ["PRESIDENTIAL","SENATORIAL","HOUSE OF REPRESENTATIVE","GOVERNOR","STATE ASSEMBLY", "CHAIRMANSHIP", "COUNCILLORSHIP"]



  return (
    <div>
      <GridContainer>
       <select className='form-control' id='phase' name='phase' value={selectedLga} onChange={onSelectLga}>
                    {Object.keys(lgaList).map(e=>
                        <option value={lgaList[e].lga}>{
                            lgaList[e].lga                       
                        }</option>
                    )}
                    </select>

        <select className='form-control' id='eltype' name='eltype' value={type} onChange={onElectionType}>
                   {(Electiontype).map(e=>
                        <option value={e}>{
                            e                       
                        }</option>
                    )}
                    </select>



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
                   ["APC",LgaResult.apc],["PDP", LgaResult.pdp],["Others",LgaResult.others], ["APC + PDP + Others",total]                 
                  ]}
               />
            
            </CardBody>
            Result Received: {AllLgVotedPuNo.count}/{allLgPuNo.count} 
            {/*total<accredited?<Warning/>:total>accredited?<Warning/>:''}
           {total<accredited?'Sum total of result is less than accredited voters':total>accredited? 'Sum total of result is greater than accredited voters':' Sum total of resul equal sum total of accredited voters'}
                */}
           </Card>
        </GridItem>

{// wards
}

{wardd}
       
      </GridContainer>
    
    
      




    
    </div>
  );
}
