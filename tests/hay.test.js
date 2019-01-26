const { hay, HayTypes } = require('../src/hay');

test('check number type', () => {
  expect(hay.check(1, HayTypes.number)).toBe(true);
  expect(hay.check("asd", HayTypes.number)).toBe(false);
});

test('check string type', () => {
  expect(hay.check(1, HayTypes.string)).toBe(false);
  expect(hay.check("asd", HayTypes.string)).toBe(true);
});

test('check bool type', () => {
  expect(hay.check(true, HayTypes.bool)).toBe(true);
  expect(hay.check(false, HayTypes.bool)).toBe(true);
});

test('check object type', () => {
  expect(hay.check({}, HayTypes.object)).toBe(true);
});

test('check array type', () => {
  expect(hay.check([], HayTypes.array)).toBe(true);
});

test('check function type', () => {
  expect(hay.check(function() {}, HayTypes.func)).toBe(true);
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
  [1, "", true, false, [], function() {}].forEach(_ => {
    expect(hay.check(_, HayTypes.oneOf([
      HayTypes.number,
      HayTypes.string,
      HayTypes.bool,
      HayTypes.object,
      HayTypes.array,
      HayTypes.func,
    ]))).toBe(true);
  });
});