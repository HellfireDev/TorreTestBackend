
const handleSignin = (req, res, db, bcrypt) => {
    const { torreid, password } = req.body;
    if ((torreid.trim()).length > 2 && (password.trim()).length > 5) {
        db.select('torreid', 'hash').from('login')
            .where({ torreid })
            .then(data => {
                const isValid = bcrypt.compareSync(password, data[0].hash);
                if (isValid) {
                    db.select('*').from('users')
                        .where({ torreid })
                        .then(userArray => res.json(userArray[0]))
                        .catch(err => res.status(400).json('Unable to get user'));
                } else {
                    res.status(400).json('Wrong credentials!');
                }
            }).catch(err => res.status(400).json('Wrong credentials!'));
    } else {
        res.status(400).json('torreid > 2 chars and password > 5 chars');
    }
}

module.exports = { handleSignin };