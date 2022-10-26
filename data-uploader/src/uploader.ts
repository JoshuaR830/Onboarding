#!/usr/bin/env node

import * as readline from 'readline';
import { FileImporter } from './file-importer';


console.log('Hello');

let fileNameReader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

fileNameReader.question('Enter the filename', (fileName) => {
    let fileImporter = new FileImporter();
    fileImporter.importCsvFileAsJson(fileName);
});
