

exports.restAPIFast=(req)=>{
    return new Promise((resolve,reject)=>{
        try {
            resolve(setTimeout(() => res.send('Fast REST response'), 100))
        } catch (err) {
            console.log(err)
           reject(err);
        }
    })
   
}


exports.restAPISlow=(req)=>{
    return new Promise((resolve,reject)=>{
        try {
            resolve(setTimeout(() => res.send('Slow REST response'), 1000))
        } catch (err) {
            console.log(err)
           reject(err);
        }
    })
   
}