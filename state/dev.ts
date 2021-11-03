export default function getPage(color) {
	if (color === 'test') return loadTest(1000);
	return {
		id: 'page-id',
		label: 'First Page',
		cursors: [],
		views: [],
		elements: [
			{
				id: '35674',
				label: 'Circle',
				type: 'circle',
				selected: false,
				hover: false,
				x: 100 - 800,
				y: 100 - 1000,
				rotation: 0,
				radius: 80,
				fill: [{ id: '5463', color: color || [0.5, 1, 0, 1], visible: true }],
				stroke: [{ id: '2323', width: 2, color: color || [0.5, 0, 0, 1], visible: true }],
				effect: [],
				start_angle: 0,
				end_angle: 6.283185307179586,
				visible: true,
				locked: false,
			},
			{
				id: '3567422',
				label: 'Rectangle',
				type: 'rectangle',
				selected: true,
				hover: false,
				x: 400 - 800,
				y: 400 - 1000,
				radius: 30,
				rotation: 0,
				fill: [{ id: '3455423', color: color || [0.5, 0, 1, 1], visible: true }],
				stroke: [{ id: '234234', width: 2, color: color || [0.5, 1, 0, 1], visible: true }],
				effect: [],
				width: 300,
				height: 400,
				visible: true,
				locked: false,
			},
			{
				id: '3457',
				label: 'Group',
				type: 'group',
				selected: false,
				hover: false,
				rotation: 0,
				visible: true,
				locked: false,
				elements: [
					{
						id: '456546',
						label: 'Ellipse',
						type: 'ellipse',
						selected: false,
						hover: false,
						x: 100 - 800,
						y: 100 - 1000,
						fill: [{ id: '47567', color: color || [0.5, 0.5, 0, 1], visible: true }],
						stroke: [{ id: '8968', width: 2, color: color || [0.5, 0, 1, 1], visible: true }],
						effect: [],
						radius_x: 60,
						radius_y: 80,
						rotation: 0,
						start_angle: 0,
						end_angle: 6.283185307179586,
						visible: true,
						locked: false,
					},
					{
						id: '2342342',
						label: 'Ellipse',
						type: 'ellipse',
						selected: false,
						hover: false,
						x: 200 - 800,
						y: 200 - 1000,
						fill: [{ id: '5274', color: color || [0.5, 0, 0, 1], visible: true }],
						stroke: [{ id: '4466', width: 2, color: color || [0.5, 0.5, 0, 1], visible: true }],
						effect: [],
						radius_x: 60,
						radius_y: 80,
						rotation: 0,
						start_angle: 0,
						end_angle: 6.283185307179586,
						visible: true,
						locked: false,
					},
					{
						id: '34543534',
						label: 'Group',
						type: 'group',
						selected: false,
						hover: false,
						visible: true,
						locked: false,
						rotation: 0,
						elements: [
							{
								id: '23423245',
								label: 'Ellipse',
								type: 'ellipse',
								selected: false,
								hover: false,
								x: 350 - 800,
								y: 250 - 1000,
								fill: [{ id: '1637', color: color || [0.5, 0.5, 0.5, 1], visible: true }],
								stroke: [{ id: '9478', width: 2, color: color || [0.5, 0, 0, 1], visible: true }],
								effect: [],
								radius_x: 60,
								radius_y: 80,
								rotation: 0,
								start_angle: 0,
								end_angle: 6.283185307179586,
								visible: true,
								locked: false,
							},
							{
								id: '634523',
								label: 'Ellipse',
								type: 'ellipse',
								selected: false,
								hover: false,
								x: 350 - 800,
								y: 350 - 1000,
								fill: [{ id: '47467', color: color || [0.5, 0.2, 0.2, 1], visible: true }],
								stroke: [{ id: '84664', width: 2, color: color || [0.5, 0.5, 0.5, 1], visible: true }],
								effect: [],
								radius_x: 60,
								radius_y: 80,
								rotation: 0,
								start_angle: 0,
								end_angle: 6.283185307179586,
								visible: true,
								locked: false,
							},
						],
					},
				],
			},
			{
				id: '67484',
				label: 'Ellipse',
				type: 'ellipse',
				selected: false,
				hover: false,
				x: 150 - 3000,
				y: 1500 - 1000,
				fill: [{ id: '34335', color: color || [0.5, 0, 0, 1], visible: true }],
				stroke: [{ id: '89424', width: 2, color: color || [0.5, 0.2, 0.2, 1], visible: true }],
				effect: [],
				radius_x: 60,
				radius_y: 80,
				rotation: 0,
				start_angle: 0,
				end_angle: 6.283185307179586,
				visible: true,
				locked: false,
			},
			{
				id: '6573567',
				label: 'Line',
				type: 'line',
				selected: false,
				hover: false,
				x1: 600,
				y1: 600,
				x2: 800,
				y2: 800,
				fill: [],
				stroke: [{ id: '94673', width: 9, color: color || [0.5, 0, 0, 1], visible: true }],
				effect: [],
				visible: true,
				locked: false,
			},
			{
				id: '4678',
				label: 'Ellipse',
				type: 'ellipse',
				selected: false,
				hover: false,
				x: 100 - 800,
				y: 1500 - 1000,
				fill: [{ id: '83664', color: color || [0.5, 0.1, 0.3, 1], visible: true }],
				stroke: [{ id: '7463', width: 2, color: color || [0.5, 0, 0, 1], visible: true }],
				effect: [],
				radius_x: 60,
				radius_y: 80,
				rotation: 0,
				start_angle: 0,
				end_angle: 6.283185307179586,
				visible: true,
				locked: false,
			},
			{
				id: '3567',
				label: 'The tester er',
				type: 'ellipse',
				selected: false,
				hover: false,
				x: 150 - 3000,
				y: 100 - 1000,
				fill: [{ id: '4313', color: color || [0.5, 0, 0.5, 1], visible: true }],
				stroke: [{ id: '56784', width: 2, color: color || [0.5, 0.1, 0.3, 1], visible: true }],
				effect: [],
				radius_x: 60,
				radius_y: 80,
				rotation: 0,
				start_angle: 0,
				end_angle: 6.283185307179586,
				visible: true,
				locked: false,
			},
			{
				id: '8764',
				label: 'The',
				type: 'ellipse',
				selected: false,
				hover: false,
				x: 800 - 800,
				y: 800 - 1000,
				fill: [{ id: '3462', color: color || [0.5, 0, 0.7, 1], visible: true }],
				stroke: [{ id: '85324', width: 2, color: color || [0.5, 0, 0.5, 1], visible: true }],
				effect: [],
				radius_x: 60,
				radius_y: 120,
				rotation: 0,
				start_angle: 0,
				end_angle: 6.283185307179586,
				visible: true,
				locked: false,
			},
		],
	};
}

function loadTest(n) {
	return {
		id: 'test-' + n,
		label: 'Test Page ' + n,
		views: [],
		cursors: [],
		elements: Array(n)
			.fill(null)
			.map((element, i, array) => {
				const side = Math.round(Math.sqrt(array.length));
				return {
					id: '35674' + i,
					type: 'circle',
					label: 'circle',
					selected: false,
					hover: false,
					x: (n / side) * (i % side),
					y: (n / side) * Math.floor(i / side),
					fill: [{ id: '35675' + i, color: [1, 0, 0, 1], visible: true }],
					stroke: [{ id: '35676' + i, width: 2, color: [0, 1, 0, 1], visible: true }],
					effect: [],
					rotation: 0,
					radius: 5,
					start_angle: 0,
					end_angle: 2 * Math.PI,
					visible: true,
				};
			}),
	};
}
