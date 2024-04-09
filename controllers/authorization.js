const jwt = require('jsonwebtoken');
const redisClient = require('./signin').redisClient;

const validateTokenAgainstId = (token, id) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        return Number(decoded.id) === Number(id);
    } catch (err) {
        console.log(`Error while verifying token: ${err}`);
        return false;
    }
}

const requireAuth = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json('Unauthorized');
    }

    return redisClient.get(authorization, (err, reply) => {
        if (err || !reply) {
            return res.status(401).json('Unauthorized');
        }

        const id = req.params.id || req.body.id;
        const isTokenValidatedAgainstRequestId = validateTokenAgainstId(authorization, id);

        if (isTokenValidatedAgainstRequestId) {
            console.log('you shall pass');
            return next();
        }

        return res.status(401).json('Unauthorized');
    });
}

module.exports = {
    requireAuth: requireAuth
}