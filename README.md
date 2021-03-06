# What is Hay?

Hay is for execution of run-time type checks. Similar to React Type checks,  except that this library was originally written for nondeterministic result object (e.g. input from user).

A use case for writing this library is writting an internal tool for data analytics display to ensure the transformed data matches the input type of different charts (e.g. bar chart, pie chart, etc...).

## Installation?

Using npm:

```sh
npm install --save-dev @lengin/hay
```
&NewLine;
&NewLine;
## Sample Code

Importing Hay
```sh
import { Hay, HayTypes } from '@lengin/hay';
```
&NewLine;
&NewLine;
Check for validity
```sh
let obj = ...
Hay.check(obj, HayTypes.object);  //return boolean
```
&NewLine;
&NewLine;
Get object with display highlights & error messages
```sh
let output = Hay.getMessages();

//output[0]: array of messages (string)
//output[1] = object after JSON.stringify, wrapped with highlight and formatted with spaces.
```
```sh
Hay.check({ a: 1 }, HayTypes.object);
```
&NewLine;
&NewLine;
## Documentation

### HayTypes

Object-based
| Type | Description | Positive Examples | Usage |
| -----|-------------|-------------------|-------|
| number | Return true if target is a number | E.g. 0, 1, 2 | HayTypes.number |
| string | Return true if target is a string | "qwerty" | HayTypes.string |
| bool | Return true if target is a boolean | true, false | HayTypes.bool |
| object | Return true if target is an object | {} | HayTypes.object |
| array | Return true if target is a array | [] | HayTypes.array |
| func | Return true if target is a function | function() {} | HayTypes.func |
| none | Return true if target is null or undefined | null or undefined | HayTypes.none |
| generator | Return true if target is a generator function | function*() {} | HayTypes.generator |
&NewLine;
&NewLine;
Add-on
| Type | Description | Positive Examples | Usage |
| -----|-------------|-------------------|-------|
| required | Besides the rule used, the object need to exist. | - | HayTypes.number.required |
&NewLine;
&NewLine;
Function-based
| Type | Description | Positive Examples | Usage |
| -----|-------------|-------------------|-------|
| oneOf | Takes in an array of HayType. Return true if target type is any one of them. | [HayTypes.number, HayTypes.string] | HayTypes.oneOf([HayTypes.number, HayTypes.string]) |
| arrayOf | Takes in a HayType. Return true if type of target is an array of them. | HayTypes.number, HayTypes.string | HayTypes.arrayOf(HayTypes.number) |
| shapeOf | Takes in an Object. Return true if shape of target is the same. | { 'val': HayTypes.number } | HayTypes.shapeOf({ 'val': HayTypes.number }) |
&NewLine;
&NewLine;
HayTypes.number
| Type | Description | Positive Examples | Usage |
| -----|-------------|-------------------|-------|
| even| Return true if target is an even number | E.g. 0, 2, 4, 6 | HayTypes.number.even |
| odd| Return true if target is an odd number | E.g. 1, 3, 5 | HayTypes.number.odd |
| positive| Return true if target is a positive number | E.g. 1, 2, 3 | HayTypes.number.positive |
| negative| Return true if target is a negative number | E.g. -1, -2, -3 | HayTypes.number.negative |

#### HayTypes.string
| Type | Description | Positive Examples | Usage |
| -----|-------------|-------------------|-------|
| min(input) | Return true if at least of input length | E.g. '123', '1234', '12345' | HayTypes.string.min(3) |
| max(input) | Return true if at most of input length | E.g. '1', '12', '123' | HayTypes.string.max(3) |

HayTypes.array
| Type | Description | Positive Examples | Usage |
| -----|-------------|-------------------|-------|
| withFunc | Takes in a function which the function needs to return the HayType each time it is called when checking through the array. | function(obj, index) { return ([HayTypes.number][index])(obj); } | HayTypes.array.withFunc(function(obj, index) { return ([HayTypes.number][index])(obj); }) |
| withGeneratorFunc | Takes in a generator function which the function needs to return the HayType each time it is called when checking through the array. | function*() { while(true) { yield HayTypes.number; } } | HayTypes.array.withGeneratorFunc(function*() { while(true) { yield HayTypes.number; }}) |
| uniqueItems | Return true if item is an array with all unique items. | [1,2,3,4,5] | HayTypes.array.uniqueItems |

&nbsp;
&nbsp;
HayTypes.arrayOf
| Type | Description | Positive Examples | Usage |
| -----|-------------|-------------------|-------|
| itemsOfEqualLength | Return true if all items are array of equal length. | [[], [], []] | HayTypes.arrayOf.itemsOfEqualLength([[], [], []])) |