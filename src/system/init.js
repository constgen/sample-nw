'use strict';

var flashTrust = require('nw-flash-trust')
var path = require('path')
var gui = require('./gui.js')

var baseUrl = __dirname + '/..'
var dirPath = path.dirname(process.execPath)

//Enable flash support
gui.whenReady.then(function(nwGui) {
	var appDataDirPath = nwGui.App.dataPath
	var trustManager = flashTrust.initSync('nw-app')
	trustManager.add(appDataDirPath);
	//trustManager.add(path.normalize(configuration.baseUrl));
})

gui.whenReady.then(function (nwGui) {
	//clean HTTP cache. Fixes a lot of issues
	nwGui.App.clearCache()
})