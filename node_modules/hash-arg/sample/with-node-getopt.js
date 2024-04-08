getopt = require("node-getopt").create([
    ['s', '', 'short option'],
    ['l', 'long', 'long option'],
    ['S', 'short-with-arg=ARG', 'option with argument']
]).parseSystem();

args = require("../lib").get([
        "inputFilePath",
        {
            "name":"outputFilePath",
            "default": "out.json"
        }
        ], getopt.argv);

console.log(JSON.stringify(args, null, "  "));
