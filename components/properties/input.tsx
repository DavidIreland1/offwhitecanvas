import { useRef } from 'react';

export default function Input({ id, label, step = 1, value, min = NaN, onChange, width }) {
	if (value === undefined) return null;

	const input = useRef(null);

	const updateValue = (event) => {
		event.target.style.width = `max(calc(${width} / 6), ${Math.max(event.target.value.length + 2, 5)}ch)`;
		event.target.id = id;
		onChange(event);
	};

	const dragProperty = (down_event) => {
		down_event.preventDefault();
		down_event.target.setPointerCapture(down_event.pointerId);

		// const input = down_event.target.nextElementSibling;
		input.current.focus();
		let last_event = down_event;
		const move = (move_event) => {
			move_event.preventDefault();
			const delta = Math.sign(move_event.clientX - last_event.clientX) * step;
			value = Number(value);
			if (isNaN(value)) value = 0;
			value += delta;
			move_event.target.value = isNaN(min) ? value : Math.max(value, min);
			move_event.target.id = id;
			onChange(move_event);
			last_event = move_event;

			if (move_event.stopPropagation) move_event.stopPropagation();
			if (move_event.preventDefault) move_event.preventDefault();
			move_event.cancelBubble = true;
			move_event.returnValue = false;
			return false;
		};
		down_event.target.addEventListener('pointermove', move);
		const end = () => {
			down_event.target.releasePointerCapture(down_event.pointerId);
			down_event.target.removeEventListener('pointermove', move);
		};
		down_event.target.addEventListener('pointerup', end, { once: true });
	};

	return (
		<>
			<div id={id} className="dimension">
				<label onPointerDown={dragProperty}>{label}</label>
				<input ref={input} type="number" step={step} value={value} min={min || undefined} onChange={updateValue} onClick={(event) => (event.target as any).select()} />
			</div>

			<style jsx>{`
				.dimension {
					display: grid;
					grid-template-columns: auto 1fr;
					padding: 5px 0;
					border-bottom: 1px solid transparent;
				}
				.dimension:hover {
					background: var(--hover);
				}
				.dimension:focus-within {
					background: var(--hover);
					border-bottom: 1px solid white;
				}
				label {
					padding: 0 5px;
					cursor: ew-resize;
				}
				input {
					background: transparent;
					border: none;
					max-width: calc(${width} / 2 - 20px);
					width: max(calc(${width} / 6), 5ch);
					min-width: max(100%, 4ch);
					color: var(--text-color);
					font-size: 16px;
					text-align: right;
				}
				input:focus {
					outline: none;
				}
			`}</style>
		</>
	);
}
