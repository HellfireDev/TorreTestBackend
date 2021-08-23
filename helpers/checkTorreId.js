const fetch = require('node-fetch');

const checkTorreId = (torreId) => {
    return new Promise((resolve, reject) => {
        fetch(`https://bio.torre.co/api/bios/${torreId}`)
            .then(response => response.json())
            .then(resolve)
            .catch(reject);
    });
}

module.exports = { checkTorreId };