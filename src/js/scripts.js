// Wait for the DOM to be ready
$(function() {
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