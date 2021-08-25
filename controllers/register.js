const { checkTorreId } = require("../helpers/checkTorreId");

const handleRegister = async (req, res, db, bcrypt) => {

    try {

        const { name, torreid, password } = req.body;
        if ((name?.trim()).length > 2 && (torreid?.trim()).length > 2 && (password?.trim()).length > 5) {
            const { person: isTorreIdValid } = await checkTorreId(torreid);
            if (isTorreIdValid) {
                const hash = bcrypt.hashSync(password, 8);
                db.transaction(trx => {
                    trx.insert({
                        hash,
                        torreid
                    }).into('login')
                        .returning('torreid')
                        .then(torreIds => {
                            trx.insert({
                                name,
                                torreid: torreIds[0]
                            }).into('users')
                                .returning('*')
                                .then(users => {
                                    res.json(users[0]);
                                })
                        }).then(trx.commit)
                        .catch(error => {
                            trx.rollback;
                            res.status(400).json('1'); //1 = 'Torre Id already registered'
                        })
                });
            } else {
                res.status(400).json('2'); //2 = 'Invalid Torre Id'
            }

        } else {
            res.status(400).json('3'); //3 = 'Name must be > 2 chars, torreid > 2 chars and password > 5 chars'
        }


    } catch (error) {
        console.log(error);
        res.status(400).json('Unable to register');
    }

}

module.exports = { handleRegister };