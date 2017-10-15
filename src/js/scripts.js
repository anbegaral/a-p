// Wait for the DOM to be ready
$(function() {
    // there are different validation libraries in jquery that offer more features but I wanted to implement a own solution. 
    // It is quite simple, more validations would be necessary in order to validate the kind and format of the data sent
    
    $("#commentForm").submit(function(event) {
        if ($("input[name='name']").val() === '') {
            $(".nameValidation").addClass('error');
            event.preventDefault();
        } else {           
            $(".nameValidation").removeClass('error');
        }

        if ($("input[name='email']").val() === '') {
            $(".emailValidation").addClass('error');
            event.preventDefault();            
        } else {
            $(".emailValidation").removeClass('error');
        }

        if ($("input[name='telephone']").val() === '') {
            $(".telephoneValidation").addClass('error');
            event.preventDefault();            
        } else {
            $(".telephoneValidation").removeClass('error');
        }

        if ($("input[name='name']").val() !== '' && $("input[name='email']").val() !== '' && $("input[name='telephone']").val() !== '') {
            return;
        }
    })
});