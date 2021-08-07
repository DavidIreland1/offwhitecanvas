import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import Canvas from './canvas/canvas';
import Toolbar from './toolbar';
import Structure from './structure/structure';
import Properties from './properties/properties';
import getPage from '../state/dev';

import Settings from './settings';

import { Provider } from 'react-redux';

export default function Sheet({ store, actions }) {
	const router = useRouter();

	useEffect(() => {
		const { page } = router.query;
		if (!page) return;

		fetch(`./page/${page}`).then(async (res) => {
			const state = await res.json();
			// store.dispatch(actions.overwrite({ state: state }));
			store.dispatch(actions.overwrite({ state: { elements: state.elements } }));
			store.dispatch(actions.addUser({ user_id: Settings.user_id, label: Settings.user_name, color: Settings.user_color }));
		});

		window.addEventListener('beforeunload', async () => {
			store.dispatch(actions.removeUser({ user_id: Settings.user_id }));

			console.log('gff');
			await new Promise((res) => setTimeout(res, 3000));
			console.log('bye');
		});
	}, [router.query.page]);

	useEffect(() => {
		window.addEventListener('keydown', (event) => {
			if (event.metaKey && event.key === 'b') {
				store.dispatch(actions.overwrite({ state: getPage() }));
			}
		});
	}, []);

	// store.subscribe(() => {
	// 	window.localStorage.setItem('elements', JSON.stringify(store.getState()));
	// });

	return (
		<div id="cols">
			<Provider store={store}>
				<Toolbar />
				<Structure store={store} actions={actions} />
				<Canvas user_id={Settings.user_id} store={store} actions={actions} />
				<Properties store={store} actions={actions} />
			</Provider>

			<style jsx>{`
				#cols {
					position: relative;
					display: grid;
					grid-auto-flow: column;
					grid-template-columns: min-content auto;
					height: calc(100vh - var(--nav-height));
					overflow: hidden;
				}
			`}</style>
		</div>
	);
}
