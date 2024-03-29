/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1566624274980_7173';

    // add your middleware config here
    config.middleware = [];

    config.security = {
        csrf: {
            enable: false,
        },
    };

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
        slackAppToken: process.env.SLACK_APP_TOKEN,
    };

    return {
        ...config,
        ...userConfig,
    };
};
