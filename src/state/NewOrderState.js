import OrderState from "./OrderState.js";
import ProcessingOrderState from "./ProcessingOrderState.js";
import CancelledOrderState from "./CancelledOrderState.js";

export default class NewOrderState extends OrderState {
    next(order) {
        order.setState(new ProcessingOrderState());
    }

    cancel(order) {
        order.setState(new CancelledOrderState());
    }

    getStatus() {
        return "Новый";
    }
}
