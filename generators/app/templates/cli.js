#!/usr/bin/env node
'use strict';

const meow = require('meow');
const router = require('./src/router');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

updateNotifier({ pkg }).notify();

const cli = meow(`
Usage

   $ <%= moduleName %> <command> <params>

   $ <%= moduleName %> sample <param>             # Uses the <PARAM>
   $ <%= moduleName %> other <param>              # Other the <PARAM>
   $ <%= moduleName %> another <param>            # Another the <PARAM>
   
 Examples

   $ <%= moduleName %> sample TEST                # Uses the TEST
   $ <%= moduleName %> sample YOLO                # Uses the YOLO
   $ <%= moduleName %> other YOLO                 # Uses the YOLO
   $ <%= moduleName %> another YOLO               # Uses the YOLO
`,
	{
		alias: {}
	});

if (cli.input.length > 0) {
	router.init(cli.input, cli.flags);
} else {
	cli.showHelp(2);
}