var workshop_details = {
    show : function (doc) {

        var details = doc.createElement('div');
        details.setAttribute('id', 'workshop_details');

        var body = doc.getElementsByTagName('body')[0];
        while (body.firstChild) {
            body.removeChild(body.firstChild);
        }

        body.appendChild(details);
    }
};

module.exports = workshop_details;