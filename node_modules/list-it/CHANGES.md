CHANGES
====

v1.3
----

* Adds options for header row
    * `header`
    * `headerBold`
    * `headerColor`
    * `headerUnderline`
* Adds method `setHeaderRow`
* Adds CLI command `listit`

v1.2
----

* Add an option `columnWidthAll`.
* Change a method `setColumnWidth`.
* Add a method `setColumnWidthAll`.
* Add a method `getColumnWidth` (NO TEST).
* Shows various badges on README.
* Take a test coverage

v1.1
----

* Add a method `setColumnWidth`.

v1.0
----

The `ListIt` class is available.
This constructor sets  the `autoAlign` option.

The `ListIt.buffer` method also creates the instance of `ListIt`,
but it does not set the option in default.

Changes log of unstable versions
----

* v0.4.0 - Enhance : Print object array using its keys as column name.
* v0.3.5 - Bug fix : Null data rendering.
* v0.3.4 - Change for the testing.
* v0.3.3 - Bug fix : Measure a width of wide-chars of east asian characters correctly
by using the npm eastasianwidth.
* v0.3.2 - Change Test : Support mocha to test.
* v0.3.1 - Bug fix : Do not count escape sequences in data for column width.
* v0.3.0 - Enhance : Several columns or rows can be added at a time.
* v0.2.0 - Enhance : Auto align mode is available.
* v0.1.0 - Initial release
