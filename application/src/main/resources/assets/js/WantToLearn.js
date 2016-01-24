$(document).ready(function () {
    $('#name_submit').click(function () {
        var bar = $('#name_input').val();

        $.ajax({
            method: "GET",
            url: 'http://localhost:8080/wants/hello'
        }).done(function (data) {
            console.log("sample of data: ", data);
            $('#name_display').text(data.name);
        });
    });
});