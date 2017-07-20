// Constants
const search = () => {
  const input = document.getElementById('search_input');
  const imageArray = document.getElementsByClassName("image");
  let filter = input.value;
  for (i=0; i<imageArray.length ; i++) {
    if (imageArray[i].alt.search(filter) < 0) {
      imageArray[i].style.display = "none";
    } else {
      imageArray[i].style.display = "inherit";
    }
  }
}



/*
Create a variable for input.
Then
Use a for loop to grab every single alt text tied to an image
  1. Create an object literal. Empty
  2. Enter and create new objects of all 12 pictures on the page. They should have the following
  keys and values:
    1. Image: 01
    2. alt: "string of alt text"
2. Store them in a local variable
3. Use a for loop (or whatever kind of loop) and search within the alt text of each image for matches.
4. If there is no match, set the display property of the <img>'s parent to none'

if (imageArray[0].alt.search(filter) > -1) {imageArray[0].style.display = "none";}

for (i=0; i<9; i++)

*/
//Functions
