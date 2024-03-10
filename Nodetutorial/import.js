const note=require('./note.js')//console will automatically execute
const _=require('lodash')//npm i lodash

const arr=["hariom","hariom","sujit",1,3,2,1,2]

console.log(_.uniq(arr)) // it will return ["hariom","sujit",1,3,2]
console.log(_.isString('hariom'))//it will return true

console.log("note file is available")
console.log(note.age)
console.log(note.sum(5,5))



//lodash