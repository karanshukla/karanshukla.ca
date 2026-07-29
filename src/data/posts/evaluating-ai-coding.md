---
title: evaluating & quantifying AI coding paradigms for token efficiency & app reliability over time
date: 2026-07-28
description: measuring token cost and shipped bugs across three AI coding workflows
---

_Disclaimer: No LLMs were used to draft and write any text in this post. An LLM was used to evaluate and verify the claims made here for correctness and accuracy, but not writing style or prose. LLMs were used to analyse data within the experiments and make tables & graphs of its outcomes._

TL;DR - If you're going to vibe code and not read the code that's being written, use a frontier model and at least have a second model evaluate your output once in a while. If you want to ever go to prod and scale a solution, you need to read any LLM output critically, focus on "traditional" quality tools and clean code architecture, even if it costs you more upfront. Vibe coding will eventually fail, costing you more.

The AI "race" recently seems to be more focused on code tools more than ever. It seems like every week, another "lab" releases a model which claims to be the best for code. And vibe coding is more popular than ever. However, no one seems to _agree_ on how to actually vibe code "correctly." There is no definitive guide on the most efficient strategy, because no one has actually measured it. Recently, I decided to use up 50% of my weekly quota to experiment and quantify the "best" way to build with AI.

To be 100% transparent about my biases, I dislike vibe coding. I _like_ AI assisted software development. I want to be a good SWE with or without AI, and that's why I undertook this experiment. I want to determine if AI is actually good enough to autonomously write its own code without any human scrutiny or deterministic quality gates like tests and E2Es.

There are three "**tracks**" I chose for the initial experiment. No human was involved with reviewing _any_ code within this experiment, and these experiments were run without any permission checks, on a Windows machine. So the experiment mimics the future that some envision. AI _led_ development, without human quality control.

- **Track A**: Vibe Code. No quality tools.
- **Track B**: Spec Driven Development (modified to be autonomous and AI led\*). No quality tools.
- **Track C**: Vibe Code, but with linting, unit tests as hard gates, clean code architecture and an ORM.

\*_True spec driven development involves human gates and a cleaner more rigorous workflow than what the experiment executed, however, it still exercised the core mechanic behind SDD: a single, evolving source of truth as a markdown document_

**Hypothesis**: C >> B > A. Track C is going to cost you more in tokens, but it's going to result in a more hardened, higher quality application that fails at the quality gates. The two other tracks are going to fail silently when thrown curveballs by a mock Engineering Manager.

# Test Setup

Three agents are given a pre-made app to iterate on: Instagram for dogs. A simple NextJS web app, using Tailwind for styling and Sqlite for persistence. The baseline app works fine as a simple prototype, it shows pictures of dogs and cats on a vertically scrollable feed.

Each track was isolated into its own subdirectory, and fresh subagents were used for each test. I reviewed the outputs of the subagents by hand as eyeball tests and also ensured the experiment orchestrator agent was on track.

| Round | Feature                                                                            | Why it's hard                                                            |
| :---- | :--------------------------------------------------------------------------------- | :----------------------------------------------------------------------- |
| R1    | Feed → likes → "pack" grouping of pets refactor → pagination                       | Pagination can get tricky                                                |
| R2    | Paid ads on the feed (state machine, mocked webhook, guaranteed slots via payment) | Money + a state machine. Could break                                     |
| R3    | Multi-level referral payouts (10/5/2%, depth cap, cycles, refund clawback)         | Graph logic + money math + refund consistency                            |
| R4    | Added a 4th track: "vibe + a second model reviews the first"                       | Tests the "adversarial" AI agent paradigm that's recently become popular |

R2 and R3 are failure modes fabricated in order to stress a vibe coded app, but they're _all_ AI generated applications. They're not unrealistic asks that someone trying to build a B2B SaaS app would give to a Claude Code. My theory is that all three tracks would struggle, but in individual ways.

# Round 1 - Is Vibe Coding back?

