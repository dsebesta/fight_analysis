module.exports = {
    create: {
        start: function (req, res, context) {
            console.log('create middleware reached!!!!');
            console.log('request', req);
            // console.log('response', res);
            // console.log('context', context);
            return context.continue;
        }
    }
};