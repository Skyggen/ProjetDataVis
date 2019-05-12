const fetch = require('node-fetch')

const URL = 'https://api.themoviedb.org/3/tv/popular?language=fr&api_key=e0c090ad9289504f572875f449a5f944'

fetch(URL)
    .then(r => r.json())
    .then(d => JSON.stringify(d, null, 2))
    .then(console.log)