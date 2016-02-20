var jquery = require('jquery');

var workshop = {
    newWorkshop : function (doc) {
        var name = jquery('#name_input').val();
        var new_workshop_title = jquery('#new_workshop_title').val();
        var new_workshop_details = jquery('#new_workshop_details').val();

        var payload = {
            name : name,
            workshop_title: new_workshop_title,
            workshop_details: new_workshop_details
        };

        jquery.ajax({
            method: "POST",
            url: 'http://localhost:8080/wants/workshop',
            data: JSON.stringify(payload),
            dataType: 'json',
            contentType: "application/json"
        }).done(function (data) {
            console.log("sample of data: ", data);
            jquery('#name_display').text(data.name);
            jquery('#workshop_title').text(data.workshop_title);
            jquery('#workshop_details').text(data.workshop_details);
        });
    }
}
module.exports = workshop;