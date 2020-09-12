window.onclick = function (event) {
  let box = getId("box");
  let photo = getId("pro");
  if (event.target != photo) {
    box.style.display = "none";
  } else {
    box.style.display = "inline-block";
  }
};

function showhide(id) {
  var passtext = getId(id);
  if (passtext.value) {
    if (passtext.type == "password") {
      passtext.type = "text";
    } else {
      passtext.type = "password";
    }
  }
}

// const test_input = () => {
//   const ids = ["name", "city", "password", "confirm_password", "answer"];
//   for (let i = 0; i < ids.length; i++) {
//     var element = getId(ids[i]);
//     element.value = "TEST";
//   }
//   var email = getId("email");
//   email.value = "TEST@gmail.com";
// };

// function check() {
//     let submit = getId('signup-submit-btn').disabled
//     let pass = getId("password")
//     let conpass = getId("confirm_password")
//     if (pass != conpass) {
//         conpass.style.color = "red";
//         conpass.style.borderBottom = "solid 2px red";
//         submit = true
//     } else {
//         conpass.style.color = "green";
//         conpass.style.borderBottom = "solid 2px green";
//         submit = false
//     }
// }

function change_avatar(id) {
  let avatarimg = getId(id);
  let profile_avatar = getId("pro");
  profile_avatar.src = avatarimg.src;
  profile_avatar.style.opacity = 1;
  profile_avatar.style.filter = "invert(0)";
  let logosrc = getId("logosrc");
  let firstpart = "../public/images/avatars/";
  logosrc.value = firstpart + id + ".jpg";
}

function getId(element) {
  var ID = document.getElementById(element);
  return ID;
}
