


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
                document.getElementById('dev-info').insertAdjacentHTML('beforeend', '<input type="text" name="development" class="dev-array"><br/>') 
            }
    }
        //Repeat for the Honors field -- FIGURE OUT HOW TO MAKE THIS DRY BY MAKING IT WORK FOR BOTH DEV-INFO AND HONORS.
    const addHonorsField = () => {
        if (!$('#honors-info input:last').val()) {
            alert('Your input field is empty.');
        } else {
            //Keeps existing text and adds another.
            document.getElementById('honors-info').insertAdjacentHTML('beforeend', '<input type="text" name="honors" class="honors-array"><br/>') 
        }
    }

    //Development History and Honors button event listeners
    $('.dev-button').on('click', addDevField);
    $('.honors-button').on('click', addHonorsField);
    
    
    //Carousel
$('#carousel-show').on('slide.bs.carousel', function (e) {
    //CC 2.0 License Iatek LLC 2018 - Attribution required
    const $e = $(e.relatedTarget);
    const idx = $e.index();
    console.log("IDX: " + idx);
    const itemsPerSlide = 3;
    const totalItems = $('.carousel-item').length;
 
    if (idx >= totalItems-(itemsPerSlide-1)) {
        let it = itemsPerSlide - (totalItems - idx);
        for (let i=0; i<it; i++) {
            // append slides to end
            if (e.direction=="left") {
                $('.carousel-item').eq(i).appendTo('.carousel-inner');
            }
            else {
                $('.carousel-item').eq(0).appendTo('.carousel-inner');
            }
        }
    }
});


})
