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