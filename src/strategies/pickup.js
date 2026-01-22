const OrderProcessingStrategy = require('./orderStrategy');

class PickupProcessing extends OrderProcessingStrategy {
    process(order) {
        console.log(`Order #${order.id} is ready for pickup at the store.`);
    }
}

module.exports = PickupProcessing;
