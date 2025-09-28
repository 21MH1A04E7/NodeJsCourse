const fs=require('fs')

console.log('first')
const data=fs.readFileSync('fsmodule/file.txt','utf-8')
console.log(data)
console.log('second')
//filepath,encoding,callback
fs.readFile('fsmodule/file.txt','utf-8',(err,data)=>{
    if(err){
        console.log(err)
    }else{
        console.log(data)
    }
})
fs.writeFile('fsmodule/file2.txt',' \nhariom',{flag:'a'},(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('filewritten')
    }
})
console.log('last')