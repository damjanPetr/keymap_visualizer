import type {
	ContextItem,
	KeysideData,
	LayoutData,
	SelectedLayout,
} from "../types";

interface StoreValues {
	layout: LayoutData;
	keyData: KeysideData | ContextItem;
	selectedLayout?: SelectedLayout;
	selectedContext?: string;
}

interface Store {
	test: StoreValues;
	main: StoreValues;
}

const emptyStoreValues: StoreValues = {
	layout: {
		left: [],
		right: [],
	},
	keyData: {
		left: [],
		right: [],
		context: [],
	},
};

const state: Store = {
	test: emptyStoreValues,
	main: emptyStoreValues,
};

type Stores = keyof typeof state;
type Listener = (value: unknown) => void;

const listeners: Record<Stores, Array<Listener>> = {
	test: [],
	main: [],
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
