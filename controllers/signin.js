const jwt = require('jsonwebtoken');
const redis = require('redis');

const redisClient = redis.createClient({
    url: process.env.REDIS_URI,
});

const handleSignin = (req, res, db, bcrypt) => {
	const { email, password } = req.body;
	if(!email || !password) {
		return Promise.reject('incorrect form submission');
	}
	return db.select('email', 'hash').from('login')
		.where('email', '=', email)
		.then(data => {
			const isValid = bcrypt.compareSync(password, data[0].hash);
			if (isValid) {
				return db.select('*').from('users')
					.where('email', '=', email)
					.then(user => user[0])
					.catch(err => Promise.reject('unable to get user'))
			} else {
				return Promise.reject('wrond credentials')
			}	
		})
		.catch(err => Promise.reject('wrong credentials'))
}

const getAuthTokenId = (req, res) => {
    const { authorization } = req.headers;
    return redisClient.get(authorization, (err, reply) => {
       if (err || !reply) {
           return res.status(401).json("Unauthorized");
       }
       return res.json({ id: reply })
    });
}

const signToken = (email) => {
    const jwtPayload = { email };
    return jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY, { expiresIn: '15m' });
}

const setToken = (token, id) => {
    return Promise.resolve(redisClient.set(token, id));
}

const createSessions = (user) => {
    // JWT token, return user data
    const { email, id } = user;
    const token = signToken(email);
    return setToken(token, id)
        .then(() => {
            return { success: 'true', userId: id, token }
        })
        .catch(console.log)
}

const signinAuthentication = (req, res, db, bcrypt) => {
    const { authorization } = req.headers;
    return authorization ? getAuthTokenId(req, res) :
        handleSignin(req, res, db, bcrypt)
            .then(data => {
                return data.id && data.email ? createSessions(data) : Promise.reject(data)
            })
            .then(session => res.json(session))
            .catch(err => res.status(400).json(err));
}

module.exports = {
    signinAuthentication: signinAuthentication,
    redisClient: redisClient,
    signToken: signToken,
    setToken: setToken,
    getAuthTokenId: getAuthTokenId,
    createSessions: createSessions
}