const { Router } = require('express');
const Joi = require('@hapi/joi');
const { nanoid } = require('nanoid/async');
const Link = require('../models/link');
const createError = require('http-errors')

const router = Router();

const createValid = Joi.object({
    link: Joi.string().uri().required()
})

router.post('/link', async (req, res, next) => {
    try {
        const newlink = await createValid.validateAsync(req.body);
        newlink.lid = await nanoid(11);
        link = await Link.create(newlink);
    } catch (error) {
        next(createError.InternalServerError());
    }
    res.json({short_link:`https://bref.tk/${link.lid}`})
})

module.exports = router;
