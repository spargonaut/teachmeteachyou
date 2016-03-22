var workshop_details_page = {
    show : function () {
        return function (data) {
            var details = document.createElement('div');
            details.setAttribute('id', 'workshop_details');

            var workshop_name = document.createElement('div');
            workshop_name.setAttribute('id', 'workshop_details_name');
            workshop_name.textContent = data.name;
            details.appendChild(workshop_name);

            var workshop_title = document.createElement('div');
            workshop_title.setAttribute('id', 'workshop_details_title');
            workshop_title.textContent = data.title;
            details.appendChild(workshop_title);

            var workshop_details = document.createElement('div');
            workshop_details.setAttribute('id', 'workshop_details_details');
            workshop_details.textContent = data.details
            details.appendChild(workshop_details);

            var body = document.getElementsByTagName('body')[0];
            while (body.firstChild) {
                body.removeChild(body.firstChild);
            }

            body.appendChild(details);
        };
    }
};

module.exports = workshop_details_page;