const fetch = require("node-fetch");


const fetchGet = (url) => {

    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json())
            .then(resolve).catch(reject)
    })

}

module.exports = { fetchGet };