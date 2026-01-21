import OrderFacade from "./facade/OrderFacade.js";
import DelayedOrderState from "./state/DelayedOrderState.js";

console.log("------ Заказы ------\n");

// --- Заказ 1: обычный поток ---
const order1 = new OrderFacade();
console.log("--- Заказ 1: обычный поток ---");
order1.createOrder();      // Новый
order1.processOrder();     // В обработке → Shipped или Delayed
order1.processOrder();     // Если был Delayed → теперь Shipped
console.log("\n");

// --- Заказ 2: отменён сразу после создания ---
const order2 = new OrderFacade();
console.log("--- Заказ 2: отмена ---");
order2.createOrder();      // Новый
order2.cancelOrder();      // Новый → Отменён
order2.processOrder();     // Попытка обработки отменённого заказа
console.log("\n");

// --- Заказ 3: демонстрация задержки ---
const order3 = new OrderFacade();
console.log("--- Заказ 3: задержка ---");
order3.createOrder();      // Новый

// Переводим заказ в состояние Delayed
order3.order.setState(new DelayedOrderState());
console.log("Принудительно переводим заказ в состояние Задерживается");
order3.getOrderStatus();

// Далее обрабатываем заказ → Shipped
order3.processOrder();     // Delayed → Shipped

console.log("\n");

