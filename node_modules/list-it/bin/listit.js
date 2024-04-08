#!/usr/bin/env node
"use strict";

const { name, version, repository, homepage, author, license } =
    require(`${__dirname}/../package.json`);

const USAGE =
`Usage: listit [input-filename] [OPTIONS]

Outputs the array included in JSON to the console in tabular format.
Non-array data is displayed as is.

OPTIONS:
[[OPTIONS]]

----
This command is included in the npm ${name}@${version}

Repository: ${repository.url}
Homepage: ${homepage}

Copyright (c) 2020 ${author}
This software is released under the ${license} License
`;

const PARAMETERS = [
    "inputFilename:string",
];

const OPTIONS = [
    ["h", "help", "Print this help message"],
    ["v", "version", "Print the version of this package"],
];

const debug = require("debug")("listit");
const fs = require("fs");
const Getopt = require("node-getopt").create(OPTIONS).bindHelp(USAGE);
const HashArg = require("hash-arg");
const ListIt = require("../index.js");
const readline = require("readline");
const ansi = require("ansi-escape-sequences");

const readFile = inputFilename => {
    return new Promise((resolve, reject)=>{
        fs.readFile(inputFilename, (err, data) => {
            if(err) {
                reject(err);
            } else {
                resolve(data.toString());
            }
        });
    });
};
const readStdin = () => {
    return new Promise((resolve, reject)=>{
        try {
            const rl = readline.createInterface({ input: process.stdin });
            const inputLines = [];
            rl.on("line", line => { inputLines.push(line); });
            rl.on("close", ()=>{
                const json = inputLines.join("\r\n");
                resolve(json);
            });
        } catch (err) {
            reject(err);
        }
    });
};

const readInput = async inputFilename => {
    if(inputFilename) {
        return await readFile(inputFilename);
    }
    return await readStdin();
};

const _createList = (resultBuffer, inputData, name) => {
    if(Array.isArray(inputData)) {
        const listit = new ListIt({
            headerBold: true,
            headerColor: "green",
            headerUnderline: true,
        });
        resultBuffer.push({
            name, type: "list",
            list: listit.d(inputData),
        });
        return;
    }
    if(typeof inputData === "object") {
        Object.keys(inputData).forEach(
            key => _createList(
                resultBuffer, inputData[key], `${name}.${key}`
            )
        );
        return;
    }
    resultBuffer.push({ name, type: "value", value: inputData });
};
const createList = (inputData) => {
    const resultBuffer = [];
    _createList(resultBuffer, inputData, "$");
    return resultBuffer;
};
(async () => {
    const { options, argv } = Getopt.parseSystem();
    debug(`options:${JSON.stringify(options, null, 2)}`);

    if(options.version) {
        console.log(`${version}`);
        process.exit(1);
    }

    const { inputFilename } = HashArg.get(PARAMETERS, argv);
    debug(`inputFilename:${inputFilename}`);

    try {
        const inputData = JSON.parse(await readInput(inputFilename));
        debug(JSON.stringify(inputData, null, 2));

        const result = createList(inputData);
        result.forEach( data => {
            console.log("");
            console.log(`${ansi.style.bold}[${data.name}]${ansi.style.reset}:`);
            console.log(`${data[data.type].toString()}`);
        });
    } catch(err) {
        console.error(`Error in processing ${
            inputFilename ? `a file ${
                JSON.stringify(inputFilename)
            }`:"stdin"
        }`);
        console.error(err.message);
        debug(err.stack);
    }
})();
