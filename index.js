let formData = {};
const form = document.forms.comment;
const inputs = form.querySelectorAll("input");
const list = document.querySelector(".main__list");
const errorName = document.querySelector(".form__error-name");
const errorText = document.querySelector(".form__error-comment");

function getTemplate() {
  const comment = document
    .querySelector(".template")
    .content.querySelector(".main__list-item")
    .cloneNode(true);
  return comment;
}

function createComment(data) {
  let comment = getTemplate();

  comment.querySelector(".comment__name").textContent = data.name;
  comment.querySelector(".comment__text").textContent = data.text;
  comment.querySelector(".comment__date").textContent = data.date;
  comment.querySelector(".comment__like").addEventListener("click", toggleLike);
  comment
    .querySelector(".comment__delete")
    .addEventListener("click", deleteComment);

  return comment;
}

function setInputData(evt) {
  formData[evt.target.name] = evt.target.value;
}

function validateInputBlur(input) {
  let text = input.value;
  const cyrilic = /[а-я\sё]/gi;
  let condition = text.length > 1 && cyrilic.test(text);
  if (!condition) {
    input.nextElementSibling.classList.add("form__error_visible");
  }
}

function validateInputFocus(input) {
  if (input.nextElementSibling.classList.contains("form__error_visible")) {
    input.nextElementSibling.classList.remove("form__error_visible");
  }
}

function toggleLike(evt) {
  evt.target.classList.toggle("comment__like_on");
}

function deleteComment(evt) {
  evt.target.closest("li").remove();
}

function formatDate(data) {
  const day = new Date();
  const currentMinute = checkZeroDate(day.getMinutes());
  const time = day.getHours() + ":" + currentMinute;

  if (!data.date || data.date.slice(-2) == day.getDate()) {
    data.date = "сегодня, " + time;
  } else if (data.date.slice(-2) == day.getDate() - 1) {
    data.date = "вчера, " + time;
  } else {
    const rusDate = data.date.split("-").reverse().join("-");
    data.date = rusDate + ", " + time;
  }
}

function checkZeroDate(date) {
  if (date < 10) return "0" + date;
  return date;
}

function addComment() {
  list.append(createComment(formData));
}

inputs.forEach((input) => {
  input.onchange = setInputData;
  if (!input.classList.contains("form__date")) {
    input.onblur = () => validateInputBlur(input);
    input.onfocus = () => validateInputFocus(input);
  }
});

function clearInputs() {
  inputs.forEach((input) => {
    input.value = "";
  });
}

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (form.name.value != 0 && form.text.value != 0) {
    formatDate(formData);
    addComment();
    clearInputs();
    formData = {};
  }
});
