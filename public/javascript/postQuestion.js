var count = 1;

let tag = () => {
  //generate random number and create span tag
  const random = Math.floor(Math.random() * 100 + 1);
  ID = "tag" + random;
  var span = document.createElement("span");
  span.setAttribute("id", ID);
  span.setAttribute("class", "tag-p");
  span.setAttribute("name", "tags");

  //close btn
  var close = document.createElement("span");
  close.setAttribute("class", "close");
  close.setAttribute("id", "close");

  //input
  var input = document.createElement("input");
  input.setAttribute("name", "input" + count);
  input.setAttribute("class", "tag_class");
  count += 1;

  //Getting tag input value
  var tagInput = document.getElementById("tagInput").value;

  // checking conditions
  if (tagInput == "" || tagInput == " ") {
    count -= 1;
    return null;
  }

  //Push creted elements to body
  //select tag input value
  var val = document.getElementById("tagInput");

  //convert tag input value to lowercase append span tag to body
  span.innerText = tagInput;
  document.body.appendChild(span);
  input.value = val.value.toLowerCase();

  //select form and append input to it to access input at backend
  form = document.querySelector("#form");
  form.appendChild(input);
  count_inp = document.querySelector("#count");
  count_inp.value = count;
  form.appendChild(count_inp);

  //append close span to span tag
  close.innerText = " X";
  span.appendChild(close);
  document.getElementById(ID).addEventListener("click", () => {
    document.body.removeChild(span);
    form.removeChild(input);
    count -= 1;
    count_inp.value -= 1;
  });

  //clear content
  val.value = "";
  val.focus();
};

let showphoto = () => {
  let photoUser = document.getElementById("photo").value;
  if (photoUser != "") {
    var p = document.createElement("img");
    p.setAttribute("class", "img-up");
  }
};
