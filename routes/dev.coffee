express = require 'express'
router = express.Router()

router.get '/', (req, res, next) ->
    res.send('Hello dev')
    return

router.get '/brackets', (req, res) ->
    res.render('dev/brackets', {title: 'Brackets'})
    return

router.get '/browser', (req, res) ->
    res.render('dev/browser', {title: 'Browser'})
    return

router.get '/timeline', (req, res) ->
    res.render('dev/timeline', {title: 'Timeline'})
    return

module.exports = router