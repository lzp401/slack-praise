'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);

    router.post('/api/praise', ctx => {
        ctx.body = {
            text: 'Your praise is received!',
            attachments: Object.keys(ctx.request.body)
                .map(key => `${key}: ${ctx.request.body[key]}`)
                .map(text => ({ text })),
        };
        ctx.set('Content-Type', 'application/json');
    });
};
