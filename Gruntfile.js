'use strict'

var manifest = require('./package.json')

module.exports = function (grunt) {
	var BUILD_DIR = './build'
	var APP_NAME = manifest.name
	var NW_VERSION = '0.11.6'

	grunt.initConfig({
		nodewebkit: {
			all: {
				options: {
					files: './src/**/**',
					buildDir: BUILD_DIR, // Where the build version of my node-webkit app is saved
					cacheDir: './nw', //This is where the cached node-webkit downloads are
					platforms: ['win32'], //'win', 'osx', 'linux32', 'linux64'
					appName: APP_NAME, //The Name of your node-webkit app. If this value is set to null, it will autodetect the name form your projects package.json. This will be used to generate a plist file for mac.
					appVersion: null, //The version of your node-webkit app. If this value is set to null, it will autodetect the version form your projects package.json. This will be used to generate a plist file for mac.
					version: NW_VERSION, //The version of node-webkit you want to use. Per default it looks up the latest version. Here is a list of all available releases: https://github.com/rogerwang/node-webkit/wiki/Downloads-of-old-versions
					forceDownload: false, //This will delete everything in your build_dir directory, including the cached downloaded prebuilt binaries
					macCredits: false, //MAC ONLY: The path to your credits.html file. If your don't provide your own it will use the one provided by node-webkit
					macIcns: false, //The path to your ICNS icon file. If your don't provide your own it will use the one provided by node-webkit
					macZip: false, //MAC ONLY: Use a app.nw folder instead of ZIP file, this significantly improves the startup speed of applications on mac, since no decompressing is needed. Builds on other platforms will still use ZIP files.
					winIco: './src/images/exe_icon.ico', //false, //WINDOWS ONLY: The path to your ICO icon file. If your don't provide your own it will use the one provided by node-webkit. If you are building on MAC or LINUX you must have Wine installed to use this option.
					macPlist: false //MAC ONLY: if you supply a string to a Plist file it will use it. Otherwise it will generate something usefull from your package.json
				},
				src: ['./src/**/*'] // Your node-webkit app
			}
		},
		copy: {
			win32: {
				files: [
					//copy multimedia codecs
					{
						src: 'plugins/win32/ffmpegsumo.dll',
						dest: BUILD_DIR + '/' + APP_NAME + '/win32/ffmpegsumo.dll',
						flatten: true
					},
					//copy config
					{
						src: 'src/config.json',
						dest: BUILD_DIR + '/' + APP_NAME + '/win32/config.json',
						flatten: true
					}
				]
			},
			win64: {
				files: [
					
				]
			},
			linux32: {
				files: [
					//copy multimedia codecs
					{
						src: 'plugins/linux32/libffmpegsumo.so',
						dest: BUILD_DIR + '/' + APP_NAME + '/linux32/libffmpegsumo.so',
						flatten: true
					},
					//copy config
					{
						src: 'src/config.json',
						dest: BUILD_DIR + '/' + APP_NAME + '/linux32/config.json',
						flatten: true
					}
				]
			},
			linux64: {
				files: [
					//copy multimedia codecs
					{
						src: 'plugins/linux64/libffmpegsumo.so',
						dest: BUILD_DIR + '/' + APP_NAME + '/linux64/libffmpegsumo.so',
						flatten: true
					},
					//copy config
					{
						src: 'src/config.json',
						dest: BUILD_DIR + '/' + APP_NAME + '/linux64/config.json',
						flatten: true
					}
				]
			},
			mac32: {
				files: [
					//copy multimedia codecs
					{
						src: 'plugins/mac/ffmpegsumo.so',
						dest: BUILD_DIR + '/' + APP_NAME + '/osx32/' + APP_NAME + '.app/Contents/Frameworks/node-webkit Framework.framework/Libraries/ffmpegsumo.so',
						flatten: true
					},
					//copy config
					{
						src: 'src/config.json',
						dest: BUILD_DIR + '/' + APP_NAME + '/osx32/config.json',
						flatten: true
					}
				]
			},
			mac64: {
				files: [
					//copy multimedia codecs
					{
						src: 'plugins/mac/ffmpegsumo.so',
						dest: BUILD_DIR + '/' + APP_NAME + '/osx64/' + APP_NAME + '.app/Contents/Frameworks/node-webkit Framework.framework/Libraries/ffmpegsumo.so',
						flatten: true
					},
					//copy config
					{
						src: 'src/config.json',
						dest: BUILD_DIR + '/' + APP_NAME + '/osx64/config.json',
						flatten: true
					}
				]
			}
		},
		clean: {
			build: [BUILD_DIR]
		}
	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-node-webkit-builder');
	grunt.loadNpmTasks('grunt-contrib-copy');

	// Tasks
	grunt.registerTask('build', ['clean', 'nodewebkit:all', 'copy:win32', 'copy:win64', 'copy:mac32', 'copy:mac64', 'copy:linux64', 'copy:linux32']);
	grunt.registerTask('default', ['build']);
};




