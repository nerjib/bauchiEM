import React, {useEffect, useState} from 'react'
import GridContainer from "components/Grid/GridContainer.js";
import MenuItem from "@material-ui/core/MenuItem";

import GridItem from 'components/Grid/GridItem';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Table from "components/Table/Table.js";
import axios from 'axios'
import Loader from 'react-loader-spinner'
import Popup from './popUp';
import { makeStyles } from "@material-ui/core/styles";

//import './style.css';




import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);


const Reports=()=>{
    const [reports, setReports] = useState([])
    const [phase, setPhase] = useState('6d')
    const [title, setTitle] = useState('Sanitation')
    const [reportfocs, setReportFocus]=useState('all')
  const [status, setStatus] = useState('')
  const [reportsPerPage, setReportsPerPage] = useState(10)
  const [currentPage, setCurrentPage]= useState(1)
  const [currentCPage, setCurrentCPage]= useState(1)

  const [loading, setLoading]= useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [img, setImg] = useState('')
  const [puresult, setPuresult] = useState(true)
  const [curesult, setCuresult] = useState(false)
  const [cureports, setCuReports] = useState([])

 
  const togglePopup = (e) => {
      setImg(e)
    setIsOpen(!isOpen);
  }

  const displayResult = () => {
    setPuresult(!puresult)
    setCuresult(!curesult)
  }

   // const [tableData, setReport] = useState([]),


    const classes = useStyles();

    useEffect(()=>{
        setLoading(true)
        axios.get(`https://kdpall.herokuapp.com/api/v1/results`)
        .then(res => {
            setReports(res.data)
            setLoading(false)
            setStatus('')
            setReportFocus('all')
                   }).catch( errors=>{console.log(errors.message)
                setLoading(false)})

                setLoading(true)
                axios.get(`https://kdpall.herokuapp.com/api/v1/results/cresults`)
                .then(res => {
                    setCuReports(res.data)
                    setLoading(false)
                    setStatus('')
                    setReportFocus('all')
                           }).catch( errors=>{console.log(errors.message)
                        setLoading(false)})
        

    },[phase])

     
    let day1 = 1000 * 3600 * 24;
    let today = new Date();
   
    const checkWardNullity=(e)=>{
        // this.componentDidUpdate()
         if(e){
             return(e)
         }
         return ''
     }

const handleClick=(e)=>{
   setCurrentPage(Number(e.target.id))

}


  
     // Logic for displaying todos
     const indexOfLastReport = currentPage * reportsPerPage;
     const indexOfFirstReport = indexOfLastReport - reportsPerPage
     const currentProjects = Object.keys(reports).slice(indexOfFirstReport, indexOfLastReport);
 
     const pageNumbers = [];
     for (let i = 1; i <= Math.ceil(Object.keys(reports).length / reportsPerPage); i++) {
       pageNumbers.push(<button key={i}  id={i} onClick={handleClick}>{i}</button>);
     }



     const indexOfLastCReport = currentCPage * reportsPerPage;
     const indexOfFirstCReport = indexOfLastCReport - reportsPerPage
     const currentCProjects = Object.keys(cureports).slice(indexOfFirstCReport, indexOfLastCReport);
 
     const cPageNumbers = [];
     for (let i = 1; i <= Math.ceil(Object.keys(cureports).length / reportsPerPage); i++) {
       cPageNumbers.push(<button key={i}  id={i} onClick={handleClick}>{i}</button>);
     }

 
const alertt =()=> {
    
}


    let tableData1=[]
    let tableData2=[]

    if(reports.length>0){
        let kk = indexOfFirstReport;

        currentProjects.map((e,i)=>{
                kk ++        
           tableData1.push([ [kk],reports[e].puid<10?'00'+reports[e].puid:'0'+reports[e].puid,
           reports[e].puname,reports[e].ward, reports[e].apc,
           reports[e].pdp, reports[e].ypp+reports[e].prp+reports[e].invalid,
           reports[e].time, 
            (reports[e].sender),
                <input
      type="button"
      value="View result sheet"
      onClick={()=>togglePopup(reports[e].imgurl)}
    />],)
           
        })

    }

    if(cureports.length>0){
      let kk = indexOfFirstReport;

      currentCProjects.map((e,i)=>{
              kk ++        
         tableData2.push([ [kk],
         cureports[e].puname,cureports[e].ward, cureports[e].apc,
         cureports[e].pdp, cureports[e].others,
         cureports[e].time, 
          (cureports[e].sender),
              <input
    type="button"
    value="View result sheet"
    onClick={()=>togglePopup(cureports[e].imgurl)}
  />],)
         
      })

  }

    

    
   const nextPage = () =>{
        //    alert('hello')
        setCurrentPage(currentPage + 1)

        }
  const      backPage =()=>{
      setCurrentPage(currentPage - 1)
        
        }
    
        const nextCPage = () =>{
          //    alert('hello')
          setCurrentCPage(currentCPage + 1)
  
          }
    const      backCPage =()=>{
        setCurrentCPage(currentCPage - 1)
          
          }
     
    return (
        <div>
            <GridContainer>
            <div style={{display:'flex', marginLeft:'30%',marginTop:50, width:'30%', justifySelf:'center', alignSelf:'center'}}>  
              {loading &&  <Loader type="Circles" color="Blue"/>}
         </div>
         <div>
         <button disabled={puresult} onClick={displayResult}>PU Results</button>
                     <button disabled={curesult} onClick={displayResult}>Ward Results</button>
                    
      </div> 
      
      {reports.length>0 &&  
      
      puresult &&         <GridItem xs={12} sm={10} md={12}>
                    <CardBody>
                        {//pageNumbers
                        }
                                  

                        <button onClick={backPage}>Back</button>
            <button onClick={nextPage}>Next</button>
         
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
<h2>POLLING UNIT RESULTS</h2>
                    <Table
                tableHeaderColor="warning"
                tableHead={["SN", "PUID", "PU Name","Ward","APC","PDP","Others","Time","Sender","Result Sheet"]}
                tableData={tableData1}
              />
                   </CardBody>
                   <button onClick={backPage}>Back</button>
            <button onClick={nextPage}>Next</button>
                    <CardFooter stats>

              <div className={classes.stats}>            
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Draft Table {reports.length}
                </a>
              </div>
            </CardFooter>
                </GridItem>}
                
         {curesult &&       <GridItem xs={12} sm={10} md={12}>
                <CardBody>
                        {//pageNumbers
                        }
                                  

                                  <button onClick={backCPage}>Back</button>
            <button onClick={nextCPage}>Next</button>
          
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
<h2>WARD COLLATION CENTER RESULTS</h2>

                    <Table
                tableHeaderColor="warning"
                tableHead={["SN", "PU Name","Ward","APC","PDP","Others","Time","Sender","Result Sheet"]}
                tableData={tableData2}
              />
                   </CardBody>
                   <button onClick={backCPage}>Back</button>
            <button onClick={nextCPage}>Next</button>
                    



                </GridItem>           }    
                
                
            </GridContainer>
        </div>
    )
}

export default Reports