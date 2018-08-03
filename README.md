[![](https://instagram.bot.ptkdev.io/img/instagrambot_logo.png)](https://instagram.bot.ptkdev.io)

# InstagramBot.js

[![](https://img.shields.io/badge/license-GLPv3-brightgreen.svg)](#) [![](https://img.shields.io/badge/powered%20by-puppeteer-46aef7.svg)](https://github.com/GoogleChrome/puppeteer) [![](https://img.shields.io/badge/version-v0.8.3-lightgrey.svg)](https://github.com/social-manager-tools/instagram-bot-lib/releases) [![](https://img.shields.io/badge/chat%20on-Slack-orange.svg)](https://slack.ptkdev.io) [![](https://img.shields.io/badge/blog-medium-2AE176.svg)](http://blog.ptkdev.io) [![](https://img.shields.io/badge/twitter-ptkdevio-2AA3EF.svg)](https://twitter.com/ptkdevio) [![](https://img.shields.io/badge/help-support@ptkdev.io-fbbc05.svg)](mailto:support@ptkdev.io)

[![](https://img.shields.io/badge/donate-patreon-F87668.svg)](http://patreon.ptkdev.io) [![](https://img.shields.io/badge/donate-paypal-46AFE0.svg)](http://paypal.ptkdev.io) [![](https://img.shields.io/badge/buy%20me-coffee-4B788C.svg)](http://coffee.ptkdev.io)

[![](https://ptkdev.it/img/bot/ptkdev-instagram-bot.gif)](https://instagram.bot.ptkdev.io)

## What does it do
This bot helps you increase the engagement of your Instagram profile through different social algorithms. Increase the likes on your photos and followers.

## Features
* [✓] Easy to use
* [✓] Login
* [✓] 2FA (bad location)
* [✓] 2FA (sms pin enabled)
* [✓] Multi-Session
* [✓] Multi-Platform (Windows 10, Mac OSX, Linux, [Raspberry PI 3](https://github.com/social-manager-tools/instagram-bot.js/blob/master/INSTALL.md))
* [✓] Errors manager (bad pin, bad password)
* [✓] Screenshot and Verbose logger
* [✓] Like Mode Classic: bot select random hashtag from config list and like 1 random photo and repeat this all time.
* [✓] Like Mode Realistic: bot select random hashtag from config list and like fast 10-12 photos, sleep 15-20min and repeat this all time. Sleep at night.
* [✓] Like Mode Competitor Users: select account, select random followers, like 10-12 photo and sleep 15-20min. Sleep at night.
* [✓] Like Mode Superlike: select random hashtag from config list and like 3 random photo of same user.
* [✓] Comment Mode Classic: select random comment and random hashtag and write comment under photo.
* [✘] Follow/Defollow Classic: follow user from random hashtag and defollow after 1h.
* [✘] Defollow All: defollow all your following (ignore users in whitelist).

## Fast setup (CLI Version)
1. Download [stable bot version](https://github.com/social-manager-tools/instagram-bot.js/releases) and extract it.
2. Download [Node.js](https://nodejs.org/it/) >= 7.6 and install it.
3. Run `npm install` in `instagram-bot.js` folder.
4. Rename `config.js.tpl` to `config.js`, fill it properly.
5. Start the bot via `node bot.js`
6. If work add star :star: at this project :heart:
7. If you want help me: **[donate on paypal](http://paypal.ptkdev.io)** or become a **[backer on patreon](http://patreon.ptkdev.io)**.

For advanced configuration see [INSTALL.md](https://github.com/social-manager-tools/instagram-bot.js/blob/master/INSTALL.md).

#### 2FA: SMS Pin
If you received sms or email pin edit `loginpin.txt` and insert it on first line. Wait 50-60 seconds...

#### Tips: hide browser
Edit `config.js` and switch `chrome_headless` option to `true`.

#### Check if work:
See images in ./logs/screenshot or disable `chrome_headless` flag.

## Bugs
1. `[ERROR] login: The username you entered doesn't belong to an account. Please check your username and try again. (restart bot and retry...)`
* Why happen? Instagram desktop is in overcapacity. Happen at 12-14 and 19-21 all days. 
* Solution: Login in other time or Logout from your instagram app, and login again. Reboot bot and retry... Try and retry, and retry, and retry... Or stop bot and wait 2-3h...

2. `Error: Protocol error (Page.captureScreenshot): Target closed.`
* Why happen? macOS don't support correctly screenshot from puppeteer
* Solution: set `screenshot` on `false` in `config.js`

3. `This code is no longer valid. Please request a new one. (400) (/accounts/login/ajax/two_factor/)` 
* Why happen? Instagram bug at login
* Solution: disable at moment 2FA or try old version of chrome (edit `config.js` set `executable_path`)

## Desktop setup (GUI Version)
1. Download [Social Manager Tools GUI](https://socialmanagertools.ptkdev.io/).
2. Run application.

## Docker setup
If you prefer to run this using Docker, an official container is available from the [Docker Hub](https://hub.docker.com/r/socialmanagertools/instagram-bot.js).

In order to run it, copy the `config.js.tpl` file, configure it as you prefer, then use it through volume mapping,
like in this example:

```sh
$ docker run \
    --restart=always \
    --name=instagram-bot \
    -d \
    -v /path/to/config.js:/app/config.js \
    socialmanagertools/instagram-bot.js &>/dev/null
```

## Roadmap
See full roadmap (open task, todo and bugs) in [project page](https://github.com/social-manager-tools/instagram-bot.js/projects?query=is%3Aopen+sort%3Aname-asc).
* [v0.7.X](https://github.com/social-manager-tools/instagram-bot.js/projects/1)
* [v0.8.X](https://github.com/social-manager-tools/instagram-bot.js/projects/2)
* [v0.9.X](https://github.com/social-manager-tools/instagram-bot.js/projects/3)

## Sorry for snake_case
I love :snake: snake_case syntax sorry for this :sob: don't hate me.

[![](https://socialmanagertools.ptkdev.io/img/socialmanagertools_logo.png)](https://github.com/social-manager-tools)

# Social Manager Tools

[Social Manager Tools GUI](https://github.com/social-manager-tools/social-manager-tools)  
[InstagramBot.js](https://github.com/social-manager-tools/instagram-bot.js) ([LIB](https://github.com/social-manager-tools/instagram-bot-lib))  
[TwitterBot.js](https://github.com/social-manager-tools/twitter-bot.js) ([LIB](https://github.com/social-manager-tools/twitter-bot-lib))  
[FacebookBot.js](https://github.com/social-manager-tools/facebook-bot.js) ([LIB](https://github.com/social-manager-tools/facebook-bot-lib))  
[WordpressTelegramBot.js](https://github.com/social-manager-tools/wordpress-telegram-bot.js) ([LIB](https://github.com/social-manager-tools/wordpress-telegram-bot-lib))  
[MediumTelegramBot.js](https://github.com/social-manager-tools/medium-telegram-bot.js) ([LIB](https://github.com/social-manager-tools/medium-telegram-bot-lib))  

# License

GNU GENERAL PUBLIC LICENSE

Copyright (c) 2018 Patryk Rzucidło (PTKDev)
