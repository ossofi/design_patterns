const OrderFactory = require('./orders/orderFactory');
const OrderComposite = require('./components/orderComposite');

const StandardProcessing = require('./strategies/standard');
const ExpressProcessing = require('./strategies/express');
const PickupProcessing = require('./strategies/pickup');

const products = require('./data/products');

// order creation (Factory Method)

const onlineOrder = OrderFactory.createOrder('online', 1, '123 Main St');
const inStoreOrder = OrderFactory.createOrder('in-store', 2, 'Store #5');
const subscriptionOrder = OrderFactory.createOrder('subscription', 3, '12 months');

// online order (Composite)

const onlineItems = new OrderComposite();
onlineItems.add(products.laptop);
onlineItems.add(products.mouse);

console.log(`\n${onlineOrder.describe()}`);
console.log(onlineItems.describe());
console.log(`Total: $${onlineItems.getPrice()}`);

// in-store order (Composite)

const storeItems = new OrderComposite();
storeItems.add(products.keyboard);

console.log(`\n${inStoreOrder.describe()}`);
console.log(storeItems.describe());
console.log(`Total: $${storeItems.getPrice()}`);

// subscription order (Composite)

const subscriptionItems = new OrderComposite();
subscriptionItems.add(products.laptop);
subscriptionItems.add(products.keyboard);
subscriptionItems.add(products.mouse);

console.log(`\n${subscriptionOrder.describe()}`);
console.log(subscriptionItems.describe());
console.log(`Total: $${subscriptionItems.getPrice()}`);

// strategies (Strategy)

console.log(`\n`);
const standard = new StandardProcessing();
const express = new ExpressProcessing();
const pickup = new PickupProcessing();

standard.process(onlineOrder);
express.process(inStoreOrder);
pickup.process(subscriptionOrder);
