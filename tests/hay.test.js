const { hay, HayTypes } = require('../src/hay');

test('check number type', () => {
  [1, 0, 1.01, -123, undefined, null].forEach(_ => {
    let results = hay.check(_, HayTypes.number);
    expect(results).toBe(true);
    //expect(results.getMessage()).toBeUndefined();
  });

  ["Asd", [], {}, true, false, function() {}, ()=>{}].forEach(_ => {
    let results = hay.check(_, HayTypes.number);
    expect(results).toBe(false);
    //expect(results.getMessage()).toBeDefined();
  });
});

test('check string type', () => {
  ["", "asd", undefined, null].forEach(_ => {
    let results = hay.check(_, HayTypes.string);
    expect(results).toBe(true);
    //expect(results.getMessage()).toBeUndefined();
  });

  [1, 0, 1.01, -123, [], {}, true, false, function() {}, ()=>{}].forEach(_ => {
    let results = hay.check(_, HayTypes.string);
    expect(results).toBe(false);
    //expect(results.getMessage()).toBeDefined();
  });
});

test('check bool type', () => {
  [true, false, undefined, null].forEach(_ => {
    let results = hay.check(_, HayTypes.bool);
    expect(results).toBe(true);
    //expect(results.getMessage()).toBeUndefined();
  });

  [1, 0, 1.01, -123, [], {}, "asd", function() {}, ()=>{}].forEach(_ => {
    let results = hay.check(_, HayTypes.bool);
    expect(hay.check(_, HayTypes.bool)).toBe(false);
    //expect(results.getMessage()).toBeDefined();
  });
});

test('check object type', () => {
  [{}, undefined, null].forEach(_ => {
    let results = hay.check(_, HayTypes.object);
    expect(results).toBe(true);
    //expect(results.getMessage()).toBeUndefined();
  });

  [1, 0, 1.01, -123, [], true, false, "asd", function() {}, ()=>{}].forEach(_ => {
    let results = hay.check(_, HayTypes.object);
    expect(results).toBe(false);
    //expect(results.getMessage()).toBeDefined();
  });
});

test('check array type', () => {
  [[], [1,2,3], undefined, null].forEach(_ => {
    let results = hay.check(_, HayTypes.array);
    expect(results).toBe(true);
    //expect(results.getMessage()).toBeUndefined();
  });
  
  [1, 0, 1.01, -123, {}, true, false, "asd", function() {}, ()=>{}].forEach(_ => {
    let results = hay.check(_, HayTypes.array);
    expect(results).toBe(false);
    //expect(results.getMessage()).toBeDefined();
  });
});

test('check function type', () => {
  [function() {}, ()=>{}, undefined, null].forEach(_ => {
    let results = hay.check(_, HayTypes.func);
    expect(results).toBe(true);
    //expect(results.getMessage()).toBeUndefined();
  });

  [1, 0, 1.01, -123, {}, true, false, "asd", []].forEach(_ => {
    let results = hay.check(_, HayTypes.func);
    expect(results).toBe(false);
    //expect(results.getMessage()).toBeDefined();
  });
});

test('check number isRequired', () => {
  expect(hay.check(1, HayTypes.number.isRequired)).toBe(true);
  expect(hay.check(null, HayTypes.number.isRequired)).toBe(false);

  expect(hay.check("", HayTypes.string.isRequired)).toBe(true);
  expect(hay.check(null, HayTypes.string.isRequired)).toBe(false);

  expect(hay.check(true, HayTypes.bool.isRequired)).toBe(true);
  expect(hay.check(null, HayTypes.bool.isRequired)).toBe(false);

  expect(hay.check({}, HayTypes.object.isRequired)).toBe(true);
  expect(hay.check(null, HayTypes.object.isRequired)).toBe(false);

  expect(hay.check([], HayTypes.array.isRequired)).toBe(true);
  expect(hay.check(null, HayTypes.array.isRequired)).toBe(false);

  expect(hay.check(function() {}, HayTypes.func.isRequired)).toBe(true);
  expect(hay.check(null, HayTypes.func.isRequired)).toBe(false);
});

test('check oneOf', () => {
  [1, "", true, false, {}, [], function() {}].forEach(_ => {
    expect(hay.check(_, HayTypes.oneOf([
      HayTypes.number,
      HayTypes.string,
      HayTypes.bool,
      HayTypes.object,
      HayTypes.array,
      HayTypes.func,
    ]))).toBe(true);
  });

  [1, "", true, false, {}, []].forEach(_ => {
    expect(hay.check(_, HayTypes.oneOf([
      HayTypes.func,
    ]))).toBe(false);
  });
});

