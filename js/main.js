const name = document.querySelector(".name");
const email = document.querySelector(".email");
const img = document.querySelector(".img");
const btn = document.querySelector(".add");
const list = document.querySelector(".list");
let modal = document.querySelector(".modal-window");

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
    let icons = document.createElement("div");
    icons.classList.add("icons");
    let edit = document.createElement("span");
    edit.innerHTML = `<ion-icon name="create-outline"></ion-icon>`;
    let span = document.createElement("span");
    span.innerHTML = `<ion-icon name="trash-outline"></ion-icon>`;

    //append
    card.append(pName, pEmail, img, icons);
    icons.append(edit, span);

    list.append(card);
    card.style.marginBottom = "25px";

    edit.addEventListener("click", () => {
      modal.style.display = "flex";
      updateTask(idx);
    });

    span.addEventListener("click", () => {
      deleteTask(idx);
    });
  });
}

function deleteTask(index) {
  let data = JSON.parse(localStorage.getItem("task")) || [];
  localStorage.setItem(
    "task",
    JSON.stringify(data.filter((item, idx) => idx !== index))
  );
  readTask();
}

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

let editName = document.querySelector(".nameEdit");
let editEmail = document.querySelector(".emailEdit");
let editImg = document.querySelector(".imgEdit");
let btnSave = document.querySelector(".btnEdit");

function updateTask(index) {
  let data = JSON.parse(localStorage.getItem("task")) || [];
  editName.value = data[index].name;
  editEmail.value = data[index].email;
  editImg.value = data[index].img;
  editName.setAttribute("id", index);
  editEmail.setAttribute("id", index);
  editImg.setAttribute("id", index);
}

btnSave.addEventListener("click", () => {
  let editedText = {
    name: editName.value,
    email: editEmail.value,
    img: editImg.value,
  };
  let data = JSON.parse(localStorage.getItem("task")) || [];
  data.splice(editName.id && editEmail.id && editImg.id, 1, editedText);
  localStorage.setItem("task", JSON.stringify(data));
  readTask();
  modal.style.display = "none";
});
