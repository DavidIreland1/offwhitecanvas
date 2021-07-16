(function webpackUniversalModuleDefinition(root, factory) {
	if (typeof exports === 'object' && typeof module === 'object') module.exports = factory();
	else if (typeof define === 'function' && define.amd) define([], factory);
	else if (typeof exports === 'object') exports['reducer'] = factory();
	else root['reducer'] = factory();
})(global, function () {
	return /******/ (() => {
		// webpackBootstrap
		/******/ 'use strict';
		/******/ // The require scope
		/******/ var __webpack_require__ = {};
		/******/
		/************************************************************************/
		/******/ /* webpack/runtime/define property getters */
		/******/ (() => {
			/******/ // define getter functions for harmony exports
			/******/ __webpack_require__.d = (exports, definition) => {
				/******/ for (var key in definition) {
					/******/ if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
						/******/ Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
						/******/
					}
					/******/
				}
				/******/
			};
			/******/
		})();
		/******/
		/******/ /* webpack/runtime/hasOwnProperty shorthand */
		/******/ (() => {
			/******/ __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
			/******/
		})();
		/******/
		/******/ /* webpack/runtime/make namespace object */
		/******/ (() => {
			/******/ // define __esModule on exports
			/******/ __webpack_require__.r = (exports) => {
				/******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
					/******/ Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
					/******/
				}
				/******/ Object.defineProperty(exports, '__esModule', { value: true });
				/******/
			};
			/******/
		})();
		/******/
		/************************************************************************/
		var __webpack_exports__ = {};
		// ESM COMPAT FLAG
		__webpack_require__.r(__webpack_exports__);

		// EXPORTS
		__webpack_require__.d(__webpack_exports__, {
			default: () => /* binding */ reducers,
		}); // CONCATENATED MODULE: ./components/elements/element.ts

		// import Defaults from './../../defaults';
		// const { line_width, box_size, highlight_color } = Defaults;
		var Element = /** @class */ (function () {
			function Element() {}
			Element.draw = function (element, context) {
				return;
			};
			Element.resize = function (element, position, last_position, direction_x, direction_y) {
				return;
			};
			Element.collide = function (element, position) {
				return false;
			};
			Element.outline = function (element, context, color, line_width) {
				return;
			};
			Element.highlight = function (element, context, color, line_width, box_size) {
				var _this = this;
				this.outline(element, context, color, line_width);
				var bounds = this.bound(element);
				var center = this.center(element);
				context.translate(center.x, center.y);
				context.rotate(element.rotation);
				context.strokeStyle = color;
				context.lineWidth = line_width;
				context.beginPath();
				context.rect(-bounds.width / 2, -bounds.height / 2, bounds.width, bounds.height);
				context.stroke();
				if (bounds.width + bounds.height > box_size * 4) {
					bounds.x = -bounds.width / 2;
					bounds.y = -bounds.height / 2;
					this.boxes(element.id, bounds, box_size).forEach(function (square) {
						_this.drawSquare(square, context, color, line_width);
					});
				}
				context.rotate(-element.rotation);
				context.translate(-center.x, -center.y);
			};
			Element.center = function (element) {
				var bounds = this.bound(element);
				return {
					x: bounds.x + bounds.width / 2,
					y: bounds.y + bounds.height / 2,
				};
			};
			Element.bound = function (element) {
				return {
					x: element.x,
					y: element.y,
					width: element.width,
					height: element.height,
				};
			};
			Element.move = function (element, position, last_position) {
				element.x += position.x - last_position.x;
				element.y += position.y - last_position.y;
			};
			Element.collideResize = function (element, position, box_size) {
				var _this = this;
				var bounds = this.bound(element);
				position = this.rotatePoint(position, this.center(element), -element.rotation);
				return !!this.boxes(element.id, bounds, box_size).find(function (box) {
					return _this.collideBox(box, position);
				});
			};
			Element.rotatePoint = function (position, center, rotation) {
				var sin = Math.sin(rotation);
				var cos = Math.cos(rotation);
				var x = position.x - center.x;
				var y = position.y - center.y;
				return {
					x: x * cos - y * sin + center.x,
					y: y * cos + x * sin + center.y,
				};
			};
			Element.collideRotate = function (element, position, box_size) {
				var _this = this;
				var bounds = this.bound(element);
				bounds.x -= box_size;
				bounds.y -= box_size;
				bounds.width += box_size * 2;
				bounds.height += box_size * 2;
				position = this.rotatePoint(position, this.center(element), -element.rotation);
				return !!this.boxes(element.id, bounds, box_size * 2).find(function (box) {
					return _this.collideBox(box, position);
				});
			};
			Element.rotate = function (element, theta) {
				element.rotation += theta;
			};
			Element.collideBox = function (box, position) {
				return box.x < position.x && position.x < box.x + box.width && box.y < position.y && position.y < box.y + box.width;
			};
			Element.drawSquare = function (square, context, color, line_width) {
				context.fillStyle = 'white';
				context.beginPath();
				context.rect(square.x, square.y, square.width, square.height);
				context.fill();
				context.strokeStyle = color;
				context.lineWidth = line_width;
				context.stroke();
			};
			Element.boxes = function (id, bounds, box_size) {
				return [
					{
						id: id,
						x: bounds.x - box_size,
						y: bounds.y - box_size,
						width: box_size * 2,
						height: box_size * 2,
					},
					{
						id: id,
						x: bounds.x + bounds.width - box_size,
						y: bounds.y - box_size,
						width: box_size * 2,
						height: box_size * 2,
					},
					{
						id: id,
						x: bounds.x - box_size,
						y: bounds.y + bounds.height - box_size,
						width: box_size * 2,
						height: box_size * 2,
					},
					{
						id: id,
						x: bounds.x + bounds.width - box_size,
						y: bounds.y + bounds.height - box_size,
						width: box_size * 2,
						height: box_size * 2,
					},
				];
			};
			return Element;
		})();
		/* harmony default export */ const elements_element = Element; // CONCATENATED MODULE: ./components/elements/circle.ts

		var __extends =
			(undefined && undefined.__extends) ||
			(function () {
				var extendStatics = function (d, b) {
					extendStatics =
						Object.setPrototypeOf ||
						({ __proto__: [] } instanceof Array &&
							function (d, b) {
								d.__proto__ = b;
							}) ||
						function (d, b) {
							for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
						};
					return extendStatics(d, b);
				};
				return function (d, b) {
					if (typeof b !== 'function' && b !== null) throw new TypeError('Class extends value ' + String(b) + ' is not a constructor or null');
					extendStatics(d, b);
					function __() {
						this.constructor = d;
					}
					d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
				};
			})();

		var Circle = /** @class */ (function (_super) {
			__extends(Circle, _super);
			function Circle() {
				return (_super !== null && _super.apply(this, arguments)) || this;
			}
			Circle.draw = function (circle, context) {
				context.fillStyle = circle.color;
				context.beginPath();
				context.arc(circle.x, circle.y, circle.radius, circle.start_angle, circle.end_angle, circle.counter_clockwise);
				context.fill();
			};
			Circle.outline = function (circle, context, color, line_width) {
				context.strokeStyle = color;
				context.lineWidth = line_width;
				context.beginPath();
				context.arc(circle.x, circle.y, circle.radius, circle.start_angle, circle.end_angle);
				context.stroke();
			};
			Circle.collide = function (circle, position) {
				return Math.pow(circle.x - position.x, 2) + Math.pow(circle.y - position.y, 2) < Math.pow(circle.radius, 2);
			};
			Circle.bound = function (circle) {
				return {
					x: circle.x - circle.radius,
					y: circle.y - circle.radius,
					width: circle.radius * 2,
					height: circle.radius * 2,
				};
			};
			Circle.resize = function (ellipse, position, last_position) {
				var delta_x = (position.x - last_position.x) / 2;
				var delta_y = (position.y - last_position.y) / 2;
				var delta = (delta_x + delta_y) / 2;
				ellipse.x += delta;
				ellipse.y += delta;
				var x_direction = Math.sign(last_position.x + delta - ellipse.x);
				var y_direction = Math.sign(last_position.y + delta - ellipse.y);
				ellipse.radius += x_direction * delta;
				ellipse.radius = Math.abs(ellipse.radius);
			};
			return Circle;
		})(elements_element);
		/* harmony default export */ const circle = Circle; // CONCATENATED MODULE: ./components/elements/ellipse.ts

		var ellipse_extends =
			(undefined && undefined.__extends) ||
			(function () {
				var extendStatics = function (d, b) {
					extendStatics =
						Object.setPrototypeOf ||
						({ __proto__: [] } instanceof Array &&
							function (d, b) {
								d.__proto__ = b;
							}) ||
						function (d, b) {
							for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
						};
					return extendStatics(d, b);
				};
				return function (d, b) {
					if (typeof b !== 'function' && b !== null) throw new TypeError('Class extends value ' + String(b) + ' is not a constructor or null');
					extendStatics(d, b);
					function __() {
						this.constructor = d;
					}
					d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
				};
			})();

		var Ellipse = /** @class */ (function (_super) {
			ellipse_extends(Ellipse, _super);
			function Ellipse() {
				return (_super !== null && _super.apply(this, arguments)) || this;
			}
			Ellipse.draw = function (ellipse, context) {
				context.fillStyle = ellipse.color;
				context.beginPath();
				context.ellipse(ellipse.x, ellipse.y, ellipse.radius_x, ellipse.radius_y, ellipse.rotation, ellipse.start_angle, ellipse.end_angle, ellipse.counter_clockwise);
				context.fill();
			};
			Ellipse.outline = function (ellipse, context, color, line_width) {
				context.strokeStyle = color;
				context.lineWidth = line_width;
				context.beginPath();
				context.ellipse(ellipse.x, ellipse.y, ellipse.radius_x, ellipse.radius_y, ellipse.rotation, ellipse.start_angle, ellipse.end_angle, ellipse.counter_clockwise);
				context.stroke();
			};
			Ellipse.collide = function (ellipse, position) {
				position = this.rotatePoint(position, this.center(ellipse), -ellipse.rotation);
				return Math.pow(ellipse.x - position.x, 2) / Math.pow(ellipse.radius_x, 2) + Math.pow(ellipse.y - position.y, 2) / Math.pow(ellipse.radius_y, 2) < 1;
			};
			Ellipse.center = function (ellipse) {
				return {
					x: ellipse.x,
					y: ellipse.y,
				};
			};
			Ellipse.bound = function (ellipse) {
				return {
					x: ellipse.x - ellipse.radius_x,
					y: ellipse.y - ellipse.radius_y,
					width: ellipse.radius_x * 2,
					height: ellipse.radius_y * 2,
				};
			};
			Ellipse.resize = function (ellipse, position, last_position, direction_x, direction_y) {
				// position = this.rotatePoint(position, last_position, -ellipse.rotation);
				var delta_x = (position.x - last_position.x) / 2;
				var delta_y = (position.y - last_position.y) / 2;
				delta_x = delta_x * Math.sin(ellipse.rotation + Math.PI / 4);
				delta_y = delta_y * Math.cos(ellipse.rotation + Math.PI / 4);
				// console.log(delta_x, delta_y, ellipse.rotation);
				ellipse.x += delta_x;
				ellipse.y += delta_y;
				ellipse.radius_x += direction_x * delta_x;
				ellipse.radius_y += direction_y * delta_y;
				ellipse.radius_x = Math.abs(ellipse.radius_x);
				ellipse.radius_y = Math.abs(ellipse.radius_y);
			};
			return Ellipse;
		})(elements_element);
		/* harmony default export */ const ellipse = Ellipse;
		function clone(object) {
			return JSON.parse(JSON.stringify(object));
		} // CONCATENATED MODULE: ./components/elements/group.ts

		var group_extends =
			(undefined && undefined.__extends) ||
			(function () {
				var extendStatics = function (d, b) {
					extendStatics =
						Object.setPrototypeOf ||
						({ __proto__: [] } instanceof Array &&
							function (d, b) {
								d.__proto__ = b;
							}) ||
						function (d, b) {
							for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
						};
					return extendStatics(d, b);
				};
				return function (d, b) {
					if (typeof b !== 'function' && b !== null) throw new TypeError('Class extends value ' + String(b) + ' is not a constructor or null');
					extendStatics(d, b);
					function __() {
						this.constructor = d;
					}
					d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
				};
			})();

		var Group = /** @class */ (function (_super) {
			group_extends(Group, _super);
			function Group() {
				return (_super !== null && _super.apply(this, arguments)) || this;
			}
			Group.draw = function (group, context) {
				var center = this.center(group);
				context.translate(center.x, center.y);
				context.rotate(group.rotation);
				context.translate(-center.x, -center.y);
				group.elements.forEach(function (element) {
					return elements_elements[element.type].draw(element, context);
				});
				context.translate(center.x, center.y);
				context.rotate(-group.rotation);
				context.translate(-center.x, -center.y);
			};
			Group.bound = function (group) {
				var positions = group.elements.map(function (element) {
					return elements_elements[element.type].bound(element);
				});
				var min_x = positions.reduce(function (x, position) {
					return Math.min(x, position.x);
				}, Number.MAX_SAFE_INTEGER);
				var min_y = positions.reduce(function (y, position) {
					return Math.min(y, position.y);
				}, Number.MAX_SAFE_INTEGER);
				return {
					x: min_x,
					y: min_y,
					width:
						positions.reduce(function (x, position) {
							return Math.max(x, position.x + position.width);
						}, Number.MIN_SAFE_INTEGER) - min_x,
					height:
						positions.reduce(function (y, position) {
							return Math.max(y, position.y + position.height);
						}, Number.MIN_SAFE_INTEGER) - min_y,
				};
			};
			Group.move = function (group, position, last_position) {
				group.elements.forEach(function (element) {
					elements_elements[element.type].move(element, position, last_position);
				});
			};
			Group.collide = function (group, position) {
				var target = group.elements.find(function (element) {
					return elements_elements[element.type].collide(element, position);
				});
				return target ? true : false;
			};
			Group.resize = function (group, position, last_position, direction_x, direction_y) {
				group.elements.forEach(function (element) {
					elements_elements[element.type].resize(element, position, last_position, direction_x, direction_y);
				});
			};
			return Group;
		})(elements_element);
		/* harmony default export */ const group = Group; // CONCATENATED MODULE: ./components/elements/rectangle.ts

		var rectangle_extends =
			(undefined && undefined.__extends) ||
			(function () {
				var extendStatics = function (d, b) {
					extendStatics =
						Object.setPrototypeOf ||
						({ __proto__: [] } instanceof Array &&
							function (d, b) {
								d.__proto__ = b;
							}) ||
						function (d, b) {
							for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
						};
					return extendStatics(d, b);
				};
				return function (d, b) {
					if (typeof b !== 'function' && b !== null) throw new TypeError('Class extends value ' + String(b) + ' is not a constructor or null');
					extendStatics(d, b);
					function __() {
						this.constructor = d;
					}
					d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
				};
			})();

		var Rectangle = /** @class */ (function (_super) {
			rectangle_extends(Rectangle, _super);
			function Rectangle() {
				return (_super !== null && _super.apply(this, arguments)) || this;
			}
			Rectangle.draw = function (rectangle, context) {
				context.fillStyle = rectangle.color;
				var center = this.center(rectangle);
				context.translate(center.x, center.y);
				context.rotate(rectangle.rotation);
				context.beginPath();
				context.rect(-rectangle.width / 2, -rectangle.height / 2, rectangle.width, rectangle.height);
				context.fill();
				context.rotate(-rectangle.rotation);
				context.translate(-center.x, -center.y);
			};
			Rectangle.outline = function (rectangle, context, color, line_width) {
				context.strokeStyle = color;
				context.lineWidth = line_width;
				var center = this.center(rectangle);
				context.translate(center.x, center.y);
				context.rotate(rectangle.rotation);
				context.beginPath();
				context.rect(-rectangle.width / 2, -rectangle.height / 2, rectangle.width, rectangle.height);
				context.stroke();
				context.rotate(-rectangle.rotation);
				context.translate(-center.x, -center.y);
			};
			Rectangle.collide = function (rectangle, position) {
				position = this.rotatePoint(position, this.center(rectangle), -rectangle.rotation);
				return rectangle.x < position.x && position.x < rectangle.x + rectangle.width && rectangle.y < position.y && position.y < rectangle.y + rectangle.height;
			};
			Rectangle.bound = function (rectangle) {
				return {
					x: rectangle.x,
					y: rectangle.y,
					width: rectangle.width,
					height: rectangle.height,
				};
			};
			Rectangle.resize = function (rectangle, position, last_position, direction_x, direction_y) {
				var delta_x = (position.x - last_position.x) / 2;
				var delta_y = (position.y - last_position.y) / 2;
				rectangle.x += delta_x / 2;
				rectangle.y += delta_y / 2;
				rectangle.width += direction_x * delta_x;
				rectangle.height += direction_y * delta_y;
				rectangle.width = Math.abs(rectangle.width);
				rectangle.height = Math.abs(rectangle.height);
			};
			return Rectangle;
		})(elements_element);
		/* harmony default export */ const rectangle = Rectangle; // CONCATENATED MODULE: ./components/elements/elements.ts

		/* harmony default export */ const elements_elements = {
			circle: circle,
			ellipse: ellipse,
			group: group,
			rectangle: rectangle,
		}; // CONCATENATED MODULE: ./reducers/reducers.ts

		/* harmony default export */ const reducers = {
			overwrite: function (state, props) {
				while (state.length) state.pop();
				props.payload.state.forEach(function (element) {
					return state.push(element);
				});
			},
			view: function (state, props) {
				var _a = props.payload,
					id = _a.id,
					delta_x = _a.delta_x,
					delta_y = _a.delta_y,
					delta_scale = _a.delta_scale;
				var view = state.find(function (view) {
					return id === view.id;
				});
				if (delta_x) view.x += delta_x;
				if (delta_y) view.y += delta_y;
				if (delta_scale) view.scale += delta_scale;
			},
			cursor: function (state, props) {
				var _a = props.payload,
					id = _a.id,
					x = _a.x,
					y = _a.y,
					rotation = _a.rotation,
					type = _a.type;
				var cursor = state.find(function (cursor) {
					return id === cursor.id;
				});
				if (x) cursor.x = x;
				if (y) cursor.y = y;
				if (rotation) cursor.rotation = rotation;
				if (type) cursor.type = type;
			},
			move: function (state, props) {
				var _a = props.payload,
					position = _a.position,
					last_position = _a.last_position;
				state
					.filter(function (element) {
						return element.selected;
					})
					.forEach(function (element) {
						return elements_elements[element.type].move(element, position, last_position);
					});
			},
			select: function (state, props) {
				var element = state.find(function (element) {
					return element.id === props.payload.id;
				});
				if (element) element.selected = true;
			},
			unselectAll: function (state) {
				state.forEach(function (element) {
					return (element.selected = false);
				});
			},
			selectAll: function (state) {
				state.forEach(function (element) {
					return (element.selected = true);
				});
			},
			hover: function (state, props) {
				state.find(function (element) {
					return element.id === props.payload.id;
				}).hover = true;
			},
			unhover: function (state, props) {
				state.find(function (element) {
					return element.id === props.payload.id;
				}).hover = false;
			},
			resize: function (state, props) {
				var _a = props.payload,
					id = _a.id,
					position = _a.position,
					last_position = _a.last_position;
				var selected = state.filter(function (element) {
					return element.selected;
				});
				var target = state.find(function (element) {
					return id === element.id;
				});
				var center = elements_elements[target.type].center(target);
				var direction_x = Math.sign(last_position.x - center.x);
				var direction_y = Math.sign(last_position.y - center.y);
				selected.forEach(function (element) {
					return elements_elements[element.type].resize(element, position, last_position, direction_x, direction_y);
				});
			},
			rotate: function (state, props) {
				var _a = props.payload,
					id = _a.id,
					position = _a.position,
					last_position = _a.last_position;
				var selected = state.filter(function (element) {
					return element.selected;
				});
				var target = state.find(function (element) {
					return id === element.id;
				});
				var center = elements_elements[target.type].center(target);
				var rotation = Math.atan2(center.y - position.y, center.x - position.x) - Math.atan2(center.y - last_position.y, center.x - last_position.x);
				selected.forEach(function (element) {
					return elements_elements[element.type].rotate(element, rotation);
				});
				var cursor = state.find(function (cursor) {
					return '123' === cursor.id;
				});
				cursor.rotation += rotation;
			},
		};

		/******/ return __webpack_exports__;
		/******/
	})();
});
