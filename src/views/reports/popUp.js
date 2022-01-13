import React from "react";
import ReactPlayer from 'react-player'
import { ReactVideo } from "reactjs-media";

import './style.css';
const Popup = props => {

  let kk = props.imgur.split('.').pop()
  var url = props.imgur;
var parts = url.split(".");

//alert(parts[parts.length-1]);
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        {//props.content
        }      <img src={props.imgur}  style={{marginLeft:50, width:'50%', height:'100%'}}/>
{parts}

{//<ReactPlayer url={props.imgur} width={100} height={100}/>
}
{//<ReactPlayer url={'https://res.cloudinary.com/dzuqeikf0/video/upload/v1626814053/resultsheets/LERE1_1626814053435.mp4'} />  
 } 
 
 {parts[parts.length-1]=='mp4' &&
 <div>
            <ReactVideo
                src={props.imgur}
                primaryColor="red"
                // other props
            />
        </div>}
 </div>
 <button onClick={props.handleClose}>close</button>
    </div>
  );
};
 
export default Popup;