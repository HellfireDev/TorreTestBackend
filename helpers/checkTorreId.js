const fetch = require('node-fetch');
const { torreEndpoints: { bio } } = require('../config/torreEndpoints');

const checkTorreId = (torreId) => {
    return new Promise((resolve, reject) => {
        fetch(`${bio}${torreId}`)
            .then(response => response.json())
            .then(resolve)
            .catch(reject);
    });
}

module.exports = { checkTorreId };