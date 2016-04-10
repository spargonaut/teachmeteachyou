var form = require('./form.js');
var workshop = require('./workshop.js');
var workshop_details = require('./workshop_details_page.js');

load_page = function () {

    var body = document.getElementsByTagName('body')[0];
    document.body.innerHTML = "";

    var action = document.createElement('div');
    action.setAttribute('class', 'action');
    action.appendChild(form().show_button(document));

    var content = document.createElement('div');
    content.setAttribute('id', 'content');

    body.appendChild(action);
    body.appendChild(content);

    workshop().getAllWorkshops();
};

create_workshop = function () {
    form().create(document);
};

show_workshop_form = function () {
    form().show_form(document);
};

hide_workshop_form = function () {
    form().hide_form(document);
};

show_workshop_details = function (workshopId) {
    workshop().get_details(workshopId);
};

add_interested_person = function () {
    workshop_details().add_interest();
};

add_teacher_to_workshop = function () {
    return function (workshopId) {
        workshop_details().add_teacher(workshopId);
    };
};