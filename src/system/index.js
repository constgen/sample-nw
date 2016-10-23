'use strict';

var gui = require('./gui.js')
var url = require('url')
var configuration = require('./configuration.js')

var whenLoaded
var config = configuration.whenReady
var nwGui = gui.whenReady

requireNodeModules()
defineCORS(nwGui, config)
openMainPage(nwGui, config)
whenLoaded = waitMainPageLoaded(nwGui, config)
showApp(whenLoaded, nwGui)

function log(message) {
	setTimeout(function () {
		console.log(message)
	}, 3000)
}

function logError(err) {
	setTimeout(function () {
		console.error(err)
	}, 3000)
}

function requireNodeModules() {
	return Promise.resolve().then(function () {
		require('./init.js')
		require('../modules/main.js')
	}).catch(function (err) {
		logError(err)
		throw err
	})
}

function defineCORS(nwGui, config) {
	return Promise.all([nwGui, config]).then(function (result) {
		var nwGui = result[0]
		var config = result[1]
		var trustedOrigins = config.trustedOrigins
		var origin = config.mainUrl

		//ensure is array
		trustedOrigins = (trustedOrigins && trustedOrigins.length) ? trustedOrigins : []

		function parseOrigin(remoteUrl) {
			//var location = url.parse(remoteUrl)
			var location = remoteUrl.split('://'),
				host = location.pop() || '',
				protocol = location.pop() || '';
			return {
				protocol: protocol,
				host: host
			};
		}

		function addToWhiteList(destination) {
			var protocol = destination.protocol.replace(':', '')
			var host = destination.host
			//Reference: App.addOriginAccessWhitelistEntry(sourceOrigin, destinationProtocol, destinationHost, allowDestinationSubdomains)
			nwGui.App.addOriginAccessWhitelistEntry(origin, protocol, host, true)
		}

		trustedOrigins
			.map(parseOrigin)
			.forEach(addToWhiteList);

		return result
	}).catch(function (err) {
		logError(err)
		throw err
	})
}

function openMainPage(nwGui, config) {
	return Promise.all([nwGui, config]).then(function (result) {
		var nwGui = result[0]
		var config = result[1]
		var mainUrl = config.mainUrl
		var nwWindow = nwGui.Window.get()
		var pageUrl = url.resolve('../', mainUrl)
		nwWindow.window.location.replace(pageUrl)
	}).catch(function (err) {
		logError(err)
		throw err
	})
}

function waitMainPageLoaded(nwGui, config) {
	return Promise.all([nwGui, config]).then(function (result) {
		var nwGui = result[0]
		var config = result[1]
		var nwWindow = nwGui.Window.get()

		if (config.hideBeforeLoaded) {
			return new Promise(function (resolve) {
				nwWindow.once('loaded', resolve);
			})
		}
	}).catch(function (err) {
		logError(err)
		throw err
	})
}

function showApp(whenLoaded, nwGui) {
	return Promise.all([whenLoaded, nwGui]).then(function (result) {
		var whenLoaded = result[0]
		var nwGui = result[1]
		var nwWindow = nwGui.Window.get()
		nwWindow.show()
	}).catch(function (err) {
		logError(err)
		throw err
	})
}


// process.on('uncaughtException', function (err) {
//  process.exit(99);
// });