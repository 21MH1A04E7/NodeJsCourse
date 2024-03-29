const express=require('express');
const bodyParser=require('body-parser');
const {connectMongodb}=require('./db')
const urlRoute=require('./routes/url')
const Url=require('./models/url')
require('dotenv').config()
const path=require('path')//path module
const staticRouter=require('./routes/staticRouter')

const app=express();

connectMongodb(process.env.MOGOLOCAURL)
.then(()=>{
    console.log('connect to MongoDB')
})
.catch((err)=>{
    console.log(err)
})

app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

app.use(bodyParser.json())
app.use(express.urlencoded({ extended:true }))
app.use('/url',urlRoute)
app.use('/',staticRouter)

//ssr
//  app.get('/',async(req,res)=>{
//     try{
//         const allUrls=await Url.find();
//         // return res.send(`<html>
//         //     <head></head>
//         //     <body>
//         //         <ol>
//         //             ${allUrls.map(url=>`<li>${url.shortId} - ${url.redirectUrl} total clicked ${url.visitHistory.length}</li>`).join("")}
//         //         </ol>
//         //     </body>
//         // </html>`)
//         return res.render('index',{urls:allUrls});//passing variable
//     }catch(err){
//         console.log('Internal sever error', err);
//         return res.status(500).json({message: err});
//     }
// })

app.listen(8001,()=>{
    console.log('server is listening on port 8001 for ServerSideRender')
})