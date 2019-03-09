# What is Hay?

Hay is for execution of run-time type checks. Similar to React Type checks,  except that this library is for undetermined result object (e.g. input from user).

A use case for writing this library is writting an internal tool for data analytics display to ensure the transformed data matches the input type of different charts (e.g. bar chart, pie chart, etc...).

## Installation?

Using npm:

```sh
npm install --save-dev @lengin/hay
```

## Sample Code

Importing Hay
```sh
import { Hay, HayTypes } from '@lengin/hay';
```

Check for validity
```sh
let obj = ...
Hay.check(obj, HayTypes.object);  //return boolean
```

Get object with display highlights & error messages
```sh
let output = Hay.getMessages();

//output[0]: array of messages (string)
//output[1] = object after JSON.stringify, wrapped with highlight and formatted with spaces.
```

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

Add-on
| Type | Description | Positive Examples | Usage |
| -----|-------------|-------------------|-------|
| required | Besides the rule used, the object need to exist. | - | HayTypes.number.required |

Function-based
| Type | Description | Positive Examples | Usage |
| -----|-------------|-------------------|-------|
| oneOf | Takes in an array of HayType. Return true if target type is any one of them. | [HayTypes.number, HayTypes.string] | HayTypes.oneOf([HayTypes.number, HayTypes.string]) |
| arrayOf | Takes in a HayType. Return true if type of target is an array of them. | HayTypes.number, HayTypes.string | HayTypes.arrayOf(HayTypes.number) |
| shapeOf | Takes in an Object. Return true if shape of target is the same. | { 'val': HayTypes.number } | HayTypes.shapeOf({ 'val': HayTypes.number }) |

HayTypes.array
| Type | Description | Positive Examples | Usage |
| -----|-------------|-------------------|-------|
| withGeneratorFunc | Takes in a generator function which the function needs to return the HayType each time it is called when checking through the array. | function*() {
    while(true) {
      yield HayTypes.number;
    }
  } | HayTypes.array.withGeneratorFunc(function*() {
    while(true) {
      yield HayTypes.number;
    }
  }) |

```sh
Hay.check({ a: 1 }, HayTypes.object);
```

