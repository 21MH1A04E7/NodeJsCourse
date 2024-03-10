const fs=require('fs');
const os=require('os')
console.log(os.cpus().length)//8 cpu
console.log("1")
//Non Blocking operations
fs.readFile('syncAndasync\\textFile.txt','utf-8',(err,res)=>{
    console.log(res)
})

console.log("2")
console.log("3")


/*

Default Thread Pool Size = 4

//Max ? 8core cpu -8
*/