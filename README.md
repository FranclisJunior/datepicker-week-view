# Date Picker Week View

[![Bower](https://img.shields.io/bower/v/datepicker-week-view.svg)](http://bower.io/search/?q=datepicker-week-view)

## Overview
**Date Picker Week View** is a bundle of [AngularJS](http://angularjs.org) directives that allows you date pickers with
week view.

## Demo
**TODO**

## Installation
#### Bower
````
bower install datepicker-week-view
````

#### Insert dependency in angular module
````
var app = angular.module("myApp", ["dtp-week-view"]);
````

#### Includes files in index.html (if necessary)

**Include js file (after angular.js script tag):**
````
<script type="text/javascript" src="../bower_components/datepicker-week-view/src/js/datepicker-week-view.js"></script>
````

**Include css file:**
````
<link rel="stylesheet" type="text/css" href="../bower_components/datepicker-week-view/src/css/style.css">
````


##Usage

````
<dtp-week-view num-weeks="1" ng-model="appC.selectedDay"></dtp-week-view>
````


##Options
| Option  | Default Value | Description|
| ------------- | ------------- | ------------------------ |
| num-weeks  | 1  | Number of weeks to be displayed  |
| start-date  | now  | Date that will get selected   |
| min-date  | 2000-01-01  | Lowest possible date to be selected (previous dates will be disabled)   |

## Dependencies
**TODO**


## License
[MIT](LICENSE)