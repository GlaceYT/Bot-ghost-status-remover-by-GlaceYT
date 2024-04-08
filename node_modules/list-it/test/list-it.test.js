"use strict";
const assert = require('chai').assert;
const ListIt = require("../index.js");
describe("ListIt", () => {
    describe("constructor", () => {
        it("should set the autoAlign option", () => {
            const listit = new ListIt();
            assert.equal(listit.d([
                [0,1.1,222],
                [12,12.3,111],
                [123,1.23,0],
            ]).toString(),
                "  0  1.1  222\n" +
                " 12 12.3  111\n" +
                "123  1.23   0");
        });
        describe("opt.columnWidth", ()=>{
            it("should truncate the texts with the width", ()=>{
                const listit = new ListIt({columnWidth:[3]});
                listit.d([
                    ["ABCDEFG", "OPQRSTU"],
                    ["HIJKLMN", "VWXYZ"],
                ]);
                assert.equal(listit.toString(),
                    "ABC OPQRSTU\n" +
                    "HIJ VWXYZ  ");
            });
            it("should truncate the texts even if it represents number", ()=>{
                const listit = new ListIt({columnWidth:[,3]});
                listit.d([
                    ["123456", "123456"],
                    ["123456", "123456"],
                ]);
                assert.equal(listit.toString(),
                    "123456 123\n" +
                    "123456 123");
            });
            it("should not affect when a text converted from number data which is longer than the specified length exists in column", ()=>{
                const listit = new ListIt({columnWidth:3});
                listit.d([
                    ["ABCDEFGOPQRSTU", 1.2],
                    [123.456, "VWXYZ"],
                ]);
                assert.equal(listit.toString(),
                    "ABCDEFG 1.2\n" +
                    "123.456 VWX");
            });
            it("should not affect when all the text is shorter than the specified length", ()=>{
                const listit = new ListIt({columnWidth:6});
                listit.d([
                    ["ABCDEFGOPQRSTU", 1.2],
                    [123.456, "VWXYZ"],
                ]);
                assert.equal(listit.toString(),
                    "ABCDEFG   1.2\n" +
                    "123.456 VWXYZ");
            });
        });
    });
    describe("#d", ()=>{
        it("should accept the values for the cells", ()=>{
            const listit = new ListIt();
            listit.d([0, "1", true, null]);
            listit.d([1, "A", false, null]);
            assert.equal(listit.toString(), [
                "0 1 true  (null)",
                "1 A false (null)"
            ].join("\n"));
        });
        it("should convert the Date contained in Object in Array to ISO string", ()=>{
            const listit = new ListIt();
            listit.d([
                {d:new Date("2020-02-29T00:00:00.000Z")},
                {d:new Date("2020-03-03T00:00:00.000Z")},
            ]);
            assert.equal(
                listit.toString(),
                [
                    "d                       ",
                    "2020-02-29T00:00:00.000Z",
                    "2020-03-03T00:00:00.000Z",
                ].join("\n")
            );
        });
        describe("issue #37", ()=>{
            describe("Including various number data", ()=>{
                describe("At last column", ()=>{
                    const listit = new ListIt({autoAlign: true});
                    listit.d([
                        [2.8e-7],
                        [2.9e+45],
                        [2.9],
                        [2.25e-7],
                    ]);
                    const actual = listit.toString().split("\n").map(s => `|${s}|`);
                    it("[0]", ()=>{ assert.equal(actual[0], "|2.80e-7 |"); });
                    it("[1]", ()=>{ assert.equal(actual[1], "|2.90e+45|"); });
                    it("[2]", ()=>{ assert.equal(actual[2], "|2.9     |"); });
                    it("[3]", ()=>{ assert.equal(actual[3], "|2.25e-7 |"); });
                });
                describe("All number is positive", ()=>{
                    const listit = new ListIt({autoAlign: true});
                    listit.d([
                        [2.8e-7, "$"],
                        [2.9e+45, "$"],
                        [2.9, "$"],
                        [2.25e-7, "$"],
                    ]);
                    const actual = listit.toString().split("\n").map(s => `|${s}|`);
                    it("[0]", ()=>{ assert.equal(actual[0], "|2.80e-7  $|"); });
                    it("[1]", ()=>{ assert.equal(actual[1], "|2.90e+45 $|"); });
                    it("[2]", ()=>{ assert.equal(actual[2], "|2.9      $|"); });
                    it("[3]", ()=>{ assert.equal(actual[3], "|2.25e-7  $|"); });
                });
                describe("Including negative number", ()=>{
                    const listit = new ListIt({autoAlign: true});
                    listit.d([
                        [2.8e-7, "$"],
                        [-2.9e+45, "$"],
                        [2.9, "$"],
                        [2.25e-7, "$"],
                    ]);
                    const actual = listit.toString().split("\n").map(s => `|${s}|`);
                    it("[0]", ()=>{ assert.equal(actual[0], "| 2.80e-7  $|"); });
                    it("[1]", ()=>{ assert.equal(actual[1], "|-2.90e+45 $|"); });
                    it("[2]", ()=>{ assert.equal(actual[2], "| 2.9      $|"); });
                    it("[3]", ()=>{ assert.equal(actual[3], "| 2.25e-7  $|"); });
                });
            });
        });
    });
    describe(".buffer", () => {
        it("should not set the autoAlign option", () => {
            const listit = ListIt.buffer();
            assert.equal(listit.d([
                [0,1.1,222],
                [12,12.3,111],
                [123,1.23,0],
            ]).toString(),
                "0   1.1  222\n" +
                "12  12.3 111\n" +
                "123 1.23 0  ");
        });
        it("should format an array of object", () => {
            const listit = ListIt.buffer();
            assert.equal(listit.d([
                {"A": 0, "B": 2},
                {"A": 0.1, "B": 2.34},
            ]).toString(),
                "A   B   \n" +
                "0   2   \n" +
                "0.1 2.34");
        });
    });
    describe(".setColumnWidth", ()=>{
        it("should return the instance", ()=>{
            const listit = new ListIt();
            assert.deepEqual(listit.setColumnWidth(0, 10), listit);
        });
        it("should throw the index is not a number", ()=>{
            assert.throws(()=>{
                const listit = new ListIt();
                listit.d([
                    ["ABCDEFG", "OPQRSTU"],
                    ["HIJKLMN", "VWXYZ"],
                ]).setColumnWidth("", 10);
                assert.equal(listit.toString(),
                    "ABC OPQRSTU\n" +
                    "HIJ VWXYZ  ");

            });
        });
        it("should throw the width is not a number but empty string", ()=>{
            assert.throws(()=>{
                const listit = new ListIt();
                listit.d([
                    ["ABCDEFG", "OPQRSTU"],
                    ["HIJKLMN", "VWXYZ"],
                ]).setColumnWidth(0, "");
                assert.equal(listit.toString(),
                    "ABC OPQRSTU\n" +
                    "HIJ VWXYZ  ");

            });
        });
        it("should throw the width is not a number but boolean", ()=>{
            assert.throws(()=>{
                const listit = new ListIt();
                listit.d([
                    ["ABCDEFG", "OPQRSTU"],
                    ["HIJKLMN", "VWXYZ"],
                ]).setColumnWidth(0, true);
                assert.equal(listit.toString(),
                    "ABC OPQRSTU\n" +
                    "HIJ VWXYZ  ");

            });
        });
        it("should accept null for width that remove the previous specification", ()=>{
            const listit = new ListIt();
            listit.d([
                ["ABCDEFG", "OPQRSTU"],
                ["HIJKLMN", "VWXYZ"],
            ]).setColumnWidth(0, 3);
            listit.setColumnWidth(0, null);
            assert.equal(listit.toString(),
                "ABCDEFG OPQRSTU\n" +
                "HIJKLMN VWXYZ  ");
        });
        it("should truncate the texts with the width", ()=>{
            const listit = new ListIt();
            listit.d([
                ["ABCDEFG", "OPQRSTU"],
                ["HIJKLMN", "VWXYZ"],
            ]).setColumnWidth(0, 3);
            assert.equal(listit.toString(),
                "ABC OPQRSTU\n" +
                "HIJ VWXYZ  ");
        });
        it("should truncate the texts even if it represents number", ()=>{
            const listit = new ListIt();
            listit.d([
                ["123456", "123456"],
                ["123456", "123456"],
            ]).setColumnWidth(1, 3);
            assert.equal(listit.toString(),
                "123456 123\n" +
                "123456 123");
        });
        it("should not affect when a text converted from number data which is longer than the specified length exists in column", ()=>{
            const listit = new ListIt();
            listit.d([
                ["ABCDEFGOPQRSTU", 1.2],
                [123.456, "VWXYZ"],
            ]).setColumnWidth(0, 3);
            assert.equal(listit.toString(),
                "ABCDEFG   1.2\n" +
                "123.456 VWXYZ");
        });
        it("should not affect when all the text is shorter than the specified length", ()=>{
            const listit = new ListIt();
            listit.d([
                ["ABCDEFGOPQRSTU", 1.2],
                [123.456, "VWXYZ"],
            ]).setColumnWidth(1, 6);
            assert.equal(listit.toString(),
                "ABCDEFGOPQRSTU   1.2\n" +
                "       123.456 VWXYZ");
        });
    });
    describe(".setColumnWidthAll", ()=>{
        it("should return the instance", ()=>{
            const listit = new ListIt();
            assert.deepEqual(listit.setColumnWidthAll(0, 10), listit);
        });
        it("should throw the width is not a number", ()=>{
            assert.throws(()=>{
                const listit = new ListIt();
                listit.d([
                    ["ABCDEFG", "OPQRSTU"],
                    ["HIJKLMN", "VWXYZ"],
                ]).setColumnWidthAll("");
                assert.equal(listit.toString(),
                    "ABC OPQRSTU\n" +
                    "HIJ VWXYZ  ");

            });
        });
        it("should accept null for width that remove the previous specification", ()=>{
            const listit = new ListIt();
            listit.d([
                ["ABCDEFG", "OPQRSTU"],
                ["HIJKLMN", "VWXYZ"],
            ]).setColumnWidth(0, 3);
            listit.setColumnWidthAll(null);
            assert.equal(listit.toString(),
                "ABCDEFG OPQRSTU\n" +
                "HIJKLMN VWXYZ  ");
        });
        it("should throw the width element is not a number", ()=>{
            assert.throws(()=>{
                const listit = new ListIt();
                listit.d([
                    ["ABCDEFG", "OPQRSTU"],
                    ["HIJKLMN", "VWXYZ"],
                ]).setColumnWidthAll([3, true]);
                assert.equal(listit.toString(),
                    "ABC OPQRSTU\n" +
                    "HIJ VWXYZ  ");

            });
        });
        it("should truncate the texts with the width", ()=>{
            const listit = new ListIt();
            listit.d([
                ["ABCDEFG", "OPQRSTU"],
                ["HIJKLMN", "VWXYZ"],
            ]).setColumnWidthAll([3]);
            assert.equal(listit.toString(),
                "ABC OPQRSTU\n" +
                "HIJ VWXYZ  ");
        });
        it("should truncate the texts even if it represents number", ()=>{
            const listit = new ListIt();
            listit.d([
                ["123456", "123456"],
                ["123456", "123456"],
            ]).setColumnWidthAll([undefined, 3]);
            assert.equal(listit.toString(),
                "123456 123\n" +
                "123456 123");
        });
        it("should not affect when a text converted from number data which is longer than the specified length exists in column", ()=>{
            const listit = new ListIt();
            listit.d([
                ["ABCDEFGOPQRSTU", 1.2],
                [123.456, "VWXYZ"],
            ]).setColumnWidthAll(3);
            assert.equal(listit.toString(),
                "ABCDEFG 1.2\n" +
                "123.456 VWX");
        });
        it("should not affect when all the text is shorter than the specified length", ()=>{
            const listit = new ListIt();
            listit.d([
                ["ABCDEFGOPQRSTU", 1.2],
                [123.456, "VWXYZ"],
            ]).setColumnWidthAll(6);
            assert.equal(listit.toString(),
                "ABCDEFG   1.2\n" +
                "123.456 VWXYZ");
        });
    });
    describe("Header", ()=>{
        describe("opt.header for constructor", ()=>{
            it("should throw, if it is not an array", ()=>{
                assert.throw(()=>{
                    new ListIt({ header: "Invalid" });
                });
                assert.throw(()=>{
                    new ListIt({ header: 999 });
                });
                assert.throw(()=>{
                    new ListIt({ header: {} });
                });
                assert.throw(()=>{
                    new ListIt({ header: ()=>{} });
                });
            });
            it("should make a header row", () => {
                const header = ["Item No.", "VAL", "EXTRA VALUE"];
                const listit = new ListIt({header});
                assert.equal(listit.d([
                    [1,1.1,222],
                    [2,12.3,111],
                    [3,1.23,0],
                ]).toString(),
                    "Item No. VAL   EXTRA VALUE\n" +
                    "       1  1.1          222\n" +
                    "       2 12.3          111\n" +
                    "       3  1.23           0");
            });
        });
        describe("#setHeader", ()=>{
            it("should throw, if the parameter is not an array", ()=>{
                assert.throw(()=>{
                    const listit = new ListIt();
                    listit.setHeaderRow("Invalid");
                });
                assert.throw(()=>{
                    const listit = new ListIt();
                    listit.setHeaderRow(999);
                });
                assert.throw(()=>{
                    const listit = new ListIt();
                    listit.setHeaderRow({});
                });
                assert.throw(()=>{
                    const listit = new ListIt();
                    listit.setHeaderRow(()=>{});
                });
            });
            it("should make a header row", () => {
                const listit = new ListIt();
                assert.equal(listit.setHeaderRow(
                    ["Item No.", "VAL", "EXTRA VALUE"]
                ).d([
                    [1,1.1,222],
                    [2,12.3,111],
                    [3,1.23,0],
                ]).toString(),
                    "Item No. VAL   EXTRA VALUE\n" +
                    "       1  1.1          222\n" +
                    "       2 12.3          111\n" +
                    "       3  1.23           0");
            });
            it("should not make a blank header", () => {
                const listit = new ListIt();
                assert.equal(listit.setHeaderRow(
                    ["Item No." ]
                ).d([
                    [1,1.1,222],
                    [2,12.3,111],
                    [3,1.23,0],
                ]).toString(),
                    "Item No.          \n" +
                    "       1  1.1  222\n" +
                    "       2 12.3  111\n" +
                    "       3  1.23   0");
            });
        });
    });
    describe("Auto header feature", ()=>{
        const objectArray = [
            {"No": 1, "Data": "Awesome data#1"},
            {"No": 2, "Data": "Awesome data#2"},
            {"No": 3, "Data": "Awesome data#3"},
        ];
        describe("when an array of object is offered to #d", ()=>{
            describe("And there is no header", ()=>{
                describe("And headerBold option is set", ()=>{
                    it("should generate a header row", ()=>{
                        const listit = new ListIt({headerBold:true});
                        listit.d(objectArray);
                        assert.deepEqual(listit.header, ["No", "Data"]);
                    });
                });
                describe("And headerColor option is set", ()=>{
                    it("should generate a header row", ()=>{
                        const listit = new ListIt({headerColor:"red"});
                        listit.d(objectArray);
                        assert.deepEqual(listit.header, ["No", "Data"]);
                    });
                });
                describe("And headerUnderline option is set", ()=>{
                    it("should generate a header row", ()=>{
                        const listit = new ListIt({headerUnderline:true});
                        listit.d(objectArray);
                        assert.deepEqual(listit.header, ["No", "Data"]);
                    });
                });
                describe("And also all options about header are set", ()=>{
                    it("should generate a header row", ()=>{
                        const listit = new ListIt({
                            headerBold:true,
                            headerColor:"red",
                            headerUnderline:true,
                        });
                        listit.d(objectArray);
                        assert.deepEqual(listit.header, ["No", "Data"]);
                    });
                });
                describe("But no options about header is set", ()=>{
                    it("should not generate a header row", ()=>{
                        const listit = new ListIt();
                        listit.d(objectArray);
                        assert.isUndefined(listit.header);
                    });
                });
            });
            describe("But a header is already specified", ()=>{
                describe("Even all options about header are set", ()=>{
                    it("should not override the header row from the objects", ()=>{
                        const listit = new ListIt({
                            headerBold:true,
                            headerColor:"red",
                            headerUnderline:true,
                        });
                        listit.setHeaderRow(["Index", "Name"]);
                        listit.d(objectArray);
                        assert.deepEqual(listit.header, ["Index", "Name"]);
                    });
                });
            });
        });
    });
});
