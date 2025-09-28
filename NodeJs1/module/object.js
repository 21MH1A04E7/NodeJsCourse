// const obj1={
//     name:"hariom"
// }
// const obj2=obj1
// obj2.name="suraj"
// console.log(obj1)//name='suraj'

const obj1={
    name:"hariom"
}
let obj2=obj1
obj2={//object literal reference is broken (export)
    name:'suraj'
}
console.log(obj1)//name='hariom' 