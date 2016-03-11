var jquery = require('jquery');

var workshop = {
    getAllWorkshops : function () {
        var workshopLoader = this.displayWorkshops();
        jquery.ajax({
            method: "GET",
            url: 'http://localhost:8080/api/workshops'
        }).done(workshopLoader);
    },

    displayWorkshops : function () {
        return function (data) {
            console.log("sample of data: ", data);

            var newSpan = function (className, content) {
                var element = document.createElement('span');
                element.setAttribute('class', className);
                element.textContent = content;
                return element;
            }

            var workshops  = document.createElement('div');
            workshops.setAttribute('id', 'workshops');

            for (var i = 0; i < data.workshops.length; i++) {
                console.log('building workshop');
                var workshop = document.createElement('div');
                workshop.classList.add('workshop');

                workshop.appendChild(newSpan('name_display', data.workshops[i].name));
                workshop.appendChild(newSpan('workshop_title', data.workshops[i].title));
                workshop.appendChild(document.createElement('br'));
                workshop.appendChild(newSpan('workshop_details', data.workshops[i].details));

                workshops.appendChild(workshop);
            }
            jquery('#workshops').replaceWith(workshops);
        };
    }
}
module.exports = workshop;