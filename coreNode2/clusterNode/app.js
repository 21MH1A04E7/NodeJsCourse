const cluster = require("cluster");
const express = require("express");
const os = require("os");

const totalCpus = os.cpus().length;

//primary server
if (cluster.isPrimary) {
  
  console.log(`Primary ${process.pid} is running`);
  //fork workers (creating intances of node.js)
  for (let i = 0; i < totalCpus; i++) {
    cluster.fork();
  }

} else {
  const app = express();
  app.use(express.json());

  app.get("/", (req, res) => {
    return res.json({ message: `hello ,how are you ${process.pid}` });
  });

  const port = 8888;

  app.listen(port, () => {
    console.log(`Server running on port no ${port} - with process id ${process.pid}`);
  });
//   console.log(`Worker ${process.pid} started`);
}
