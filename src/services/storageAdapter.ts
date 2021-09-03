import {
    CartStorageService,
    OrdersStorageService,
    UserStorageService,
} from "../application/ports";

import { useStore } from "./store";

/**
 * You can divide the total storage into several.
 * Inside the corresponding hooks, we can apply
 * memoization, optimizations, selectors..
 * Well understood.
 */

export function useUserStorage(): UserStorageService {
    return useStore();
}

export function useCartStorage(): CartStorageService {
    return useStore();
}

export function useOrdersStorage(): OrdersStorageService {
    return useStore();
}
