function helloName(req, res) {
    let message = `Hello, ${request.params.name}!`
    response.status(200).json({
        status: "OK",
        message: message
    })
}
function helloQuery(req, res) {
    let message = `Hello, ${request.query.name}!`
    response.status(200).json({
        status: "OK",
        message: message
    })
}

function helloBody(req, res) {
    let message = `Hello, ${request.body.name}!`
    response.status(200).json({
        status: "OK",
        message: message
    })
}

module.exports = { helloName, helloBody }