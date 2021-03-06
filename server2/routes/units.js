const express = require('express')

const router = express.Router()

router.get('/', (req, res) => res.json({}))

router.get('/:unitId', (req, res) => res.json({}))

router.get('/:unitId/versions', (req, res) => res.json({}))

router.get('/versions/:versionId', (req, res) => res.json({}))

router.post('/versions', (req, res) => res.json({}))

router.post('/:unitId/versions', (req, res) => res.json({}))

module.exports = router
