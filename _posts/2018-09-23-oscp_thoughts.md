---
title: Thoughts on OSCP
author: gr0k
layout: post
github_comments_issueid: 7
date: 23 Sept 2018
---

About six months back I took my first stab at earning my Offensive Security Certified Professional certification, or OSCP. I failed hard on my first go, and as I prepare to prep for the exam again I wanted to document some lessons learned from my first attempt.

Offensive Security's training program is [Penetration Testing with Kali](https://www.offensive-security.com/information-security-training/penetration-testing-training-kali-linux/) which offers a lab environment of 50 machines for you to exploit. It is undoubtedly one of the most challenging goals I've pursued, and its also been one of the most rewarding. Even after failing my first try on the exam, the lessons I learned in the labs paid dividends immediately. OSCP focuses on getting hands on with the material. You have to be able to demonstrate the ability to compromise computers in order to pass, and successfully passing is a strong indicator of your ability to adapt to new environments and solve unfamiliar problems in a short period of time.

## Sign Up

One of OSCP's bonuses as a certification is its good for life. Pass the exam, and you're certified. No maintenance fees. No membership fees. No re-certification. The value for getting certified is unmatched. 30 days of lab time costs $800 which *includes* the cost of the exam. The 60 and 90 day options, as well as the lab extensions, are also all reasonably priced, making it relatively accessible to pay out of pocket. In comparison, other week long training programs can start around $3-$5,000 or more, depending on the course. And if you fail and want to take the OSCP exam again, the test itself only costs $60 to retake.

To take OSCP, you must sign up for PWK. It'll take about two to four weeks from signing up to being able to start. The labs only allow a certain number of people to be active at a time, so you won't be able to start immediately after signing up. The wait time for starting doesn't apply if you're extending your lab time. You can start almost immediately after paying.

You can only sign up with an email account from a domain owned by you or someone you work for (eg company or university email), so keep that in mind if you don't have a work or school email you can easily use, you'll have to set up your own domain.

## Lab Time

Once you're signed up, you'll get your lab connection pack and access to the training materials: some videos and the work book.

If you're new to pen testing, I'd work through the examples in the book and document your answers as you go. If you're starting OSCP after coming from [Hack the Box](https://www.hackthebox.eu/) or have some other background experience, I'd recommend just jumping straight into the labs and save the examples for the last week or so of your lab time. If you submit your exercise answers and write-ups for compromised lab boxes with your exam report it's worth some extra points which can be helpful if you're on border of passing. Whether you do the exercises at the beginning or end, it's worth taking the time to download the OSCP report template and document your lab exploits as you go as it'll save you from having to compile your answers into it all at once at the end. 

It's worth noting that not all of the exercises in the book are listed in the table of contents, so if you're using the contents as a way to track all the exercises you need to submit for your lab report, you're going to miss some. I was using the contents to track my exercises and I realized too close to the end of my lab time I was missing exercises and didn't finish them all in time.

### Training Focus

The main question I asked everyone when I started was how many and which boxes should I complete before I tried to take the exam. Having taken it now, here's my own answer to the question. There is no set number of boxes that determines if you'll pass or fail the exam. That being said, if you've only exploited five boxes, that's probably not enough, but once you get to ten or so, you've got enough of the basics down to try taking the exam. I'd completed 35 boxes when I tested, including Humble, Pain, and Sufferance, and I got stuck hard on the exam all the same. It's less about how many boxes you've rooted and more about learning the methodology to go from reconnaissance to exploitation. You've got to be able to quickly identify what the most likely vulnerability is, and then find and customize the appropriate exploit. Just as important is learning to identify when you're too far down a rabbit hole. Being able to recognize when you've gone down the wrong path and deciding you need to focus on something else is a critical skill. When I was going through the labs, I was much more focused on being able to fully exploit a box vs thoroughly documenting and learning the process which hurt me during the exam. 

### Note taking

