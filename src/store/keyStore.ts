import type { KeysideData, LayoutData } from "../types";

interface Data {
	layout: LayoutData;
	keyData: KeysideData;
}

interface State {
	test: Data;
	[key: symbol]: unknown;
}

const state: State = {
	test: {
		layout: {
			left: [],
			right: [],
		},
		keyData: {
			left: [],
			right: [],
			context: {},
		},
	},
};

const listeners: Record<string, Array<(...args: symbol[]) => void>> = {
	test: [],
};

type Stores = keyof typeof state;
const store = {
	getState(store: Stores) {
		return state[store];
	},
	setState(value: unknown, store: Stores) {
		state[store] = value;
		for (const listener of listeners[store]) {
			listener(value);
		}
	},
	subscribe(cb: (...args: symbol[]) => void, store: Stores) {
		listeners[store].push(cb);
	},
	unsubscribe(value: symbol, store: Stores) {
		const index = listeners[store].findIndex((item) => item === value);
		listeners[store].splice(index, 1);
	},
};

export { store };
