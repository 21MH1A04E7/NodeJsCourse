const buffer=new Buffer.from('hariom','utf-8')
buffer.write('codevolution')
console.log(buffer.toJSON())
console.log(buffer)
console.log(buffer.toString())
//output
// { type: 'Buffer', data: [ 99, 111, 100, 101, 118, 111 ] }
// <Buffer 63 6f 64 65 76 6f>
// codevo