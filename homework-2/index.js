// Задание 1

// Record 1
// Record 5 
// Record 6 
// Record 2  
// Record 3 
// Record 4 


//Задание 2

require('moment-precise-range-plugin');
const moment = require('moment');
const EventEmitter = require('events');
const [incomeDateFromUser] = process.argv.slice(2);

const getIncomeDate = (date) => {
    const [hour, day, month, year] = date.split('-');
    const future = new Date(year, month - 1, day, hour);
    const finalDate = moment(future).format("YYYY-MM-DD HH:mm:ss")
    return finalDate;
};

const incomeDate = getIncomeDate(incomeDateFromUser);

const showDiff = (incomeDate) => {
    const currentDate = moment().format("YYYY-MM-DD HH:mm:ss");
    if (incomeDate <= currentDate) {
        emitter.emit('end');
    } else {
        const diff = moment.preciseDiff(currentDate, incomeDate);
        console.clear();
        console.log(diff);
    }
}

const emitter = new EventEmitter();
const timer = setInterval(() => {
    emitter.emit('tick', incomeDate);
}, 1000)
emitter.on('tick', showDiff);
emitter.on('end', () => {
    clearInterval(timer);
    console.clear();
    console.log('Отсчёт завершён');
});   