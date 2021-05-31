var modal = document.getElementById("myModal");

var modal2 = document.getElementById("myModal2");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var txtEmail = document.getElementById("email").value;

// if/else statement logic for empty email string
$(btn).click(function () {
  if (document.getElementById("email").value.length == 0) {
    modal2.style.display = "block";
    // modal.style.display = "block";
  } else {
    modal.style.display = "block";
  }
});

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// When the user clicks anywhere outside of the modal2, close it
window.onclick = function (event) {
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
};
