const EventEmitter = require('events');

class Pizzashop extends EventEmitter {
    constructor() {
        super();
        this.orderNumber = 0;
    }

    order(size, topping) {
        this.orderNumber += 1;
        this.emit('order', size, topping);
    }

    displayOrderNumber() {
        console.log(`Current order number is ${this.orderNumber}`);
    }
}

module.exports=Pizzashop