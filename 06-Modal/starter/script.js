'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModel = document.querySelector('.close-modal');
const btnOpenModel = document.querySelectorAll('.show-modal');

for (let i = 0; i < btnOpenModel.length; i++) {
    btnOpenModel[i].addEventListener('click', () => {
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
    });
}

const model_func = () => {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

//we gave model_func and not model_func() because we need model_func to be called only when click is executed
//for other it gets executed as soon as js runs the below line and not when click is encountered
btnCloseModel.addEventListener('click', model_func);
overlay.addEventListener('click', model_func);

//close with 'Esc'
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) model_func();
    else alert('model is already hidden');
});