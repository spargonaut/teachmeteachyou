var form = require('./form.js');
var workshop = require('./workshop.js');

load_page = function () {

    var body = document.getElementsByTagName('body')[0];
    document.body.innerHTML = "";

    body.appendChild(form.show_button(document));

    var workshops = document.createElement('div');
    workshops.setAttribute('id', 'workshops');
    body.appendChild(workshops);

    workshop.getAllWorkshops();
}

createWorkshop = function () {
    form.create(document);
}

show_workshop_form = function () {
    form.show_form(document);
}

hide_workshop_form = function () {
    form.hide_form(document);
}

show_workshop_details = function (workshopId) {
    workshop.get_details(workshopId);
}