I honestly expected Track A to completely fumble this. Everyone hears about how broken vibe coded apps can be. But things have changed, frontier models like GLM 5.2 actually have good practices baked into the training data, and frameworks like NextJS are highly compatible with them.

All three tracks, even the Vibe Coded single prompt one, created a working app. Pagination even worked. Track C was the most surprising because it **used about double the tokens of Track A and B.** Even advanced LLMs are not immune to the pitfalls of flakey test configuration it seems. Regardless, it was able to fix it and move on. The theory that Vibe Coded apps are low quality, didn't seem to hold up initially, as all three seemed pretty good to my SWE eyeball tests.

I wanted to see how "vibey" the track A and B code was, so I took a bug that Track B caught on accident (could've been hallucinations or error, but the thinking process caught it) and injected it into all three tracks. The bug was simple, an incorrect call from the FE to the BE which made the "load more" button in the feed just load the first page instead of incrementing the pagination cursor and loading the second page. This mirrors something that could easily happen due to AI hallucination. **Track C's tests failed immediately, flagging the issue to the subagent.** Tracks A and B failed silently. Regardless, the token cost of Track C's testing rigour was so high, I think, at this point in the experiment, you'd still want to go with A or B just from an economic standpoint.

|                      | A (Vibes) | B (SDD)    | C (Quality + Vibes) |
| :------------------- | :-------- | :--------- | :------------------ |
| R1 cumulative tokens | 6,405,698 | 11,408,647 | 18,544,158          |
| vs A                 | 1.0×      | 1.78×      | 2.89×               |

# Round 2 - A Product Manager enters the chat

The Prompt for R2 was focused around monetization. Advertisers pay, a paid Administrator (human, but mocked here) approves the ad, the ad slots into a feed at a guaranteed position, and impressions are tallied. The state machine is interesting here, because a rejected ad should never go live until the Advertiser pays **again**, so the system must consider that payments are a different concept to the ad.

In order to break the state machine, the Orchestrator created an ad, paid, the Admin rejected the ad, but then the Orchestrator tried to re-approve the rejected ad _without going through the payment process again._

| Track     | Re-approve a rejected ad                                      | Result        |
| :-------- | :------------------------------------------------------------ | :------------ |
| A (vibe)  | 200 OK, ad flips to approved, goes live without fresh payment | **Bug Ships** |
| B (spec)  | 409 NOT_REVIEWABLE                                            | Blocked       |
| C (tests) | 409 InvalidAdStateError                                       | Blocked       |

This may not seem like a realistic failure mode, but if you're scaling an application like this without planning, it could very well happen. Advertisement logic, similar to what's within Google AdSense is _extremely_ complex and you need a lot of distributed infra dedicated to management, so cases where ads stay up longer than intended could happen.

The token math from Round 1 still checks out when comparing A to C. The fact that Track A consumed half of the tokens of C still makes vibe coding a more attractive option. But, you should be prepared to encounter bugs, even if you spam Claude Fable.

# Round 3 - A Curveball gets thrown

The third "challenge" for the tracks was multi-level referral payouts. Commissions would scale up from 5% to 15%, and refunds which would reduce the payouts on one referrer without affecting the others. This is exactly the business logic which you would expect to fall apart in a vibe coded solution.

What's most surprising is that track A actually did do the job. Track C also did the job (but also consumed tokens on testing). Track B failed in an extremely subtle mode, when doing the calculations for refunds. It failed in the exact same mode critics of SDD often point to: spec drift. The `SPEC.md` mentioned integer cents, however the code did not follow that.

| Track     | L1 commission on 1999¢ | Math used                            | Result                   |
| :-------- | :--------------------- | :----------------------------------- | :----------------------- |
| A (vibe)  | 199                    | `Math.floor` on integers             | Correct                  |
| B (spec)  | **200**                | `Math.round(amount × 0.10)` — floats | **Drifts, over-pays 1¢** |
| C (tests) | 199                    | `Math.trunc`, test-pinned            | Correct                  |

This 1¢ difference doesn't seem significant, but the fact that it happened in the first place is a perfect example of how SDD fails. SDD is still a new concept, and you're probably better off using it for smaller, controlled tasks rather than massive code sweeps. If you're building out a clear feature, its more token efficient to just give an LLM a prompt and have it make the judgement calls. This, of course, is a bit of a slot machine: you're hoping the thinking processes are good enough for it to catch its own mistakes and course correct.

# Round 4 - Adversarial Reviewer

A common paradigm I see online is the idea that you should have a completely different model judge and critique the code, while the first model justifies its decisions. I don't have the tooling to try this out myself, but it does pose an interesting question: can the secondary "judge" do the same job as the unit testing, SOLID principles etc at a lower cost? So I introduced Track D late into the experiment.

Track D = Track A's setup (no quality tools), but with a two-phase workflow: agent 1 vibes the code exactly as A did, then agent 2 critiques and fixing the code (in a fresh context window). I started Track D from Track A's _exact shipped code_ on R2 and R3, so I knew that Track D would have the advertisement resurrection bug.

I was actually surprised, because the adversarial reviewer actually caught the ad resurrection bug from R2! Below is the full token breakdown as well. It also pointed out the pagination bug from R1, but left it alone.

| Feature        | A alone |       D (vibe + reviewer) | C (tests) |
| :------------- | ------: | ------------------------: | --------: |
| Ads (R2)       |   3.01M | 3.01M + 1.27M = **4.28M** |     7.08M |
| Referrals (R3) |   3.82M | 3.82M + 0.80M = **4.62M** |     4.27M |

But D does not equal C, and I want to be clear about that.

- **It's a snapshot, not regression insurance.** The review catches what's there today. C's tests catch the same class of bug on every future change. For a real codebase, if you're reviewing every single diff with a fresh context window, D would converge with C in terms of costs. I don't have the data to back this up, but you can see in R3, it was only slightly cheaper than C.
- **n=1 on unknown defects.** D caught the defects I knew it would, but its not clear as to whether it would catch future bugs (back to the slot machine!)

# Final Tally of the Token Costs

| Track                               | Cumulative tokens |                   vs A | Shipped money defects |
| :---------------------------------- | ----------------: | ---------------------: | --------------------: |
| A — Vibe                            |             13.2M |                   1.0× |                 **2** |
| B — Spec                            |             28.9M |                  2.18× |                     1 |
| C — Quality                         |             29.9M |                  2.26× |                 **0** |
| D — Vibe+reviewer (hard feats only) |              8.9M | 1.30× A on those feats |           0 remaining |

This looks rough and somewhat invalidates my original hypothesis. Quality tools cost a lot of tokens, and the value of them is not immediately obvious. There's not a clear ROI on the token investment. If you want stuff built fast and cheap, better off just getting the most powerful model you can, and just letting it do its thing.

**The truth is, vibe coding wins in the token game, but no one's really playing the game**. Yes token efficiency is not important for saving money, but the real costs of bugs that slip into production cannot be quantified, because you'd have to quantify how much time is spent by a real human to catch, debug and fix the issues. Token costs dwarf the cost of labour, and when you consider this, the value proposition of all the expensive quality gates (and potentially, a combination of adversarial coding and the unit test rigor), shoots into the stratosphere.

Software is extremely complicated. No matter how much time, money or tokens you spend, there will be bugs. When you create clean code (regardless of whether its by hand or AI), you don't necessarily save money when you catch a bug. You may not even catch the bug. What you do at the very least is make the debugging process significantly easier. Vibe coding, over time, does produce quality code too, however, you're paying for it in future bugs, and you really can't put a dollar value on that.

# Back To The TL;DR

If you're going to vibe code and not read the code that's being written, use a frontier model and at least have a second model evaluate your output once in a while.

But if you want to ever go to prod and scale a solution, the experiment is pretty clear: read any LLM output critically, and invest in the mundane, even if it costs more.

Vibe coding will eventually fail, costing you more. The interesting question this experiment accidentally answered is _when_ - and the answer is: the moment a feature has a non-obvious business logic curveball.
