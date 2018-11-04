'use strict'

import {HTTP} from './lib/HTTP.js';

window.onload = () => {
    let activities = document.querySelector('select[name="activities"]');

    activities.addEventListener('change', displayFormations);

    function displayFormations(e) {
        HTTP.get(`/formations/${e.target.value}`, (err, res) => {
            if (err) throw err;

            let formations = document.querySelector('.formations');
            
            formations.innerHTML = null;

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

                radio.addEventListener('click', displayRegistered);
            }
        });
    }

    function displayRegistered(e) {
        let table = document.querySelector('.table');
        let thead = table.querySelector('thead');
        let tbody = table.querySelector('tbody');

        HTTP.get(`/registered/${e.target.value}`, (err, res) => {
            if (err) throw err;

            thead.innerHTML = null;
            tbody.innerHTML = null;

            if (res.length) {
                let tr = document.createElement('tr');
                
                for (let row of res) {
                    row.agent = `<input type="checkbox" name="agents" value="${row.code}">`
                }

                for (let title of Object.keys(res[0])) {
                    let th = document.createElement('th');
                    th.textContent = title.toUpperCase();
                    tr.appendChild(th);
                }

                thead.appendChild(tr);

                for (let row of res) {
                    tr = document.createElement('tr');

                    for (let key in row) {
                        let td = document.createElement('td');
                        td.innerHTML = row[key];
                        tr.appendChild(td);
                    }

                    tbody.appendChild(tr);
                }
            } else {
                let p = document.createElement('p')
                p.textContent = 'Aucune inscription pour cette formation ...'
                tbody.appendChild(p)
            }
        });
    } 
}