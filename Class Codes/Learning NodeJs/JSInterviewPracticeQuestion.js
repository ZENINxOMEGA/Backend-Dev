// const obj = { a: "one", b: "two", a: "three" };
// console.log(obj);

const a = {};
const b = { key: "b" };
const c = { key: "c" };

a[b] = 123;
a[c] = 456;

console.log(a[b]);