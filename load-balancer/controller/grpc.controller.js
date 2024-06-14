// controllers to handle the functions

const grpcServices = require("../service/grpc.service")

exports.grpcFast = (req, res) => {
    grpcServices.
        grpcFast(req)
        .then((res) => res.status(200).send(res))
        .catch((err) => {
            res.status(500).send("Error in graph API fast")
        })
}
