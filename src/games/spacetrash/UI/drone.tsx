import React from "react";
import { useState } from "react";
import { Terminal } from "../../../Terminal";
import { UICanvas } from "../../../engine/UI/UICanvas";
import ReactDOM from "react-dom";

export const DroneApp = (props: {
  worker: Worker
}) => {


  
  const [state, setState] = useState<{
    hidden: boolean
  }>({
    hidden: true,
  });


  props.worker.onmessage = (e) => {
    // debugger
    if (e.data[0] === 'drone-on' ) {

      console.log("Message received from worker", e);

      ReactDOM.flushSync(() => {
        setState({
          hidden: false
        })  
      });

      
    }
    
    // result.textContent = e.data;
    // 
  };

  return (<div
    style={{
      height: "100%",
      width: "100%",
      position: "relative",
    }}
  >

  <UICanvas worker={props.worker} app={"drone"} />


  </div>);
}