//=================
// Add a a new input field to the development and honors fields
//=================
const addField = (field) => {
  event.preventDefault();
  if (!$(`#${field}-info input:last`).val()) {
    alert("Your input field is empty.");
  } else {
    document.getElementById(`${field}-info`).insertAdjacentHTML(
      "beforeend",
      `<div class="input-group field-box">
        <input type="text" name="${field}" class="form-control ${field}-array field-box">
          <div class="input-group-append">
            <span class="form__button--remove input-group-text remove-span" >
              <button class="close remove-button" onClick="removeField(event,'${field}')">
              <span aria-hidden="true">&times;</span>
              </button>
            </span>
          </div>    
      </div>`
    );
  }
};

//=================
// Remove an input field from the development and honors fields
//=================
const removeField = (evt, field) => {
  evt.preventDefault();
  console.log("currentTarget.offsetParent", evt.currentTarget.offsetParent);
  console.log("event.currentTarget", evt.currentTarget);
  evt.currentTarget.offsetParent.remove();
};
