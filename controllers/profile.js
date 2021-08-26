const { torreEndpoints: { bio } } = require("../config/torreEndpoints");
const { fetchGet } = require("../helpers/fetchGet");
const { profileBuilder } = require("../helpers/profileBuilder");

//Returns 3 random strengths, interests and experiences for logged user
const handleProfile = async (req, res) => {
    try {

        const { torreid } = req.body;
        if ((torreid?.trim()).length > 2) {
            const requestString = `${bio}${torreid}`;
            const bioData = await fetchGet(requestString);
            const responsePayload = profileBuilder(bioData);
            res.json(responsePayload);
        } else {
            res.status(400).json('Bad request');
        }

    } catch (error) {
        console.log(error);
        res.status(400).json('Unable to get user profile');
    }
}

module.exports = { handleProfile };