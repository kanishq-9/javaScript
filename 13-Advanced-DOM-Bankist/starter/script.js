'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const menuSelect = document.querySelector('.nav');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const sec1 = document.querySelector('#section--1');
const header = document.querySelector('.header');
const navHeight = menuSelect.getBoundingClientRect().height;
const allSection = document.querySelectorAll('.section');
const imageAll = document.querySelectorAll('img[data-src]');
const sliderr = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

const openModal = function() {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
    btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

btnScrollTo.addEventListener('click', function() {
    // const s1coords = sec1.getBoundingClientRect();
    // window.scrollTo({
    //     left: s1coords.left + window.scrollX,
    //     top: s1coords.top + window.scrollY,
    //     behavior: 'smooth',
    // });

    sec1.scrollIntoView({ behavior: 'smooth' });
});

// document.querySelectorAll('.nav__link').forEach(function(element) {
//     element.addEventListener('click', function(e) {
//         // console.log(element.href);
//         e.preventDefault();
//         const id = this.getAttribute('href');
//         console.log(id);
//         document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//     });
// });
document.querySelector('.nav__links').addEventListener('click', function(e) {
    e.preventDefault();
    if (e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
});

//tabbing

tabContainer.addEventListener('click', function(e) {
    const clicked = e.target.closest('.operations__tab');

    if (!clicked) return;
    tabs.forEach(function(ele) {
        ele.classList.remove('operations__tab--active');
    });
    clicked.classList.add('operations__tab--active');

    tabsContent.forEach(function(ele) {
        ele.classList.remove('operations__content--active');
    });

    document
        .querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList.add('operations__content--active');
});

const handleHovering = function(e) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');
        siblings.forEach(el => {
            if (el !== link) el.style.opacity = this;
        });
        logo.style.opacity = this;
    }
};

//hovering
// menuSelect.addEventListener('mouseover', handleHovering.bind(0.5));
// menuSelect.addEventListener('mouseout', handleHovering.bind(1));

// //sticky
// window.addEventListener('scroll', function(e) {
//     if (sec1.getBoundingClientRect().top < window.scrollY) {
//         menuSelect.classList.add('sticky');
//     } else {
//         menuSelect.classList.remove('sticky');
//     }
// });
const headObs = function(entries) {
    const [entry] = entries; //similar to take first value
    // console.log(entry);
    // console.log(entries);
    if (!entry.isIntersecting) menuSelect.classList.add('sticky');
    else menuSelect.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(headObs, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//reveal
const revealSection = function(entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
};
const sectionIntersection = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});

allSection.forEach(function(ele) {
    sectionIntersection.observe(ele);
    ele.classList.add('section--hidden');
});

//image easy load

const imageLazy = function(entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function() {
        entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
};
const imageObserve = new IntersectionObserver(imageLazy, {
    root: null,
    threshold: 0,
    rootMargin: '200px',
});

imageAll.forEach(ele => imageObserve.observe(ele));

//slider
let curSlide = 0;
const slideLength = sliderr.length;

sliderr.forEach(function(ele, i) {
    ele.style.transform = `translateX(${i * 100}%)`;
});
const next = function() {
    curSlide = (curSlide + 1) % slideLength;
    sliderr.forEach(function(ele, i) {
        ele.style.transform = `translateX(${(i - curSlide) * 100}%)`;
    });
    activeDots(curSlide);
};
const prev = function() {
    if (curSlide === 0) curSlide = slideLength - 1;
    else curSlide = curSlide - 1;
    sliderr.forEach(function(ele, i) {
        ele.style.transform = `translateX(${(i - curSlide) * 100}%)`;
    });
    activeDots(curSlide);
};

// setInterval(next, 5000);

btnRight.addEventListener('click', next);
btnLeft.addEventListener('click', prev);
document.addEventListener('keydown', e => {
    console.log(e);
    if (e.key === 'ArrowLeft') prev();
    else if (e.key === 'ArrowRight') next();
});

//dots

const dotContainer = document.querySelector('.dots');

const activeDots = function(slide) {
    document
        .querySelectorAll('.dots__dot')
        .forEach(dots => dots.classList.remove('dots__dot--active'));
    document
        .querySelector(`.dots__dot[data-slide="${slide}"]`)
        .classList.add('dots__dot--active');
};

const createDots = function() {
    sliderr.forEach(function(_, i) {
        dotContainer.insertAdjacentHTML(
            'beforeend',
            `<button class="dots__dot" data-slide="${i}"></button>`
        );
    });
};
const init = function() {
    createDots();
    activeDots(curSlide);
};
init();

dotContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('dots__dot')) {
        const { slide } = e.target.dataset;
        sliderr.forEach(
            (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
        );
        activeDots(slide);
    }
});