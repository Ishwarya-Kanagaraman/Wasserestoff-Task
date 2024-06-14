// controllers to handle the functions

const graphApiServices = require("../service/graph.service")
// graph api fast
exports.graphAPIFast = (req, res) => {
  graphApiServices.
  graphAPIFast(req)
  .then((res)=>res.status(200).send(res))
  .catch((err)=>{
    res.status(500).send("Error in graph API fast")
  })
}

// graph API slow
exports.graphAPISlow = (req, res) => {
  graphApiServices.
  graphAPISlow(req)
  .then((res)=>res.status(200).send(res))
  .catch((err)=>{
    res.status(500).send("Error in graph API slow")
  })
}