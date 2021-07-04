import Head from 'next/head';
import Navbar from '../components/navbar';
import Canvas from '../components/canvas';
import Toolbar from '../components/toolbar';

import getPage from './../hooks/get-page';

export default function Home(): JSX.Element {
	const { elements } = getPage();

	return (
		<div className="container">
			<Head>
				<title>Off White Canvas</title>
				<link rel="icon" href="/favicon.svg" />
			</Head>

			<main>
				<Navbar />

				<div id="cols">
					<Toolbar />
					<Canvas elements={elements} />
				</div>
			</main>

			<style jsx>{``}</style>

			<style jsx global>{`
				html,
				body {
					padding: 0;
					margin: 0;
					height: 100vh;
					font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
					background: var(--off-white);
				}
				* {
					box-sizing: border-box;
				}

				main {
					height: 100vh;
					display: grid;
					grid-template-rows: min-content;
				}
				#cols {
					display: grid;
					grid-auto-flow: column;
					grid-template-columns: min-content;
				}
				:root {
					--nav-background: #545454;

					--title-color: #ffffff;
					--text-color: #ffffff;

					--off-white: #f1f1f1;

					--accent: #ea7661;
					--hover: #6d7282;

					--shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);

					--nav-height: 4vh;
				}
			`}</style>
		</div>
	);
}
