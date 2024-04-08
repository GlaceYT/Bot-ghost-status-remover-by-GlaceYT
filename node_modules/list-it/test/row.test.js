const assert = require("chai").assert;
const Row = require("../lib/row.js");
describe("Row", ()=>{
    describe("constructer", ()=>{
        it("should initialize the cell length to zero", ()=>{
            const row = new Row();
            assert.equal(row.getCellLength(), 0);
        });
        it("should initialize as empty", ()=>{
            const row = new Row();
            assert.isTrue(row.isEmpty());
        });
        it("should initialize as unfixed", ()=>{
            const row = new Row();
            assert.isFalse(row.isFixed());
        });
    });
    describe("#pushCell / #isEmpty", ()=>{
        it("should set as no-empty", ()=>{
            const row = new Row();
            row.pushCell({A:"BC"});
            assert.isFalse(row.isEmpty());
        });
    });
    describe("#pushCell / #getCellLength", ()=>{
        it("should increment the cell length", ()=>{
            const row = new Row();
            row.pushCell({A:"BC"});
            assert.equal(row.getCellLength(), 1);
        });
    });
    describe("#pushCell / #getCell", ()=>{
        it("should increment the cell length", ()=>{
            const row = new Row();
            row.pushCell({A:"BC"});
            assert.deepEqual(row.getCell(0), {A:"BC"});
        });
    });
    describe("#fix / #isFixed", ()=>{
        it("should set as fixed", ()=>{
            const row = new Row();
            row.fix();
            assert.isTrue(row.isFixed());
        });
    });
    describe("#fix / #pushCell", ()=>{
        it("should throw if fixed", ()=>{
            assert.throw(()=>{
                const row = new Row();
                row.fix();
                row.pushCell({A:"BC"});
            });
        });
    });
});