'use strict';

const Controller = require('egg').Controller;
const token = 'xoxp-725565328610-730634192065-738359640496-359c34eadaf6dda51e992091fd268ae9';
const userIdReg = /<@(.+)>/;

class HomeController extends Controller {
    async index() {
        const { ctx } = this;
        ctx.body = 'hi, egg';
    }

    async receiveCommand() {
        const { ctx } = this;
        const { text, user_name } = ctx.request.body;

        const mentionMatch = (text || '').match(userIdReg);
        let profileImg32 = '';
        let displayName = '';

        if (mentionMatch) {
            const [ , mentionText ] = mentionMatch;
            const [ mentionedId ] = mentionText.split('|');

            const resp = await this.ctx.curl(
                `https://slack.com/api/users.profile.get?token=${token}&user=${mentionedId}`,
                {
                    method: 'GET',
                    dataType: 'json',
                }
            );

            const profile = resp.data.profile;

            profileImg32 = profile.image_32;
            displayName = profile.display_name_normalized;
        }

        ctx.body = {
            response_type: 'in_channel',
            text: `${user_name}, Your praise is received!`,
            attachments: [
                {
                    blocks: [
                        {
                            type: 'section',
                            text: {
                                type: 'markdown',
                                text: displayName,
                            },
                            accessory: {
                                type: 'image',
                                image_url: profileImg32,
                            },
                        },
                    ],
                },
            ],
        };
        ctx.set('Content-Type', 'application/json');
    }
}

module.exports = HomeController;
