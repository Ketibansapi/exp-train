let logger = (req, res, next) => {
    console.log('Logging activity ' + new Date().toISOString())
    console.log('IP ' + req.ip)
    next()
}

module.exports = logger