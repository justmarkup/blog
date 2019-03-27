---
title: Give forms some extra attention
description: 
date: 2015-01-06T10:24:20+00:00
tags:
    - article
layout: layouts/post.njk
---

Some weeks ago I saw a great [example](https://dash.readme.io/login) of a login form with a lovely extra. On this login site, once the password field is focused, the owl, sitting on top of the form, hides her eyes, showing that the password can not be seen by others and therefore is private. I had to grin the first time I saw it and I am still impressed by the perfect association with privacy.  

[![Example of login form on readme.io](https://justmarkup.com/log/wp-content/uploads/2014/12/readme_login_form.gif)](https://justmarkup.com/log/wp-content/uploads/2014/12/readme_login_form.gif)

Thinking about other ways to enhance an input experience I came up with some ideas by myself.

### Show a special cursor

We can use the cursor property to show a “closed” eye once you hover over the password field. This can be done with the following CSS:

    .field-password {
      cursor: url(https://justmarkup.com/images/journal/eye-blocked.png), auto;
    }

Here is the example on [jsbin](http://jsbin.com/julutemoke/1/edit?html,css,output).

### Show fun facts

Let’s say you have a sport site where users have to register to interact (eg. to comment on an article). Also assume you have a field for birthday in your form. Wouldn’t it be great if you could use a database of famous athletes and their birthdays (which you may already have) and once the user inserts his birthday, you could show a hint like “You are born the same day as Michael Jordan”. It’s a great association with the interest of your site and the user and furthermore gives the form some personality.

### Show days until next birthday

I have seen this already somewhere on a live site, but couldn’t remember where (if you know of an example, please let me know). The idea is to show the user the amount of days until her/his next birthday. You could use for example JavaScript to calculate the days and show it in a little hint after the user inserts the date of birth. You could even take this one step further and show a little birthday animation if the day really happens to be the birthday of the user.

### Conclusion

As you can see there a many ways to enhance forms. It’s the [little big details](http://littlebigdetails.com/) that will make your site outstanding.  
I think it’s really worth to go the extra mile and enhance your form with a nice feature. We all have to enter data into forms every day and all know how boring this can be. Giving your forms an outstanding characteristic will make them unique, more fun and pleasant to use.

If you know any other forms with a neat extra, please let me know [@justmarkup](https://twitter.com/justmarkup)