
 


$(() => {
console.log("inside Jquery onload")
    //Upon hitting 'add another':
        //Another input field is created below the first one.
    const addDevField = () => {
        //Check if there is text in the input field.
            //if there isn't, alert'your text box is empty'
            //else go ahead and make the new input field

            if (!$('#dev-info input:last').val()) {
                alert('Your input field is empty.');
            } else {
                //Keeps existing text and adds another.
                document.getElementById('dev-info').insertAdjacentHTML('beforeend', '<input type="text" name="development" class="dev-array"><br/>') 
            }
    }

    const addHonorsField = () => {
        if (!$('#honors-info input:last').val()) {
            alert('Your input field is empty.');
        } else {
            //Keeps existing text and adds another.
            document.getElementById('honors-info').insertAdjacentHTML('beforeend', '<input type="text" name="honors" class="honors-array"><br/>') 
        }
    }

//In order to know which category's button is pressed we need to pass in a parameter that takes that button's id and adds it to their class name.
    $('.dev-button').on('click', addDevField);
    $('.honors-button').on('click', addHonorsField);
        //If the current input field is empty, nothing happens.
    
    //Upon hitting "Submit" (at the bottom of the form), cycle through the answers and push them into the corresponding arrays.

    //Make this work for BOTH Development History and Honors


// Code from last project

    // const addAnswer = () => {
    //     let repIndex=0;
    //     while (localStorage.getItem('proj1-'+repIndex)) {
    //         repIndex++
    //         if (repIndex>5) {
    //             return false;
    //         }
    //     }
    //     let displayNum = repIndex + 1;
    // //create variables for: new table row, value of input field, and the rep number.
    //     const answerRow = $('<tr>').addClass('table-row');
    //     const inputValue = $('#answer-field').val();
    //     const repNum = $('<td>').addClass('rep').attr('id', 'rep' + displayNum).text(displayNum);
    // //create the answer data cell. Add the input Value.
    //     const answer = $('<td>').addClass('answer').attr('id', ('answer' + displayNum)).text(inputValue);
    // //Append the data cells to the row and the row to the table body.
    //     $(answerRow).append(repNum, answer);
    //     $('tbody').append(answerRow);
    //     if (repIndex < 4) {
    //         //console.log("submit works");
    //         storeReps();
    //         clearText();
    //         repIndex++;
    //     } else {
    // //For the 5th answer. This avoids the problem of the last item not displaying.
    //         storeReps();
    //         repIndex++;
    // //Remove the answer section and add the "submit set" button.
    //         $('#answer-section').remove();
    //         buildSetSubmit();
    //     }
    // }

    //Code from earlier in the week

// $('.add').on('click', add);
// $('.remove').on('click', remove);

// const addField = () => {
//     const num = 2;
//     const newInput = "<input type='hidden' id='devBtn' + btnNum>";
//     const newBtn = "<button onclick='addField('devBtn' + btnNum)' id='devBtn' + btnNum>Add Another</button>"
//     document.getElementById(id).append(newInput);
//     document.getElementById(id).append(newInput);

// }
// document.getElementById(devBtn).onclick = function listMaker() {
//     //Create an empty array to hold the entire list
//     let devOpp = [];
//     //Push the current value in the #developoment input field into the array;
//     devOpp.push(document.getElementById(development).innerHTML)
//     //Append a new empty input field
//}
})
