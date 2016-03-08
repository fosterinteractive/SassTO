# SASS-TO SVG & SASS - March 2016 #

# Let's Get Setup #

Download this repo to your local machine (git clone or zip download)

https://github.com/fosterinteractive/SassTO

````
cd /your-folder/SassTO/SVG-icons
npm install
````

## Introductions ##
- What's your focus / work / area of interest?

## Announcements  ##

### Node Sass and Ruby Sass Parity ###
### Compass End of Life ###
### Eyeglass NPM manager for Sass ###
* https://github.com/sass-eyeglass/eyeglass
* Automatically downloads, managed, and inteligently loads required Sass components
### Mainspring Boilerplate for Our Projects ###
* https://github.com/fosterinteractive/mainspring
* The SVG lesson today is a smaller component of mainspring

# SVG Intro #

Someone's done this already - Let's check out the awsome SVG handbook.
http://svgpocketguide.com/book/#section-1

Square Example
http://codepen.io/jonitrythall/pen/525df2422b0ebc54c71a48d27534ea5e

Poly Line Example
http://codepen.io/jonitrythall/pen/558d73574360c37158f4ad03214c7eb9

# Why Better then Icon Fonts #

* Font Icons & Data URI's in CSS content are a hack
* Scalable like images
* Able to have more then 1 color
* Accessible
* Can be created to be responsive (EG more detail when the logo gets bigger)
* Can support rainbow unicorns
http://codepen.io/fosterinteractive/details/ZbmNbM/


# Prepping you files #

You're probably using illustrator - CC version has better export options then CS6

http://creativedroplets.com/export-svg-for-the-web-with-illustrator-cc/

https://www.viget.com/articles/5-tips-for-saving-svg-for-the-web-with-illustrator

## Hints ##

* (Usually) You're going to want to convert text to outlines for logos.
* Often useful to convert strokes to fills.


# Using SVG's #

SVG's as image files
````
<img src ="./svg/spiral.svg" />
````
* Can't edit the SVG in any way w/ CSS

#External SVG Sprites#

* A number of separate SVG icon files are bended together into SVG sprite file.
* Each SVG icon gets wrapped in a symbol with a unique ID
* SVG Symbol Elements are a "library" of SVG that can be "placed" inside the DOM
* This SVG sprite file is called as an external asset like a image or JS file.
* It gets cached by the browser and is only 1 extra request

````
// sprite-social.svg File //
<svg xmlns="http://www.w3.org/2000/svg">
<symbol id="facebook" viewBox="-463 265 32 32">
  <path d=""/>
</symbol>
<symbol id="instagram" viewBox="-422 224.6 113.4 113.4">
  <path d=""/>
</symbol>
</svg>
````

````
// HTML FIle

 <svg class="svg" alt="Facebook"><use xlink:href="../svg/sprite-social.svg#facebook"></use></svg>

 <svg class="svg" alt="Facebook"><use xlink:href="../svg/sprite-social.svg#instagram"></use></svg>

````

#Gulp SVG Tasks#

````
See

/gulp.js/config.js
/gulp.js/tasks/svgSprite
````

##What the heck does this do?##

1. It DELETES the entire contents of the /svg folder to clean up junk.
2. It minifies the many small SVG's, removing all stroke and fill colors so you can alter them with CSS.
3. New Minified files are copied from /svg-src to /svg.
4. Gulp looks for sub-folders inside /svg-src makes a sprite out of any SVG files in these folders.
5. The svgsprite is named after the folder and is created in the /svg root folder.

LET's GO A TRY IT OUT

````
$ gulp svgSprite
````

#Controlling SVG Sizes in CSS#

* It's crazy but in IE all SVG's have a fixes size of 300x150px by default
* Wrap you SVG in something to control the size on the wrapper
* Either define fixes sizes (with breakpoints as needed) or apply and intrinsic ratio to the wrapper using something like
* https://github.com/at-import/toolkit#intrinsic-ratios
* [Example Codepen](http://codepen.io/fosterinteractive/pen/oxxLzB)

## Example Mixin for Sizing and Icon in button ##

````
See /scss/global/_g-svg.scss
````
http://www.sassmeister.com/gist/5e0ccf832283a5a8dc8f



#Controlling SVG Color in CSS#

CurrentColor
https://css-tricks.com/cascading-svg-fill-color/

CSS w/ Fill and Stroke

````
See /scss/components/c-btn.scss
````


# Other Approaches and Follow up #

http://una.im/svg-icons#💁 (Great explanation why external SVG icons)
http://blog.cloudfour.com/our-svg-icon-process/
* Pretty cool with reusing icons to be DRY (like arrows in different directions)
Responsive Icons




