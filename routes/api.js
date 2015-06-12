var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/donatori', function(req, res, next) {
    res.sendFile('donatori.json', { root: __dirname + '/../public/app/components/avis/' });
});

module.exports = router;
