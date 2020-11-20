const addField = (field) => {
  event.preventDefault()
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

