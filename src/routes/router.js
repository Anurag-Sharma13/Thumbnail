const express = require('express')

const router = express.Router()

const { thumbnailGenerate, fun } = require('../controller/thumb');






router.get('/thumbnail',thumbnailGenerate)


    









module.exports = {router}