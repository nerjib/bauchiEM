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
import { ReactVideo } from "reactjs-media";

//import './style.css';




import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);


const Incidents=()=>{
    const [reports, setReports] = useState([])
    const [phase, setPhase] = useState('6d')
    const [title, setTitle] = useState('Sanitation')
    const [reportfocs, setReportFocus]=useState('all')
  const [status, setStatus] = useState('')
  const [reportsPerPage, setReportsPerPage] = useState(10)
  const [currentPage, setCurrentPage]= useState(1)
  const [loading, setLoading]= useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [img, setImg] = useState('')
  let [time, setTime] = useState(new Date())
 
  const togglePopup = (e) => {
      setImg(e)
    setIsOpen(!isOpen);
  }

   // const [tableData, setReport] = useState([]),


    const classes = useStyles();

    useEffect(()=>{
        setLoading(true)
        axios.get(`https://kdpall.herokuapp.com/api/v1/incidents`)
        .then(res => {
            setReports(res.data)
            setLoading(false)
            setStatus('')
            setReportFocus('all')
                   }).catch( errors=>{console.log(errors.message)
                setLoading(false)})


    },[phase])


    useEffect(()=>{
      const intervalId = setInterval(()=>{

    //  setLoading(true)
      axios.get(`https://kdpall.herokuapp.com/api/v1/incidents`)
      .then(res => {
          setReports(res.data)
          setLoading(false)
          setStatus('')
          setReportFocus('all')
                 }).catch( errors=>{console.log(errors.message)
              setLoading(false)})
            },10*1000)
            return ()=>{ clearInterval(intervalId)}
          

  },[phase])

  useEffect(()=>{
    const intervalId = setInterval(()=>{
        setTime(new Date())
    },1000)
    return ()=>{ clearInterval(intervalId)}
  //setTime(new Date())
},[])

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
     const currentIncidents = Object.keys(reports).slice(indexOfFirstReport, indexOfLastReport);
 
     const pageNumbers = [];
     for (let i = 1; i <= Math.ceil(Object.keys(reports).length / reportsPerPage); i++) {
       pageNumbers.push(<button key={i}  id={i} onClick={handleClick}>{i}</button>);
     }
 
const alertt =()=> {
    
}


    let tableData1=[]
    let row=[]

    if(reports.length>0){
        let kk = indexOfFirstReport;

     /*   currentIncidents.map((e,i)=>{
                kk ++        
           row.push(
               <div>
               {reports[e].imgurl.split(".")[reports[e].imgurl.split(".").length-1]!=='mp4' &&    <img src={reports[e].imgurl}/>}
                
               {reports[e].imgurl.split(".")[reports[e].imgurl.split(".").length-1]=='mp4' &&  
                <div >
            <ReactVideo
                src={reports[e].imgurl}
                primaryColor="red"
                poster='/amco.png'
                // other props
            />
        </div>
        }
               <br/>
                  Polling unit: {reports[e].puname} <br/>
                  Incident: {reports[e].incident} <br/>
                  Reporter: {reports[e].sender} <br/>
                  {reports[e].time}
                  <hr/>
                  <br/>
               </div>
            )
           
        })*/

        currentIncidents.map((e,i)=>{
          kk= kk+1
          tableData1.push([kk,<a href={reports[e].id}>{reports[e].puid}</a>,reports[e].puname,reports[e].ward,<>{reports[e].incident+' '+reports[e].incidenttime} <a href={reports[e].id}>{reports[e].gps}</a></>,
           reports[e].time,reports[e].cardreader,reports[e].sender,
            <input
            type="button"
            value="View Image"
            onClick={()=>togglePopup(reports[e].imgurl)}
          />])
        })


    }

    

    
   const nextPage = () =>{
        //    alert('hello')
        setCurrentPage(currentPage + 1)

        }
  const      backPage =()=>{
      setCurrentPage(currentPage - 1)
        
        }
    
     
    return (
        <div>
            <GridContainer>
            <div style={{display:'flex', marginLeft:'30%',marginTop:50, width:'30%', justifySelf:'center', alignSelf:'center'}}>  
              {loading &&  <Loader type="Circles" color="Blue"/>}
         </div>
      {reports.length>0 &&           <GridItem xs={12} sm={10} md={12}>
     
     
     <h1> {time.getHours()}:{time.getMinutes()}:{time.getSeconds()} </h1>

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
 <Table
                tableHeaderColor="warning"
                tableHead={["SN","PUID", "PU Name","Ward","Incident","Time","Card reader","Sender","View image"]}
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
            </GridContainer>
        </div>
    )
}

export default Incidents