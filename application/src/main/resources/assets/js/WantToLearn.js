$(document).ready(function () {
    $('#name_submit').click(function () {
        var name = $('#name_input').val();
        var new_workshop_title = $('#new_workshop_title').val();

        var payload = {
            name : name,
            workshop_title: new_workshop_title
        };

        $.ajax({
            method: "POST",
            url: 'http://localhost:8080/wants/student',
            data: JSON.stringify(payload),
            dataType: 'json',
            contentType: "application/json"
        }).done(function (data) {
            console.log("sample of data: ", data);
            $('#name_display').text(data.name);
            $('#workshop_title').text(data.workshop_title);
        });
    });
});