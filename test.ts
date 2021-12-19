function numbertoKorean(n: number) {
    var s = ["", "천", "만", "만", "백만", "천만", "억", "십억"];

    if (n < 1000) return n;

    var e = Math.floor(Math.log(n) / Math.log(100));

    if (e == Infinity) return "0 " + s[0];
    else return (n / Math.pow(100, Math.floor(e))).toFixed(2) + " " + s[e];
}

console.log(numbertoKorean(1000));