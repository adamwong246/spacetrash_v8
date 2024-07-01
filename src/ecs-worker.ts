console.log("hello ecs-worker")

let ctx;
let ocanvas;


self.onmessage = function handleMessageFromMain(msg) {
  console.log("message from main received in worker:", msg);

  if (msg.data[0] === 'canvas') {

    ocanvas = msg.data[1];
    ctx = ocanvas.getContext("2d");
    console.log("canvas", ctx)
  
    ctx.font = "30px Arial";
    ctx.strokeText("Hello World", 10, 50);  
  }
  if (msg.data[0] === 'draw') {
    // const canvas = msg.data[1];
    console.log("draw", ctx)
    // ctx = canvas.getContext("2d");
  
    ctx.font = "20px Arial";
    ctx.strokeText("bye bye World", 10, 50);  
  }

};

