

exports.grpcFast = (req) => {
    return new Promise((resolve, reject) => {
        try {
            resolve(setTimeout(() => res.send('Fast Grpc response'), 100))
        } catch (err) {
            console.log(err)
            reject(err);
        }
    })

}


