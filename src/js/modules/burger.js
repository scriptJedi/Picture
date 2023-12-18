const burger = (menuSelector, burgerSelector) => {
    const menuEl = document.querySelector(menuSelector),
        burgerEl = document.querySelector(burgerSelector);

    menuEl.style.display = 'none';

    burgerEl.addEventListener('click', () => {
        console.log('click');
        if (menuEl.style.display === 'none' && window.screen.availWidth <= 991.98) {
            menuEl.style.display = 'block';
        } else {
            menuEl.style.display = 'none';
        }
    });

    window.addEventListener('resize', () => {
       if (window.screen.availWidth > 991.98) {
           menuEl.style.display = 'none';
       }
    });
}

export default burger;