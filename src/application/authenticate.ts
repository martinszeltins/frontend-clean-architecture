import { UserName } from "../domain/user";
import { useAuth } from "../services/authAdapter";
import { useUserStorage } from "../services/storageAdapter";

/**
 * Note that the port interfaces are in the _application layer_,
 * but their implementation is in the _adapters_ layer.
 */
import { AuthenticationService, UserStorageService } from "./ports";

export function useAuthenticate() {
    /**
     * Usually getting services works through Dependency Injection.
     * Here we can use hooks as a makeshift "DI container".
     *
     * The use case function does not call third-party services directly,
     * instead, it relies on the interfaces that were previously declared
     */
    const storage: UserStorageService = useUserStorage();
    const auth: AuthenticationService = useAuth();

    /**
     *
     * Ideally, we would pass the command as an argument,
     * which would encapsulate all input data.
     */
    async function authenticate(name: UserName, email: Email): Promise<void> {
        const user = await auth.auth(name, email);
        storage.updateUser(user);
    }

    return {
        user: storage.user,
        authenticate,
    };
}
