const fetch = require("node-fetch");

const fetchPost = (url, payload) => {

    return new Promise((resolve, reject) => {

        fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(response => response.json())
            .then(resolve).catch(reject)

    })
}

module.exports = { fetchPost };

