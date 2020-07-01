function makePerson (first, last) {
  return {
    first: first,
    last: last,
    fullName: function () {
      return this.first + ' ' + this.last
    },
    fullNameReversed: function () {
      return this.last + ', ' + this.first
    }
  }
}

// fine
// var s = makePerson('Simon', 'Willison')
// console.log(s.fullName()) // "Simon Willison"
// console.log(s.fullNameReversed()) // "Willison, Simon"

first = 'max'
last = 'cian'

// probelm!
var s = makePerson('Simon', 'Willison')
var fullName = s.fullName
console.log(fullName()) // undefined undefined
