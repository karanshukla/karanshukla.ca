---
title: optimising atproto applications is complicated (but that's okay)
date: 2026-06-20
description: infrastructure challenges of optimizing a Bluesky app across geographies.
---
Bluesky, as a decentralised platform, poses a unique challenge for engineers trying to optimise for latency. Where is the AppView hosted? What about the location of the PDS? What about Eurosky users?

I wanted to dig a little further this weekend into how it all works, and what could be done to improve Navyfragen's speed and reduce geographical latency, for users around the world. Because the traditional "just put a bunch of distributed caches worldwide" solution doesn't really work as well as you'd think it would for AT Protocol applications.

Let's start with the AppView. Looking at the DNS records of [api.bsky.app](http://api.bsky.app/), there's no Anycast. No failover. Just a single IP address based in California. This means, any social graph call (example, getting someones raw profile data) from any location outside of the US pays a latency toll. This can be verified by using a VPN. The time to first byte (TTFB) to the AppView from Ontario is 62ms. From the Netherlands, its 233ms. If we account for the latency caused by the repeated trips from the VPN, its likely closer to 150ms. This confirms that there is no cache or replica in the EU.

Navyfragen's services are hosted in the EU by design. When a user goes to [navyfragen.app](http://navyfragen.app/), their request is sent to the Netherlands hosted entrypoint. From there, they're served the frontend, and the backend fetches relevant data from them. The latency in the frontend is negligible, as its a simple SPA which is heavily edge cached automatically by Railway, so geographical location is not as important.

The backend service, which orchestrates the communication between the users and their data, is where it gets a little tricky. For example, inboxes are public (but protected by Anubis), so whenever a person visits your profile (eg. [fragen.navy/navyfragen.app](http://fragen.navy/navyfragen.app)), the Navyfragen backend fetches three pieces of data.

1.  The Decentralised ID from the handle (this hits the PDS, but more on that later)
    
2.  The Bluesky AppView (for the profile information, this is where it gets tricky)
    
3.  The Navyfragen centralised server (to determine if they have an anonymous inbox active)
    

![inbox request chain](/inbox_request_chain.png)

Because of this, each time you visit someone's inbox,the request has to travel multiple times between California, Europe and your own device. This creates latency, which results in perceived slowness for the end user.

The solution is to move or replicate the entrypoint to North America (which is something I can enable directly in Railway if I move to their Pro plan), however, this doesn't exactly solve the problem. The other microservices are still hosted in the EU, so communication between the entrypoint and the microservices would still be cross-atlantic. More importantly, users in the EU will still pay the latency tax when connecting to the AppView. So even if I redesign the entirety of the architecture and replicate it worldwide, there would still be latency when connecting to the AppView.

What can be controlled however, is the latency between the user's PDS and the Navyfragen backend. The vast majority of Bluesky PDSes are hosted in the US. So Navyfragen's backend pays both the AppView tax and the PDS tax. For Eurosky users, they get a fast egress to Navyfragen, and fast read/writes from the PDS.

This is exactly why a traditional distributed load balancer would fail for AT Protocol applications. If you are an EU user of Bluesky, your data is still hosted in North America. Routing your requests through European relays wouldn't avoid the inevitable trip to California. In order to reduce latency between the user and their PDS, the load balancer needs to be aware of the PDS geolocation, not the end user's location.

As of this weekend, Navyfragen does exactly this. When you log into Navyfragen through OAuth, the application looks at your PDS location and then sets a cookie, nf-region. If you are a Bluesky user, it is set to the US. If you self host your PDS or use Eurosky, your PDS is hosted in Europe, so it is set to EU. From that point on, your requests are routed either to a North American Navyfragen backend, or the existing EU Navyfragen backend. As a result, if you're a Eurosky user, your PDS interactions are extremely fast. For North Americans, it's also faster, but you're still paying a bit of a latency tax because the other services are still in the EU.

![pds aware routing](/pds_aware_routing.png)

I tested this novel PDS aware backend by comparing message deletion (which hits your PDS directly) between a North American Bluesky account, and a Eurosky account. Message deletion for an American PDS is around 800ms. For a Eurosky account, it is 300ms. This means that Eurosky users will experience faster performance when reading and writing to their own PDS. But it's not all bad news for North American users, as there's still a latency win, because the North American backend can communicate faster with your North American PDS.

This latency gets even more complex when you consider that Navyfragen loads other peoples' profiles. That's when Navyfragen's PDS aware routing gets wrinkly. Because the backend routing is based off the logged in user's location, loading the profile of someone who's not in the same PDS location as you has a latency tax. For example, if I'm in Eurosky, and I load the Navyfragen profile of a Bluesky user, the Navyfragen EU backend service has to make calls to not only the California AppView but also the California PDS. Solving this problem would require its own intelligent routing service which is resource aware. This would be a whole project in its own right, and not a microservice. It would probably be a steep hill to climb even for a team of experienced engineers. This doesn't even solve the Californian AppView problem.

With this in mind, I focused on just solving the PDS problem above, which is already live on prod, and I'm looking into different options for the [navyfragen.app](http://navyfragen.app/) entrypoint. For now Eurosky users, enjoy your fast anonymous question inboxes!