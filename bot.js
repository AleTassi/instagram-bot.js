/**
 * InstagramBot.js
 * =====================
 * Instagram Bot made with love and nodejs
 *
 * @author:     Patryk Rzucidlo [@ptkdev] <info@ptkdev.it> (https://ptkdev.it)
 * @file:       bot.js
 * @version:    0.2
 *
 * @license:    Code and contributions have 'GNU General Public License v3'
 *              This program is free software: you can redistribute it and/or modify
 *              it under the terms of the GNU General Public License as published by
 *              the Free Software Foundation, either version 3 of the License, or
 *              (at your option) any later version.
 *              This program is distributed in the hope that it will be useful,
 *              but WITHOUT ANY WARRANTY; without even the implied warranty of
 *              MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *              GNU General Public License for more details.
 *              You should have received a copy of the GNU General Public License
 *              along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @link        Homepage:     https://instagram-bot.js.ptkdev.io
 *              GitHub Repo:  https://github.com/ptkdev/instagram-bot.js
 */

/**
 * Libs
 * =====================
 * Open source library
 *
 * @author:     Patryk Rzucidlo [@ptkdev] <info@ptkdev.it> (https://ptkdev.it)
 * @license:    This code and contributions have 'GNU General Public License v3'
 * @version:    0.2
 * @link:       http://webdriver.io/
 * @changelog:  0.1 initial release
 *              0.2 refactor: removed useless vars
 *
 */
const webdriverio = require('webdriverio');
const path = require('path');
const fs = require('fs');
const config = require(__dirname + '/config');
const options = {
    desiredCapabilities: {
        browserName: config.selenium_browser,
        chromeOptions: {
            args: config.selenium_chrome_options
        },
        binary: config.selenium_chrome_path,
        host: config.selenium_host,
        port: config.selenium_port
    }
};
/**
 * Init
 * =====================
 * Get username, password and hashtag of bot from /config.js
 * If not exist rename config.js.tmpl to config.js and change strings
 *
 * @author:     Patryk Rzucidlo [@ptkdev] <info@ptkdev.it> (https://ptkdev.it)
 * @license:    This code and contributions have 'GNU General Public License v3'
 * @version:    0.1
 * @changelog:  0.1 initial release
 *
 */
let client = webdriverio.remote(options);
var bot = client.init();

/**
 * Import libs
 * =====================
 * Flow and utilty modules
 *
 * @author:     Patryk Rzucidlo [@ptkdev] <info@ptkdev.it> (https://ptkdev.it)
 * @license:    This code and contributions have 'GNU General Public License v3'
 * @version:    0.2
 * @changelog:  0.1 initial release
 *              0.2 refactor: removed eval() and added require.
 *
 */
let utils = require(__dirname + '/modules/utils.js')(bot, config);

/**
 * Start Bot (init vars)
 * =====================
 *
 * @author:     Patryk Rzucidlo [@ptkdev] <info@ptkdev.it> (https://ptkdev.it)
 * @license:    This code and contributions have 'GNU General Public License v3'
 * @version:    0.1
 * @changelog:  0.1 initial release
 *
 */
let login_status = "";
let twofa_status = 1;
let like_status = "";
let pin_status = "";

/**
 * Switch Mode
 * =====================
 * Switch mode from config.js
 * 
 * @author:     Patryk Rzucidlo [@ptkdev] <info@ptkdev.it> (https://ptkdev.it)
 * @license:    This code and contributions have 'GNU General Public License v3'
 * @version:    0.1
 * @changelog:  0.1 initial release
 *
 */
async function switch_mode(bot, config, utils) {
    if (config.bot_mode == "likemode_classic")
        await start_likemode_classic(bot, config, utils);
}

/**
 * LikemodeClassic Flow
 * =====================
 * /modules/likemode_classic.js
 * 
 * @author:     Patryk Rzucidlo [@ptkdev] <info@ptkdev.it> (https://ptkdev.it)
 * @license:    This code and contributions have 'GNU General Public License v3'
 * @version:    0.1
 * @changelog:  0.1 initial release
 *
 */
async function start_likemode_classic(bot, config, utils) {
    let likemode_classic = require(__dirname + '/modules/likemode_classic.js')(bot, config, utils);
    utils.logger("[INFO]", "likemode", "classic");
    let today = "";
    let t1, t2, sec;
    do {
        today = new Date();
        t1 = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds());
        utils.logger("[INFO]", "like", "loading... " + new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds()));
        likemode_classic.like_open_hashtagpage();
        utils.sleep(utils.random_interval(4, 8));
        await likemode_classic.like_get_urlpic();
        utils.sleep(utils.random_interval(4, 8));
        like_status = await likemode_classic.like_click_heart();
        today = new Date();
        t2 = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds());
        sec = Math.abs((t1.getTime() - t2.getTime()) / 1000);
        utils.logger("[INFO]", "likemode", "seconds of loop " + sec + "... for miss ban bot wait " + (90 - sec) + "-" + (90 - sec + 15));
        if (sec < 90)
            utils.sleep(utils.random_interval(90 - sec, (90 - sec + 15)));
    } while (true);
}

/**
 * 2FA Location Flow (check if work)
 * =====================
 * /modules/2FA.js
 * 
 * @author:     Patryk Rzucidlo [@ptkdev] <info@ptkdev.it> (https://ptkdev.it)
 * @license:    This code and contributions have 'GNU General Public License v3'
 * @version:    0.1
 * @changelog:  0.1 initial release
 *
 */
