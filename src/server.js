const express = require('express');
const compression = require('compression');
const cors = require('cors');
const morgan = require('morgan');
const createError = require('http-errors');
const Link = require('./models/link');
const linkRoute = require('./api/link.route');

const app = express()

app.use(cors())

app.use(express.json())

app.use(compression({
    level:4,
    threshold:1000*30
}))

app.use(morgan('dev'))

app.use('/link', linkRoute);

app.get('/:lid', async (req, res, next) => {
    const link = await Link.findOne({lid:req.params.lid});
    res.redirect(link.link);
})

app.use((req, res, next) =>{
    const error = createError.NotFound('This route doesnt exist');
    error.status = 404;
    next(error);
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

app.listen(3000, () => {
    console.log(`Started`);
})

module.exports = app;