const express = require('express');

const api = express.Router();

api.get('/test', (req, res) => {
				return res.json({test: 'test api'})
})

module.exports = api;