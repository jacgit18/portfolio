const fs = require('fs');

fs.readFile('./hello.txt',(err, data) => {
    if (err) {
        console.log('errrrrooooorrrrrrrr')
    }
    console.log('Aysnc', data.toString('utf-8')); // similar to ascii but greater scope for other languages
    // better to use for sync
})


const file = fs.readFileSync('./hello.txt');
console.log('Sync', file.toString());

//Append 

// fs.appendFile('./hello.txt', 'this is cool', err => {
//     if (err){
//         console.log(err)
//     }

// })

//Write 

// fs.writeFile('./byte.txt', 'Sad to see you' , err => {
//     if (err){
//         console.log(err)
//     }
//     console.log('inception')

// })


//Delete 

fs.unlink('./byte.txt', err => {
    if (err){
        console.log(err)
    }
    console.log('inception')

})