'use strict';

var path = require('path');

var baseUrl = __dirname + '/..'
var dirPath = path.dirname(process.execPath)

var configuration = {
	baseUrl: baseUrl,
	dirPath: dirPath,
	readConfig: function(configUrl) {
		try {
			var config = require(configUrl)
			return Promise.resolve(config)
		} catch (err) {
			return Promise.reject(err)
		}
	},
	readExternalConfig: function(){
		return configuration.readConfig(dirPath + '/config.json')
	},
	readInternalConfig: function(){
		return configuration.readConfig('../config.json')
	}
}

configuration.whenReady = configuration.readExternalConfig().catch(configuration.readInternalConfig)

module.exports = configuration

