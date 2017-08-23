#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const Utils = require('./utils/utils');
const log = console.log;

const SampleTask = require('./tasks/sample_task');

// Main code //
const self = module.exports = {
	init: (input, flags) => {
		const currentFolder = process.cwd();

		const first = input[0];
		const params = input.subarray(1, input.length);

		switch (first.toLowerCase()) {
			case 'sample':
				SampleTask.init(params);
				break;
		
			default:
				log(`Sorry, cant find ${first}`);
		}
	}
};