I used [Keep Note](http://keepnote.org/) which comes default with the Kali distribution. It was easy to keep my notes individualized by box. It's designed to feel like an email application, with notebooks and pages on the left hand side, and the notes themselves in the center pane. One thing it's nice for is easily integrating screen shots, which you'll need as proof you've completed boxes. When I took the exam I liked having a main page for each box, documenting the steps and commands I took to exploit it. Then I'd have sub-pages where I kept the outputs from my scans and general thoughts on what attack vectors I might be able to apply as I was doing recon. Another note taking tool I've heard recommended is [Dradis](https://dradisframework.com/ce/). I haven't tried it yet but I know some folks who swear by it.

Regardless of your note taking platform, the important thing is *how* you take and organize your notes. For an eye-opening insight into your note quality, go through your notes step by step to re-exploit a box a week or so after you've rooted it. You'll likely find you don't remember the exact steps you need, even if you remember the general process. And you'll probably realize you're missing a key command you used to finally gain access. There were a few boxes that I had to exploit from scratch again because I got lazy and my note taking on them was so awful. Don't wait until the exam to figure out how you want to take notes and integrate them into your report. While you have 24 hours after the exam to write your report, you don't have access to the lab, and if you miss something you need in your notes, you won't be able to get that screen shot after the fact.

## Exam

If you've signed up for the 60 or 90 day lab packs, I recommend signing up to take the exam at your half way point for a few reasons. First, if you wait to schedule your exam when your ready, you'll have to wait an extra week or two (or more!) depending on when test times are available. Picking a month in advance allows you to pick the time you want. It will also force you to put time into the labs. It's harder to put off studying when you know you have the exam in a month. 

Second, if you happen to fail the exam on your first go, you'll still have plenty of lab time left so you can re-focus your efforts. You'll have a better idea of what to expect, and you can fine tune your weak spots. Once you've taken the exam once, you'll be familiar with the test taking procedures, so your second time around will be less stressful and you can focus solely on the exam content. And who knows, maybe you'll pass on your first go, and you'll have extra time to just play in the lab environment.

When you're taking the exam, energy management is essential. If you end up having to use the full 24 hours, you're going to want to schedule in some time to take a break and get some sleep. It's a lot easier to think through the problem when you've walked away from it for awhile. Have some food and drinks stocked up and ready to go (or just get a pizza delivered). Just know when you've been sinking too much time into a problem and shift gears to give yourself a break and stay fresh.

Knowing how you're going to write your report before you take the exam is super important, as it will determine what information you need to collect as you go. Like I said before, you don't want to end the exam and realize you don't have that final proof screen shot. Download the report template before your lab time ends and then modify it as you want.

Read, re-read, and read again, the [exam guide](https://support.offensive-security.com/#!oscp-exam-guide.md). There are restrictions during the exam, like not being able to use metasploit modules or throw meterpreter at everything. You get to use them against one target, and if it doesn't work, that's it. You don't get to try them against other boxes.  

## Resources + Ideas

There are a lot of great resources available for how to use the tools you have available to you. There are plenty of walkthroughs online for how to use metasploit, meterpreter, msfvenom, and the [Exploit Database](https://www.exploit-db.com/). You'll find as you go along though there are less resources for specifics on what you may be looking for. For example, there are some solid Linux enumeration scripts available to run from a low priv shell, but after running the scripts, if you don't know what you're looking for, you'll be spending a lot of time manually parsing out the results. The solutions are obvious once you know them, but until you do, finding the answer is like looking for a needle in a haystack. 

Learning what to look for is where you're going to get your money's worth from this training, but it takes time, patience, and practice. As an example, g0tmi1k's [Basic Linux Privilege Escalation](https://blog.g0tmi1k.com/2011/08/basic-linux-privilege-escalation/) is a go to resource for elevating your Linux shell, but it will still take some serious effort learning how to turn the information you're gathering into an exploit.

You should have a working knowledge of the C, Python, and Ruby langauges, as well as some Bash scripting abilities. You're going to have to generate your own custom payloads and combine them with exploits written in those languages, and being able to customize an exploit is going to be a lot easier if you can read the code.

As you work through the labs, figure out what repetitive tasks you're doing, and then figure out how to automate it. This will save you serious time in the long run. You don't want to be writing and testing all your SQL injection attempts by hand when you can avoid it.

If you hit a all on a machine, step away and look at another one. Sometimes you just need a mental break from a machine, and you'll find the answer will come to you when you're not thinking about it.

## Last Thought

OffSec's motto is "Try Harder!" You're going to see it everywhere as you work through the labs. The best piece of advice I got when I was starting was to "try easier." If you're trying to figure out a custom SSH hack or building a VM to match a boxes environment to make something work, you're probably going down the wrong path. (Yes, I built my own machine to compile an exploit. Yes, it worked. Yes, it took me significantly longer than it should have). Look for the low hanging fruit. Is SMB open? Jump on it. Is there a web application? Figure how you can use it to upload your code to the box.  Exhaust the easy services before trying more well known and less vulnerable ones.  You'll know what the are when you see them. 

Good Luck!

