const modals = () => {
    let btnPressed = false;

    function bindModal(
        triggerSelector,
        modalSelector,
        closeSelector,
        destroy = false,
    ) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = modal.querySelector(closeSelector),
            windows = document.querySelectorAll("[data-modal]"),
            scroll = calcScroll();

        trigger.forEach((item) => {
            item.addEventListener("click", (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                if (destroy) {
                    item.remove();
                }

                btnPressed = true;

                windows.forEach((item) => {
                    item.style.display = "none";
                    item.classList.add('animated', 'fadeIn');
                });

                modal.style.display = "block";
                document.body.classList.add("modal-open");
                document.body.style.marginRight = `${scroll}px`;
            });
        });

        close.addEventListener("click", () => {
            windows.forEach((item) => {
                item.style.display = "none";
            });
            modal.style.display = "none";
            document.body.classList.remove("modal-open");
            document.body.style.marginRight = `0px`;
        });

        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                windows.forEach((item) => {
                    item.style.display = "none";
                });
                modal.style.display = "none";
                document.body.classList.remove("modal-open");
                document.body.style.marginRight = `0px`;
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(() => {
            let display;

            document.querySelectorAll("[data-modal]").forEach(el => {
                if (getComputedStyle(el).display !== 'none') {
                    display = 'block';
                }

                if (!display) {
                    document.querySelector(selector).style.display = "block";
                    document.body.classList.add("modal-open");
                    let scroll = calcScroll();
                }
            })
        }, time);
    }

    function calcScroll() {
        let div = document.createElement("div");
        div.style.width = "50px";
        div.style.height = "50px";
        div.style.overflowY = "scroll";
        div.style.visibility = "hidden";
        document.body.append(div);

        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
            if (!btnPressed && (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight)) {
                document.querySelector(selector).click();
            }
        })
    }

    bindModal(".button-design", ".popup-design", ".popup-close");
    bindModal(".button-consultation", ".popup-consultation", ".popup-close");
    bindModal(".fixed-gift", ".popup-gift", ".popup-close", true);

    openByScroll('.fixed-gift');
    // showModalByTime(".popup-consultation", 60000);
};

export default modals;