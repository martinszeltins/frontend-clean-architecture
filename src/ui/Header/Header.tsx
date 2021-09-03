import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useCartStorage, useUserStorage } from "../../services/storageAdapter";

export function Header() {
    const { user } = useUserStorage();
    const { cart } = useCartStorage();

    return (
        <header className={styles.header}>
            <Link className={styles.logo} to="/">
                Cookies!!! 🍪
            </Link>

            {!user ? (
                <Link to="/auth">Login</Link>
            ) : (
                <Link to="/user">
                    {user.name} ({cart.products.length})
                </Link>
            )}
        </header>
    );
}
