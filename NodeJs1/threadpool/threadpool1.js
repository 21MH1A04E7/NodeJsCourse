const crypto=require('crypto')

const start=Date.now()
const MAX_CALLS=3
for(let i=0;i<MAX_CALLS;i++){//parallel execution
    crypto.pbkdf2("password","salt",10000,512,"sha512",()=>{
        console.log(`Hash ${i+1}`,Date.now()-start)
    })
}

// crypto.pbkdf2Sync("password","salt",10000,512,"sha512")//69
// crypto.pbkdf2Sync("password","salt",10000,512,"sha512")//150
// crypto.pbkdf2Sync("password","salt",10000,512,"sha512")//210
// console.log('Hash: ',Date.now()-start)