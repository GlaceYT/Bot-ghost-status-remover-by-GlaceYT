"use strict";

/**
 * Row of ListIt.
 *
 * @class
 */
function Row() {
    this.cells = [];
    this.empty = true;
    this.fixed = false;
}

module.exports = Row;

Row.prototype.getCellLength = function() {
    return this.cells.length;
};

Row.prototype.getCell= function(idx) {
    return this.cells[idx];
};

Row.prototype.pushCell = function(cell) {
    if(this.isFixed()) {
        throw "pushCell Fail, The row was already fixed.";
    }
    this.empty = false;
    return this.cells.push(cell);
};

Row.prototype.fix = function() {
    this.fixed = true;
};

Row.prototype.isEmpty = function() {
    return this.empty;
};

Row.prototype.isFixed = function() {
    return this.fixed;
};
