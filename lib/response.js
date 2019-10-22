function success(response, data) {
    return response.status(200).json({
        status: 'OK',
        data: data || "Success"
    })
}

function error(response, status, code, message) {
    return response.status(status).json({
        status: 'Error',
        code: code,
        message: message || "Bad Request"
    })
}

module.exports = {
    success,
    error
}