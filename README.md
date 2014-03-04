4 2Pgames fitting in 1k
=======================

http://codegolf.github.io/2Pgames/1k


How to golf:
--


Step 1: write the best commented source possible in js.js (in progress)

Step 2: pass it through a minifier and save the result in js.min.js
- http://closure-compiler.appspot.com/home (I think the "simple" setting is better for packing)
- http://marijnhaverbeke.nl/uglifyjs (to try)

Step 3: golf js.min.js (when step 1 is finished)

Step 4: pack it and save the result in js.min.pack.js
- http://siorki.github.io/regPack.html
- Settings: Reassign ..., except for variables: b p / Tiebreaker = most copies first