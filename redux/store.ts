import { createStore } from 'redux';
import { slice } from './slice';
// import scuttlebutt from 'redux-scuttlebutt';
import scuttlebutt from './../redux-scuttlebutt/lib/client';

import undoable from 'redux-undo';

// import Primus from './../node_modules/redux-scuttlebutt/lib/primus';
// import Primus from 'primus/primus';

import initial_state from './../state/initial';

let Primus;
let room;

if (typeof window !== 'undefined') {
	Primus = (window as any).Primus;
	room = location.pathname.split('/')[1];
}

import { modification_actions } from '../reducers/modifications/modifications';
import { interaction_actions } from '../reducers/modifications/interactions';

const store = createStore(
	undoable(slice.reducer, { filter: filterActions, groupBy: groupActions }) as any,
	initial_state,
	typeof Primus !== 'undefined'
		? scuttlebutt({
				primus: Primus,
				uri: 'http://localhost:3000',
				room: room,
		  })
		: undefined
);

export default store;

export type RootState = ReturnType<typeof store.getState>;

function filterActions(action) {
	return modification_actions.includes(action.type.slice(8));
}

let last_action = { type: '', time: Date.now() };

function groupActions(action) {
	const now = Date.now();
	if (interaction_actions.includes(action.type.slice(8)) && last_action.type === action.type && last_action.time > now - 500) {
		last_action.time = now;
		return action.type;
	}
	last_action = {
		type: action.type,
		time: now,
	};
	return null;
}
