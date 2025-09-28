const path=require('node:path')

console.log(__filename)
console.log(__dirname)

console.log('-----------')
// last name of the path
console.log(path.basename(__filename))
console.log(path.basename(__dirname))

// file extension

console.log(path.extname(__filename))//.js
console.log(path.extname(__dirname))//

console.log(path.parse(__filename))//parse in form of object

console.log(path.join(__dirname,'..','module','add.js'))//join path
console.log(path.join("/folder","//folder","../index.html"))//it also normalized the path name

//resolve
console.log(path.resolve("folder","folder2","index.js"))
console.log(path.resolve("/folder1","/folder2","sum.html"))

console.log(path.isAbsolute('node/add.js'))//false
console.log(path.isAbsolute('/root/project/module/add.js'))//check if path is absolute

console.log(path.normalize('/foo/bar//baz/asdf/quux/..'))//normalize path

console.log(path.format(path.parse(__filename)))// path of string from the object