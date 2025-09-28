const fs=require('fs')

const readableStream=fs.createReadStream('stream/file.txt',{
    encoding:'utf-8',
    // highWaterMark:16,//buffer size is 16 byte
    // autoDestroy:true
})

const writeableStream=fs.createWriteStream('stream/file2.txt')

readableStream.on('data',(chunk)=>{
    console.log(chunk)
    writeableStream.write(chunk)
})

//buffer size is 64 killobyte