test('check arrayOf', () => {
  expect(hay.check([1], HayTypes.arrayOf(HayTypes.number))).toBe(true);
  expect(hay.check([""], HayTypes.arrayOf(HayTypes.string))).toBe(true);
  expect(hay.check([true], HayTypes.arrayOf(HayTypes.bool))).toBe(true);
  expect(hay.check([{}], HayTypes.arrayOf(HayTypes.object))).toBe(true);
  expect(hay.check([[]], HayTypes.arrayOf(HayTypes.array))).toBe(true);
  expect(hay.check([function() {}], HayTypes.arrayOf(HayTypes.func))).toBe(true);

  expect(hay.check({}, HayTypes.arrayOf(HayTypes.number))).toBe(false);
  expect(hay.check([""], HayTypes.arrayOf(HayTypes.number))).toBe(false);
});

test('check arrayOf.itemsOfEqualLength', () => {
  expect(hay.check([
    [1,2,3], [1,4,5], [1,6,7], [1,9,3]
  ], HayTypes.arrayOf.itemsOfEqualLength)).toBe(true);

  expect(hay.check([
    [1,2,3], [1,4,5], [1,6,7], [1,9,3,4]
  ], HayTypes.arrayOf.itemsOfEqualLength)).toBe(false);
});

test('check arrayOf(array.withFunc)', () => {
  expect(hay.check([[1]], HayTypes.arrayOf(HayTypes.array.withFunc(function(obj, index) {
    return ([HayTypes.number][index])(obj);
  })))).toBe(true);

  function expectError() {
    hay.check([1], HayTypes.arrayOf(HayTypes.array.withFunc(13)));
  }

  expect(expectError).toThrowError('Invalid function');
});

test('check arrayOf(array.withGeneratorFunc)', () => {
  expect(hay.check([[1]], HayTypes.arrayOf(HayTypes.array.withGeneratorFunc(function*() {
    while(true) {
      yield HayTypes.number;
    }
  })))).toBe(true);

  function expectError() {
    hay.check([1], HayTypes.arrayOf(HayTypes.array.withGeneratorFunc(function() {
      return true
    })));
  }

  expect(expectError).toThrowError('Invalid generator function');
});

test('check shapeOf', () => {
  expect(hay.check(9, HayTypes.shapeOf(HayTypes.number))).toBe(true);
  expect(hay.check("", HayTypes.shapeOf(HayTypes.string))).toBe(true);
  expect(hay.check(true, HayTypes.shapeOf(HayTypes.bool))).toBe(true);
  expect(hay.check(()=>{}, HayTypes.shapeOf(HayTypes.func))).toBe(true);

  expect(hay.check({
    a: 9,
    b: "asd",
    c: true,
    d: {},
    e: [],
    f: () => {},
  }, HayTypes.shapeOf({
    a: HayTypes.number,
    b: HayTypes.string,
    c: HayTypes.bool,
    d: HayTypes.object,
    e: HayTypes.array,
    f: HayTypes.func,
  }))).toBe(true);

  expect(hay.check({
    a: {
      i: 9,
      j: "",
    },
  }, HayTypes.shapeOf({
    a: HayTypes.shapeOf({
      i: HayTypes.number,
      j: HayTypes.oneOf([
        HayTypes.number,
        HayTypes.string,
      ]),
    }),
  }))).toBe(true);

  expect(hay.check({
    a: {
      i: 9,
      j: true,
    },
  }, HayTypes.shapeOf({
    a: HayTypes.shapeOf({
      i: HayTypes.number,
      j: HayTypes.oneOf([
        HayTypes.number,
        HayTypes.string,
      ]),
    }),
  }))).toBe(false);

  expect(hay.check('', HayTypes.shapeOf(HayTypes.number))).toBe(false);
  expect(hay.check({
    a: "",
    b: "asd",
    c: true,
    d: {},
    e: [],
    f: () => {},
  }, HayTypes.shapeOf({
    a: HayTypes.number,
    b: HayTypes.string,
    c: HayTypes.bool,
    d: HayTypes.object,
    e: HayTypes.array,
    f: HayTypes.func,
  }))).toBe(false);
});