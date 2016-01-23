$(document).ready(function () {
    $('#name_submit').click(function () {
        var bar = $('#name_input').val();
        $('#name_display').text(bar);
    });
});