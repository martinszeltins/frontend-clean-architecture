import { User } from "../domain/user";
import { Cart } from "../domain/cart";
import { createOrder } from "../domain/order";

/**
 * Note that the port interfaces are in the _application layer_,
 * but their implementation is in the _adapters_ layer.
 */
import { usePayment } from "../services/paymentAdapter";
import { useNotifier } from "../services/notificationAdapter";
import { useCartStorage, useOrdersStorage } from "../services/storageAdapter";

export function useOrderProducts() {
    /**
     * Usually getting services works through Dependency Injection.
     * Here we can use hooks as a makeshift "DI container".
     */
    const notifier = useNotifier();
    const payment = usePayment();
    const orderStorage = useOrdersStorage();
    const cartStorage = useCartStorage();

    /**
     * We can also get `user` and` cart` right here through the appropriate hooks
     * and don't pass them as arguments to the function.
     *
     * Ideally, we would pass the command as an argument,
     * which would encapsulate all input data.
     */
    async function orderProducts(user: User, cart: Cart) {
        /**
         * Here we can validate the data before creating the order.
         */
        const order = createOrder(user, cart);

        /**
         * The use case function does not call third-party services directly,
         * instead, it relies on the interfaces that were previously declared.
         */
          const paid = await payment.tryPay(order.total);
          if (!paid) return notifier.notify("Payment failed 🤷");

        /**
         * And here we can save the order on the server, if necessary.
         */
        const { orders } = orderStorage;
        orderStorage.updateOrders([...orders, order]);
        cartStorage.emptyCart();
    }

    return { orderProducts };
}
