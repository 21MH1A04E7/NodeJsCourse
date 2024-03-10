const fs=require('fs');

console.log("1")
//Blocking operations
const result=fs.readFileSync('syncAndasync\\textFile.txt','utf-8')

console.log(result)
console.log("2")






/*
Architecture of Node.js
Note 

client ->request ->eventQueue->eventLoop(fifo principle)

EventLoop ->two type operation (blocking operations(sync) and non blocking operation(async operations))

//non blocking operations(async) ->process ->send response

//blocking (sync operations)->task ->send to thread pool (as a worker) ->for blocking operatio( limited ) ->process ->send response to user


*/