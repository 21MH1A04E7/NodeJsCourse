const fs = require('fs');
const zlib = require('zlib'); // Built-in transform stream

const gzip = zlib.createGzip(); // Create a Gzip transform stream
const readableStream = fs.createReadStream('stream/file.txt'); 

const writableStream = fs.createWriteStream('stream/output.txt'); // Write plain text
const compressedStream = fs.createWriteStream('stream/output1.txt.gz'); // Write compressed text

// Write the original file content to output.txt
readableStream.pipe(writableStream);

// Write the compressed content to output1.txt.gz
readableStream.pipe(gzip).pipe(compressedStream);
