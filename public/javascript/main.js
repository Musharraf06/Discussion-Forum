function showhide(id) {
    var passtext = getId(id)
    if (passtext.value) {
        if (passtext.type == 'password') {
            passtext.type = 'text'
        } else {
            passtext.type = 'password'
        }
    }
}

function show(showElementID, hideElementID) {
    var show = getId(showElementID)
    var hide = getId(hideElementID)
    show.style.display = 'block'
    hide.style.display = 'none'
}

// function test_input() {
//     const ids = ["name", "pass"];
//     for (let i = 0; i < ids.length; i++) {
//       var element = getId(ids[i]);
//       element.value = "TEST";
//     }
// }

function getId(element) {
    var ID = document.getElementById(element)
    return ID
}