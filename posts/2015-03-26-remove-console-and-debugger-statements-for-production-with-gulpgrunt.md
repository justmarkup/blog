---
title: Remove console and debugger statements for production with gulp/grunt
description: 
date: 2015-03-26T13:05:25+00:00
tags:
    - article
layout: layouts/post.njk
---

While writing JavaScript you will most likely use either console (console.log, console.error…), debugger; or even alert() (I hope you don’t anymore) at some point to debug your code. Showing these messages on your development server is not a problem as only »you« will see them, but if they show up on your production server everybody will see them.

Whereas console messages and debugger are only visible if DevTools are open alert() will always show up and even prompt a modal dialog. So, you most probably (\*always\*) want to remove these statements before pushing new code to production.

![Dialog showing the message 'Oops, I forgot to remove debug messages.'](https://justmarkup.com/log/wp-content/uploads/2015/03/alert.png)

Let’s make use of our preferred build tool and remove all debug statements before deploying code to production.

### Gulp

For Gulp we can use [gulp-strip-debug](https://www.npmjs.com/package/gulp-strip-debug) by Sindre Sorhus.

Here is what the task will look like if you have all your JavaScript files in src/js and want to save the cleaned up versions in dist/js.

    var gulp = require('gulp');
    var stripDebug = require('gulp-strip-debug');
     
    gulp.task('strip-debug', function () {
        return gulp.src('src/js/*')
            .pipe(stripDebug())
            .pipe(gulp.dest('dist/js/'));
    });
    

### Grunt

Sindre Sorhus also made a [Grunt Plugin](https://github.com/sindresorhus/grunt-strip-debug) we can use.

Once again, Here is what the task will look like if you have all your JavaScript files in src/js and want to save the cleaned up versions in dist/js.

    module.exports = function(grunt){
    
        require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks
    
    	grunt.initConfig({
    	    stripDebug: {
    	        dist: {
    	             files: grunt.file.expandMapping(['src/js/*.js'], 'dist/js/', {
    	             	flatten: true,
    			        rename: function(destBase, destPath) {
    			            return destBase+destPath;
    			        }
    			    })
    	        }
    	    }
    	});
    
    	grunt.registerTask('default', ['stripDebug']);
    
    };
    

Last but not least, there is also a [Broccoli Plugin](https://github.com/sindresorhus/broccoli-strip-debug) if this is your preferred tool.

### Conclusion

Removing console messages before deploying code to production is nothing we should do manually – that’s a task for a build tool.