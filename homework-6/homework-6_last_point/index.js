const { Worker } = require('worker_threads');


const workerData = 'access_tmp.log';

function start(workerData) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', { workerData })
        worker.on('message', resolve);
        worker.on('error', reject)
    })
}

start(workerData)
    .then((result) => console.log(result))
    .catch((err) => console.error(err))
