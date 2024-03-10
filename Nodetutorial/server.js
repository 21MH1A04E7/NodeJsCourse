/*
(function(){
    console.log("hii hariom");
})();
*/
/*
// function declaration
//CALL BACK FUNCTIONS
function callback(){
    console.log("adding is successful");
}

const add=(a,b,callback)=>{
    var res=a+b;
    console.log("result",res);//main function 
    callback();//callback function
}
add(4,5,callback)
*/

const add=(a,b,callback)=>{
    var res=a+b;
    console.log("result",res); 
    callback();
}
add(4,5,()=>{//callback function
    console.log("adding is successful");
})
//call back funtion call after the execution of main function