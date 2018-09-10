---
title: Stack Warmup 1
description: Basic Buffer Overflow
link: Stack Warmup 1
author: gr0k
layout: post
github_comments_issueid: 4
permalink: /exdev/stack1.html
date: 27 Aug 2018
---

stack1.c is the first of the Stack Warmup Exercises. This guide will walk you through the buffer overflow process and explain the details behind what's happening.

* TOC
{:toc}
## Source Code Review

We'll start with a review of the source code to get an idea of what's happening and what we need to do.

```c
/* stack1-stdin.c                               *
 * specially crafted to feed your brain by gera */

#include <stdio.h>

int main() {
    int cookie;
    char buf[80];

    printf("buf: %08x cookie: %08x\n", &buf, &cookie);
    gets(buf);

    if (cookie == 0x41424344)
        printf("you win!\n");
}
```

First two variables are declared, `cookie` and `buf`. `cookie` is defined as an int variable, and `buf` is an array of 80 characters.

Line 10 has a print statement with two format parameters. Format parameters are written with a percent sign and a letter which specifies how the program should display the variable. In this case, the `x` means to print as hex. The numbers after the `%` control the width of the output. The variables the program prints are included after the output string. In the C programming language, `&` is the 'address-of' operator, and means get the memory address for the variable listed. This line will print out the memory address for the `buf` and `cookie` variables. Wikipedia has more information about C printf format strings [here](https://en.wikipedia.org/wiki/Printf_format_string).

Line 11 calls the `gets` function. From the [Open Group Library](http://pubs.opengroup.org/onlinepubs/009695399/functions/gets.html), the `gets` function operates as follows:

> The *gets*() function shall read bytes from the standard input stream, *stdin*, into the array pointed to by *s*, until a \<newline> is read or an end-of-file condition is encountered. Any <newline> shall be discarded and a null byte shall be placed immediately after the last byte read into the array.

```c
char *gets(char *str)
```

The `char *gets` means the gets function returns a pointer to a character. Upon successful execution, `gets` will return a pointer to `str`. The `(char *str)` means that the function takes one parameter, a pointer to a string. This is where the function will write the input from stdin. For more on reading C functions, the guides [here](http://www.unixwiz.net/techtips/reading-cdecl.html) and [here](https://medium.com/@bartobri/untangling-complex-c-declarations-9b6a0cf88c96) are useful. The cdecl [command line tool](https://linux.die.net/man/1/cdecl) or [web app](https://cdecl.org/) are also useful for decoding complicated C declarations.

One thing to notice in the function syntax above is that the only parameter for `gets` is a destination for the input. There are no parameters to specify how much data should be written to the buffer. This is what makes this function so dangerous to use, and what we're going to exploit for the buffer overflow.

Line 14 will print "you win!" if the value of cookie is `0x41424344`. We need to figure out how to set the cookie variable in order to successfully execute the if statement. test

## Running the Program

If you followed the [Setup Guide]({{ site.url }}/exdev/intro.html), you can run the stack1 binary from the `bin` directory with `./stack1`.

```bash
smith (master) bin $ ./stack1
buf: a091ad20 cookie: a091ad7c
AAAAA
smith (master) bin $ 
```

As discussed above, the memory addresses for the buf and cookie variables are printed, the program takes input from the user, and then exits.



## Endianess

When entering the characters "ABCD" at the prompt
