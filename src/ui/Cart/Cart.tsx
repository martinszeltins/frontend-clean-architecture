import { Cookie } from "../Cookie";
import styles from "./Cart.module.css";
import { totalPrice } from "../../domain/product";
import { useCartStorage } from "../../services/storageAdapter";

export function Cart() {
    const { cart } = useCartStorage();

    return (
        <section>
            <h2>Cart</h2>

            <ul className={styles.list}>
                {cart.products.map((product) => (
                    <li key={product.id}>
                        <Cookie cookie={product} />
                    </li>
                ))}
            </ul>

            <p>Total: {totalPrice(cart.products) / 100} EUR</p>
        </section>
    );
}
