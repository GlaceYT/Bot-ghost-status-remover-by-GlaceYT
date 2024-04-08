"use strict";
const assert = require('chai').assert;
const ListItBuffer = require("../lib/list-it-buffer.js");
const ansi = require("ansi-escape-sequences");
describe("ListItBuffer", () => {
    describe(".isMultiDimensionalArray", () => {
        it("should throw error if the paramenter is not an array", () => {
            assert.throw(()=>{
                ListItBuffer.isMultiDimensionalArray(0);
            });
            assert.throw(()=>{
                ListItBuffer.isMultiDimensionalArray({});
            });
            assert.throw(()=>{
                ListItBuffer.isMultiDimensionalArray("a");
            });
        });
        it("should be false if it includes an no-array element", () => {
            assert.isFalse(ListItBuffer.isMultiDimensionalArray([0]));
            assert.isFalse(ListItBuffer.isMultiDimensionalArray([{}]));
            assert.isFalse(ListItBuffer.isMultiDimensionalArray(["a"]));
            assert.isFalse(ListItBuffer.isMultiDimensionalArray([[],0]));
            assert.isFalse(ListItBuffer.isMultiDimensionalArray([0,[]]));
            assert.isFalse(ListItBuffer.isMultiDimensionalArray([[],0,[]]));
        });
        it("should be true if all the elements are array", () => {
            assert.isTrue(ListItBuffer.isMultiDimensionalArray([[]]));
            assert.isTrue(ListItBuffer.isMultiDimensionalArray([[],[]]));
            assert.isTrue(ListItBuffer.isMultiDimensionalArray([[1,"a"],[2,"b"]]));
        });
    });
    describe(".isObjectArray", () => {
        it("should throw error if the paramenter is not an array", () => {
            assert.throw(()=>{
                ListItBuffer.isObjectArray(0);
            });
            assert.throw(()=>{
                ListItBuffer.isObjectArray({});
            });
            assert.throw(()=>{
                ListItBuffer.isObjectArray("a");
            });
        });
        it("should throw error if the element is undefined", () => {
            assert.throw(()=>{
                ListItBuffer.isObjectArray([]);
            });
        });
        it("should throw error if the element is null", () => {
            assert.throw(()=>{
                ListItBuffer.isObjectArray([null]);
            });
        });
        it("should throw error if any element is null", () => {
            assert.throw(()=>{
                ListItBuffer.isObjectArray([{}, null]);
            });
        });
        it("should be false if it includes an no-object element", () => {
            assert.isFalse(ListItBuffer.isObjectArray([0]));
            assert.isFalse(ListItBuffer.isObjectArray(["a"]));
            assert.isFalse(ListItBuffer.isObjectArray([[],0]));
            assert.isFalse(ListItBuffer.isObjectArray([0,[]]));
            assert.isFalse(ListItBuffer.isObjectArray([[],0,[]]));
            assert.isFalse(ListItBuffer.isObjectArray([{},0]));
            assert.isFalse(ListItBuffer.isObjectArray([0,{}]));
            assert.isFalse(ListItBuffer.isObjectArray([{},0,{}]));
        });
        it("should be false if it includes instances of different classes", () => {
            function A(){this.a=0;}
            function B(){this.b=1;}
            assert.isFalse(ListItBuffer.isObjectArray([new A(), new B()]));
        });
        it("should be true if all the elements are object", () => {
            function A(){this.a=0;}
            function B(){this.b=1;}
            assert.isTrue(ListItBuffer.isObjectArray([{}]));
            assert.isTrue(ListItBuffer.isObjectArray([{},{}]));
            assert.isTrue(ListItBuffer.isObjectArray([[1,"a"],[2,"b"]]));
            assert.isTrue(ListItBuffer.isObjectArray([new A(), new A()]));
            assert.isTrue(ListItBuffer.isObjectArray([new B(), new B()]));
        });
        it("should be true if all the elements are array", () => {
            assert.isTrue(ListItBuffer.isObjectArray([[]]));
            assert.isTrue(ListItBuffer.isObjectArray([[],[]]));
        });
    });
    describe("#applyHeaderStyleOption", ()=> {
        it("should return the parameter string when any option is not specfied", ()=>{
            const listit = new ListItBuffer();
            assert.equal(listit.applyHeaderStyleOption("HEADER"), "HEADER");
        });
        it("should return the bold string when headerBold option is false", ()=>{
            const listit = new ListItBuffer({headerBold:false});
            assert.equal(listit.applyHeaderStyleOption("HEADER"), "HEADER");
        });
        it("should return the bold string when headerBold option is true", ()=>{
            const listit = new ListItBuffer({headerBold:true});
            assert.equal(
                listit.applyHeaderStyleOption("HEADER"),
                `${ansi.style.bold}HEADER${ansi.style.reset}`);
        });
        it("should return the bold string when headerColor option is specfied", ()=>{
            const listit = new ListItBuffer({headerColor:"red"});
            assert.equal(
                listit.applyHeaderStyleOption("HEADER"),
                `${ansi.style.red}HEADER${ansi.style.reset}`);
        });
        it("should throw if headerColor option is invalid", ()=>{
            assert.throw(()=>{
                new ListItBuffer({headerColor:"N/A"});
            });
        });
    });
    describe("#generateHeaderUnderline", ()=>{
        describe("When data row does not exists", ()=>{
            it("should return a null when any headerUnderline option is not specfied", ()=>{
                const listit = new ListItBuffer({
                    header: ["ABC", "DEFG", "HIJKLMN"],
                });
                assert.isNull(listit.generateHeaderUnderline());
            });
            it("should return a null when any headerUnderline option is false", ()=>{
                const listit = new ListItBuffer({
                    header: ["ABC", "DEFG", "HIJKLMN"],
                    headerUnderline:false,
                });
                assert.isNull(listit.generateHeaderUnderline());
            });
            it("should return a null when the header is not set", ()=>{
                const listit = new ListItBuffer({
                    headerUnderline:true,
                });
                assert.isNull(listit.generateHeaderUnderline());
            });
            it("should return a underline string string when both of header and headerBold is set", ()=>{
                const listit = new ListItBuffer({
                    header: ["ABC", "DEFG", "HIJKLMN"],
                    headerUnderline: true,
                });
                assert.equal(listit.toString(), [
                    "ABC DEFG HIJKLMN",
                    "--- ---- -------",
                ].join("\n"));
            });
        });
        describe("When data row exists", ()=>{
            it("should return a null when any headerUnderline option is not specfied", ()=>{
                const listit = new ListItBuffer({
                    header: ["ABC", "DEFG", "HIJKLMN"],
                });
                listit.d([1,2,3]);
                assert.isNull(listit.generateHeaderUnderline());
            });
            it("should return a null when any headerUnderline option is false", ()=>{
                const listit = new ListItBuffer({
                    header: ["ABC", "DEFG", "HIJKLMN"],
                    headerUnderline:false,
                });
                listit.d([1,2,3]);
                assert.isNull(listit.generateHeaderUnderline());
            });
            it("should return a null when the header is not set", ()=>{
                const listit = new ListItBuffer({
                    headerUnderline:true,
                });
                listit.d([1,2,3]);
                assert.isNull(listit.generateHeaderUnderline());
            });
            it("should return a underline string string when both of header and headerBold is set", ()=>{
                const listit = new ListItBuffer({
                    header: ["ABC", "DEFG", "HIJKLMN"],
                    headerUnderline: true,
                });
                listit.d([1,2,3]);
                assert.equal(listit.toString(), [
                    "ABC DEFG HIJKLMN",
                    "--- ---- -------",
                    "  1    2       3",
                ].join("\n"));
            });
        });
    });
    describe("#setHeaderRow", ()=>{
        it("should set column header row", ()=>{
            const listit = new ListItBuffer();
            listit.d([1,2,3]);
            listit.setHeaderRow(["VWXYZ", "ABCD", "EFG"]);
            assert.equal(listit.toString(), [
                "VWXYZ ABCD EFG",
                "    1    2   3",
            ].join("\n"));
        });
        it("should override which specified by the option", ()=>{
            const listit = new ListItBuffer({
                header: ["ABC", "DEFG", "HIJKLMN"],
            });
            listit.setHeaderRow(["ABC", "DEFG", "HIJKLMN"]);
            listit.d([1,2,3]);
            listit.setHeaderRow(["VWXYZ", "ABCD", "EFG"]);
            assert.equal(listit.toString(), [
                "VWXYZ ABCD EFG",
                "    1    2   3",
            ].join("\n"));
        });
        it("should override which exists", ()=>{
            const listit = new ListItBuffer();
            listit.setHeaderRow(["ABC", "DEFG", "HIJKLMN"]);
            listit.d([1,2,3]);
            listit.setHeaderRow(["VWXYZ", "ABCD", "EFG"]);
            assert.equal(listit.toString(), [
                "VWXYZ ABCD EFG",
                "    1    2   3",
            ].join("\n"));
        });
        it("should clear which exists when the parameter is null", ()=>{
            const listit = new ListItBuffer();
            listit.setHeaderRow(["ABC", "DEFG", "HIJKLMN"]);
            listit.d([1,2,3]);
            listit.setHeaderRow(null);
            assert.equal(listit.toString(), "1 2 3");
        });
    });
});
