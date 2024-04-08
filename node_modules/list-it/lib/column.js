"use strict";
const DataCell = require("./data-cell.js");

/**
 * Column of ListIt.
 *
 * @class
 */
function Column() {
    this.opt = {
        "autoAlign" : false
    };
    this.width = 0;
    this.textWidth = null;
    this.intLen = 0;
    this.fracLen = 0;
    this.expLen = 0;
    this.cellAtRow = {};
    this.header = null;
}

module.exports = Column;

Column.prototype.getWidth = function() {
    return this.width;
};

Column.prototype.setTextWidth = function(textWidth) {
    this.textWidth = textWidth;
};

Column.prototype.setCellAt = function(row, cell) {
    this.cellAtRow[row] = cell;
};

Column.prototype.setHeader = function(header) {
    this.header = header;
};

Column.prototype.hasHeader = function() {
    return this.header != null;
};

Column.prototype.updateWidth = function() {
    const headerWidth = (!this.hasHeader() ? 0
        : DataCell.visibleLength("" + this.header));
    this.width = headerWidth;

    //Update column width with data in the cells
    Object.keys(this.cellAtRow).forEach(key => {
        const cell = this.cellAtRow[key];
        const data = cell.getData();
        let width = cell.visibleLength();
        if(typeof(data) == "number") {
            if(this.opt.autoAlign) {
                this.updateNumWidth(data);
                width = this.getNumMaxWidth();
            }
        }
        if(width > this.width) {
            this.width = width;
        }
        if(typeof(data) == "string") {
            if(this.textWidth && this.textWidth > headerWidth) {
                if(this.width > this.textWidth) {
                    this.width = this.textWidth;
                }
            }
        }
    });
};

Column.prototype.formatColumnHeader = function() {
    if(!this.hasHeader()) {
        return null;
    }
    const width = this.getWidth();
    const header = this.header;
    const headerWidth = DataCell.visibleLength("" + header);
    if(header.length == headerWidth && width - headerWidth <= 0) {
        return ("" + header).substring(0, width);
    }
    return "" + header + " ".repeat(width - headerWidth);
};

Column.prototype.formatCell = function(data) {
    const width = this.getWidth();
    if(this.opt.autoAlign) {
        if(typeof(data) == "number") {
            return this.makeAutoAlignNum(data).padStart(width, " ");
        }
    }
    const dataWidth = DataCell.visibleLength("" + data);
    if(data.length == dataWidth && width - dataWidth <= 0) {
        return ("" + data).substring(0, width);
    }
    return "" + data + " ".repeat(width - dataWidth);
};

Column.prototype.setAutoAlign = function(autoAlign) {
    this.opt.autoAlign = autoAlign;
};

Column.prototype.updateNumWidth = function(num) {
    const numInfo = this.analyzeNumber(num);
    const intLen = numInfo.intStr.length;
    const fracLen = numInfo.fracStr.length;
    const expLen = numInfo.expStr.length;
    if(intLen > this.intLen) {
        this.intLen = intLen;
    }
    if(fracLen > this.fracLen) {
        this.fracLen = fracLen;
    }
    if(expLen > this.expLen) {
        this.expLen = expLen;
    }
};

Column.prototype.getNumMaxWidth = function() {
    return this.intLen +
        this.fracLen + (this.fracLen > 0 ? 1 : 0) +
        this.expLen + (this.expLen > 0 ? 1 : 0);
};

Column.prototype.makeAutoAlignNum = function(num) {
    const numInfo = this.analyzeNumber(num);
    const intStr = numInfo.intStr.padStart(this.intLen, " ");
    const fracStr = numInfo.expStr != "" ?
        numInfo.fracStr.padEnd(this.fracLen, "0") :
        numInfo.fracStr.padEnd(this.fracLen, " ");
    const expStr = numInfo.expStr.padEnd(this.expLen, " ");
    if(numInfo.expStr != "") {
        return [intStr, ".", fracStr, "e", expStr].join("");
    }
    if(numInfo.pointPos >= 0) {
        if(this.expLen > 0) {
            return [intStr, ".", fracStr, " ", expStr].join("");
        }
        return [intStr, ".", fracStr].join("");
    } else if(this.fracLen == 0) {
        return intStr;
    }
    if(this.expLen > 0) {
        return [intStr, ".0", fracStr.substr(1), " ", expStr].join("");
    }
    return [intStr, ".0", fracStr.substr(1)].join("");
};

Column.prototype.analyzeNumber = function(num) {
    const s = "" + num;
    let intStr = "";
    let fracStr = "";
    const pointPos = s.indexOf(".");
    const expIndex = s.indexOf("e");
    if(expIndex >= 0) {
        if(pointPos < 0) {
            return {
                pointPos: expIndex,
                intStr: s.substr(0, expIndex),
                fracStr: "0",
                expStr: s.substr(expIndex + 1),
            };
        }
        return {
            pointPos: pointPos,
            intStr: s.substr(0, pointPos),
            fracStr: s.substring(pointPos + 1, expIndex),
            expStr: s.substr(expIndex + 1),
        };
    }
    if(pointPos < 0) {
        intStr = s;
    } else {
        intStr = s.substr(0, pointPos);
        fracStr = s.substr(pointPos + 1);
    }
    return {
        "pointPos": pointPos,
        "intStr": intStr,
        "fracStr": fracStr,
        "expStr": "",
    };
};
