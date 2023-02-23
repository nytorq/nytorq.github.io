// Constants
const search = () => {
  const input = document.getElementById('search_input');
  const imageArray = document.getElementsByClassName("image");
  let filter = input.value.toUpperCase();
  for (i=0; i<imageArray.length ; i++) {
    imageArray[i].alt = imageArray[i].alt.toUpperCase();
    if (input.value ==="") {
      imageArray[i].style.opacity = "inherit";
    } else if (imageArray[i].alt.search(filter) < 0){
      imageArray[i].style.opacity = "0.05";
    } else {
      imageArray[i].style.opacity = "inherit";
    }
  }
};
