import NewOrderState from "../state/NewOrderState.js";

export default class Order {
    constructor() {
        this.state = new NewOrderState();
    }

    setState(state) {
        this.state = state;
    }

    nextState() {
        this.state.next(this);
    }

    cancel() {
        if (this.state.cancel) {
            this.state.cancel(this);
        } else {
            console.log("Отмена невозможна на данном этапе");
        }
    }

    getStatus() {
        return this.state.getStatus();
    }
}
