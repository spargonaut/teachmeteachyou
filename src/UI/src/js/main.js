var form = require('./form.js');
var workshop = require('./workshop.js');

load_page = function () {
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(form.show(document));

    var workshops = document.createElement('div');
    workshops.setAttribute('id', 'workshops');
    body.appendChild(workshops);

    workshop.getAllWorkshops();
}

createWorkshop = function () {
    form.create(document);
}