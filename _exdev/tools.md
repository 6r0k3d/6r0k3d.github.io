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

GDB lets us look at a program in memory. I cover a few common commands needed to get started, but this is by no means comprehensive list. The full documentation can be found [here](https://sourceware.org/gdb/onlinedocs/gdb/index.html#SEC_Contents).

### Starting GDB

Enter `gdb -q <program name>`  to start the debugger. The `-q` suppresses the license information when you start it up.

### Running a Program

To start a program, type `run`. This will tell GDB to execute the program you specified when you started it.

To load a different program after you've started GDB, use `file <path to program>`.

### Viewing Source Code

If a program compiles with debugging information, you can view the source code in GDB with the `list` command. By default, GDB will show ten lines of code. GDB tracks what line it displayed last, so repeating the list command will display the next ten lines. Once GDB has displayed all source code, you will have to specify a line number if you want to see lines from a specific point.

You can change the default number of lines displayed with `set listsize <count>`, and view the current setting with `show listsize`.

If you specify a number with the command, `list <number>`, GDB will display the `listsize` number of lines, split evenly between preceding and following lines.

If the program is not compiled with debugging information, you won't be able to view the source code in GDB or set breakpoints using line numbers:

```bash
smith (master) bin $ gdb -q stack1
Reading symbols from stack1...(no debugging symbols found)...done.
(gdb) list
No symbol table is loaded.  Use the "file" command.
(gdb) break 5
No symbol table is loaded.  Use the "file" command.
```

### Viewing Assembly Code

To view the assembly code instructions the compiler generated from the source code, use the `disassemble` command. You can specify a memory address, a function name, or a register containing the address of a machine instruction.

- By instruction memory address: `disassemble 0x00000000004005b6`
- By function name: `disassemble main`
- By register (instruction pointer):`disassemble $rip`

GDB can also display mixed source and assembly with the `/s` modifier:

```bash
(gdb) disassemble /s main
Dump of assembler code for function main:
./exercises/stack1.c:
6	int main() {
   0x00000000004005b6 <+0>:	push   rbp
   0x00000000004005b7 <+1>:	mov    rbp,rsp
   0x00000000004005ba <+4>:	sub    rsp,0x60

7	    int cookie;
8	    char buf[80];
9	
10	    printf("buf: %p cookie: %08x\n", &buf, &cookie);
   0x00000000004005be <+8>:	lea    rdx,[rbp-0x4]
   0x00000000004005c2 <+12>:	lea    rax,[rbp-0x60]
   0x00000000004005c6 <+16>:	mov    rsi,rax
   0x00000000004005c9 <+19>:	mov    edi,0x400694
   0x00000000004005ce <+24>:	mov    eax,0x0
   0x00000000004005d3 <+29>:	call   0x400480 <printf@plt>
```

The assembly instructions generated are shown as a block below the source code line(s) they were compiled from.

### Clearing the Screen

To clear the console, use `Ctrl+L`.

### Using Breakpoints

In order to look at the state of memory while a program is running, you'll need to tell the program to stop executing at certain points. To do this you'll need to set a breakpoint.

You have a few options to sets breakpoints:

- By line number: `break <line number>`

- By function: `break <function name>`

- By address: `break *<memory address>`

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

`Step` runs until it reaches the next line of source code for which there is debugging information. If the next line of code has a function call, step will stop execution inside this called function (assuming debugging information is available).

`Next` works much like `step`, but it will pause execution at the next line of the current function rather than pausing in a called function. 

To see additional control options, read more [here](https://sourceware.org/gdb/onlinedocs/gdb/Continuing-and-Stepping.html#Continuing-and-Stepping).

### Inspecting Registers

Registers are memory components in the CPU that store data the processor needs immediately. This data can be anything, from general purpose data like the values of a variable, to the addresses locating segments of a programs memory, such as the top and bottom of the stack. The most important register is the instruction pointer, which holds the address for the next instruction the CPU will execute. This is what we are trying to gain control over.

`info registers` displays all register names and values.

```bash
(gdb) info registers
rax            0x7fffffffdd40	140737488346432
rbx            0x0	0
...
Output trimmed
```

`info register <register name>` displays only the named register(s).

As shown above, GDB displays the registers in two columns. The first is the register data in raw format (hex), and the second is the register's natural format. The natural format varies by register, as explained in [this Stack Overflow answer](https://stackoverflow.com/a/27990499/1101802).

### Examining Data

We can examine data in the program with the `print` command. This will evaluate and display the value of an expression, and is useful for doing memory address math quickly.

```bash
(gdb) print 0xe396471c - 0xe39646c0
$1 = 92
```

You can use it to examine all of the data in a program, there is additional documentation [here](ftp://ftp.gnu.org/old-gnu/Manuals/gdb/html_chapter/gdb_9.html) for how to use it, but for a better understanding of the data, I prefer to look at data by examining memory.

### Examining Memory

In order to see what is stored in various variables or sections of a programs memory, we examine it with `x`. 

The syntax for the command is: `x/nfu <memory location>`

**n**, **f**, and **u** are optional format parameters to specify how memory should be displayed, and **\<memory location>** is the starting address of memory to display.

**u** is the unit size of memory to display, and can be set to *bytes* with **b**, *halfword* (two bytes) with **h**, *word* (four bytes) with **w**, and *giant* (eight bytes) with **g**.

**n** is the number of times to repeat the printing of the memory unit.

**f** is the format to print memory, **x** for hex, **d** for decimal, **s** for string, and **i** for instruction (when printing assembly).

The memory location can be specified with a hex address or by using the *address of* operator, `&`, with a variable or function name, e.g. `&buf`. If you specify a memory location by using a register, the register name must be prefixed with a **$**, e.g. `$rip`. 

#### Examine 32 bytes starting from a Register

```bash
(gdb) x/32xw $rsp
0x7fffffffdd40:	0xff000000	0x00000000	0x00000000	0x00000000
0x7fffffffdd50:	0x00000000	0x00000000	0x00000000	0x00000000
0x7fffffffdd60:	0x00000001	0x00000000	0x0040065d	0x00000000
0x7fffffffdd70:	0x00000000	0x00000000	0x00000000	0x00000000
0x7fffffffdd80:	0x00400610	0x00000000	0x004004c0	0x00000000
0x7fffffffdd90:	0xffffde80	0x00007fff	0x00000000	0x00000000
0x7fffffffdda0:	0x00400610	0x00000000	0xf7a2d830	0x00007fff
0x7fffffffddb0:	0x00000000	0x00000000	0xffffde88	0x00007fff
```

#### Examine 16 Halfwords starting from a Memory Address

```bash
(gdb) x/16xh 0x7fffffffdd40
0x7fffffffdd40:	0x0000	0xff00	0x0000	0x0000	0x0000	0x0000	0x0000	0x0000
0x7fffffffdd50:	0x0000	0x0000	0x0000	0x0000	0x0000	0x0000	0x0000	0x0000
```

#### Examine 2 Instructions starting at the Main Function

```bash
(gdb) x/2i &main
   0x4005b6 <main>:	push   rbp
   0x4005b7 <main+1>:	mov    rbp,rsp
```

#### Setting Assembly Language Flavor

There are two "flavors" of assembly language that gdb can use when examining memory/machine instructions, AT&T and Intel. AT&T syntax reads as `<instruction> <source> <destination>`, and includes percent signs all over the place. Intel reverses it, with `<instruction> <destination> <source>`. AT&T in my opinion is generally harder to read, and I always set GDB to use Intel's flavor.

You can change the flavor in a given GDB session with the following:

- `set disassembly-flavor att`

- `set disassembly-flavor intel`

- `show disassembly-flavor`

You can set it permanently by adding the line for your preferred flavor to the gdbinit file in your home directory (if you don't have one, this will create it).

```bash
echo "set disassembly-flavor intel" >> ~/.gdbinit
```

You can see below a quick snapshot of the two:

```bash
# Intel Syntax
(gdb) x/10i &main
   0x4005b6 <main>:	push   rbp
   0x4005b7 <main+1>:	mov    rbp,rsp
   0x4005ba <main+4>:	sub    rsp,0x60
   0x4005be <main+8>:	lea    rdx,[rbp-0x4]
   0x4005c2 <main+12>:	lea    rax,[rbp-0x60]
   0x4005c6 <main+16>:	mov    rsi,rax
   0x4005c9 <main+19>:	mov    edi,0x400694
   0x4005ce <main+24>:	mov    eax,0x0
   0x4005d3 <main+29>:	call   0x400480 <printf@plt>
   0x4005d8 <main+34>:	lea    rax,[rbp-0x60]
   
# AT&T Syntax
(gdb) set disassembly-flavor att
(gdb) x/10i &main
   0x4005b6 <main>:	push   %rbp
   0x4005b7 <main+1>:	mov    %rsp,%rbp
   0x4005ba <main+4>:	sub    $0x60,%rsp
   0x4005be <main+8>:	lea    -0x4(%rbp),%rdx
   0x4005c2 <main+12>:	lea    -0x60(%rbp),%rax
   0x4005c6 <main+16>:	mov    %rax,%rsi
   0x4005c9 <main+19>:	mov    $0x400694,%edi
   0x4005ce <main+24>:	mov    $0x0,%eax
   0x4005d3 <main+29>:	callq  0x400480 <printf@plt>
   0x4005d8 <main+34>:	lea    -0x60(%rbp),%rax

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

