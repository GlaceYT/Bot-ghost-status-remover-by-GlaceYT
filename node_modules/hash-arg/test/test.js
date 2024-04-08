var chai = require("chai");
var HashArg = require('../lib/index.js');
const assert = chai.assert;
process.argv = ["node", "mocha", "AAA", "BBB", "CCC"];

describe("hash-arg", function() {
    var test_cases = [
        [
            "A B C D", null,
            {
                "A":"AAA",
                "B":"BBB",
                "C":"CCC",
                "D": null
            }
        ],[
            "A B C D", process.argv,
            {
                "A":"AAA",
                "B":"BBB",
                "C":"CCC",
                "D": null
            }
        ],
        [
            "A B C", ["1","2"],
            {
                "A":"1",
                "B":"2",
                "C":null
            }
        ],[
            ["A", "B", "C"], ["1","2"],
            {
                "A":"1",
                "B":"2",
                "C":null
            }
        ],[
            [
                { "name": "A", "default":"" },
                { "name": "B", },
                { "name": "C", "default":1234 }
            ],
            [/* NO PARAMETER */],
            {
                "A" : "",
                "B" : null,
                "C" : 1234
            }
        ],[
            [
                { "name": "A", "default":"" },
                { "name": "B", },
                { "name": "C", "default":1234 }
            ],
            [ "AAA", "BBB", "CCC", "DDD", "EEE"],
            {
                "A" : "AAA",
                "B" : "BBB",
                "C" : "CCC",
                "": ["DDD", "EEE"]
            }
        ],[
            [
                { "name": "str", "type": "string" },
                { "name": "num", "type": "number" },
                { "name": "numstr", "type": "string" },
                { "name": "strnum", "type": "number" },
                { "name": "dflstr" }
            ],
            [ "AAA", "123", "123", "ABC", "456" ],
            {
                "str" : "AAA",
                "num" : 123,
                "numstr" : "123",
                "strnum" : "NaN",
                "dflstr": "456"
            }
        ],[
            [
                { "name": "num", "type": "number[]" },
            ],
            [ "123", "456", "789", "A" ],
            {
                "num" : [123,456,789,"NaN"]
            }
        ],[
            [
                { "name": "str", "type": "string" },
                { "name": "num", "type": "number[]" },
            ],
            [ "AAA", "123", "456", "789", "A" ],
            {
                "str" : "AAA",
                "num" : [123,456,789,"NaN"]
            }
        ],[
            [
                { "name": "str", "type": "string[]" }
            ],
            [ "123", "456", "789", "A" ],
            {
                "str" : ["123","456","789","A"]
            }
        ],[
            [
                { "name": "num", "type": "number" },
                { "name": "str", "type": "string[]" }
            ],
            [ "AAA", "123", "456", "789", "A" ],
            {
                "num" : "NaN",
                "str" : ["123","456","789","A"]
            }
        ],[
            [
                "string str",
                "number num",
                "string numstr",
                "number strnum",
                "dflstr"
            ],
            [ "AAA", "123", "123", "ABC", "456" ],
            {
                "str" : "AAA",
                "num" : 123,
                "numstr" : "123",
                "strnum" : "NaN",
                "dflstr": "456"
            }
        ],[
            [
                "str:string",
                " num : number ",
                "numstr : string",
                " strnum:number ",
                "dflstr"
            ],
            [ "AAA", "123", "123", "ABC", "456" ],
            {
                "str" : "AAA",
                "num" : 123,
                "numstr" : "123",
                "strnum" : "NaN",
                "dflstr": "456"
            }
        ],[
            "string str;number num; string numstr ;number strnum  ;  dflstr",
            [ "AAA", "123", "123", "ABC", "456" ],
            {
                "str" : "AAA",
                "num" : 123,
                "numstr" : "123",
                "strnum" : "NaN",
                "dflstr": "456"
            }
        ],[
            "str:string;num: number; numstr: string ;strnum:number ;  dflstr",
            [ "AAA", "123", "123", "ABC", "456" ],
            {
                "str" : "AAA",
                "num" : 123,
                "numstr" : "123",
                "strnum" : "NaN",
                "dflstr": "456"
            }
        ],[
            ["string[] str"],
            [ "AAA", "123", "123", "ABC", "456" ],
            {
                "str" : ["AAA", "123", "123", "ABC", "456"]
            }
        ],[
            ["number[] num"],
            [ "0", "123", "456"],
            {
                "num" : [0, 123, 456]
            }
        ],[
            ["x", "string[] str"],
            [ "AAA", "123", "123", "ABC", "456" ],
            {
                "x":"AAA",
                "str" : ["123", "123", "ABC", "456"]
            }
        ],[
            ["x", "number[] num"],
            [ "0", "123", "456"],
            {
                "x" : "0",
                "num" : [123, 456]
            }
        ],[
            ["str:string[]"],
            [ "AAA", "123", "123", "ABC", "456" ],
            {
                "str" : ["AAA", "123", "123", "ABC", "456"]
            }
        ],[
            ["num: number[]"],
            [ "0", "123", "456"],
            {
                "num" : [0, 123, 456]
            }
        ],[
            'A="";B;C=1234', [/* NO PARAMETER */],
            {
                "A" : "",
                "B" : null,
                "C" : 1234
            }
        ],[
            'C=1234', [/* NO PARAMETER */],
            {
                "C" : 1234
            }
        ],[
            'C:number=1234', [/* NO PARAMETER */],
            {
                "C" : 1234
            }
        ],[
            'C:string=1234', [/* NO PARAMETER */],
            {
                "C" : "1234"
            }
        ],[
            'A:string="ABC"', [/* NO PARAMETER */],
            {
                "A" : "ABC"
            }
        ],
    ];

    // Run all test case
    test_cases.forEach(function(test_case) {
        it(JSON.stringify(test_case[0]), function() {
            var args = HashArg.get(test_case[0], test_case[1]);
            chai.assert.deepEqual(test_case[2], args);
        });
    });
    describe("The array type can be specified for not only last argumnent definition", function() {
        describe("C-style type specification", function() {
            it("should not throw an error for array type of string", function() {
                assert.doesNotThrow(()=>{
                    HashArg.get("string[] str", "string[] x");
                });
            });
            it("should throw an error for array type of number", function() {
                assert.doesNotThrow(()=>{
                    HashArg.get("number[] num", "number[] n");
                });
            });
        });
        describe("UML-style type specification", function() {
            it("should not throw an error for array type of string", function() {
                assert.doesNotThrow(()=>{
                    HashArg.get("str:string[]", "x:string[]");
                });
            });
            it("should throw an error for array type of number", function() {
                assert.doesNotThrow(()=>{
                    HashArg.get("num:number[]", "n:number[]");
                });
            });
        });
    });
    describe("About Array type specification", ()=>{
        describe("Type name omitting", ()=>{
            it("should recognize the type is Array<string> in C-style", ()=>{
                const definition = ["[] arg"];
                const argv = ["1", "AB", "CD"];
                assert.deepEqual(HashArg.get( definition, argv ),
                    { arg: ["1", "AB", "CD"] });
            });
            it("should recognize the type is Array<string> in UML-style", ()=>{
                const definition = ["arg:[]"];
                const argv = ["1", "AB", "CD"];
                assert.deepEqual(HashArg.get( definition, argv ),
                    { arg: ["1", "AB", "CD"] });
            });
        });
        it("should be at last position in C-style", ()=>{
            assert.throw(()=>{
                const definition = ["string[] sa", "string s"];
                const argv = ["1", "AB", "CD"];
                JSON.stringify(HashArg.get( definition, argv ));
            });
        });
        it("should be at last position in UML style", ()=>{
            assert.throw(()=>{
                const definition = ["sa:string[]", "s:string"];
                const argv = ["1", "AB", "CD"];
                JSON.stringify(HashArg.get( definition, argv ));
            });
        });
        describe("Less parameters are supplied than definition", ()=>{
            it("should be null for the parameter that is not supplied", ()=>{
                const definition = ["string a", "string b", "string c"];
                const argv = ["A", "B"];
                const args = HashArg.get( definition, argv );
                assert.isNull(args.c);
            });
        });
        describe("Definition with object", ()=>{
            describe("Without name", ()=>{
                it("should name the parameter with its index", ()=>{
                    const definition = [ { type: "string" }, { type: "string" } ];
                    const argv = [ "A", "B" ];
                    const args = HashArg.get( definition, argv );
                    assert.equal(args["#0"], "A");
                    assert.equal(args["#1"], "B");
                });
                it("should recognize the parameter is array", ()=>{
                    const definition = [{ type: "string[]" }];
                    const argv = [ "A", "B" ];
                    const args = HashArg.get( definition, argv );
                    assert.deepEqual(args["#0"], ["A", "B"]);
                });
                it("should recognize the parameter is array", ()=>{
                    const definition = [{ type: "string", default: "X" }];
                    const argv = [ ];
                    const args = HashArg.get( definition, argv );
                    assert.equal(args["#0"], "X");
                });
            });
        });
    });
});
