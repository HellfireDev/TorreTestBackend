const { appConfig: { searchSize } } = require('../config/appConfig');
const { torreEndpoints: { searchJobs, searchBios } } = require('../config/torreEndpoints');
const { comboBuilder } = require('../helpers/comboBuilder');

const handleCombo = async (req, res) => {
    try {

        const { c1, c2, c3 } = req.body;
        if (!!c1 && !!c2 && !!c3) {
            const searchJobsUrl = `${searchJobs}?size=${searchSize}`;
            const searchPeopleUrl = `${searchBios}?size=${searchSize}`;
            const responsePayload = await comboBuilder(c1, c2, c3, searchJobsUrl, searchPeopleUrl);
            res.json(responsePayload);
        } else {
            res.status(400).json('Bad request');
        }

    } catch (error) {
        console.log(error);
        res.status(400).json('Unable to get data');
    }
}

module.exports = { handleCombo };