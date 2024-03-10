const fs=require('fs')
const os=require('os')
const user=os.userInfo()
fs.appendFileSync('data.txt',`user name is ${user.username} `,()=>{
    console.log("file is created successfully")
})
const data=fs.readFileSync('data.txt', 'utf8');
console.log(data);
