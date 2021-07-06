document.addEventListener('DOMContentLoaded', () => {
    let orderButton = document.querySelector('.order-button')
    let outline = document.querySelector('.order-button__outline')
    let crd = outline.getBoundingClientRect();
    orderButton.addEventListener('mouseenter', e => {
        outline.style.width = '150%';
        outline.style.height = '150%';

        orderButton.addEventListener('mousemove', onMouseMove, false);

    })
    function onMouseMove(event) {
        let mouseX = event.clientX;
        let mouseY = event.clientY;
        let activePointer = crd.left <= mouseX && mouseX <= crd.right && crd.top <= mouseY && mouseY <= crd.bottom;
        let h = orderButton.getBoundingClientRect().height / 2
        requestAnimationFrame(function movePointer() {
            if (activePointer) {

                orderButton.style.left = mouseX + 'px';
                orderButton.style.top = mouseY - h + 'px';

            }
        });

    }
    function disablePointer() {
        orderButton.style.left = "50%";
        orderButton.style.top = "";
        outline.style.width = '100%';
        outline.style.height = '100%';


    }

    orderButton.addEventListener('mouseleave', disablePointer, false);

    let close = document.querySelector('.header-menubutton')
    let navbar = document.querySelector('.navbar')
    close.addEventListener('click', () => {
        close.classList.toggle('open')
        navbar.classList.toggle('open')
    })

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: 'header',
            /* markers: true, */
            start: "bottom bottom",
            toggleActions: "play none none reverse",
        }
    })
    ScrollTrigger.matchMedia({

        "(min-width: 460px)": function () {
            tl.to(".order-button", { width: 165, height: 165, bottom: -50 })
        },
        "(max-width: 460px)": function () {
            tl.to(".order-button", { width: 110, height: 110, bottom: -50 })
        },
    });



    //--------------------------------------------------------
    let sliderButtons = document.querySelectorAll('.slider-img__button ')


    let tl1 = gsap.timeline({
        scrollTrigger: {
            trigger: '.slide',
            /*   markers: true,  */
            end: "bottom bottom ",
            start: "bottom bottom ",
            toggleActions: "play none none reverse",
        }
    })
    tl1.to(".order-button", { scale: .01, bottom: "-100px" })
    tl1.to(".slider-header", { top: "-10px", opacity: 0, delay: -.5 })
    tl1.to(".slider-img", { bottom: 0 })
    tl1.to(".slider-menu", { width: "100%", duration: 1 })
    sliderButtons.forEach(el => {
        tl1.to(el, { duration: .1, opacity: 1, scale: 1 })
    })

    //--------------------------------------------------------
    let t2 = gsap.timeline({
        scrollTrigger: {
            trigger: '.header-top',
            /*   markers: true, */
            start: "bottom bottom",
            end: "bottom bottom ",
            toggleActions: "play none none reverse",
        }
    })

    t2.to(".header-top", {
        position: "fixed",
        background: "#fff",
        animation: "0.3s linear sticky",
        duration: 0.1,
        boxShadow: "0px 2px 14px rgba(0, 0, 0, 0.07)"

    })


})

//--------------------------------------------------------
let t3 = gsap.timeline()


let sliderLinks = document.querySelectorAll('.slider-menu__links')
let sliders = document.querySelectorAll('.slider-img__item')
let buttonsSecond = document.querySelectorAll('.slider-img__secondbutton ')
t3.to('.slider-img__item.slider', { x: "100%", });
t3.to('.linkActive', { 'font-style': 'italic', opacity: 1, });
t3.to('.linkActive>.slider-menu__links--arrow', { opacity: 1, scale: 1, width: 50 });
let buttons = document.querySelectorAll('.button ')
buttons.forEach(el => {
    el.addEventListener('click', (e) => {
        buttons.forEach(el => {
            el.classList.remove('active')
        })
        e.target.closest('.button').classList.add('active')

    })

})
sliderLinks.forEach(el => {
    el.addEventListener('click', (e) => {
        t3.to('.slider-menu__links--arrow', { opacity: 0, scale: 0, width: 0 });

        if (e.target.closest('.slider-menu__links').dataset.id == '2') {
            t3.to('.slider-img__item.slider', { x: "0", delay: .5 });
            buttonsSecond.forEach(el => {
                t3.to(el, { opacity: 1, scale: 1, duration: .1 });
            })


        } else {
            t3.to('.slider-img__item.slider', { x: "100%", });
        }
        sliderLinks.forEach(el => {
            el.classList.remove('linkActive')

        })

        e.target.closest('.slider-menu__links').classList.add('linkActive')
        t3.to('.linkActive', { 'font-style': 'italic', opacity: 1, duration: .1, delay: -2 });
        t3.to('.linkActive>.slider-menu__links--arrow', { opacity: 1, scale: 1, width: 50, duration: .3, delay: -.5 });

    });


});