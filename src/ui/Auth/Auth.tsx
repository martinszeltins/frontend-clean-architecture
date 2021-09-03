import styles from "./Auth.module.css";
import React, { useState } from "react";
import { Redirect } from "react-router";
import { UserName } from "../../domain/user";
import { useAuthenticate } from "../../application/authenticate";

export function Auth() {
    const [name, setName] = useState<UserName>("");
    const [email, setEmail] = useState<Email>("");
    const [loading, setLoading] = useState(false);

    const { user, authenticate } = useAuthenticate();

    if (!!user) return <Redirect to="/" />;

    async function handleSubmit(event: React.FormEvent) {
        setLoading(true);

        event.preventDefault();

        await authenticate(name, email);

        setLoading(false);
    }

    return (
        <form className={ styles.form } onSubmit={ handleSubmit }>
            <label>
                <span>Your name:</span>

                <input
                    type="text"
                    name="name"
                    value={ name }
                    onChange={ (e) => setName(e.target.value) }
                    autoFocus
                />
            </label>

            <label>
                <span>E-mail:</span>

                <input
                    type="email"
                    name="email"
                    value={ email }
                    onChange={ (e) => setEmail(e.target.value) }
                />
            </label>

            <button type="submit" disabled={ loading }>
                { loading ? "Login error..." : "Login" }
            </button>
        </form>
    );
}
