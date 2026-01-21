import OrderState from "./OrderState.js";
import ShippedOrderState from "./ShippedOrderState.js";
import DelayedOrderState from "./DelayedOrderState.js";

export default class ProcessingOrderState extends OrderState {
    next(order) {
        // имитация бизнес-логики
        const isDelayed = Math.random() < 0.5;

        if (isDelayed) {
            order.setState(new DelayedOrderState());
        } else {
            order.setState(new ShippedOrderState());
        }
    }

    getStatus() {
        return "В обработке";
    }
}
