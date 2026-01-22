const OrderProcessingStrategy = require('./orderStrategy');

class ExpressProcessing extends OrderProcessingStrategy {
    process(order) {
        console.log(`Processing order #${order.id} with express delivery!`);
    }
}

module.exports = ExpressProcessing;
