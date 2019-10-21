let checkAuth = (req, res, next) => {
    if(!req.user) {
        res.status(401).json({
            status: 'ERROR'
        })
    } else {
        next()
    }
}

let checkRole = (req, res, next) => {
    if(!req.user) {
        res.status(401).json({
            status: 'ERROR'
        })
    } else {
        next()
    }
}

module.exports = {
    checkAuth,
    checkRole
}