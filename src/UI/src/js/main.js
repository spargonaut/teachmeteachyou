var workshop = require('./workshop.js');

load_page = function () {
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(workshop.show_form(document));

    var workshops = document.createElement('div');
    workshops.setAttribute('id', 'workshops');
    body.appendChild(workshops);
}

createWorkshop = function () {
    workshop.newWorkshop(document);
}