---
title: Setup for Gera's Insecure Programming Challenges
description: Getting Started
link: Gera's Challenges Setup
author: gr0k
layout: post
github_comments_issueid: 2
permalink: /exdev/intro.html
date: 27 Aug 2018
---

* TOC
{:toc}
## What are they?

These programming challenges were made so you can learn how to exploit buffer overflows. The Talos link points to an old web page that no longer exists, but all the challenges have been ported to Geras Github page [here](https://github.com/gerasdf/InsecureProgramming).

## How to get started

All you have to do is copy the code block below and run it in your console.

This code block clones the repository and changes into the newly created directory.

It then uses a [Here Document](http://tldp.org/LDP/abs/html/here-docs.html) to create a bash script called `compile.sh`. This script is tailored to the InsecureProgramming project folder you just cloned. It gets a listing of all the source code files in the exercises directory, gets the file names by themselves (it cuts off everything from the period to the end of the filename), creates a bin directory if it doesn't exist, and then compiles all the files into bin.

The scripts compiles the programs with no stack protection (`-fno-stack-protector`) and makes the stack executable (`-z execstack`). This will ensure we can do buffer overflows, and that any shellcode we write into these programs will get executed. The `-g` switch  is included to compile with debugging information and the `-o` switch sets the file output location and name.

The `chmod +x` command makes the `compile.sh` script executable.

When you run the below code block, you are going to get a ton of `warning` and `note` messages in your console. You can safely ignore these, you'll have working executable binaries in your bin directory. If you'd like to know more about those messages, you can read the note below.

Once you've got your compiled executables, you're ready to get started!

# sudo echo 0 > /proc/sys/kernel/randomize_va_space

```bash
git clone https://github.com/gerasdf/InsecureProgramming.git
cd InsecureProgramming/
cat << 'EOF' > ./compile.sh
#!/bin/bash
files=$(ls exercises);
for file in $files; do
    name=$(echo $file | cut -f 1 -d '.')

    # check if directory exists, if not, make it
    if [ ! -d ./bin ]; then
        mkdir ./bin
    fi

    # gcc -fno-stack-protector -z execstack -g -o   <filename>   <source code location>
    # -fno-stack-protector : removes stack canaries
    # -z execstack : allows execution of shellcode in stack injections
    # -g : compiles with gdb debugging information
    $(gcc -fno-stack-protector -g -o ./bin/$name ./exercises/$file)
done
EOF
chmod +x compile.sh
./compile.sh
```

## Compilation Warnings and Notes

All those warnings and notes on the command prompt are just the compiler trying to protect you from problems that may arise. It's best practice to resolve these, but since this isn't production code, and we're just using them for exercises, you can ignore them. So long as you don't see any error messages, you'll be fine.

If you're curious, here's what each of them is trying to tell you:

### Function is dangerous

- `./exercises/stack4.c:11: warning: the 'gets' function is dangerous and should not be used.`

- This is the fun one. Yes. It's dangerous. This is what we'll be exploiting. To fix it, you would need to replaced the function or implement some serious input checking, but for our purposes, this is what we want.



### Implicit Declaration

- `./exercises/abo10.c:9:23: warning: implicit declaration of function ‘malloc’ [-Wimplicit-function-declaration] char *pbuf=(char*)malloc(256);`

- This comes because the source code calls a function (in this case, malloc) without including the code library where its from. Code libraries are included in C programs with `#include < library_name.h>`.



### Type defaults to int

- `./exercises/abo3.c:7:19: warning: type defaults to ‘int’ in declaration of ‘puts’ [-Wimplicit-int]`

- This means the return type of the declaration was implied instead of explicitly declared.  You could specify the return type if you want to fix this.



### Format <format string parameter> expects argument of type 'x', but has type 'y'

- `./exercises/fs1.c:14:12: warning: format ‘%hn’ expects argument of type ‘short int *’, but argument 3 has type ‘int *’ [-Wformat=]`
- This error is saying the format string parameter `%hn`  is expecting a short int pointer, but the variable passed to it is an int pointer. You could fix this by changing the format string parameter to match the variable type you're trying to display if you wish.
- Format pointer mistakes is an entire class of vulnerabilities. If you're interested in learning more, I highly recommend 'The Art of Exploitation' by Jon Erickson.
