


$(() => {
console.log("inside Jquery onload")
    //Upon hitting 'add another':
        //Another input field is created below the first one.
    const addDevField = () => {
        //Check if there is text in the input field.
        if (!$('#dev-info input:last').val()) {
            //if there isn't, alert'your text box is empty'
            alert('Your input field is empty.');
        } else {
            //Keeps existing text and add a new input field.
            document.getElementById('dev-info').insertAdjacentHTML('beforeend', '<input type="text" name="development" class="form-control dev-array">') 
        }
    }
        //Repeat for the Honors field -- FIGURE OUT HOW TO MAKE THIS DRY BY MAKING IT WORK FOR BOTH DEV-INFO AND HONORS.
    const addHonorsField = () => {
        if (!$('#honors-info input:last').val()) {
            alert('Your input field is empty.');
        } else {
            //Keeps existing text and adds another.
            document.getElementById('honors-info').insertAdjacentHTML('beforeend', '<input type="text" name="honors" class="form-control honors-array">') 
        }
    }

    //Remove an uploaded image on the Edit page -- STILL NEED TO BUILD
    // const fileRemove = () => {
    //     $()
    // }

    //Development History and Honors button event listeners
    $('.dev-button').on('click', addDevField);
    $('.honors-button').on('click', addHonorsField);
    // $('#remove-button').on('click', fileRemove);

})
