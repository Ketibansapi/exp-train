const jwt = require('jsonwebtoken');

var jwtAuth = function (req, res, next) {
    if (typeof req.get('Authorization') != 'undefined') {
        req.checkHeaders('Authorization', req.__('validation.accessTokenEmpty')).notEmpty();
        req.accessToken = req.get('Authorization').split(' ')[1];
    } else {
        req.checkCookies('accessToken', req.__('validation.accessTokenEmpty')).notEmpty();
        req.accessToken = req.cookies.accessToken;
    }

    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            res.status(422).json({
                type: 'ValidationErr',
                error: result.array()
            });
            return;
        } else {
            // check header or url parameters or post parameters for token
            var token = req.accessToken;
            // verifies secret and checks exp
            jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
                if (err) {
                    return res.status(401).json({
                        status: 401,
                        error: 'JWTErrOrExpired',
                        message: 'Failed to authenticate token.'
                    });
                } else if (decoded.activation === false) {
                    return res.status(401).json({
                        status: 401,
                        error: 'ActivationErr',
                        message: 'Account not activated'
                    });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.jwt_decoded = decoded;
                    req.user_id = decoded.user_id;
                    next();
                }
            });
        }
    });
}

module.exports = jwtAuth;