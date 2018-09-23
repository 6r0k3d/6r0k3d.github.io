---
title: Practice Environment
description: Virtual Machine Configuration
link: Environment Build
author: gr0k
layout: post
github_comments_issueid: 6
permalink: /exdev/build.html
date: 26 Aug  2018
---

In order to make sure you can easily follow along with my walkthroughs, I've put together a Virtual Machine environment you can use. This ensures that your environment matches mine and should eliminate any errors you would otherwise run into when working through the examples.

## Vagrant

Vagrant is a tool that allows you to easily configure, deploy, and provision virtual machines. Their [documentation](https://www.vagrantup.com/intro/index.html) is         fantastic, and it's super easy to get machines up and running following their guide. You just have to [download](https://www.vagrantup.com/downloads.html) the appropriate installer for your operating system, and you're ready to start using it.

## Environment

I built my guest VM on a Windows 10 host using [VirtualBox](https://www.virtualbox.org/) as the hypervisor. If you don't have that yet, you'll need to download it first. I used Vagrant's [Ubuntu Bento Box](https://app.vagrantup.com/bento/boxes/ubuntu-18.04), a 64-bit Ubuntu 18.04 system, as the guest machine. Vagrant provides a [machine repository](https://app.vagrantup.com/boxes/search) you can use to pull down systems if you want to try something else, but I can't guarantee you won't have problems using a different environment.

## Build

Once you have VirtualBox and Vagrant installed, all you have to do is clone my vagrant repo to get the configuration files.

<div class="code-container">
{% highlight bash linenos %}
git clone https://github.com/gr0ked/vagrant.git
{% endhighlight %}

<button class="cbtn" data-clipboard-target=".code">
    <img src="/assets/images/clippy.svg" alt="Copy to clipboard" width="13">
</button>

</div>

You could also just save the following two code blocks to your system. Filenames matter, the first should be saved as `vagrantfile` and the second as `bootstrap.sh`.

<div class="code-container">
{% highlight ruby linenos %}

# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "bento/ubuntu-18.04"
  config.vm.box_download_checksum = "309c3acf97b390412cfcf8a97f5ebcf2e128cb5dc662db1729d65ad337b2b47b"
  config.vm.box_download_checksum_type = "sha256"
  config.vm.hostname = "techcrucible"

  # Provider-specific configuration for VirtualBox:
  config.vm.provider "virtualbox" do |vb|
     # Display the VirtualBox GUI when booting the machine
     vb.gui = true

	 # Customize the amount of memory on the VM:
	 vb.memory = "2048"

	 # Configure virtualbox video memory
	 vb.customize ["modifyvm", :id, "--vram", "12"]
   end

   config.vm.provision :shell, path: "bootstrap.sh"
end
{% endhighlight %}

<button class="cbtn" data-clipboard-target=".code">
    <img src="/assets/images/clippy.svg" alt="Copy to clipboard" width="13">
</button>

</div>

Lines 4 to 8 get the box from Hashicorp's repository and sets the host name. You can change the host name to whatever you want if you'd like. Lines 10 to 20 are Virtualbox specific settings. `vb.gui` starts the VM user interface, `vb.memory`  sets the VMs RAM to 2 GB, and the last option sets the video memory to 12 GB, which will allow you to full screen the VM. Installation of Guest Additions is already handled for you, so you should be able to full screen your box, and copy/paste between guest/host (you'll still have to enable this setting under "Devices -> Shared Clipboard").

<div class="code-container">
{% highlight bash linenos %}
#!/bin/bash

#User accounts
useradd gr0ked -m -U -s /bin/bash
usermod -aG sudo gr0ked
echo "gr0ked:password" | chpasswd

apt-get update -y
export DEBIAN_FRONTEND=noninteractive
apt-get upgrade -y
apt-get install -y ubuntu-desktop
apt-get install -y gcc
apt-get install -y gdb
reboot
{% endhighlight %}

<button class="cbtn" data-clipboard-target=".code">
    <img src="/assets/images/clippy.svg" alt="Copy to clipboard" width="13">
</button>

</div>

Line 12 of the Vagrantfile calls the bootstrap provisioning script, `bootstrap.sh`. This script adds the user "gr0ked" and sets the password to "password." You can change these to whatever you want if you wish. The remaining lines install software packages you'll need. I set it to pull the Ubuntu desktop, but you can change that to whatever graphical front end you want.

## Creating the VM

Once you're in the directory with your Vagrantfile and bootstrap.sh, all you have to do to create your machine is run `vagrant up` and within a few minutes you'll have a fully functioning environment to use.

You can shutdown the VM with `vagrant halt`, suspend it (save its state) with `vagrant suspend`, or remove it entirely with `vagrant destroy`.

And that's it. You now have a working environment to follow the Gera Walkthroughs.
