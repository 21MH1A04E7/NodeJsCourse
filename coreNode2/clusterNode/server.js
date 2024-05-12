const express=require('express')

const app=express()

app.use(express.json())

app.get('/',(req,res)=>{
    return res.json({message:`hello ,how are you ${process.pid}`})
})

const port=8888
app.listen(port,()=>{
    console.log("Server is running on port no ",port)
})

/*
    Cluster
    In Node.js, clustering refers to the technique of spawning multiple 
    processes (or workers) to handle incoming requests. This is particularly 
    useful for taking advantage of multi-core systems, as each worker can 
    utilize a separate CPU core, thus improving the overall performance and 
    scalability of the application.

 */