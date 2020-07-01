
function personFullName () {
  return this.first + ' ' + this.last
}
function personFullNameReversed () {
  return this.last + ', ' + this.first
}

function Person (first, last) {
  this.first = first
  this.last = last
  this.fullName = personFullName
  this.fullNameReversed = personFullNameReversed
}

var s = new Person('Simon', 'Willison')

// same problem
var fullName = s.fullName
console.log(fullName()) // undefined undefined

// by 創建"共享函數"
// 有沒有更美的方法？
