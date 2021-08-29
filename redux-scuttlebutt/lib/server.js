'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const fs = require('fs');
const Primus = require('primus');
const Dispatcher = require('./dispatcher').default;

const Rooms = require('primus-rooms');

const INFILE = process.env['INFILE'];
const OUTFILE = process.env['OUTFILE'];
const REMOTE_SB = process.env['REMOTE_SB'];

const defaultOptions = {
	getStatistics: getStatistics,
	primusOptions: {},
	dispatcherOptions: {},
};

let documents = {};
function openDocument(options) {
	const gossip = new Dispatcher(options.dispatcherOptions);

	const { store, dispatch, getState } = connectRedux(gossip);

	return {
		gossip,
		store,
		dispatch,
		getState,
		streams: {},
	};
}

exports.default = function scuttlebuttServer(server, options) {
	options = Object.assign(defaultOptions, options);

	const primus = new Primus(server, options.primusOptions);
	primus.plugin('rooms', Rooms);

	// const onStatistic = options.getStatistics();

	primus.on('connection', function (spark) {
		// const stream = gossip.createStream();
		// This works console.log('[io] connection', spark.address, spark.id);
		// onStatistic(spark.id, 'connect');
		let room;

		spark.on('data', function recv(data) {
			if (data.action === 'admin') {
				room = data.room;

				if (!documents[room]) {
					documents[room] = openDocument(options);
				}

				documents[room].streams[spark.id] = documents[room].gossip.createStream();

				documents[room].streams[spark.id].on('data', function (data) {
					// spark.room(room).write(data);
					spark.write(data);
				});

				documents[room].streams[spark.id].on('error', function (error) {
					spark.leave(room);
					console.log('[io]', spark.id, 'ERROR:', error);
					spark.end('Disconnecting due to error', { reconnect: true });
				});

				spark.join(room, function () {
					// send message to this client
					// spark.write({ action: 'admin', room: 'you joined room ' + data.room });

					// send message to all clients except this one
					spark.room(room).write({ action: 'admin', room: spark.id + ' joined room ' + data.room });
				});
			} else {
				// onStatistic(spark.id, 'recv');
				// stream.write(data);
				documents[room].streams[spark.id].write(data);
			}

			// console.log('[io]', spark.id, '<-', data);
		});
	});

	primus.on('disconnection', function (spark) {
		// This works console.log('[io] disconnect', spark.address, spark.id);
		// onStatistic(spark.id, 'disconnect');
		// in case you don't want to track zombie connections
		// delete statistics[spark.id]
	});

	// return { primus, store, dispatch, getState };
};

function connectRedux(gossip) {
	const Redux = require('redux');

	const reducer = function reducer() {
		const state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
		const action = arguments[1];
		return state.concat(action);
	};

	const store = Redux.createStore(gossip.wrapReducer(reducer), undefined);
	const dispatch = gossip.wrapDispatch(store.dispatch);
	const getState = gossip.wrapGetState(store.getState);

	// other things we might want to do ->
	// store.subscribe(render)
	// setInterval(function () { dispatch({ type: 'TICK' }) }, 1000)

	return { store, dispatch, getState };
}

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// giv me some space

function getStatistics() {
	const statistics = {};

	let statisticsDirty = true;

	// prime statistics for when spark.id is undefined, presumably server messages
	statistics[undefined] = {
		recv: 0,
		sent: 0,
		s: 'other',
	};

	setInterval(function () {
		if (!statisticsDirty) return;

		statisticsDirty = false;

		/*
		// full client statistics
		console.log('# ' + (new Date()) + '')
		for (const spark in statistics) {
		  console.log(`${spark}: ${statistics[spark].recv} recv ${statistics[spark].sent} sent (${statistics[spark].s})`)
		}
		*/

		// basic statistics
		console.log(
			[
				new Date().toLocaleString('en-AU'),
				': ',
				(function () {
					let recv = 0,
						sent = 0,
						connected = 0,
						disconnected = 0,
						other = 0;
					for (let spark in statistics) {
						recv += statistics[spark].recv;
						sent += statistics[spark].sent;

						if (statistics[spark].s === 'connected') connected++;
						else if (statistics[spark].s === 'disconnected') disconnected++;
						else other++;
					}

					return 'recv ' + recv + ', sent ' + sent + ', (' + connected + ' \uD83C\uDF0F, ' + disconnected + ' \uD83D\uDD15, ' + other + ' \uD83D\uDC65)';
				})(),
			].join('')
		);
	}, 10000); // max 6/minute

	return function (source, event, extra) {
		statisticsDirty = true;
		if (event === 'connect') {
			statistics[source] = {
				recv: 0,
				sent: 0,
				s: 'connected',
			};
		} else if (event === 'disconnect') {
			statistics[source] = {
				recv: 0,
				sent: 0,
				s: 'disconnected',
			};
		} else if (event === 'error') {
			statistics[source] = {
				recv: 0,
				sent: 0,
				s: 'error',
				err: extra,
			};
		} else if (event === 'recv' || event === 'sent') {
			statistics[source][event]++;
		}
	};
}
