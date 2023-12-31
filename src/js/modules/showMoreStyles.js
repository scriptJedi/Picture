import {getResource} from "../services/requests";

const showMoreStyles = (trigger, wrapper) => {
    const btn = document.querySelector(trigger),
        url = 'assets/db.json';

    btn.addEventListener('click', function() {
        getResource(url)
            .then(res => createCards(res.styles))
            .catch(err => console.log(err));

        this.remove();
    });

    function createCards(response) {
        response.forEach(({src, title, link}) => {
            let card = document.createElement('div');
            card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
            card.innerHTML = `
             <div class="styles-block">
                 <img alt="" src="${src}"/>
                 <h4>${title}</h4>
                 <a href="${link}">Докладніше</a>
             </div>
            `;

            document.querySelector(wrapper).append(card);
        });
    }
}

export default showMoreStyles;