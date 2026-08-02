---
title: configuring a React application on Railway with free bot protection
date: 2025-05-30
description: using Anubis to protect a Railway-deployed React app from bots and scrapers
---
With AI scrapers, spam bots and nefarious actors all around the internet these days, its hard to just, make a website and throw it out on the internet like it used to be. As many [Vercel users have learned](https://www.reddit.com/r/nextjs/comments/12dngvg/small_mistake_leads_to_3000_bill_from_vercel_and/), bots can drive your server costs into the hundreds, if not thousands, of dollars. Its unclear as to whether this lack of DDoS protection is intentional or not, as from a business perspective it may be beneficial to not protect your users from massive egress costs. But that's a different topic I guess.

Cloudflare is pretty much the sole proprietor of bot and DDoS protection. And you've probably been hit with these captchas and Cloudflare landing pages, which seem to get more and more annoying as time goes on. Its hard to say whether these actually work, because its estimated that [40% of internet traffic is not real people](https://www.forbes.com/sites/emmawoollacott/2024/04/16/yes-the-bots-really-are-taking-over-the-internet/).

Anyway, back to the point, this is a quick guide on using [Anubis](https://anubis.techaro.lol/) to protect your Railway deployed React application from bots. While Anubis isn't 100% effective at stopping bots, DDoS attacks and spam, it is a tool that you can combine with more mundane methods such as server side rate limiters.

### What is Anubis?

Well, according to Egyptian mythology, [Anubis](https://en.wikipedia.org/wiki/Anubis) is the jackal-headed god of the afterlife. You've probably seen it depicted as holding a set of scales, because [Anubis](https://en.wikipedia.org/wiki/Anubis_(software)) weighs your heart and soul to determine your afterlife.

I genuinely couldn't think of a better analogy for a [WAF](https://en.wikipedia.org/wiki/Web_application_firewall) which is designed to stop bots. Anubis was created only this year by [Techaro](https://techaro.lol/) after an unfortunate disaster relating to a Gitea instance. You can find more information here: [https://anubis.techaro.lol/docs/](https://anubis.techaro.lol/docs/)

![Anubis, god of the dead and protector of websites (and also Canadian!)](/anubis-protector.png)

I'm not an expert on cyber-cryptography but the mechanism of Anubis is pretty straightforward. Anubis presents the browser a challenge which can only be resolved by a real browser. Simple cURL requests or other thin HTTP clients used by bots/scrapers likely wouldn't be able to solve the challenge and pass through to the destination website (the afterlife, in the prior analogy). If a bot is somehow able to pass the challenges, well they're basically a browser at that point.

Fast forward a few months after the Gitea incident and now Anubis is gaining significant traction, and is being deployed across the web.

![star history anubis (its now at like 7k stars on github)](/anubis-star-history.png)

### What is Railway?

Railway is a hosting platform for modern websites. While its significantly more expensive than self-hosting or buying rackspace from a traditional provider, it does come with its own advantages: quicker configuration, easy to use interfaces, and pre-made templates.

Railway is not the only business in this space. Competitors include Render, Netlify, Vercel and good ol' Heroku, [who don't seem to want your business anymore](https://techcrunch.com/2022/08/25/heroku-announces-plans-to-eliminate-free-plans-blaming-fraud-and-abuse/).

These instructions could apply to any of these managed hosting providers, but, in my analysis I found Railway to have the best UI, best billing plan for solo developers, and the most flexible configuration.

OK, finally we can get to the guide!

### Configuration

Lets start with the easiest and most straightforward React app configuration: a static single page frontend, and a NodeJS backend. No fancy SSR or dynamic rendering for now, but you could configure that if you wish afterwards. The key here is separating your backend out from your frontend, as we're going to use a reverse-proxy to connect the two. This guide assumes you have a general knowledge of modern internet architecture and technologies (in other words, you know what a port, cookie, HTTP request is etc).

You may want to start with one or both of the following examples to get your app going in Railway:

- [Quick Start Tutorial | Railway Docs](https://docs.railway.com/quick-start)
- [Deploy an Express App | Railway Docs](https://docs.railway.com/guides/express)

Now you should have a setup in your Railway "canvas" where you have two or more services, but you should have your frontend in a separate service to the backend as a minimum. I've been enjoying using Vite recently for frontend work, as its extremely fast and flexible. For a backend, you can just use any basic Express application, or any server framework which works with Railway.

When you deploy both services, ensure they are NOT connected to the web. These services themselves shouldn't be exposed to the web. The "entry point" for your application will be a reverse proxy, found here:

[Deploy Reverse Proxy on Railway](https://railway.com/template/7uDSyj)

This basic reverse proxy will connect your backend and frontend services without exposing either of them to the web. The way this specific reverse proxy works is that it catches requests prefixed with "/api" and then routes them to your backend without the "/api" in the URI. In the above configuration, lets say someone were to visit myapp.com/api, would that request go to the backend service? No, because Vite/React Router would see the GET request as fetching your frontend resources. However, if you configure your frontend and backend with this reverse proxy, only your frontend can communicate with your backend, as your frontend will send fetch requests to /api/resource, your backend will listen for /resource, then return the data back to the browser. Ensure CORS is configured in your backend as well to ensure no arbitrary data can be sent to your backend service.

In this guide, Anubis will sit as a protector for the frontend service, not the backend service. This is useful for simple websites which may have sensitive data which you don't want to be exposed for AI training, like a blog. Your reverse proxy should have your public domain (like www.myapp.com), and none of your other railway services should be exposed to the web.

To set up Anubis in Railway, simply create a new service via a Docker image by clicking "Create" in the top-right hand side of your Railway canvas, and type **ghcr.io/techarohq/anubis**. Railway will automatically initiate the service. You can even configure a name and image:

![WAF!!!](/anubis-railway-waf.png)

Let's start by configuring Anubis with the Caddy reverse proxy template above. Set the FRONTEND_DOMAIN in your Reverse Proxy variables to be the private Railway domain of Anubis. You can use a dynamic variable in Railway for this, for example, `${{Anubis.RAILWAY_PRIVATE_DOMAIN}}`. This means, whenever someone visits myapp.com, their browser will be redirected to Anubis, then Anubis will redirect them to your web page.

Now we can configure Anubis to redirect valid users to your frontend. The BIND variable in Anubis should match the port configured in your Caddy proxy, for example, `:8080`. Next, configure the TARGET variable, to be `http://${{Frontend.RAILWAY_PRIVATE_DOMAIN}}:{PORT}`. What's critical here is the port, as it MUST match whatever port the React app is serving on. You can check which port it is using the in built "Deploy Logs" within Railway, though you may want to use an environment variable instead so it is dynamic. Anubis will store a cookie for valid users so they're not re-challenged upon every page refresh, so configure the COOKIE_DOMAIN variable to be your public domain of your Caddy proxy using Railway variables.

There are other variables which you can set within Anubis to configure it further, but those are left as an exercise for the reader. Now you can test Anubis by going into an incognito window and trying to access your website directly. You should be hit with Anubis, and then redirected to your static React page.

#### Goodbye SEO

One major disadvantage of Anubis is completely destroying your site when it comes to SEO. By default Anubis will allow some good bots such as the Wayback machine. However, smaller features which rely on web crawlers like link preview generation for social media posts will also fail.

I'm currently investigating ways to get around this by using the Bot Policy feature within Anubis, so this might change!

### What else?

You can leave comments or questions directly on the guide if you need any help or have any other feedback!

Also, please consider supporting Anubis financially if you find it useful: [https://anubis.techaro.lol/docs/funding](https://anubis.techaro.lol/docs/funding)
