$(() => {
  //Upon hitting 'add another':
  //Another input field is created below the first one.
  const addDevField = () => {
    //Check if there is text in the input field.
    if (!$("#dev-info input:last").val()) {
      alert("Your input field is empty.");
    } else {
      document
        .getElementById("dev-info")
        .insertAdjacentHTML(
          "beforeend",
          '<input type="text" name="development" class="form-control dev-array">'
        );
    }
  };
  //MAKE THIS DRY BY MAKING IT WORK FOR BOTH DEV-INFO AND HONORS.
  const addHonorsField = () => {
    if (!$("#honors-info input:last").val()) {
      alert("Your input field is empty.");
    } else {
      document
        .getElementById("honors-info")
        .insertAdjacentHTML(
          "beforeend",
          '<input type="text" name="honors" class="form-control honors-array">'
        );
    }
  };

  $(".dev-button").on("click", addDevField);
  $(".honors-button").on("click", addHonorsField);
});
