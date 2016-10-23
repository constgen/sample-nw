'use strict';

var TIMER_INTERVAL = 10,
	gui = exports; //exportable

gui.whenReady = new Promise(function (resolve) {
	var uiTimerId = setInterval(function () {
		var gui
		var win = global.window;
		if (win) {
			clearInterval(uiTimerId);
			if (win.nwDispatcher) {
				gui = win.nwDispatcher.requireNwGui();
			} 
			else if (win.require) {
				gui = win.require('nw.gui');
			}
			resolve(gui);
		}
	}, TIMER_INTERVAL);
});