

exports.graphAPIFast = (req) => {
    return new Promise((resolve, reject) => {
        try {
            resolve(setTimeout(() => res.send('Fast Graph response'), 100))
        } catch (err) {
            console.log(err)
            reject(err);
        }
    })

}


exports.graphAPISlow = (req) => {
    return new Promise((resolve, reject) => {
        try {
            resolve(setTimeout(() => res.send('Slow Graph response'), 1000))
        } catch (err) {
            console.log(err)
            reject(err);
        }
    })

}