const Pizzashop=require('../components/pizza-shop.js')
const DrinkMachine=require('../components/drink-machine.js')

const pizzashop=new Pizzashop()
const drinkmachine=new DrinkMachine()
pizzashop.order()

pizzashop.on('order',(size,topping)=>{
    console.log(`Order number for ${size} pizza with ${topping} is ${pizzashop.orderNumber}`)
    drinkmachine.serveDrink(size)
})

pizzashop.order("order","medium",'pepperoni')
pizzashop.displayOrderNumber()
