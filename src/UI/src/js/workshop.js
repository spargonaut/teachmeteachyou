var jquery = require('jquery');
var workshop_details_page = require('./workshop_details_page.js');

var workshop = function () {
    return {
        getAllWorkshops : function () {
            var self = this;
            var workshopLoader = function (data) {
                return self.displayWorkshops(data);
            };

            jquery.ajax({
                method: "GET",
                url: 'http://localhost:8080/api/workshops'
            }).done(workshopLoader);
        },

        displayWorkshops : function (data) {
                var newSpan = function (className, content) {
                    var element = document.createElement('span');
                    element.setAttribute('class', className);
                    element.textContent = content;
                    return element;
                };

                var workshops  = document.createElement('div');
                workshops.setAttribute('id', 'workshops');

                for (var i = 0; i < data.workshops.length; i++) {
                    var workshop = document.createElement('div');
                    workshop.classList.add('workshop');
                    var show_workshop_function = 'show_workshop_details("' + data.workshops[i].id + '")';
                    workshop.setAttribute('onClick', show_workshop_function);

                    workshop.appendChild(newSpan('name_display', data.workshops[i].name));
                    var spacer = document.createElement('span');
                    spacer.textContent = "wants to learn";
                    workshop.appendChild(spacer);
                    workshop.appendChild(newSpan('workshop_title', data.workshops[i].title));

                    workshops.appendChild(workshop);
                }
                jquery('#workshops').replaceWith(workshops);
        },

        get_details : function (workshopId) {
            var details = workshop_details_page();
            jquery.ajax({
                method: "GET",
                url: 'http://localhost:8080/api/workshops/' + workshopId
            }).done(details.show);
        }
    };
};
module.exports = workshop;