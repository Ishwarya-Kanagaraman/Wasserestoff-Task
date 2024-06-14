// controllers to handle the functions

const apiServices = require("../service/service")

exports.restAPIFast = (req, res) => {
  apiServices.
  restAPIFast(req)
  .then((res)=>res.status(200).send(res))
  .catch((err)=>{
    res.status(500).send("Error in rest API fast")
  })
}

// rest API slow
exports.restAPISlow = (req, res) => {
  apiServices.
  restAPISlow(req)
  .then((res)=>res.status(200).send(res))
  .catch((err)=>{
    res.status(500).send("Error in rest API slow")
  })
}