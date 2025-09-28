const express = require("express");
const cluster = require("cluster");
const os = require("os");
const cpuLen = os.cpus().length;
const userRouter=require('./router/user');
const productRouter=require('./router/product');
const bodyParser=require('body-parser')
const cookieParser = require('cookie-parser');
const session=require('express-session')

if (cluster.isMaster) {
  console.log(`Master process id is ${process.pid}`);
  for (let i = 0; i < cpuLen; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const app = express();
  app.use(bodyParser.json());
//   app.use(cookieParser());
  app.use(cookieParser('hariom'));
  app.use(session({
    secret:'hariom',
    saveUninitialized:false,
    resave:false,
    cookie:{
      maxAge:1000*60*60*24  
    }
  }));

  app.use('/api',userRouter)
  app.use('/api',productRouter)

  app.listen(3020, () => {
    console.log("server is running on port 3020");
  });
}
