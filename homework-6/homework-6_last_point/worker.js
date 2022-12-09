const fs = require('fs');
const readline = require('readline');
const { workerData, parentPort } = require('worker_threads');

const readStream = fs.createReadStream(workerData, 'utf8');
const writeStream_1 = fs.createWriteStream('89.123.1.41_requests.log', 'utf8');
const writeStream_2 = fs.createWriteStream('34.48.240.111_requests.log', 'utf8');

const rl = readline.createInterface({
    input: readStream,
});

rl.on('line', (line) => {
    if (line.includes("89.123.1.41")) {
        writeStream_1.write(`${line}\n`);
    }
    if (line.includes("34.48.240.111")) {
        writeStream_2.write(`${line}\n`)
    }
    parentPort.postMessage({ result: 'Done' });
})