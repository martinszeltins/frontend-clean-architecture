import { Cookie } from "../Cookie";
import styles from "./Front.module.css";
import { Product } from "../../domain/product";
import { useStore } from "../../services/store";

export function Front() {
    const { cookies } = useStore();

    return (
        <main>
            <h1>Cookies</h1>

            <ul className={styles.list}>
                {cookies.map((cookie: Product) => (
                    <li key={cookie.id}>
                        <Cookie cookie={cookie} />
                    </li>
                ))}
            </ul>
        </main>
    );
}
