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
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import Popup from '../reports/popUp';


import { makeStyles } from "@material-ui/core/styles";





import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);


const Projects=({match})=>{
    const [projects, setProjects] = useState([])
    const [phase, setPhase] = useState('6d')
    const [title, setTitle] = useState('Community Borehole')
    const [phaseData, setPhasesData]=useState([])
    const [userType, setUserType]= useState( localStorage.getItem('acttype'))
    const [loading, setLoading]= useState(false)
    const [sort, setSort] = useState('ongoing')
    const [punits, setPunits] = useState('')
    const [totAPC, setTotAPC ] = useState(0)
    const [totPDP, setTotPDP ] = useState(0)
    const [totOthers, setTotOthers ] = useState(0)
    const [isOpen, setIsOpen] = useState(false);
    const [img, setImg] = useState('')
    let [time, setTime] = useState('')

   // const [tableData, setReport] = useState([]),


    const classes = useStyles();

    const togglePopup = (e) => {
        if(e){
        setImg(e)
      setIsOpen(!isOpen);
    }else{
        alert('Resultsheet yet not uploaded')
      }
    }

    useEffect(()=>{
        const intervalId = setInterval(()=>{

        setLoading(true)
        axios.get(`https://kdpall.herokuapp.com/api/v1/punits`)
        .then(res=>{
            setPunits(res.data)
            setLoading(false)

          
        }).catch(e=>{console.log(e) 
            setLoading(false)
        })

    },60000)
    return ()=>{ clearInterval(intervalId)}
 

},[])

useEffect(()=>{

    setLoading(true)
    axios.get(`https://kdpall.herokuapp.com/api/v1/punits`)
    .then(res=>{
        setPunits(res.data)
        setLoading(false)

      
    }).catch(e=>{console.log(e) 
        setLoading(false)
    })


},[])


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

    let tableData1=[]
    let tableData2=[]
    let hpbhData=[["SN", "Lot", "Community","Ward","LGA","State Supervisor","LGA Supervisor","Contractor","%","Date"]]
    let smbhData=[["SN", "Lot", "Community","Ward","LGA","State Supervisor","LGA Supervisor","Contractor","%","Date"]]
    let vipData=[["SN", "Lot", "Community","Ward","LGA","State Supervisor","LGA Supervisor","Contractor","%","Date"]]
    let sortrow=[];
    let sortedProjects=''

    let punitData = []

   

    
    if(punits.length>0){
        let kk = 0;

        Object.keys(punits).map((e,i)=>
            {
                kk++
                let tot= Number(punits[e].apc)+Number(punits[e].pdp)+Number(punits[e].others)
            punitData.push([ kk,<a target='_blank' href={`#/pu/${punits[e].ward}/${punits[e].puid}`}>{punits[e].puid<10?'00'+punits[e].puid:'0'+punits[e].puid}</a>,punits[e].puname,punits[e].ward,punits[e].status?punits[e].status:'No report',punits[e].cardreader?punits[e].cardreader:'No report',punits[e].accredited,punits[e].apc,punits[e].pdp,punits[e].prp+punits[e].ypp+punits[e].invalid,
            tot<Number(punits[e].accredited)?<div style={{background:'blue'}}>{tot}</div>:tot>Number(punits[e].accredited)?<div style={{background:'red'}}>{tot}</div>:<div style={{background:'green'}}>{tot}</div>,

            <input disabled={punits[e].resulturl?false:true}
      type="button" enabled={false}
      value='Result sheet'
      onClick={()=>togglePopup(punits[e].resulturl)}
    />
            ])
            
        })
    }

   

    const handleChangePhase=(e)=>{
        setPhase(e.target.value)
    }
    const handleChangeTitle=(e)=>{
        setTitle(e)
    }

    
    
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (fileName) => {
        const hpbh = XLSX.utils.json_to_sheet(hpbhData);
        const smbh = XLSX.utils.json_to_sheet(smbhData);
        const vip = XLSX.utils.json_to_sheet(vipData);

        const wb = { Sheets: { 'hpbh': hpbh,'smbh':smbh, 'vip':vip }, SheetNames: ['hpbh','smbh','vip'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

     
    return (
        <div>
            <GridContainer>
         <div style={{display:'flex', marginLeft:'30%',marginTop:50, width:'30%', justifySelf:'center', alignSelf:'center'}}>  
              {loading &&  <Loader type="Circles" color="Blue"/>}
         </div>
       {punits.length>0 &&     <GridItem xs={12} sm={10} md={12}>
                     <Card>
                        <CardHeader color="warning" stats icon>
    <h2 className={classes.cardTitle}>{`Time: ${time} APC = ${totAPC} \n PDP = ${totPDP} Others = ${totOthers}`}</h2>
                        </CardHeader>
                    </Card>
          
                    <CardBody>

                    <Table
                tableHeaderColor="warning"
                tableHead={["SN", "PUID", "PU Name","Ward","Status","Card Reader","Accred.","APC","PDP","Others","Total"]}
                tableData={punitData}
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
              Total PU {projects.length}
   
              <button variant="warning" onClick={(e) => exportToCSV(`Phase ${phase} progress report `+(new Date()))}>Export to excel</button>

              </div>
            </CardFooter>
                </GridItem>}
            </GridContainer>
        </div>
    )
}

export default Projects