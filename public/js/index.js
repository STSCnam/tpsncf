'use strict'

import {HTTP} from './lib/HTTP.js';

window.onload = () => {
    let activities = document.querySelector('select[name="activities"]');

    // Listening change event to the activities selector
    activities.addEventListener('change', displayFormations);

    /**
     * Processes the "change" event of the activity selector
     * 
     * This function reads the selected activity, 
     * retrieves the associated formations, 
     * and then creates a list of radio buttons.
     * 
     * @param {object} e An Event object
     * 
     * @return {void}
     */
    function displayFormations(e) {
        // Retrieves the formations
        HTTP.get(`/formations/${e.target.value}`, (err, res) => {
            if (err) throw err;

            let formations = document.querySelector('.formations');
            
            // Reset the formations list
            formations.innerHTML = null;

            // Hydrate the formations list
            for (let row of res) {
                let radioBox = document.createElement('div');
                let radio = document.createElement('input');
                let label = document.createElement('label');

                radioBox.classList.add('radio-box');

                radio.setAttribute('type', 'radio');
                radio.setAttribute('name', 'formations');
                radio.setAttribute('value', row.code);
                radio.id = row.code;

                label.setAttribute('for', row.code);
                label.textContent = row.intitule;

                radioBox.appendChild(radio);
                radioBox.appendChild(label);
                formations.appendChild(radioBox);

                // Listening click event on the radio buttons
                radio.addEventListener('click', displayRegistered);
            }
        });
    }

    /**
     * Handles the click event of the radio buttons
     * 
     * This function reads the selected formation, 
     * retrieves the bookings for this formation, 
     * and then creates a table of the registered agents.
     * 
     * @param {object} e An Event object
     * 
     * @return {void}
     */
    function displayRegistered(e) {
        let table = document.querySelector('.table');
        let thead = table.querySelector('thead');
        let tbody = table.querySelector('tbody');

        // Retrieves registrations
        HTTP.get(`/registered/${e.target.value}`, (err, res) => {
            if (err) throw err;

            // Reset the table
            thead.innerHTML = null;
            tbody.innerHTML = null;

            if (res.length) { // Create the table if registration retrieved
                let tr = document.createElement('tr');
                
                // Add the checkbox button
                for (let row of res) {
                    row.agent = `<input type="checkbox" name="agents" value="${row.code}">`
                }

                // Create the table header
                for (let title of Object.keys(res[0])) {
                    let th = document.createElement('th');
                    th.textContent = title.toUpperCase();
                    tr.appendChild(th);
                }

                thead.appendChild(tr);

                // Hydrate the table body
                for (let row of res) {
                    tr = document.createElement('tr');

                    for (let key in row) {
                        let td = document.createElement('td');
                        td.innerHTML = row[key];
                        tr.appendChild(td);
                    }

                    tbody.appendChild(tr);
                }
            } else { // Display a message if any registration retrieved
                let p = document.createElement('p')
                p.textContent = 'Aucune inscription pour cette formation ...'
                tbody.appendChild(p)
            }
        });
    } 
}