const OrderProcessingStrategy = require('./orderStrategy');

class StandardProcessing extends OrderProcessingStrategy {
    process(order) {
        console.log(`Processing order #${order.id} in standard way.`);
    }
}

module.exports = StandardProcessing;
