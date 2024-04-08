"use strict";
const assert = require('chai').assert;
const Column = require("../lib/column.js");
const DataCell = require("../lib/data-cell.js");
describe("Column", () => {
    describe("constructor", ()=>{
        it("should make the hasHeader() method returns false", ()=>{
            const column = new Column();
            assert.isFalse(column.hasHeader());
        });
    });
    describe("#setHeader", ()=>{
        it("should make the hasHeader() method true", ()=>{
            const column = new Column();
            column.setHeader("HEADER");
            assert.isTrue(column.hasHeader());
        });
        it("should make the hasHeader() method false, when set null", ()=>{
            const column = new Column();
            column.setHeader("HEADER");
            assert.isTrue(column.hasHeader());
            column.setHeader(null);
            assert.isFalse(column.hasHeader());
        });
    });
    describe("#formatColumnHeader", ()=>{
        it("should returns null when header is not set", ()=>{
            const column = new Column();
            assert.isNull(column.formatColumnHeader());
        });
        it("should returns the header", ()=>{
            const column = new Column();
            column.setHeader("01234");
            column.updateWidth();
            assert.equal(column.formatColumnHeader(), "01234");
        });
        it("should not truncate by the textWidth when header is longer than textWidth", ()=>{
            const column = new Column();
            column.setHeader("HEADER");
            column.setTextWidth(3);

            const cell0 = new DataCell();
            cell0.setData("ABCD");
            column.setCellAt(0, cell0);

            const cell1 = new DataCell();
            cell1.setData("EFGH");
            column.setCellAt(1, cell1);

            const cell2 = new DataCell();
            cell2.setData("IJKL");
            column.setCellAt(2, cell2);

            column.updateWidth();
            assert.equal(column.formatColumnHeader(), "HEADER");
        });
        it("should not truncate by the textWidth when header is longer than textWidth", ()=>{
            const column = new Column();
            column.setHeader("HEADER");
            column.setTextWidth(3);

            const cell0 = new DataCell();
            cell0.setData("ABCDEFG");
            column.setCellAt(0, cell0);

            const cell1 = new DataCell();
            cell1.setData("HIJKLMN");
            column.setCellAt(1, cell1);

            const cell2 = new DataCell();
            cell2.setData("OPQRSTU");
            column.setCellAt(2, cell2);

            column.updateWidth();
            assert.equal(column.formatColumnHeader(), "HEADER ");
        });
    });
    describe("updateWidth", ()=>{
        it("should update the width as header length", ()=>{
            const column = new Column();
            column.setHeader("HEADER");
            column.setTextWidth(3);

            const cell0 = new DataCell();
            cell0.setData("ABCD");
            column.setCellAt(0, cell0);

            const cell1 = new DataCell();
            cell1.setData("EFGH");
            column.setCellAt(1, cell1);

            const cell2 = new DataCell();
            cell2.setData("IJKL");
            column.setCellAt(2, cell2);

            column.updateWidth();
            assert.equal(column.getWidth(), 6);
        })
    });
    describe("issue #37", ()=>{
        describe("#formatCell", ()=>{
            it("should render data", ()=>{
                const column = new Column();
                column.setAutoAlign(true);
                const testData = [
                    3e-7,
                    -3e-7,
                    "ABCDEFGHIJK",
                    1.2e-7,
                    "ABC",
                    -1.25e-7,
                    125.9,
                ];
                const cells = Array(testData.length).fill(null).map(() => (new DataCell()));
                cells.forEach((cell, index) => {
                    cell.setData(testData[index]);
                    column.setCellAt(index, cell);
                });
                column.updateWidth();
                assert.equal(column.formatCell(cells[0].getData()), "    3.00e-7");
                assert.equal(column.formatCell(cells[1].getData()), "   -3.00e-7");
                assert.equal(column.formatCell(cells[2].getData()), "ABCDEFGHIJK");
                assert.equal(column.formatCell(cells[3].getData()), "    1.20e-7");
                assert.equal(column.formatCell(cells[4].getData()), "ABC        ");
                assert.equal(column.formatCell(cells[5].getData()), "   -1.25e-7");
                assert.equal(column.formatCell(cells[6].getData()), "  125.9    ");
            });
        });
        describe("#updateNumWidth", ()=>{
            it("should count for exponential numbers", ()=> {
                const column = new Column();
                column.updateNumWidth(1.0e-7);
                assert.equal(column.getNumMaxWidth(), 6);
            });
            it("should update for exponential numbers", ()=> {
                const column = new Column();
                column.updateNumWidth(1.0e-7);
                column.updateNumWidth(12.5e-9);
                column.updateNumWidth(1.5e-7);
                assert.equal(column.getNumMaxWidth(), 7);
            });
        });
        describe("#makeAutoAlignNum", ()=>{
            it("should render numbers", ()=>{
                const column = new Column();
                column.setAutoAlign(true);
                const testData = [
                    3e-7,
                    -3e-7,
                    1.2e-7,
                    -1.25e-7,
                    125.9,
                ];
                const cells = Array(testData.length).fill(null).map(() => (new DataCell()));
                cells.forEach((cell, index) => {
                    cell.setData(testData[index]);
                    column.setCellAt(index, cell);
                });
                column.updateWidth();
                assert.equal(column.makeAutoAlignNum(cells[0].getData()), "  3.00e-7");
                assert.equal(column.makeAutoAlignNum(cells[1].getData()), " -3.00e-7");
                assert.equal(column.makeAutoAlignNum(cells[2].getData()), "  1.20e-7");
                assert.equal(column.makeAutoAlignNum(cells[3].getData()), " -1.25e-7");
                assert.equal(column.makeAutoAlignNum(cells[4].getData()), "125.9    ");
            });
            it("should render exponential numbers that the real part is integer", ()=>{
                const column = new Column();
                column.setAutoAlign(true);
                const testData = [
                    3e-7,
                    -3e-7,
                    1e-7,
                ];
                const cells = Array(testData.length).fill(null).map(() => (new DataCell()));
                cells.forEach((cell, index) => {
                    cell.setData(testData[index]);
                    column.setCellAt(index, cell);
                });
                column.updateWidth();
                assert.equal(column.makeAutoAlignNum(cells[0].getData()), " 3.0e-7");
                assert.equal(column.makeAutoAlignNum(cells[1].getData()), "-3.0e-7");
                assert.equal(column.makeAutoAlignNum(cells[2].getData()), " 1.0e-7");
            });
            it("should render integer", ()=>{
                const column = new Column();
                column.setAutoAlign(true);
                const testData = [
                    3e-7,
                    123,
                    1e-7,
                ];
                const cells = Array(testData.length).fill(null).map(() => (new DataCell()));
                cells.forEach((cell, index) => {
                    cell.setData(testData[index]);
                    column.setCellAt(index, cell);
                });
                column.updateWidth();
                assert.equal(column.makeAutoAlignNum(cells[0].getData()), "  3.0e-7");
                assert.equal(column.makeAutoAlignNum(cells[1].getData()), "123.0   ");
                assert.equal(column.makeAutoAlignNum(cells[2].getData()), "  1.0e-7");
            });
        });
        describe("#analyzeNumber", ()=>{
            it("should recognize no exponential notation", ()=> {
                const column = new Column();
                assert.deepEqual(column.analyzeNumber(12.345), {
                    "pointPos" : 2,
                    "intStr" : "12",
                    "fracStr" : "345",
                    "expStr" :"",
                });
            });
            it("should recognize exponential notation", ()=> {
                const column = new Column();
                assert.deepEqual(column.analyzeNumber(3e-7), {
                    "pointPos" : 1,
                    "intStr" : "3",
                    "fracStr" : "0",
                    "expStr" :"-7",
                });
            });
            it("should recognize exponential notation", ()=> {
                const column = new Column();
                assert.deepEqual(column.analyzeNumber(12.34e-8), {
                    "pointPos" : 1,
                    "intStr" : "1",
                    "fracStr" : "234",
                    "expStr" :"-7",
                });
            });
        });
    });
});
