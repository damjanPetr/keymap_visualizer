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

type Stores = keyof typeof state;
type Listener<T> = (value: T) => void;

const listeners: Record<string, Array<Listener<unknown>>> = {
	test: [],
};

const store = {
	getState<T extends Stores>(store: T) {
		return state[store];
	},
	setState<T extends Stores>(value: (typeof state)[T], store: T) {
		state[store] = value;
		for (const listener of listeners[store]) {
			console.log("%c value", "background: magenta", { listener, value });
			listener(value);
		}
	},
	subscribe<T>(cb: Listener<[T]>, store: string): void {
		listeners[store].push(cb as Listener<unknown>);
	},
	unsubscribe<T extends Stores>(
		cb: Listener<(typeof state)[T]>,
		store: T,
	): void {
		const index = listeners[store].findIndex((item) => item === cb);
		if (index !== -1) {
			listeners[store].splice(index, 1);
		}
	},
};

export { store };
