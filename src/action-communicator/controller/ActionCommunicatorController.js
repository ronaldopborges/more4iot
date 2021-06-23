const debug = require('debug')("actCommu:controller:sync")

const async = require('./async');

const dispatch = async (req, res) => {
    debug('action received');
    debug('send to async resolve...');
    async.resolve(req.body);
    return res.status(200).send("action dispatch [in process]");
};

exports.dispatch = dispatch;
