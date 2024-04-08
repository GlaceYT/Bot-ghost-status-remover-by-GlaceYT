"use strict";
var chai = require('chai');
var should = chai.should();
var assert = chai.assert;
var listit = require('../index.js');

// Ansi escape sequences
var ansi = require('ansi-escape-sequences');
var style = {};
var fg = {};
var bg = {};
Object.keys(ansi.style).forEach(function(key) {
    var value = ansi.style[key];
    if(/^bg-/.test(key)) {
        bg[key.substr(3)] = value;
    } else {
        fg[key] = value;
    }
});
Object.keys(fg).forEach(function(key) {
    if( !(key in bg) ) {
        style[key] = fg[key];
        delete fg[key];
    }
});
function styled(message, styles) {
    var args = Array.apply(null, arguments);
    styles = args.slice(1);
    styles.push(message, ansi.style.reset);
    return styles.join('');
}

// Tests
describe("listit.buffer", function() {
    describe("#constructor", function() {
        it('should return a blank string', function() {
            var buffer = new listit.buffer();

            assert.equal(buffer.toString(), "");
        });
    });
    describe("#push", function() {
        it('should represent a data', function() {
            var buffer = new listit.buffer();
            buffer.d("A");
            assert.equal(buffer.toString(), "A");
        });
    });
    describe("#nl", function() {
        it('should represent a new line', function() {
            var buffer = new listit.buffer();
            buffer.nl();
            assert.equal(buffer.toString(), "");
        });
        it('should represent a new line twice', function() {
            var buffer = new listit.buffer();
            buffer.nl();
            buffer.nl();
            assert.equal(buffer.toString(), "\n");
        });
    });
    describe("#toString", function() {
        it('should represent multi column data', function() {
            var buffer = new listit.buffer();
            buffer.d("A").d("BB").d("CCC");
            assert.equal(buffer.toString(), "A BB CCC");
        });
        it('should represent multi row-column data', function() {
            var buffer = new listit.buffer();
            buffer.d("A").d("BB").d("CCC");
            buffer.nl();
            buffer.d("DDDD").d("EEEEE").d("FFFFFF");
            assert.equal(buffer.toString(),
                "A    BB    CCC   \n" +
                "DDDD EEEEE FFFFFF");
        });
    });
});
describe("When opt.autoAlign", function() {
    describe("is true,", function() {
        it('integers are aligned to right', function() {
            var buffer = new listit.buffer({autoAlign:true});
            buffer
                .d(1).d("2").d("3").nl()
                .d("10").d(20).d("30").nl()
                .d("997").d("998").d(999).nl()
                .d(-1).d(-2).d(-333);
            assert.equal(buffer.toString(),
                    "  1 2   3   \n" +
                    "10   20 30  \n" +
                    "997 998  999\n" +
                    " -1  -2 -333");
        });
        it('taking of decimal point #1', function() {
            var buffer = new listit.buffer({autoAlign:true});
            buffer
                .d(1.5).nl()
                .d("10").nl()
                .d("997").nl()
                .d(-1.125);
            assert.equal(buffer.toString(),
                    " 1.5  \n" +
                    "10    \n" +
                    "997   \n" +
                    "-1.125");
        });
        it('taking of decimal point #2', function() {
            var buffer = new listit.buffer({autoAlign:true});
            buffer
                .d("2").nl()
                .d(20.125).nl()
                .d("998").nl()
                .d(-2.25);
            assert.equal(buffer.toString(),
                    "2     \n" +
                    "20.125\n" +
                    "998   \n" +
                    "-2.25 ");
        });
        it('taking of decimal point #3', function() {
            var buffer = new listit.buffer({autoAlign:true});
            buffer
                .d("3").nl()
                .d("30").nl()
                .d(999.0625).nl()
                .d(-333.5);
            assert.equal(buffer.toString(),
                    "3        \n" +
                    "30       \n" +
                    " 999.0625\n" +
                    "-333.5   ");
        });
        it('long string is mixed in', function() {
            var buffer = new listit.buffer({autoAlign:true});
            buffer
                .d("3").nl()
                .d("ABCDEFGHIJKLMN").nl()
                .d(999.0625).nl()
                .d(-333.5);
            assert.equal(buffer.toString(),
                    "3             \n" +
                    "ABCDEFGHIJKLMN\n" +
                    "      999.0625\n" +
                    "     -333.5   ");
        });
        it('representation of the number less than 1', function() {
            var buffer = new listit.buffer({autoAlign:true});
            buffer
                .d(.5).nl()
                .d(-.5).nl()
                .d(-125.125);
            assert.equal(buffer.toString(),
                    "   0.5  \n" +
                    "  -0.5  \n" +
                    "-125.125");
        });
        it('fractional representation of an integer', function() {
            var buffer = new listit.buffer({autoAlign:true});
            buffer
                .d(-987).nl()
                .d(987).nl()
                .d(-1250.125);
            assert.equal(buffer.toString(),
                    " -987.0  \n" +
                    "  987.0  \n" +
                    "-1250.125");
        });
    });
});
describe("put several data at a time", function() {
    describe("multi-columns, no adding new-line", function() {
        it("no autoAlign", function() {
            var buffer = new listit.buffer();
            buffer.d("A", "BB").d("CCC","DDDD").nl();
            buffer.d("EEEEE").d("FFFFFF", "GGGGGGG", "HHHHHHHH");
            assert.equal(buffer.toString(),
                "A     BB     CCC     DDDD    \n" +
                "EEEEE FFFFFF GGGGGGG HHHHHHHH");
        });
        it("autoAlign", function() {
            var buffer = new listit.buffer({autoAlign:true});
            buffer.d("A", 11).d("B", 2222).nl();
            buffer.d("C", 333.3).d("D", -4.444);
            assert.equal(buffer.toString(),
                "A  11.0 B 2222.0  \n" +
                "C 333.3 D   -4.444");
        });
    });
    describe("one row", function() {
        it("no autoAlign", function() {
            var buffer = new listit.buffer();
            buffer.d([ "A", "BB", "CCC","DDDD" ]);
            buffer.d(["EEEEE", "FFFFFF", "GGGGGGG", "HHHHHHHH"]);
            assert.equal(buffer.toString(),
                "A     BB     CCC     DDDD    \n" +
                "EEEEE FFFFFF GGGGGGG HHHHHHHH");
        });
        it("autoAlign", function() {
            var buffer = new listit.buffer({autoAlign:true});
            buffer.d([ "A", 11, "B", 2222]);
            buffer.d([ "C", 333.3, "D", -4.444]);
            assert.equal(buffer.toString(),
                "A  11.0 B 2222.0  \n" +
                "C 333.3 D   -4.444");
        });
    });
    describe("multi row", function() {
        describe("all arguments are array", function() {
            it("no autoAlign", function() {
                var buffer = new listit.buffer();
                buffer.d(
                    [ "A", "BB", "CCC","DDDD" ],
                    ["EEEEE", "FFFFFF", "GGGGGGG", "HHHHHHHH"]
                );
                assert.equal(buffer.toString(),
                    "A     BB     CCC     DDDD    \n" +
                    "EEEEE FFFFFF GGGGGGG HHHHHHHH");
            });
            it("autoAlign", function() {
                var buffer = new listit.buffer({autoAlign:true});
                buffer.d(
                    [ "A", 11, "B", 2222],
                    [ "C", 333.3, "D", -4.444]
                );
                assert.equal(buffer.toString(),
                    "A  11.0 B 2222.0  \n" +
                    "C 333.3 D   -4.444");
            });
        });
        describe("bidimensional data", function() {
            it("no autoAlign", function() {
                var buffer = new listit.buffer();
                buffer.d([
                    [ "A", "BB", "CCC","DDDD" ],
                    ["EEEEE", "FFFFFF", "GGGGGGG", "HHHHHHHH"]
                ]);
                assert.equal(buffer.toString(),
                    "A     BB     CCC     DDDD    \n" +
                    "EEEEE FFFFFF GGGGGGG HHHHHHHH");
            });
            it("autoAlign", function() {
                var buffer = new listit.buffer({autoAlign:true});
                buffer.d([
                    [ "A", 11, "B", 2222],
                    [ "C", 333.3, "D", -4.444]
                ]);
                assert.equal(buffer.toString(),
                    "A  11.0 B 2222.0  \n" +
                    "C 333.3 D   -4.444");
            });
        });
    });
});
describe("Do not count escape sequences for column width,", function() {
    Object.keys(ansi.style).forEach(function(key) {
        var style = ansi.style[key];
        it("style " + key + "#1", function() {
            var buffer = new listit.buffer();
            buffer.d([ styled("A", style), "B" ], ["C", "D"]);
            assert.equal(buffer.toString(), styled("A", style) + " B\n" + "C D");
        });
        it("style " + key + "#2", function() {
            var buffer = new listit.buffer();
            buffer.d([ "A", styled("B", style) ], ["C", "D"]);
            assert.equal(buffer.toString(), "A " + styled("B", style) + "\n" + "C D");
        });
    });
});
describe("Measure a width of wide-chars correctly.", function() {
    it("All Japanese", function() {
        var buffer = new listit.buffer();
        buffer
            .d("1").d("寿司").d("酢とご飯とシーフード").d("健康的だ").nl()
            .d("2").d("焼肉").d("日本のグリルされたお肉").d("ジューシー").nl()
            .d("3").d("ラーメン").d("日本のスープに入った麺").d("大好き").nl()
            .d("4").d("天ぷら").d("シーフードや野菜に衣をつけて揚げたもの").d("おいしー").nl()
            .d("5").d("刺身").d("大変フレッシュな魚のスライス").d("食べてみて！あご落ちるぜ").nl();
            assert.equal(buffer.toString(),
                "1 寿司     酢とご飯とシーフード                   健康的だ                \n" +
                "2 焼肉     日本のグリルされたお肉                 ジューシー              \n" +
                "3 ラーメン 日本のスープに入った麺                 大好き                  \n" +
                "4 天ぷら   シーフードや野菜に衣をつけて揚げたもの おいしー                \n" +
                "5 刺身     大変フレッシュな魚のスライス           食べてみて！あご落ちるぜ");
    });
});
