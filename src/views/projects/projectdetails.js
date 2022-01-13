import React, {useEffect, useState} from 'react'
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from 'components/Grid/GridItem';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Table from "components/Table/Table.js";
import axios from 'axios'
import Popup from '../reports/popUp';

import { makeStyles } from "@material-ui/core/styles";





import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);


const PUDetails=({match})=>{
    const [reports, setReports] = useState([])
    const [projects, setProject] = useState('')
    // const [tableData, setReport] = useState([]),
 const [weeklyreport, setWeeklyreport] = useState([])
    const  [projectId, setProjectId] = useState([])
    const [monReps, setMonReps] = useState([])
    const [sanMonReps, setSanmonReps] = useState([])
    const [Lid, setLid] = useState([])
    const [status, setStatus]= useState([])
    const [functionalityReport, setFunctionalityReport] = useState([])
    const [title, setTitle] = useState('')
    let [incidents, setIncident] = useState('')
    let [results, setResults] = useState('')

    const [dv, setDv] = useState('')
    const [wv, setWk]= useState('none')
    const [me, setMe]= useState('none')
    const [func, setFunc] = useState('none')
    const [isOpen, setIsOpen] = useState(false);
    const [img, setImg] = useState('')

     const classes = useStyles();


     const togglePopup = (e) => {
        // return alert(e)
        if(e){
        setImg(e)
      setIsOpen(!isOpen);
    }else{
        alert('Resultsheet yet not uploaded')
      }
    }

 
     useEffect(()=>{
        
        axios.get(`http://kdpall.herokuapp.com/api/v1/incidents/pu/${match.params.ward}/${match.params.id}`)
         .then(res=>{
             
                 setIncident(res.data)             
         }).catch(error=>{console.log(error.message)})

         axios.get(`http://kdpall.herokuapp.com/api/v1/results/pu/${match.params.ward}/${match.params.id}`)
         .then(res=>{
             
                 setResults(res.data)             
         }).catch(error=>{console.log(error.message)})
       
       
     },[])
 
      
     let day1 = 1000 * 3600 * 24;
     let today = new Date();
    
 
     let tableData1=[]
     let tableData2=[]
     let tableData3=[]
     let tableData4=[]


     if(incidents.length>0){
         Object.keys(incidents).map((e,i)=>{
             tableData1.push([i+1,<a href={incidents[e].id}>{incidents[e].puid}</a>,incidents[e].puname,incidents[e].ward,<>{incidents[e].incident+' '+incidents[e].incidenttime} <a href={incidents[e].id}>{incidents[e].gps}</a></>,
             incidents[e].cardreader,incidents[e].time,incidents[e].sender,
             <input
             type="button"
             value="View Image"
             onClick={()=>togglePopup(incidents[e].imgurl)}
           />],)
         })
     }
     
     if(results.length>0){
        let kk = 0;

        Object.keys(results).map((e,i)=>{
            kk ++        
           tableData2.push([ [kk],results[e].puid<10?'00'+results[e].puid:'0'+results[e].puid,
           results[e].puname,results[e].ward,results[e].accredited, results[e].apc,
           results[e].pdp,results[e].prp,results[e].ypp,results[e].invalid, results[e].apc+results[e].pdp+results[e].invalid+results[e].prp+results[e].ypp,
           results[e].time, 
            (results[e].sender),
                <input
      type="button"
      value="View result sheet"
      onClick={()=>togglePopup(results[e].imgurl)}
    />],)
           
        })

    }
     
        const handleDailyView=()=>{
            setDv('')
            setWk('none')

        }
        const handleFunctionality=()=>{
            setDv('none')
            setWk('')
           
        }

       
    return (
        <div>
            <GridContainer>
                 <GridItem xs={12} sm={10} md={12}>
                     <Card>
                        <CardHeader  color="warning" stats icon>
                                     <h2 className={classes.cardTitle}>PU  Details </h2>
                        </CardHeader>
                       
                    </Card>
                    <div>
                            
                        </div>
                    <div>
                        No. of incidents reports: {incidents.length} <br/>
                        
                    <button onClick={handleDailyView} className={classes.dropdownItem}> Incidents reports</button>
                    <button disabled={results.length<=0?true:false} onClick={handleFunctionality}  className={classes.dropdownItem}> Result sheets</button>
                    </div>
                    <CardBody style={{display:dv}}>
                    <Table
                tableHeaderColor="warning"
                tableHead={["SN", "PUID", "PU Name","Ward","Incident","Card Reader","Supervisor"]}
                tableData={tableData1}
              />
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
                   </CardBody>
                   <CardBody style={{display:wv}}>
                    <Table
                tableHeaderColor="warning"
                tableHead={["SN","PU Id","PU Name","Ward","Accr.", "APC","PDP","PRP","YPP","Invalid","Total", "Date",  "Supervisor",""]}
                tableData={tableData2}
              />
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

                   </CardBody>


                    <CardFooter stats>
              <div className={classes.stats}>            
               
              </div>
            </CardFooter>
                </GridItem>
            </GridContainer>
        </div>
    )

}

export default PUDetails