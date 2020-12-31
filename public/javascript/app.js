const addField = (field) => {
  event.preventDefault();
  if (!$(`#${field}-info input:last`).val()) {
    alert("Your input field is empty.");
  } else {
    document
      .getElementById(`${field}-info`)
      .insertAdjacentHTML(
        "beforeend",
        `<input type="text" name="${field}" class="form-control ${field}-array field-box">`
      );
  }
};

const removeField = (evt, field) => {
  evt.preventDefault();
  let input = Array.from(document.getElementsByClassName(`${field}-array`));
  console.log("input:", input.length);

  for (let i = 0; i < input.length; i++) {
    (function (index) {
      input[i].onclick = function () {
        input[index].remove();
      };
    })(i); // WHY IS i HERE?
  }
};
