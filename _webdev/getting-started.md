---
title: Integrating Jekyll and Github Pages
description: How to integrate Jekyll with Github Pages
link: Getting Started
author: gr0k
layout: post
github_comments_issueid: 1
permalink: /webdev/gettingstarted.html
date: 7 Aug 2018
---

This is a walkthrough on building a static website from scratch using Github Pages and Jekyll.

I've considered making a blog for a long time, but writing was never something that excited me, and I didn't feel like taking the time to learn how to use a full blown CMS. The few experiences I've had so far building websites has generally left me with a strong distaste for anything web development related, and I was in no rush to jump back in.

While working on my [OSCP](https://offensive-security.com) certification, I found the blog post [High on Coffee](https://highon.coffee) which included a note that the site was hosted for free with Github pages, and I thought this seemed like an easy way to start a blog. No Virtual Private Server to set up, no database back end to connect to or secure, no fighting to get jquery functioning, no fiddling with PHP.

I googled the documentation for [Github Pages](https://pages.github.com), set up my repo, and followed the link at the end to get started with [Jekyll](https://jekyllrb.com/docs/quickstart/), and quickly found that the Quick Start instructions weren't enough to understand what was happening. Both sites are pretty light on directions, and while their docs layout the basics for their frameworks, they don't adequately describe how the two integrate together. This made it challenging to get up and running. I didn't feel like I had the understanding I needed to easily develop what I wanted.

I did some more digging, found a couple walkthroughs to help get started, and ran head first into every possible wall.

Figuring I wasn't the only one with these problems, I worked through my hurdles and documented each step. I wanted to layout the challenges I faced and the steps I took to hopefully make it easier for someone else trying to get started.

This guide will cover getting setup on a clean Ubuntu system. This walkthrough makes the assumption that the reader is already familiar with using the command line and has a system to use. I won't go through setting up a computer or a VM with Ubuntu, but I will walk through everything else needed to get setup. I leave exploring the full functionality of Jekyll to the reader, partially because I haven't explored it all yet, and partially because well, that's what the [docs](https://jekyllrb.com/docs) are for.

In the interest of conciseness, I've put additional details for the various components needed at the end, with either a brief explanation and/or a link to additional resources. If you're already familiar with a given topic, just follow the steps and ignore the deep dive sections at the end. If you're brand new to some or all of these components like I was, the explanations at the end will hopefully give you enough understanding to get around.

* TOC
{:toc}

## What is Jekyll?

[Jekyll](https://jekyllrb.com) is a Ruby Gem that allows you to develop and deploy static web pages. There is an in-depth look at working with Gems at the [end](#what-are-gems-and-bundler).

Jekyll was [written](http://tom.preston-werner.com/2008/11/17/blogging-like-a-hacker.html) by Tom Preston-Werner and tailored for blogging, allowing you to easily write and deploy content without having to worry about all the overhead of managing a dynamic site.

## What are Github Pages?

[Github Pages](https://pages.github.com/) allow users to deploy static websites for their projects. Each user gets one personal web page per account, and an unlimited number of project sites. I'll discuss the importance of the distinction between the two later on.

## How does Jekyll and GH Pages work together?

Github Pages understand the Jekyll framework, allowing you to use your git workflow to develop your site locally and host your live site as a remote repository on Github. So long as you follow the Jekyll file naming conventions, Github will process them appropriately, allowing you to focus on development.

You don't have to develop from the command line as I'm laying out here. You can get started (and it's a lot faster) with a basic setup by working directly from your Github Pages repository. [This walk through](http://jmcglone.com/guides/github-pages/) linked to from the Jekyll site is a simple guide to build an initial page with some basic styling. I preferred to get set up with a local instance though as it gave me greater control over edits, and I could view the impact of changes before I made the content live.

## My Environment

I tested all of the following on a new Ubuntu 18.04 system. It was a fresh VM with nothing yet installed.

## Setup

### System Updates

First, make sure your repositories are up to date:

`sudo apt update && sudo apt upgrade`

You may already have the zlib header file if you are not on a new system, but if you are you'll need it for one of the Ruby libraries we'll install later. To get it, after updating, install the `zlib.h` header file:

`sudo apt install libz-dev`

### Installing Packages

You'll need to install Git, Ruby, and a couple Ruby libraries in order to do develop your site locally on your system.

#### Git

`sudo apt install git`

If you're new to Git, you can read a brief explanation of it at the [end](#what-is-git).

#### Ruby

The following is from the Jekyll [Ubuntu Installation Guide](https://jekyllrb.com/docs/installation/#ubuntu).

`sudo apt install ruby ruby-dev build-essential`

Once installed, set up your shell environment so gem packages do not have root privileges. If you have problems, check the troubleshooting notes [here](#4-non-root-gems).

```bash
echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc
echo 'export GEM_HOME=$HOME/gems' >> ~/.bashrc
echo 'export PATH=$HOME/gems/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

#### Jekyll and Bundler

`gem install jekyll bundler`

The Jekyll Installation documentation recommends checking to make sure you've got the latest version. Assuming you're integrating this with Github Pages, I recommend just skipping the Update checks, since that will be handled later through Github.

An in depth explanation of each of these components is included at the [end](#what-is-ruby).

## Creating a Local Jekyll Project

Once your environment is setup, to create a new Jekyll Project, simply run the following:

`jekyll new <whatever directory name you want>`

```bash
smith Desktop $ jekyll new demo
Running bundle install in /home/smith/Desktop/demo...
.
. <trimmed output>
.
Bundler: Bundle complete! 4 Gemfile dependencies, 29 gems now installed.
  Bundler: Use `bundle info [gemname]` to see where a bundled gem is installed.
New jekyll site installed in /home/smith/Desktop/demo.
```

This will create a new directory, named whatever you specified, with the following structure:

```bash
smith Desktop $ cd demo
smith demo $ ls -1
404.html
about.md
_config.yml
Gemfile
Gemfile.lock
index.md
_posts
```

`jekyll new` builds the bare minimum necessary to function. The remaining directories and their naming conventions are [well documented](https://jekyllrb.com/docs/structure) on the Jekyll Website, so I won't repeat it here, but I've highlighted [below](#1-abstraction) some challenges I had due to abstraction.

## Github Pages Gem

Once you've created a project directory, you need to make sure your local project gems are compatible with the gems Github supports. The Jekyll [documentation](https://jekyllrb.com/docs/github-pages/) on using this gem this isn't great, but the comments in the Gemfile explain it, as shown below. You can read a more detailed description of whats going on [here](#5-github-pages-gem), or just comment out the Jekyll gem and uncomment the github gem as shown below and run `bundle update` on the command line afterwards. You may get an error message and have to run `bundle install` before `bundle update`. Make sure you have the zlib header installed as explained earlier or your `bundle update` may fail.

```ruby
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!
# gem "jekyll", "~> 3.8.3"

# This is the default theme for new Jekyll sites. You may change this to anything you like.
gem "minima", "~> 2.0"

# If you want to use GitHub Pages, remove the "gem "jekyll"" above and
# uncomment the line below. To upgrade, run `bundle update github-pages`.
gem "github-pages", group: :jekyll_plugins
```

## Viewing your Site Locally

To see how the files in your project directory come together into a web page, run the command `bundle exec jekyll serve --watch` inside your Jekyll directory:

```bash
smith demo $ bundle exec jekyll serve --watch
Configuration file: /home/smith/Desktop/demo/_config.yml
            Source: /home/smith/Desktop/demo
       Destination: /home/smith/Desktop/demo/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
                    done in 0.452 seconds.
 Auto-regeneration: enabled for '/home/smith/Desktop/demo'
    Server address: http://127.0.0.1:4000/
  Server running... press ctrl-c to stop.
```

`bundle exec` executes the specified script using the environment specified in the Gemfile. The above command executes the Jekyll script, telling it to `serve` the web page and `--watch` for changes. You can view any updates made in the directory immediately, with the exception of changes made to the `_config.yml` file. For those changes to take effect you'll have to restart the server.

If you open your browser and enter `127.0.0.1:4000` in the URL, your local site should appear like below.

![Local Site](/assets/images/1/server-start.jpg)

After you run `bundle exec` to run your site locally, you'll find the `_site` directory added to your project folder. This is where Jekyll puts all the files it combines to make your web page. Don't try and save or edit anything in here directly, as everything in _site gets deleted and rebuilt any time you make changes.

## Deploying to Github

To get your files uploaded, you'll need to create your [repository](https://help.github.com/articles/creating-a-new-repository/). This is where the personal vs. project page is important. If you're deploying to your one allowed personal page, the repository name must use the following naming convention:

`<github username>.github.io`

If you want to make a project page site, the URL is slightly different. Github has a more in depth explanation [here](https://help.github.com/articles/user-organization-and-project-pages/). One key difference is that your personal page can host your website directly from the `master` branch. Project page web sites must be deployed to a special `gh-pages` branch. This guide assumes you're using your personal page, so you will only need to push to your master branch.

Once your remote repo is set up, you'll need to push your files to it. The steps are listed below with comments.

```bash
# Run these in your Jekyll project directory

# This initializes your directory as a git project
smith demo $ git init
Initialized empty Git repository in /home/smith/Desktop/demo/.git/

# Configure user/email global settings for your repo. You will only need to do this the first time, and can make them whatever you want
smith (master) demo $ git config --global user.email "email address"
smith (master) demo $ git config --global user.name "name"

# Connect local repo to github
# Your remote repository URL can be found as shown in the image below these instructions
smith (master) demo $ git remote add origin <repository URL>

# After connecting your remote repo, run a git pull to get any files stored there. If you followed the Github instructions to create the repo, you should have a README.md file on your remote. If you try and push your local files first, you'll run into errors
smith (master) demo $ git pull origin master

# Check your .gitignore file, which ensures unnecessary files don't get saved to your repo
# These were automatically included, and shouldn't need to be edited
smith (master #) demo $ cat .gitignore
_site
.sass-cache
.jekyll-metadata

# This stages all files to go to your remote repository
smith (master #) demo $ git add *
The following paths are ignored by one of your .gitignore files:
_site
Use -f if you really want to add them.

# Include your gitignore file
# If you are using the github command line modifications (see below), you'll notice the hashtag changes from '#' to '+', indicating you have changes ready to commit
smith (master +) demo $ git add .gitignore

# Use git status to check what files are staged for a commit
smith (master +) demo $ git status
On branch master

Initial commit

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)

	new file:   .gitignore
	new file:   404.html
	new file:   Gemfile
	new file:   Gemfile.lock
	new file:   _config.yml
	new file:   _posts/2018-08-07-welcome-to-jekyll.markdown
	new file:   about.md
	new file:   index.md

# Commit your changes to your local repository, adding your own commit message
smith (master +) demo $ git commit -m "<commit message here>"
[master (root-commit) aed50c4] <commit message here>
 8 files changed, 400 insertions(+)
 create mode 100644 .gitignore
 create mode 100644 404.html
 create mode 100644 Gemfile
 create mode 100644 Gemfile.lock
 create mode 100644 _config.yml
 create mode 100644 _posts/2018-08-07-welcome-to-jekyll.markdown
 create mode 100644 about.md
 create mode 100644 index.md

# Push your local commit to your remote repository
smith (master) demo $ git push -u origin master
```

From your repository, click the `Clone or download` button to get your repository URL.

![Repo URL](/assets/images/1/repo.jpg)

After your first commit, you won't need to specify `-u origin master` each time, you can just type `git push` to commit your changes.

This will make your site live. You can visit it by typing `<user name>.github.io`  into your web browser. It might take a few minutes to show up when you first set up, but future changes will happen much faster.

If you'd like to use a different domain name for your site, follow the general Github instructions [here](https://help.github.com/articles/adding-or-removing-a-custom-domain-for-your-github-pages-site/) or the apex domain specific instructions [here](https://help.github.com/articles/setting-up-an-apex-domain/).

# Editing Pages

I won't get into the specifics of building pages for your site, the Jekyll docs are pretty straightforward on how to get started. Information for writing posts can be found [here](https://jekyllrb.com/docs/posts) and information on pages can be found [here](https://jekyllrb.com/docs/pages/).

## Markdown

Pages can be written as HTML or Markdown. Markdown is a markup language that gets converted to HTML. It makes it so you don't have to worry about managing all your HTML tags while you write, and makes it easier to read as you put it together.

I used the [Typora](https://typora.io/) editor to put this post together. It's the first markdown editor I've used and I found it super intuitive to pick up.  Another option I've seen recommended is the [Atom](https://atom.io/) editor.

## Front Matter

Front matter allows you to specify specific attributes for your pages. Front matter utilizes YAML (YAML ain't Markup Language) to specify various attributes that get applied to a document. This allows you to set options such as the pages title and what `_layout` should be applied to the page. The Jekyll [docs](https://jekyllrb.com/docs/frontmatter/) explain all the options in more detail.

Front matter goes at the top of your markup, blocked off by three triple-dashed lines, like so:

```yaml
---
layout: post
title: <web page title>
---
```

## Managing Github Themes

The default theme when you create a Jekyll project is [Minima](https://github.com/jekyll/minima).

You can change this in your Github repository if you like, the Github instructions [here](https://help.github.com/articles/adding-a-jekyll-theme-to-your-github-pages-site-with-the-jekyll-theme-chooser/) explain what you need to do.

If you want to view the theme you've selected while testing, you need to add the github theme name to your `_config.yml` config:

```yaml
#Build Settings
markdown: kramdown
theme: <Github theme>
```

The Github themes can be found [here](https://github.com/pages-themes), and the instructions for how to apply them are included in their respective README documents.

When selecting a new theme make sure the front matter layout options for your pages are specified correctly. If you're using a Github theme, you can see the available layouts for your selected theme in their respective _layouts repository. For example, the hacker theme layouts are [here](https://github.com/pages-themes/hacker/tree/master/\_layouts). If you specify a layout that doesn't exist as part of your theme, you'll see an error message when you start your server locally as show below. To fix the Github Metadata error shown below, read the instructions [here](#6-no-github-api-authentication).

```bash
smith (master *) 6r0k3d $ bundle exec jekyll serve --watch
Configuration file: /home/smith/6r0k3d/_config.yml
            Source: /home/smith/6r0k3d
       Destination: /home/smith/6r0k3d/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
   GitHub Metadata: No GitHub API authentication could be found. Some fields may be missing or have incorrect data.
     Build Warning: Layout 'page' requested in about.md does not exist.
     Build Warning: Layout 'home' requested in index.md does not exist.
                    done in 0.57 seconds.
 Auto-regeneration: enabled for '/home/smith/6r0k3d'
    Server address: http://127.0.0.1:4000
  Server running... press ctrl-c to stop.
```

## Using Google Analytics

If you want to add tracking analytics to your pages, [this](https://curtisvermeeren.github.io/2016/11/18/Jekyll-Google-Analytics) is a good walkthrough on getting it set up. It highlights how to ensure you only track visits to your production site, and not your local test site.

When following the analytics walkthrough directions above, you'll need to add an `analytics.html`  file inside your Jekyll directory under the `_includes` directory. The Jekyll Themes [doc](https://jekyllrb.com/docs/themes/#overriding-theme-defaults) explains how to override theme defaults included from other sources. This will include `analytics.html` file without interfering with the layout files included when using Github themes.

## Adding Comments to Your Pages

I like having a static page for a number of reasons, primarily that it's significantly less moving parts to manage. I did want to find a way to still integrate comments though, and there are a number of solutions available.

The option I've found so far that I liked best was integrating Github issue comments as comments on your blog posts. You can follow the instructions for that [here](https://dc25.github.io/myBlog/2017/06/24/using-github-comments-in-a-jekyll-blog.html). It's easy to do, and benefits from the user input filtering protection of Github, but is a little clunky to use. Adding comments takes you to the Github issues page, and you don't get redirected back after you submit. To adjust for this I've modified the functionality for my own page so the issues page opens in a new tab which I'll explain in a future post. It does require users to have a Github account to comment, so while you may miss input from some people, I imagine that will help mitigate spam. Clunkiness aside, so far it seems like the safest of options.

A second option I looked at using was [Staticman](https://staticman.net/), which was designed to integrate nicely with Jekyll and GH Pages. I went through the trouble getting it set up and configured, only to find that there was zero filtering being done. The first XSS post I tried on my site resulted in an immediate alert pop up. While this is a static page with no logins, I wasn't willing to risk stored XSS or the possibility of CSRF. This could be mitigated by turning on the moderation option, but I didn't want to have to spend a significant amount of time moderating comments.

I want to try out [Comments for Jekyll Blogs](https://haacked.com/archive/2018/06/24/comments-for-jekyll-blogs/), but I suspect it probably suffers from the same filtering issues as Staticman does, and is significantly more complicated to setup.

You could deploy with [Disqus](https://disqus.com). Once you sign up, it looks like it integrates pretty easily with your pages. I didn't go with it though for a couple of reasons. First, Disqus owns all the data. Which means you're left to their whims or if by some chance they go away, you lose all that comment history. It also has a significant impact on page load times, as shown [here](http://donw.io/post/github-comments/). That page was the impetus for developing the Github comments method described above.

## Challenges

### 1. Abstraction

The hardest part about getting started for me was figuring out where everything was and how all the components worked together. I wanted to use a different theme out the gate, but trying to figure out where all the different files were located and how they functioned together was challenging.  This was by far the most difficult part of getting everything working.

By default, Jekyll uses gem-based themes. This means when you create a new project, you won't see the `assets`, `_layouts`, `_includes`, and `_sass` directories. The intent is to make your life easier, abstracting away the work of setting up layouts, while allowing you to benefit when the theme maintainers push updates, but because I didn't understand the framework, hiding this functionality led to a lot more work getting started.

If you followed the instructions at the start on setting up non-root gems, you can find gem based theme files in `~/gems/gems/<theme name>` . You can over ride anything set in these files by having a copy in your local Jekyll directory. For example, if you wanted to make modifications to your `default.html` gem-based theme layout, copy  `~/gems/gems/<theme>/_layouts/default.html` to your local Jekyll directory at `<jekyll directory>/_layouts`.

Your local changes will override the gem based theme settings. It gives you more control, but means you won't benefit when the theme maintainer pushes updates (but I imagine this is pretty rare for the Github provided themes). I'll show an example of this later when I show how I set up comments for this blog.

For more information on controlling themes, check the Jekyll docs [here](https://jekyllrb.com/docs/themes/).

[Back](#github-pages-gem) to getting setup.

### 2. Changes didn't display on Github

This drove me up the wall when I first started. I followed a couple guides and pushed my changes to my repo, and nothing showed up. I dug through all the documentation I could find to see if I had broken the naming convention somewhere. Turns out you just need to be patient. When you first create your pages repository, it may take ten minutes or more for changes to propagate. Future updates will only take a few seconds, but YMMV. You should receive an email from Github if your build fails, so if you don't get a message, just wait a bit and you should be able to navigate to your site.

### 3. Git "gh-pages" branch

When exploring reasons why my website wasn't displaying changes, one thing I realized was the walkthrough I was following was pushing changes to the gh-pages branch of their repo. I didn't realize at the time this branch had special meaning and thought this might be why my changes were not going live.

Using the gh-pages branch is only necessary if you are building a project site. If you are making a personal site, you can push your commits to the master branch without a problem.

### 4. Non-Root Gems

You may run into the issue of your bashrc exports not working properly. The first time I tried to get started I ran into this problem, but I wasn't able to recreate it again afterwards to demonstrate. The Jekyll Troubleshooting [doc](https://jekyllrb.com/docs/troubleshooting/) has the solution. Just restart your terminal or run `. .bashrc`.

Another gem issue I ran into was the error `Could not locate Gemfile or .bundle/directory` when I ran `bundle exec jekyll serve --watch`. You'll likely run into this if you start with the Jekyll Quick Start Guide without having a full Ruby development environment. So long as you install the `ruby-dev` package at setup time, you should be able to avoid this. You can read more about this issue [here](https://github.com/jekyll/jekyll/issues/5719).

[Back](#ruby) to Ruby Installation.

### 5. Github Pages Gem

While GH has excellent support for Jekyll, not every Jekyll component works with it, and for the components that do work, you need the correct versions. If you look at the GH Jekyll [Dependency Page](https://pages.github.com/versions/), you'll notice GH supports Jekyll 3.7.3 as of this writing. However when you installed Ruby and Jekyll, you got a newer Jekyll version.

```bash
smith (master #) demo $ gem list jekyll
*** LOCAL GEMS ***
jekyll (3.8.3)
```

When you try to activate the Github Gem, if you followed a guide and didn't read the Gemfile comments, you'll probably run into this:

```bash
smith (master #) demo $ bundle install
The dependency tzinfo-data (>= 0) will be unused by any of the platforms Bundler is installing for. Bundler is installing for ruby but the dependency is only for x86-mingw32, x86-mswin32, x64-mingw32, java. To add those platforms to the bundle, run `bundle lock --add-platform x86-mingw32 x86-mswin32 x64-mingw32 java`.
Fetching gem metadata from https://rubygems.org/..........
Fetching gem metadata from https://rubygems.org/.
Resolving dependencies...
Bundler could not find compatible versions for gem "jekyll":
  In snapshot (Gemfile.lock):
    jekyll (= 3.8.3)

  In Gemfile:
    github-pages was resolved to 4, which depends on
      jekyll (= 1.1.2)

    minima (~> 2.0) was resolved to 2.5.0, which depends on
      jekyll (~> 3.5)

Running `bundle update` will rebuild your snapshot from scratch,
using only
the gems in your Gemfile, which may resolve the conflict.
```

The problem is the version of Jekyll specified in the Gemfile is higher than what Github uses. To fix this, comment out the Jekyll gem, uncomment the github pages gem, and run `bundle update`.

Gemfile Changes:

```ruby
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!
# gem "jekyll", "~> 3.8.3"

# This is the default theme for new Jekyll sites. You may change this to anything you like.
gem "minima", "~> 2.0"

# If you want to use GitHub Pages, remove the "gem "jekyll"" above and
# uncomment the line below. To upgrade, run `bundle update github-pages`.
gem "github-pages", group: :jekyll_plugins
```

[Back](#github-pages-gem) to setup.

### 6. No GitHub API Authentication

I ran into this error when I ran `bundle exec jekyll serve --watch`. It prevents `--watch` from functioning properly, meaning you have to restart your server each time you make changes. It's a [closed issue](https://github.com/github/pages-gem/issues/399) on the pages-gem repo, but you still have to add the fix yourself.

Adding

```yaml
github: [metadata]
```

to my `_config.yml` file fixed the issue for me.

[Back](#markdown) to the setup instructions.

### 7. Managing Assets (images / js)

This took a moment to figure out. I wanted to keep images for a posts in their own folder vs. putting all images togehter under one folder. The problem I had was when using Typora's dropdown interface to insert images, the absolute path failed when I ran the server locally.

To get around this, you have to use a relative path when your're typing your blog posts.

For example, I wanted my images consolidated by post under my assets directory:

```bash
|--assets
	|--images
		|--post_1
			|-- image1.jpg
			|-- image2.jpg
        |--post_2
        	| -- image1.jpg
```

To ensure the image asset could be found when running Jekyll from the command line, I had to ensure the link in Typora was written as `/assets/images/post_1/image1.jpg`. If I used Typora's drop down interface, it inserted the absolute path, which meant images failed load properly. This mean I could see the image properly when running the web site locally, but I could no longer see the image preview in Typora.

# Components Overview

## What is Git?

Git is a distributed version control system for tracking file changes, allowing you to easily experiment with projects and collaborate with others. It allows you to have a complete working history of your project, allowing you to try new things and save versions of your documents as you go, allowing you to easily experiment with new ideas without losing previous work or breaking your code.

It's impossible to completely explain in depth all the functionality that git provides here, but this [Udacity Course](https://www.udacity.com/course/how-to-use-git-and-github--ud775) does a great job providing an in depth understanding of the various git features you need to be effective.

If you go to Lesson 1:Unit 30 of that Course [here](https://classroom.udacity.com/courses/ud775/lessons/2980038599/concepts/33331589510923), there is a walk through on customizing the Linux command line prompt to provide you useful information about your local git repository status.

Click [here](#git) to go back to the Installation section.

## What is Ruby?

[Ruby](https://ruby-lang.org) is an interpreted, object oriented programming language, similar to Python.

## What are Gems and Bundler?

Gems are Ruby software packages (libraries). These are analogous to Python libraries you install with pip. Code libraries allow programmers to easily re-use code in development so they don't have to write functionality from scratch. In Ruby, you use Gems to manage these libraries.

To use Gems, you need to install the RubyGems library. If you updated your software packages at the [beginning](#system-updates), then RubyGems was installed automatically when you installed Ruby. RubyGems comes built in with Ruby version 1.9.* and above.

Bundler is its own gem that controls other gems. In the root directory of a Ruby project, there is a file called `Gemfile`. The first line of the `Gemfile` defines the gem source locations so Bundler knows where to download gems. The `Gemfile` then lists all the gems and their version numbers required for a project. This allows programmers to control their development environment for each project.

As an example, this is what the `Gemfile` looks like when you generate a local Jekyll website:

```ruby
source "https://rubygems.org"

# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!
gem "jekyll", "~> 3.8.3"

# This is the default theme for new Jekyll sites. You may change this to anything you like.
gem "minima", "~> 2.0"

# If you want to use GitHub Pages, remove the "gem "jekyll"" above and
# uncomment the line below. To upgrade, run `bundle update github-pages`.
# gem "github-pages", group: :jekyll_plugins

# If you have any plugins, put them here!
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.6"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.0" if Gem.win_platform?
```

The first line of the file defines the source repository so Bundler knows where to find gems, and the remaining lines control which gems and what versions get used for this project.

If you make changes to your Gemfile, run `bundle update` afterwards to apply them. Gems will be installed at `$HOME/gems` if you followed the Package Install directions above.

Click [here](#what-is-jekyll?) to go back to the Jekyll overview.

Click [here](#creating-a-local-jekyll-project) to go back to Setup.
