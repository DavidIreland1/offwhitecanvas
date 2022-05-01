import Adjective from './../utils/adjectives';
import Animal from './../utils/animals';
import { generateID, pastelColor } from '../utils/utils';

const id = generateID();

console.log(Adjective + ' ' + Animal, id);

const devicePixelRatio = typeof window === 'undefined' ? 1 : window.devicePixelRatio;

const Settings = {
	user_id: id,
	user_name: Adjective + ' ' + Animal,
	user_color: pastelColor(),

	line_width: 1 * devicePixelRatio,

	box_size: 4 * devicePixelRatio,
	// highlight: '#1a83ee',
	highlight: '#449ef2',

	max_zoom: 500,
	min_zoom: 0.0001,
	pan_sensitivity: 1.5,
	zoom_sensitivity: 0.01,

	grid_enabled: true,
	grid_step: 1,
	grid_line_width: 2,
	grid_min_scale: 5,
};

export default Settings;
