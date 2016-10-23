'use strict';

var CrossChannel = require('cross-channel')
var chr = global.ch = new CrossChannel('red')
var chg = new CrossChannel('green')
chr.on('message',handleMessageEvent )
chg.on('message',handleMessageEvent )
		
function handleMessageEvent(e){
	global.window.console.log('Node main ' + e.sourceChannel, e)
}
