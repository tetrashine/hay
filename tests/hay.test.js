const { hay, HayTypes } = require('../src/hay');

test('check number type', () => {
  [1, 0, 1.01, -123, undefined, null].forEach(_ => {
    expect(hay.check(_, HayTypes.number)).toBe(true);
  });

  ["Asd", [], {}, true, false, function() {}, ()=>{}].forEach(_ => {
    expect(hay.check(_, HayTypes.number)).toBe(false);
  });
});

test('check string type', () => {
  ["", "asd", undefined, null].forEach(_ => {
    expect(hay.check(_, HayTypes.string)).toBe(true);
  });

  [1, 0, 1.01, -123, [], {}, true, false, function() {}, ()=>{}].forEach(_ => {
    expect(hay.check(_, HayTypes.string)).toBe(false);
  });
});

test('check bool type', () => {
  [true, false, undefined, null].forEach(_ => {
    expect(hay.check(_, HayTypes.bool)).toBe(true);
  });

  [1, 0, 1.01, -123, [], {}, "asd", function() {}, ()=>{}].forEach(_ => {
    expect(hay.check(_, HayTypes.bool)).toBe(false);
  });
});

test('check object type', () => {
  [{}, undefined, null].forEach(_ => {
    expect(hay.check(_, HayTypes.object)).toBe(true);
  });

  [1, 0, 1.01, -123, [], true, false, "asd", function() {}, ()=>{}].forEach(_ => {
    expect(hay.check(_, HayTypes.object)).toBe(false);
  });
});

test('check array type', () => {
  [[], [1,2,3], undefined, null].forEach(_ => {
    expect(hay.check(_, HayTypes.array)).toBe(true);
  });
  
  [1, 0, 1.01, -123, {}, true, false, "asd", function() {}, ()=>{}].forEach(_ => {
    expect(hay.check(_, HayTypes.array)).toBe(false);
  });
});

test('check function type', () => {
  [function() {}, ()=>{}, undefined, null].forEach(_ => {
    expect(hay.check(_, HayTypes.func)).toBe(true);
  });

  [1, 0, 1.01, -123, {}, true, false, "asd", []].forEach(_ => {
    expect(hay.check(_, HayTypes.func)).toBe(false);
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
  expect(hay.check([1], HayTypes.arrayOf.number)).toBe(true);
  expect(hay.check([""], HayTypes.arrayOf.string)).toBe(true);
  expect(hay.check([true], HayTypes.arrayOf.bool)).toBe(true);
  expect(hay.check([{}], HayTypes.arrayOf.object)).toBe(true);
  expect(hay.check([[]], HayTypes.arrayOf.array)).toBe(true);
  expect(hay.check([function() {}], HayTypes.arrayOf.func)).toBe(true);

  expect(hay.check({}, HayTypes.arrayOf.number)).toBe(false);
  expect(hay.check([""], HayTypes.arrayOf.number)).toBe(false);
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