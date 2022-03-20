import { useRef, useEffect, useImperativeHandle, forwardRef, useState } from 'react';
import initCanvas from './init-canvas';
import draw from './draw';
import TextLayer from './text-layer';

export default forwardRef(Canvas);

function Canvas({ user_id, store, actions }, ref) {
	// const { user_id, store, actions } = props as any;
	const canvas_ref = useRef(null);

	useImperativeHandle(ref, () => ({
		onResize() {
			onResize(canvas_ref.current, store, actions, user_id);
		},
	}));

	const [background, setBackground] = useState('#EEEF');

	useEffect(() => {
		const canvas: HTMLCanvasElement = canvas_ref.current;
		const context: CanvasRenderingContext2D = canvas.getContext('2d'); //, { alpha: false } makes it flash black but is more efficient?

		const { width, height, left } = canvas.getBoundingClientRect();
		canvas.width = width * window.devicePixelRatio;
		canvas.height = height * window.devicePixelRatio;
		last_x = left;

		// Just for console debugging
		(window as any).canvas = canvas;
		(window as any).context = context;

		window.addEventListener('resize', () => {
			onResize(canvas, store, actions, user_id);
		});

		const active = {
			hovering: [],
			selected: [],
			altering: [],
		};

		initCanvas(canvas, user_id, store, actions, active);

		draw(context, store, actions, active, user_id);
		store.subscribe(() => draw(context, store, actions, active, user_id));
		setTimeout(() => {
			setBackground('');
		}, 0);
	}, [canvas_ref]);

	const svg = `
		<svg xmlns="http://www.w3.org/2000/svg"  width='24' height='24' version="1.1" viewBox="0 0 100 100" stroke="white" stroke-width="4" >
			<path d="M 2 0 l 0 70 l 23 -15 l 32 -3 L 2 0" style="filter: drop-shadow( 2px 3px 2px)" />
		</svg>
	`;
	const cursor = `url("data:image/svg+xml,${encodeURIComponent(svg)}") 0 0, auto`;

	return (
		<div id="container">
			<TextLayer canvas={canvas_ref} user_id={user_id} store={store} actions={actions} />
			<canvas className="checkers" ref={canvas_ref} tabIndex={1} style={{ background: background, cursor: cursor }} />

			<style jsx>{`
				#container {
					position: relative;
				}
				canvas {
					width: 100%;
					height: 100%;
					outline: none;
					cursor: ${cursor};
					--checker-size: 8px;
				}
				.checkers {
					--checker-color-1: white;
					--checker-color-2: lightgrey;
					--checker-size: 8px;
					--checker-gradient: linear-gradient(45deg, var(--checker-color-1) 25%, transparent 0%, transparent 75%, var(--checker-color-1) 75%);
					background-color: var(--checker-color-2);
					background-image: var(--checker-gradient), var(--checker-gradient);
					background-position: 0 0, var(--checker-size) var(--checker-size);
					background-size: calc(var(--checker-size) * 2) calc(var(--checker-size) * 2);
				}
			`}</style>
		</div>
	);
}

let last_x = 0;
function onResize(canvas, store, actions, user_id) {
	const { width, height } = canvas.getBoundingClientRect();

	canvas.width = width * window.devicePixelRatio;
	canvas.height = height * window.devicePixelRatio;

	const delta_x = last_x - canvas.getBoundingClientRect().left;
	last_x -= delta_x;
	store.dispatch(
		actions.view({
			user_id: user_id,
			delta_x: delta_x * 2,
		})
	);
}
