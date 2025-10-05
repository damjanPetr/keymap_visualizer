import type { Store, StoreValues } from "../types";

const emptyStoreValues: StoreValues = {
	layout: {
		left: [],
		right: [],
	},
	keyData: {
		left: [],
		right: [],
		context: [],
		selectedContext: "",
	},
};

const state: Store = {
	test: emptyStoreValues,
	globalKeyMap: emptyStoreValues,
};

type Stores = keyof typeof state;
type Listener = (value: unknown) => void;

const listeners: Record<Stores, Array<Listener>> = {
	test: [],
	globalKeyMap: [],
};

const store = {
	getState(store: Stores) {
		return state[store];
	},
	setState(value: StoreValues, store: Stores) {
		state[store] = value;
		for (const listener of listeners[store]) {
			listener(value);
		}
	},
	subscribe(cb: Listener, store: Stores): void {
		listeners[store].push(cb);
	},
	unsubscribe(cb: Listener, store: Stores): void {
		const index = listeners[store].findIndex((item) => item === cb);
		if (index !== -1) {
			listeners[store].splice(index, 1);
		}
	},
};

export { store };
