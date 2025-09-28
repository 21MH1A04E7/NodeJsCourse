const EventEmitter=require('events')
//event module return a EventEmitter class
const emitter=new EventEmitter();

//on method is used to add listener

emitter.on('order-pizza',(size,topping)=>{
    console.log(`order received! baking a ${size} pizza with  ${topping}`)
})

emitter.on('order-pizza',(size)=>{
    if(size=='big'){
        console.log('place the order')
    } else
    console.log(`order received delivering pizza to customer`)
})

//emit method is used to trigger the event
emitter.emit('order-pizza','large',"mushroom")
//order-pizza event listener name
//passing data to the (larget,mushroom)


