const express = require("express");
const fs = require("fs");
const zlib = require("zlib");
const status = require("express-status-monitor");

const app = express();
app.use(status());

//general method
// app.get('/',(req,res)=>{
//     fs.readFile('nodeStream/sample.text',(err,data)=>{
//         res.end(data)
//     })
//     // const data=fs.readFileSync('nodeStream/sample.text')
//     // res.end(data)
// });

//by using Stream zlib file
fs.createReadStream("nodeStream/sample.txt")
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream("nodeStream/sample.zip"));
//by using Stream

app.get("/", (req, res) => {
  const stream = fs.createReadStream("nodeStream/sample.txt", "utf-8");
  stream.on("data", (chunk) => res.write(chunk));
  stream.on("end", () => res.end());
});

const port = 8888;
app.listen(port, () => {
  console.log(`server is running on prot no ${port}`);
});

/*
  //here i installed a package i.e express status monitor for track the cpu status(consumption)

  //readFile 
  //As long as the data is being read we are storing it in the variable.
  //means data is getting store in  ram() supose data is 50mb and there are 100 use
  on this server so the memory consumption on this server will be 100*50 

  //for the memory efficiency we need to use Strema
*/
