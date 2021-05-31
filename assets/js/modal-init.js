var modal = document.getElementById("myModal");
        
// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var txtEmail = document.getElementById("email").value;

// if (isNaN(email) == "") {
//     alert = "input is not valid"
// } else {
//     alert = "input is ok"
// };

// When the user clicks the button, open the modal 
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// if/else statement logic for empty email string
$(btn).click(function() {
    if(document.getElementById("email").value.length == 0) {
        alert("this ish is empty")
    // modal.style.display = "block";
    } else {
        modal.style.display = "block";
    }
});  

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};