const fs=require('node:fs/promises')
console.log('first')
fs.readFile('fsmodule/file.txt','utf-8')
.then((data)=>console.log(data))
.catch((err)=>console.log(err))
console.log('second')

async function  readFile() {
    try{
        const data=await fs.readFile('fsmodule/file.txt','utf-8')
        console.log(data)
    }catch(err){
        console.log(err)
    }
} 
readFile()
//promise base fsmodule