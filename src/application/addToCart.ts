import { Product } from "../domain/product";
import { addProduct } from "../domain/cart";
import { hasAllergy, User } from "../domain/user";
import { useCartStorage } from "../services/storageAdapter";
import { useNotifier } from "../services/notificationAdapter";
import { CartStorageService, NotificationService } from "./ports";

export function useAddToCart() {
    const storage: CartStorageService = useCartStorage();
    const notifier: NotificationService = useNotifier();

    function addToCart(user: User, product: Product): void {
        const warning = "This cookie is dangerous to health! 😱";
        const isDangerous = product.toppings.some((item) => hasAllergy(user, item));
        if (isDangerous) return notifier.notify(warning);

        const { cart } = storage;
        const updated = addProduct(cart, product);
        storage.updateCart(updated);
    }

    return { addToCart };
}
