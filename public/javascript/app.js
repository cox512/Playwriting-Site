//========================
// Add a new input field to the development and honors fields
//========================

const addField = (field) => {
  event.preventDefault();

  let list = document.getElementById(`${field}-info`).childNodes;

  if (!$(`#${field}-info input:last`).val() && list.length > 2) {
    alert("Your input field is empty.");
  } else {
    document.getElementById(`${field}-info`).insertAdjacentHTML(
      "beforeend",
      `<div class="input-group field-box">
        <input type="text" name="${field}" id="${field}" class="form-control">
          <div class="input-group-append">
            <span class="input-group-text" >
              <button class="close remove-button" onClick="removeField(event,'${field}')">
                <span aria-hidden="true">
                  &times;
                </span>
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
  evt.currentTarget.offsetParent.remove();
};
