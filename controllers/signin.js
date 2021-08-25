
const handleSignin = (req, res, db, bcrypt) => {
    try {
        const { torreid, password } = req.body;
        if ((torreid?.trim()).length > 2 && (password?.trim()).length > 5) {
            db.select('torreid', 'hash').from('login')
                .where({ torreid })
                .then(data => {
                    const isValid = bcrypt.compareSync(password, data[0].hash);
                    if (isValid) {
                        db.select('*').from('users')
                            .where({ torreid })
                            .then(userArray => res.json(userArray[0]))
                            .catch(err => res.status(400).json('1')); //1 = 'Unable to get user'
                    } else {
                        res.status(400).json('2'); //2 = 'Wrong credentials!'
                    }
                }).catch(err => res.status(400).json('2')); //2 = 'Wrong credentials!'
        } else {
            res.status(400).json('3'); //3 = 'torreid > 2 chars and password > 5 chars'
        }
    } catch (error) {
        console.log(error);
        res.status(400).json('2'); //2 = 'Wrong credentials!'
    }
}

module.exports = { handleSignin };