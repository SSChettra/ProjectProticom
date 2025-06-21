

// form repeater
$(document).ready(function(){
    $('.repeater').repeater({
        initEmpty: false,
        defaultValues: {
            'text-input': ''
        },
        show:function(){
            $(this).slideDown();
            // Call generateCV after adding new item
            setTimeout(() => {
                generateCV();
            }, 100);
        },
        hide: function(deleteElement){
            $(this).slideUp(deleteElement);
            // Call generateCV after removing item
            setTimeout(() => {
                generateCV();
            }, 500);
        },
        isFirstItemUndeletable: true
    });
    
    // Also attach event listeners to any dynamically added form elements
    $(document).on('input', '.form-control', function() {
        generateCV();
    });
});