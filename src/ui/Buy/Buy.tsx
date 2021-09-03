import styles from "./Buy.module.css";
import React, { useState } from "react";
import { UserName } from "../../domain/user";
import { useOrderProducts } from "../../application/orderProducts";
import { useCartStorage, useUserStorage } from "../../services/storageAdapter";

export function Buy() {
    const { orderProducts } = useOrderProducts();
    const { user } = useUserStorage();
    const { cart } = useCartStorage();

    const [name, setName] = useState<UserName>(user?.name ?? "");
    const [email, setEmail] = useState<Email>(user?.email ?? "");
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);

    if (!user || !cart.products.length) return null;

    async function handleSubmit(event: React.FormEvent) {
        setLoading(true);

        event.preventDefault();

        await orderProducts(user!, cart);

        setLoading(false);
    }

    return (
        <section>
            <h2>Checkout</h2>

            <form className={styles.form} onSubmit={handleSubmit}>
                <label>
                    <span>Your name:</span>

                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoFocus
                    />
                </label>

                <label>
                  <span>Your email address:</span>

                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>

                <label>
                    <span>Your street address:</span>

                    <textarea
                      name="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}>
                    </textarea>
                </label>

                <button type="submit" disabled={loading}>
                  {loading ? "Preparing order" : "Pay online"}
                </button>
            </form>
        </section>
    );
}
