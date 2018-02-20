const express = require('express');
const router = express.Router();

var staticUsers = [{name: 'John Doe'}, {name: 'Jane Doe'}];

let response = {
    status: 200,
    data: [],
    message: null
};

// for testing purposes in initial upload
router.get('/users', (req, res) => {
    response.data = staticUsers;
    res.json(response);
});

module.exports = router;
