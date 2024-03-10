const express=require('express')
const fs=require('fs')
const app=express()

//medileWare
app.use((req, res, next) =>{
    const log=`Date ${Date.now()} : Url ${req.url} : Request Method ${req.method}\n`
    fs.appendFile('ExpressServer\\log1.txt',log,(err,data)=>{
        next()
    })
})
app.get('/',(req,res)=>{
    res.status(201).send('Hello World')
})

app.get('/about',(req,res)=>{
    res.status(200).send('About Page ' +req.query.name + ' your are '+req.query.age)
})

app.listen(8080,()=>{
    console.log('server is running on port 8080')
})

/*
 4.18.3

 1st part -> 4
 2nd part -> 18
 3rd part -> 3

 //3rd part (Last part) - Minor update (optional)


 //2nd part (Second part) - Major update (required)
 //recommanded part

 //1st part (First part) - Major update (required)//breaking update
 //major Release
 
 //to install specific version @version

 chracter symbol
 ^4.18.2 (4.18.2<=5.0.0)

 ~4.18.2 (it will change only last bit)

 */