---
title: Tools of the Trade
description: What you'll need to start Exploit Development
link: Tools
author: gr0k
layout: post
github_comments_issueid: 3
permalink: /exdev/tools.html
date: 27 Aug 2018
---

I wanted to include all the tools I used while working on these problems in once place as a common reference for individual walkthroughs rather than re-explain each tool in each post. I'll update this accordingly as I add new tools to it.

* TOC
{:toc}
## GNU Debugger (GDB)

GDB lets us look at a program in memory. I'll discuss a few common commands needed to get started. This is by no means comprehensive, just a highlight of commands I think are important to know in order to get started.

### Starting GDB

Enter `gdb -q <program name>`  to start the debugger. The `-q` suppresses the license information when you start it up.

### Running a Program

To start a program, type `run`. This will tell GDB to execute the program you specified when you started it.

To load a different program after you've started, use `file <path to program>`.

### Viewing Source Code

If a program compiles with debugging information, you can view the source code in GDB with the `list` command. By default, GDB will show 10 lines of code. It's smart enough to know what line it displayed last, so repeating the list command will display the next ten lines of source code.

You can change the default number of lines displayed with `set listsize <count>`, and view the current setting with `show listsize`.

If you specify a number with the command, `list <number>`, GDB will display the five lines of code before and after the specified line.

 If the program is not compiled with debugging information, you won't be able to view the source code in GDB or set breakpoints using line numbers:

```bash
smith (master) bin $ gdb -q stack1
Reading symbols from stack1...(no debugging symbols found)...done.
(gdb) list
No symbol table is loaded.  Use the "file" command.
(gdb) break 5
No symbol table is loaded.  Use the "file" command.
```

### Using Breakpoints

In order to look at the state of memory while a program is running, you'll need to tell the program to stop executing at certain points. To do this you'll need to set a breakpoint.

You have a few options to sets breakpoints:

- By line number: `break <line number>`

- By function: `break <function name>`

- By address: `break <memory address>`

There are [others](http://www.delorie.com/gnu/docs/gdb/gdb_29.html), but these are what we'll use for now. 

To list your current breakpoints, use `info break`.

To delete a breakpoint, use `del <breakpoint number>`

```bash
(gdb) break 4
Breakpoint 1 at 0x4005be: file ./exercises/stack3.c, line 4.
(gdb) break 5
Note: breakpoint 1 also set at pc 0x4005be.
Breakpoint 2 at 0x4005be: file ./exercises/stack3.c, line 5.
(gdb) info break
Num     Type           Disp Enb Address            What
1       breakpoint     keep y   0x00000000004005be in main at ./exercises/stack3.c:4
2       breakpoint     keep y   0x00000000004005be in main at ./exercises/stack3.c:5
(gdb) del 1
(gdb) info break
Num     Type           Disp Enb Address            What
2       breakpoint     keep y   0x00000000004005be in main at ./exercises/stack3.c:5
```

### Resuming Execution

After hitting a breakpoint, there are a few ways to resume code execution. The three I'll highlight are `continue`, `next`, and `step`.

`Continue` resumes normal execution, running until either the program ends or the something else causes it to stop again, such as user input or another breakpoint.

`Step`  runs code until it reaches the next line of source code for which there is debugging information. It will step into functions  

### GDB Cheat sheet

```bash
run

```



## Perl

In order to quickly experiment with input values, we need a way to efficiently send different values to a program. One effective tool for this is Perl. 

### Input 

To generate input to a program, we'll use the following command:

```bash
smith (master) bin $ perl -e 'print "A"x4'
AAAAsmith (master) bin $ 
```

We use the `-e` switch to indicate what follows is Perl code for the compiler to execute. We then wrap the code we want executed in single quotes.

For our examples, we'll be printing strings to fill buffers. The example above prints out 4 letter As to the command line. 

We can concatenate output using the '`.`' character. This makes it easier to understand our exploit's pieces, as we can separate our overflow characters with the characters we'll use to take over a program.

```bash
smith (master) bin $ perl -e 'print "A"x4 . "B"x4'
AAAABBBBsmith (master) bin $ 
```

You can see how the four letter Bs get added to the end of the letter As. This just makes it easy to play with the input we'll send to the vulnerable program.

You'll notice the command prompt doesn't start on a new line after the output. This is because we didn't tell Perl to print a new-line character, '`\n`'. If we add that to the end of the string, the command prompt will start on a new line, but unless we need to send the new line to the program we're exploiting, we'll skip that. 

### Sending Data

To get our input into the the Insecure Programming examples, you just pipe the output from Perl into the executable:

```bash
smith (master) bin $ perl -e 'print "A"x100 . "B"x4' | ./stack1
buf: 60919fd0 cookie: 6091a02c
Segmentation fault (core dumped)
```

The program runs, using the data we created with Perl as its input.

