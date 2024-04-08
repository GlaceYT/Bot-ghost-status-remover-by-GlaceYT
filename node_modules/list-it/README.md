list-it - Fixed Column Text Table Formatter
===========================================

<span class="display:inline-block;"> ![version](https://img.shields.io/npm/v/list-it)
![license](https://img.shields.io/npm/l/list-it)
[![Build Status](https://travis-ci.org/takamin/list-it.svg?branch=master)](https://travis-ci.org/takamin/list-it)
[![Coverage Status](https://coveralls.io/repos/github/takamin/list-it/badge.svg?branch=master)](https://coveralls.io/github/takamin/list-it?branch=master)
![node version](https://img.shields.io/node/v/list-it)
</span>  
<span class="display:inline-block;"><span class="label">npm:</span>
![vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/list-it)
![weekly downloads](https://img.shields.io/npm/dw/list-it)
![monthly downloads](https://img.shields.io/npm/dm/list-it)
</span>  
<span class="display:inline-block;"><span class="label">GitHub:</span>
![vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/takamin/list-it)
![open issues](https://img.shields.io/github/issues-raw/takamin/list-it)
![closed issues](https://img.shields.io/github/issues-closed-raw/takamin/list-it)
![top language](https://img.shields.io/github/languages/top/takamin/list-it)
![last commit](https://img.shields.io/github/last-commit/takamin/list-it)
</span>

DESCRIPTION
-----------

This module creates a text table string.
And offers a cli command `listit` that print arrays in a json file to console
as a table.

* Each columns are aligned in vertical.
* All number data in column are aligned by its fraction point with `autoAlign` option.
* Longer text can be truncated with `setColumnWidth` option.

CLI Command `listit`
--------------------

### INSTALL

Install with npm.

```bash
$ npm install --global list-it
```

### USAGE

```bash
$ listit --help
Usage: listit [input-filename] [OPTIONS]

Outputs the array included in JSON to the console in tabular format.
Non-array data is displayed as is.

OPTIONS:
  -h, --help    Print this help message
  -v, --version Print the version of this package

----
This command is included in the npm list-it@1.2.0

Repository: https://github.com/takamin/list-it
Homepage: http://takamints.hatenablog.jp/entry/npm-list-it-preformatted-text-table-generator

Copyright (c) 2020 Koji Takami
This software is released under the MIT License
```

### SAMPLE

The `listit` would print all data in the JSON file with its property name.
In following example, `$` means root oject.

![listit sample/planets.json output](https://takamin.github.io/list-it/images//sample-listit-cli-command-output.png)

Using the exported ListIt class
-------------------------------

### PROGRAMMING SAMPLE

__[sample/japanese-food.js](sample/japanese-food.js)__

```javascript
var ListIt = require("list-it");
var buf = new ListIt();
buf.setColumnWidth(1, 5);
buf.setColumnWidth(2, 15);
buf.setColumnWidth(3, 7);
console.log(
    buf
        .d("1").d("Sushi")
            .d("vinegared rice combined raw seafood")
            .d("Healthy").nl()
        .d("2").d("Yakiniku")
            .d("Grilled meat on Japanese")
            .d("Juicy").nl()
        .d("3").d("Ramen")
            .d("Japanese noodle soup dish")
            .d("I like it").nl()
        .d("4").d("Tempura")
            .d("Deep fried seafood or vegetables")
            .d("Delicious").nl()
        .d("5").d("Sashimi")
            .d("Very fresh sliced fish")
            .d("Try it now, It's good").nl()
        .toString());
```

outputs:

```bash
$ node sample/japanese-food.js
1 Sushi vinegared rice  Healthy
2 Yakin Grilled meat on Juicy
3 Ramen Japanese noodle I like
4 Tempu Deep fried seaf Delicio
5 Sashi Very fresh slic Try it
```

#### autoAlign and setHeaderRow

__[sample/planets.js](sample/planets.js)__

```javascript
const ListIt = require("list-it");
const listit = new ListIt({
    autoAlign : true,
    headerUnderline: true,
});
const PLANETS = [
    ["NAME", "Mass(10^24kg)", "Dia(km)", "Dens(kg/m3)",
                        "Grav(m/s2)", "EscV(km/s)", "Rot(hours)" ],
    ["MERCURY", 0.33,   4879,   5427,   3.7,    4.3,    1407.6  ],
    ["VENUS",   4.87,   12104,  5243,   8.9,    10.4,   -5832.5 ],
    ["EARTH",   5.97,   12756,  5514,   9.8,    11.2,   23.9    ],
    ["MOON",    0.0073, 3475,   3340,   1.6,    2.4,    655.7   ],
    ["MARS",    0.642,  6792,   3933,   3.7,    5.0,    24.6    ],
    ["JUPITER", 1898,   142984, 1326,   23.1,   59.5,   9.9     ],
    ["SATURN",  568,    120536, 687,    9.0,    35.5,   10.7    ],
    ["URANUS",  86.8,   51118,  1271,   8.7,    21.3,   -17.2   ],
    ["NEPTUNE", 102,    49528,  1638,   11.0,   23.5,   16.1    ],
    ["PLUTO",   0.0146, 2370,   2095,   0.7,    1.3,    -153.3  ]
];

console.log(listit
    .setHeaderRow(PLANETS.shift())
    .d(PLANETS).toString()
);
```

outputs:

```bash
$ node sample/planets.js
NAME    Mass(10^24kg) Dia(km) Dens(kg/m3) Grav(m/s2) EscV(km/s) Rot(hours)
------- ------------- ------- ----------- ---------- ---------- ----------
MERCURY        0.33      4879        5427        3.7        4.3     1407.6
VENUS          4.87     12104        5243        8.9       10.4    -5832.5
EARTH          5.97     12756        5514        9.8       11.2       23.9
MOON           0.0073    3475        3340        1.6        2.4      655.7
MARS           0.642     6792        3933        3.7        5.0       24.6
JUPITER     1898.0     142984        1326       23.1       59.5        9.9
SATURN       568.0     120536         687        9.0       35.5       10.7
URANUS        86.8      51118        1271        8.7       21.3      -17.2
NEPTUNE      102.0      49528        1638       11.0       23.5       16.1
PLUTO          0.0146    2370        2095        0.7        1.3     -153.3
```

#### Exponential notation

__[sample/atoms.js](sample/atoms.js)__

```javascript
const ListIt = require("ist-it.js");
const listit = new ListIt({
    autoAlign : true,
    headerUnderline: true,
});
const ATOMS = [
    ["Name", "Radius(m)", "Radius(Å)"],
    ["H", 0.1e-10, 0.1],
    ["Cl", 1.67e-10, 1.67],
    ["Na", 1.16e-10, 1.16],
    ["O", 1.21e-10, 1.21],
    ["Si", 0.4e-10, 0.4],
];

console.log(listit.setHeaderRow(ATOMS.shift()).d(ATOMS).toString());
```

outputs:

```bash
$ node sample/atoms.js
Name Radius(m) Radius(Å)
---- --------- ---------
H     1.00e-11      0.1
Cl    1.67e-10      1.67
Na    1.16e-10      1.16
O     1.21e-10      1.21
Si    4.00e-11      0.4
```

#### Object Array


__[sample/planets-obj.js](sample/planets-obj.js)__

```javascript
const ListIt = require("../index.js");
const list = new ListIt({
    headerBold: true,
    headerColor: "green",
    headerUnderline: true,
});
const PLANETS = [
    { name: "MERCURY", mass: 0.33, dia: 4879, dens: 5427,
        grav: 3.7, escV: 4.3, rot: 1407.6 },
    { name: "VENUS", mass: 4.87, dia: 12104, dens: 5243,
        grav: 8.9, escV: 10.4, rot: -5832.5 },
    { name: "EARTH", mass: 5.97, dia: 12756, dens: 5514,
        grav: 9.8, escV: 11.2, rot: 23.9 },
    { name: "MOON", mass: 0.0073, dia: 3475, dens: 3340,
        grav: 1.6, escV: 2.4, rot: 655.7 },
    { name: "MARS", mass: 0.642, dia: 6792, dens: 3933,
        grav: 3.7, escV: 5.0, rot: 24.6 },
    { name: "JUPITER", mass: 1898, dia: 142984, dens: 1326,
        grav: 23.1, escV: 59.5, rot: 9.9 },
    { name: "SATURN", mass: 568, dia: 120536,dens: 687,
        grav: 9.0, escV: 35.5, rot: 10.7 },
    { name: "URANUS", mass: 86.8, dia: 51118, dens: 1271,
        grav: 8.7, escV: 21.3, rot: -17.2 },
    { name: "NEPTUNE", mass: 102, dia: 49528, dens: 1638,
        grav: 11.0, escV: 23.5, rot: 16.1 },
    { name: "PLUTO", mass: 0.0146, dia: 2370, dens: 2095,
        grav: 0.7, escV: 1.3, rot: -153.3 }
];
console.log( list.d( PLANETS ).toString() );
```

outputs:

![sample/planets-obj.js outputs](https://takamin.github.io/list-it/images/sample-planets-obj-js-output.png)


#### East asian characters

__[sample/japanese-food-jp.js](sample/japanese-food-jp.js)__

```javascript
var ListIt = require("list-it");
var buf = new ListIt();
console.log(
    buf
        .d("1").d("寿司")
            .d("酢とご飯とシーフード")
            .d("健康的だ").nl()
        .d("2").d("焼肉")
            .d("日本のグリルされたお肉")
            .d("ジューシー").nl()
        .d("3").d("ラーメン")
            .d("日本のスープに入った麺")
            .d("大好き").nl()
        .d("4").d("天ぷら")
            .d("シーフードや野菜に衣をつけて揚げたもの")
            .d("おいしー").nl()
        .d("5").d("刺身")
            .d("大変フレッシュな魚のスライス")
            .d("食べてみて！あご落ちるぜ").nl()
        .toString());
```

outputs:

```bash
$ node sample/japanese-food-jp.js
1 寿司     酢とご飯とシーフード                   健康的だ
2 焼肉     日本のグリルされたお肉                 ジューシー
3 ラーメン 日本のスープに入った麺                 大好き
4 天ぷら   シーフードや野菜に衣をつけて揚げたもの おいしー
5 刺身     大変フレッシュな魚のスライス           食べてみて！あご落ちるぜ
```


API Reference
------------

### Class ListIt

#### CONSTRUCTOR

* __ListIt(options)__

#### OPTIONS

* __autoAlign__ - Specifies the number data alignment.
* __columnWidth__ - Initializes the text max length for all columns.
* __header__ - Sets a column header row.
* __headerBold__ - Renders the header bold.
* __headerColor__ - Specify header text color.
* __headerUnderline__ - Draws a line under the header text.
* __headerBold__ - Make header text bold.
* __headerColor__ - Set color to the header text.
* __headerUnderline__ - Add underline to the header text.

#### METHODS

* __setColumnWidth__ - Sets a text max length to a column.
* __setColumnWidthAll__ - Sets text max length to all columns.
* __setHeaderRow__ - Set the column header row.
* __d__ - Add cells or rows
* __nl__ - New line
* __toString__ - Format a table

### Constructor ListIt(opt)

__`const listit = new ListIt(opt)`__

Creates a `ListIt` instance.

The instance has current row that is a position for the columns to be added.

To add a cell, use 'd' method. Check the samples above.

### OPTION.autoAlign

__`autoAlign:boolean` (Default: `true`)__

When this is set true, the data in cell will be aligned in Automatic depending on its type.
The number will be aligned to the right taking account of its decimal point.

### OPTION.columnWidth

__`columnWidth:Array<number>|number|null` (Default: `null`)__

Declare text width for columns by character length (or remove).

* __Set a Width For Each Columns__ - An array of numbers could be specified.
Its each elements are set to the column at that position.
A `null` as the element value means that width will not be specified.
* __Set a Width For All Columns__ - If a single number is specified for this option, It will set to all columns.
And also when the value is null, column width is not declared at all.

### OPTION.header

__`header:Array<any>|null` (Default: `null`)__

Sets a column header row with array.

Even if the header is not specified, it might be created in the method `d` running.
This header-auto-creation feature will be activated when following two condition is true.

* The parameter for the `d` method is an object array.
* One or more header-relating-options except for `header` are set.


### OPTION.headerBold

__`headerBold:boolean` (Default: `false`)__

This option makes the header text to render bold.
But, actual appearance would be dependent on the terminal.

If the header does not exists, no effect is appeared.

### OPTION.headerColor

__`headerColor:string|null` (Default: `null`)__

With this option, specify the color of the header text with color names.
But, actual appearance would be dependent on the terminal.

If the header does not exists, no effect is appeared.

Available color names:

* "black"
* "red"
* "green"
* "yellow"
* "blue"
* "magenta"
* "cyan"
* "white"
* "grey"
* "gray"
* "brightRed"
* "brightGreen"
* "brightYellow"
* "brightBlue"
* "brightMagenta"
* "brightCyan"
* "brightWhite"


### OPTION.headerUnderline

__`headerUnderline:boolean` (Default: `false`)__

When this option is true, an underline will be drawn for the header text.

If the header does not exists, no effect is appeared.

### ListIt#setColumnWidth

__`setColumnWidth(indexOfColumns:number, width:number)`__

Set the column width by text length.

The actual width is calculated by traversing all data in a column.
A number data never be affected, because it should not be truncated.
So it may be longer than the specified length when some number data
exist in a column.

PARAMETERS:

1. `indexOfColumns` - a column index to set.
2. `width` - a character length of the column.
    If `null` is specified, the declaration is removed.

RETURN VALUE:

This method returns `this` instance to chain the next method call.

### ListIt#setColumnWidthAll

__`setColumnWidthAll(widthForAll:Array<number|null>|number|null)`__

Set the whole column's width. See opt.columnWidth

PARAMETERS:

1. `widthForAll` - An array of widtha.

RETURN VALUE:

This method returns `this` instance to chain the next method call.

### ListIt#setHeaderRow

__`setHeaderRow(header:Array<any>|null)`__

With this method, set the column header row.
For the parameter, it is same as OPTION.header.
If null is specified, the header would be removed.

### ListIt#d

__`d( data [, data ...] )`__

This method adds one or more columns or rows at a time depending on
the parameter data type.

This method returns `this` object. So you can chain to call a next method.

#### To Add column(s)

If the type of `data` is a primitive type such as string or number,
these are added to the current row as individual columns.

This operation will not add a new line in automatic.
A code of below outputs only one row containing six column from 1 to 6.

```
CODE: buffer.d(1,2,3).d(4,5,6).nl();

OUTPUT: "1 2 3 4 5 6"
```

The above code make same result as below:

```
EQUIVALENT CODE: buffer.d(1,2,3,4,5,6).nl();
```

#### To add row(s)

If the parameter `data` is an array contains one or more primitive data at least,
it will added as one closed row.

But if the type of all elements of the array is an array,
in other words it is two or more dimensional array,
each elements are added as a row.

NOTE: A new-line will never be added before the addition.
So, If the previous row was not closed, you must call the `nl()` method.

The following sample outputs two rows:

```
CODE: buffer.d( [1,2,3], [4,5,6] );

OUTPUT:"1 2 3\n4 5 6"

EQUIVALENT CODE: buffer.d([ [1,2,3], [4,5,6] ]);
```


### ListIt#nl

__`nl()`__

Ends up a process for the current row.

This method also returns `this` object.

### ListIt#toString

__`toString()`__

Returns preformatted text table.


LICENSE
-------

This software is released under the MIT License, see [LICENSE](LICENSE)
