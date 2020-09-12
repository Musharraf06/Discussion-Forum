window.onclick = function (event1) {
  let box = getId("box");
  let photo = getId("main_photo");
  if (event1.target != photo) {
    box.style.display = "none";
  } else {
    box.style.display = "inline-block";
  }
  let menu = getId("menu_content_id");
  let menu_btn = getId("menu_btn_id");
  let menu_btn_center = getId("menu_btn__burger_id");
  let menu_btn_top = getId("menu_btn-top__burger_id");
  let menu_btn_bottom = getId("menu_btn-bottom__burger_id");
  let li1 = getId("li_1");
  let li2 = getId("li_2");
  let li3 = getId("li_3");
  let li4 = getId("li_4");
  let li5 = getId("li_5");
  if (
    event.target != menu &&
    event.target != menu_btn &&
    event.target != menu_btn_center &&
    event.target != menu_btn_top &&
    event.target != menu_btn_bottom &&
    event.target != li1 &&
    event.target != li2 &&
    event.target != li3 &&
    event.target != li4 &&
    event.target != li5
  ) {
    menu.style.display = "none";
  } else {
    menu.style.display = "inline";
  }
};

function change_avatar(id) {
  let avatarimg = getId(id);
  let profile_avatar = getId("main_photo");
  profile_avatar.src = avatarimg.src;
  let logosrc = getId("logosrc");
  let firstpart = "../public/images/avatars/";
  logosrc.value = firstpart + id + ".jpg";
}

function edit() {
  var ids = ["name", "email", "city", "question", "answer", "submit"];
  for (let i = 0; i < ids.length; i++) {
    const element = ids[i];
    var editfield = getId(element);
    editfield.disabled = false;
  }
  getId("submit").style.cursor = "pointer";
}

const confirmdel = () => {
  var res = getId("wish");
  const wish = confirm("You wont be able to recover your account. Are you sure you want to delete it ?");
  if (wish == true) {
    res.value = "true";
  } else {
    res.value = "false";
  }
};
// function myvalidation() {
//   var ids = ['name', 'email', 'city', 'question', 'answer']
//   for (let i = 0; i < ids.length; i++) {
//     const element = ids[i];
//     var editfield = getId(element);
//     if (editfield.disabled == true) {
//       window.history.back()
//       console.log('backed off')
//     }
//   }
// }

function getId(element) {
  var ID = document.getElementById(element);
  return ID;
}

// window.onclick = function (event) {
//   let menu = getId('menu_btn_id')
//   var ids = [
//     menu_content_id,
//     menu_btn_id,
//     menu_btn__burger_id,
//     menu_btn_top__burger_id,
//     menu_btn_bottom__burger_id,
//     li_1,
//     li_2,
//     li_3,
//     li_4,
//     li_5
//   ]
//   for (let i = 0; i < ids.length; i++) {
//     let element = getId(ids[i])
//     if (event.target != element) {
//       menu.style.display = 'none'
//     } else {
//       menu.style.display = 'inline'
//     }
//   }
// }

// function getId(element) {
//   var ID = document.getElementById(element)
//   return ID
// }
