require('colors');

const start = +process.argv[2];
const end = +process.argv[3];
const primeNumbers = [];

if (isNaN(start) || isNaN(end)) {
    console.log('Введите корректные данные'.red);
    return;
}

const isPrime = (num) => {
    if (num <= 1) return false;
    for (let i = 2; i < num; i++)
        if (num % i === 0) return false;
    return true;
}

for (let i = start; i <= end; i++) {
    if (isPrime(i)) {
        primeNumbers.push(i);
    };
}

let count = 0;
for (let i = 0; i < primeNumbers.length; i++) {
    if (count == 0) {
        console.log(`${primeNumbers[i]}`.green);
        count++;
    } else if (count == 1) {
        console.log(`${primeNumbers[i]}`.yellow);
        count++;
    } else {
        console.log(`${primeNumbers[i]}`.red);
        count = 0;
    }
}

if (!primeNumbers.length) {
    console.log('Простые числа в указанном диапазоне отсутствуют'.blue);
    return;
}