const showMoreStyles = (trigger, styles) => {
    const cards = document.querySelectorAll(styles),
        btn = document.querySelector(trigger);

    cards.forEach(el => {
        el.classList.add('animated', 'fadeInUp');
    });

    btn.addEventListener('click', () => {
        cards.forEach(el => {
            el.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs');
            el.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
        });
        // btn.styles.display = 'none';
        btn.remove();
    });
}

export default showMoreStyles;