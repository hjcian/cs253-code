const a = 1; const b = 2; const c = 3;

(function firstFunction () {
  // a = 1
  const b = 5; const c = 6; // console.log(`firstFunction: a: ${a}, b: ${b}, c: ${c}`);

  (function secondFunction () {
    //   a = 1
    const b = 8; console.log(`a: ${a}, b: ${b}, c: ${c}`);
    // c = 6

    (function thirdFunction () {
      const a = 7; const c = 9; // console.log(`thirdFunction: a: ${a}, b: ${b}, c: ${c}`);
      //   b = 8
      (function fourthFunction () {
        const a = 1
        // b = 8
        const c = 8
        // console.log(`fourthFunction: a: ${a}, b: ${b}, c: ${c}`)
      })()
    })()
  })()
})()
