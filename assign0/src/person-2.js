function Person (first, last) {
  this.first = first
  this.last = last
  this.fullName = function () {
    return this.first + ' ' + this.last
  }
  this.fullNameReversed = function () {
    return this.last + ', ' + this.first
  }
}
var s = new Person('Simon', 'Willison')

// same problem
var fullName = s.fullName
console.log(fullName()) // undefined undefined

// 問題是每次創建 Person 物件，連同 methods 都被複製了一份 (everything is Object!)
// 有沒有辦法做一個 global method 呢?
