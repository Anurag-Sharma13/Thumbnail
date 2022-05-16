const express = require('express')

const router = express.Router()

const { thumbnailGenerate } = require('../controller/thumb');






router.get('/thumbnail',thumbnailGenerate)

    









module.exports = {router}