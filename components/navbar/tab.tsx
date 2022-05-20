import Link from 'next/link';
import { useRef } from 'react';
import Cross from '../icons/cross';

export default function Tab({ tab, url, leavePage, closeTab }) {
	const tab_ref = useRef(null);

	const drag = (event) => {
		const tab = tab_ref.current;

		requestAnimationFrame(() => tab.classList.add('blank'));
		const move = (move_event) => {
			const hover = document.elementFromPoint(move_event.clientX, move_event.clientY);
			if (hover === tab || hover === tab.nextSibling) return;
			if (hover.tagName === 'A') return hover.parentElement.parentElement.insertBefore(tab, hover.parentElement);
			if (hover.tagName === 'SVG') return hover.parentElement.parentElement.parentElement.insertBefore(tab, hover.parentElement.parentElement.parentElement);
			if (hover.id === 'plus') return hover.previousElementSibling.append(tab);
			if (hover.id === 'nav') return hover.children[2].append(tab);
		};
		event.target.addEventListener('drag', move);
		const end = () => {
			tab.classList.remove('blank');
			event.target.removeEventListener('drag', move);
		};
		event.target.addEventListener('dragend', end, { once: true });
	};

	return (
		<div ref={tab_ref}>
			<Link href={'/file/' + tab.id}>
				<a onClick={leavePage} className={'tab' + (tab.id === url ? ' selected' : '')} draggable="true" onDragStart={drag} onDragOver={(event) => event.preventDefault()}>
					<div>{tab.label}</div>
					<Cross onClick={() => closeTab(tab.id)} />
				</a>
			</Link>

			<style jsx>{`
				line {
					stroke: white;
					stroke-width: 6;
				}
				.tab {
					color: var(--text);
					padding: 2px 5px 2px 20px;
					width: max(max-content, 10%);
					border-radius: var(--radius);
					text-decoration: none;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					display: grid;
					grid-gap: 5px;
					grid-template-columns: max-content 23px;
					height: 100%;
				}
				.tab:-webkit-any-link {
					cursor: default;
				}
				.tab:hover,
				#plus:hover {
					background: var(--hover);
				}
				.tab.selected {
					background: var(--selected);
				}
				.blank {
					color: transparent;
					background: transparent;
				}
				.blank > * {
					visibility: collapse;
				}
			`}</style>
		</div>
	);
}
