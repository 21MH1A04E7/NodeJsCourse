const crypto=require('crypto')
//we can increase the size of thread pool
//by default thread pool have 4 thread
process.env.UV_THREADPOOL_SIZE=6
const start=Date.now()
const MAX_CALLS=6
for(let i=0;i<MAX_CALLS;i++){//parallel execution
    crypto.pbkdf2("password","salt",10000,512,"sha512",()=>{
        console.log(`Hash ${i+1}`,Date.now()-start)
    })
}

