const { getAuthTokenId, createSessions} = require('./signin');

const handleRegister = (req, res, db, bcrypt) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
        return Promise.reject("incorrect form submission");
    }
    const hash = bcrypt.hashSync(password);
    return db.transaction((trx) => {
        trx.insert({
            hash: hash,
            email: email,
        })
            .into("login")
            .returning("email")
            .then((loginEmail) => {
                const emailString = loginEmail[0].email;

                return trx("users")
                    .returning("*")
                    .insert({
                        email: emailString,
                        name: name,
                        joined: new Date(),
                    })
                    .then(user => user[0]);
            })
            .then(trx.commit)
            .catch(trx.rollback);
    }).catch((err) => {
        console.log(err);
        return Promise.reject("unable to register")
    });
};

const registerAuthentication = (req, res, db, bcrypt) => {
    return handleRegister(req, res, db, bcrypt)
        .then(data => {
            return data.id && data.email ? createSessions(data) : Promise.reject(data)
        })
        .then(session => res.json(session))
        .catch(err => res.status(400).json(err));
}

module.exports = {
    registerAuthentication: registerAuthentication
};
