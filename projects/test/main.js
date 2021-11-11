var Fn0 = function() {
    console.log('Fn0')
    setTimeout(function () {
        Fn1()
    }, 1000)
}

var Fn1 = function() {
    console.log('Fn1')
}

Fn0()