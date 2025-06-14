import React from "react";

export const DronesApp = (props: {
  worker: Worker
}) => {

  props.worker.onmessage = (e) => {
    debugger
  };

  return (<div>
    <pre>Drones goes here</pre>
    <table>
      <tr>
        <td>Data 4</td>
        <td>Data 5</td>
        <td>Data 6</td>
      </tr>
      <tr>
        <td>Data 1</td>
        <td>Data 2</td>
        <td>Data 3</td>
      </tr>
      <tr>
        <td>Data 4</td>
        <td>Data 5</td>
        <td>Data 6</td>
      </tr>
    </table>

  </div>);
}