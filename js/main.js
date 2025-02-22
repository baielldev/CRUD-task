const name = document.querySelector(".name");
const email = document.querySelector(".email");
const img = document.querySelector(".img");
const btn = document.querySelector(".add");
const list = document.querySelector(".list");

readTask();
btn.addEventListener("click", () => {
  if (!name.value.trim() || !email.value.trim() || !img.value.trim()) {
    alert("Заполните поле");
  } else {
    let obj = {
      name: name.value,
      email: email.value,
      img: img.value,
    };
    let data = JSON.parse(localStorage.getItem("task")) || [];
    data.push(obj);
    localStorage.setItem("task", JSON.stringify(data));
    readTask();
    name.value = "";
    email.value = "";
    img.value = "";
  }
});

function readTask() {
  list.innerHTML = "";
  let data = JSON.parse(localStorage.getItem("task")) || [];
  data.forEach((item, idx) => {
    //create
    let card = document.createElement("div");
    card.classList.add("card");
    let pName = document.createElement("p");
    pName.innerText = item.name;
    let pEmail = document.createElement("p");
    pEmail.innerText = item.email;
    let img = document.createElement("img");
    img.src = item.img;
    let span = document.createElement("span");
    span.innerHTML = `<ion-icon name="trash-outline"></ion-icon>`;

    //append
    card.append(pName, pEmail, img, span);
    list.append(card);
    card.style.marginBottom = "25px";
  });
  deleteTask();
}

function deleteTask() {
  let data = JSON.parse(localStorage.getItem("task")) || [];
  let span = document.querySelectorAll("span");
  span.forEach((icon, idx) => {
    icon.addEventListener("click", () => {
      data = data.filter((el, index) => {
        return index !== idx;
      });
      localStorage.setItem("task", JSON.stringify(data));
      readTask();
    });
  });
}
deleteTask();
