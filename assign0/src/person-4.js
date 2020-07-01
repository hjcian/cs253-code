
function Person (first, last) {
  this.first = first
  this.last = last
}

Person.prototype.fullName = function () {
  return this.first + ' ' + this.last
}

Person.prototype.fullNameReversed = function () {
  return this.last + ', ' + this.first
}

Person.prototype.toString = function () {
  return '<Person: ' + this.fullName() + '>'
}

var s = new Person('Simon', 'Willison')
console.log(s.toString())

// same problem
var fullName = s.fullName
console.log(fullName()) // undefined undefined

/*
// 使用 prototype
每次你想要存取該物件的 property 時、但你並沒有設定的時候， JavaScript 會幫你檢查 Object.prototype 裡有沒有
*/
