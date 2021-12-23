const fetch = require("node-fetch");
require('dotenv').config()

const CONSUMER_KEY = process.env.POCKET_CONSUMER_KEY;
const ACCESS_TOKEN = process.env.POCKET_ACCESS_TOKEN;
const TAG = process.env.POCKET_TAG;
const POCKET_URI = `https://getpocket.com/v3/get?consumer_key=${CONSUMER_KEY}&access_token=${ACCESS_TOKEN}&tag=${TAG}`

module.exports = async function() {
    console.log("Fetching pocket list…");

    return fetch(POCKET_URI)
        .then(res => res.json())
        .then(json => {
            return Object.values(json.list);
        });
};