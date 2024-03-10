import fs from 'fs'

//filepath ,message
// fs.writeFileSync('./file.text','hariom kumar')

fs.appendFileSync('./file.text','hari')
let result=fs.readFileSync('./file.text','utf-8')
console.log(result)


//asynchronous function always expect call back function
fs.writeFile('./file1.txt','hariom kumar',(err)=>{
    console.log(err)
})

fs.readFile('./file1.txt','utf-8',(err,data)=>{
    console.log(data)
})