async function start_twofa_location_check() {
    utils.logger("[INFO]", "twofa", "instagram request pin (bad location)?");
    try {
        let attr = await bot.getAttribute('#choice_1', 'value');
        if (config.debug == true)
            utils.logger("[DEBUG]", "twofa", "attr = " + attr);
        utils.logger("[INFO]", "twofa", "yes, instagram require security pin... You can not pass!1!111! (cit.)");
        utils.screenshot(bot, "twofa", "check_pin_request");
        pin_status = 1;
    } catch (err) {
        if (config.debug == true)
            utils.logger("[DEBUG]", "twofa", err);
        utils.logger("[INFO]", "twofa", "no, try second verify");
        pin_status = 0;
    }
}

/**
 * 2FA Flow (check if work)
 * =====================
 * /modules/2FA.js
 * 
 * @author:     Patryk Rzucidlo [@ptkdev] <info@ptkdev.it> (https://ptkdev.it)
 * @license:    This code and contributions have 'GNU General Public License v3'
 * @version:    0.1
 * @changelog:  0.1 initial release
 *
 */
async function start_twofa_check() {
    utils.logger("[INFO]", "twofa", "instagram request pin (2fa enabled)?");
    try {
        let attr = await bot.getAttribute('input[name="verificationCode"]', 'value');
        if (config.debug == true)
            utils.logger("[DEBUG]", "twofa", "attr = " + attr);
        utils.logger("[INFO]", "twofa", "yes, instagram require security pin... You can not pass!1!111! (cit.)");
        utils.screenshot(bot, "twofa", "check_pin_request");
        pin_status = 2;
    } catch (err) {
        if (config.debug == true)
            utils.logger("[DEBUG]", "twofa", err);
        utils.logger("[INFO]", "twofa", "no, bot is at work (started)... Wait...");
        utils.logger("[INFO]", "twofa", "starting current mode");
        utils.screenshot(bot, "twofa", "check_nopin");
        utils.sleep(utils.random_interval(4, 8));
        pin_status = 0;
    }
}

/**
 * 2FA (Bad location) Flow
 * =====================
 * /modules/2FA.js
 * 
 * @author:     Patryk Rzucidlo [@ptkdev] <info@ptkdev.it> (https://ptkdev.it)
 * @license:    This code and contributions have 'GNU General Public License v3'
 * @version:    0.1
 * @changelog:  0.1 initial release
 *
 */
async function start_twofa_location() {
    let twofa = require(__dirname + '/modules/2FA.js')(bot, config, utils);
    utils.logger("[INFO]", "twofa (location)", "loading...");
    twofa.sendpin();
    utils.sleep(utils.random_interval(120, 180));
    twofa.readpin("security_code");
    utils.sleep(utils.random_interval(4, 8));
    twofa.submit();
    utils.sleep(utils.random_interval(4, 8));
    twofa_status = await twofa.submitverify("security_code");
    utils.sleep(utils.random_interval(4, 8));
}

/**
 * 2FA (Enabled) Flow
 * =====================
 * /modules/2FA.js
 * 
 * @author:     Patryk Rzucidlo [@ptkdev] <info@ptkdev.it> (https://ptkdev.it)
 * @license:    This code and contributions have 'GNU General Public License v3'
 * @version:    0.1
 * @changelog:  0.1 initial release
 *
 */
async function start_twofa() {
    let twofa = require(__dirname + '/modules/2FA.js')(bot, config, utils);
    utils.logger("[INFO]", "twofa (enabled)", "loading...");
    utils.logger("[WARNING]", "twofa", "please insert pin in loginpin.txt and wait 2-3 minutes... (tic... tac... tic... tac... tic...)");
    utils.sleep(utils.random_interval(120, 180));
    twofa.readpin("verificationCode");
    utils.sleep(utils.random_interval(4, 8));
    twofa.submit();
    utils.sleep(utils.random_interval(4, 8));
    twofa_status = await twofa.submitverify("verificationCode");
    utils.sleep(utils.random_interval(4, 8));
}

/**
 * Login Flow
 * =====================
 * /modules/likemode_login.js
 * 
 * @author:     Patryk Rzucidlo [@ptkdev] <info@ptkdev.it> (https://ptkdev.it)
 * @license:    This code and contributions have 'GNU General Public License v3'
 * @version:    0.1
 * @changelog:  0.1 initial release
 *
 */
async function start_login() {
    let login = require(__dirname + '/modules/login.js')(bot, config, utils);
    utils.logger("[INFO]", "login", "loading...");
    login.open_loginpage(utils);
    utils.sleep(utils.random_interval(4, 8));
    login.set_username();
    utils.sleep(utils.random_interval(4, 8));
    login.set_password();
    utils.sleep(utils.random_interval(4, 8));
    login.submit();
    utils.sleep(utils.random_interval(4, 8));
    login_status = await login.submitverify();
    utils.logger("[INFO]", "login", "login_status is " + login_status);
    utils.sleep(utils.random_interval(4, 8));
}


/**
 * Start Bot (flow) 
 * =====================
 *
 * @author:     Patryk Rzucidlo [@ptkdev] <info@ptkdev.it> (https://ptkdev.it)
 * @license:    This code and contributions have 'GNU General Public License v3'
 * @version:    0.1
 * @changelog:  0.1 initial release
 *
 */
start_login();
utils.sleep(utils.random_interval(4, 8));
if (login_status == 1) {
    start_twofa_location_check();
    utils.sleep(utils.random_interval(4, 8));
    if (pin_status == 0){
        start_twofa_check();
    }
    utils.sleep(utils.random_interval(4, 8));
    if (pin_status == 1) {
        start_twofa_location();
    } else if (pin_status == 2) {
        start_twofa();
    } 
    utils.sleep(utils.random_interval(4, 8));
    utils.logger("[INFO]", "twofa", "status " + twofa_status);
    if (twofa_status == 1) {
        switch_mode(bot, config, utils);
    }
}
