"use strict";
/*
 * Основи подій. Створення та видалення слухачів. Об'єкт події
 * - Создание и удаление слушателей
 * - Именование колбеков для слушателей
 *    - handle*: handleSubjectEvent
 *    - *Handler: subjectEventHandler
 *    - on*: onSubjectEvent
 * - Ссылочная идентичность колбеков
 * - Объект события
 
 */
/*
const targetBtn = document.querySelector(".js-target-btn");
const addListenerBtn = document.querySelector(".js-add-listener-btn");
const removeListenerBtn = document.querySelector(".js-remove-listener-btn");

// targetBtn - это подписчик, он подписывается на событие клик
addListenerBtn.addEventListener('click', (event) => {
    console.log("add listener to target btn");
    targetBtn.addEventListener('click',
        // (event) => { console.log('click on target btn') => doesn`t work in pairs, because function - object and has same link }
        OnTargetBtnClick);
});

removeListenerBtn.addEventListener('click', (event) => {
    console.log("remove listener from target btn");
    targetBtn.removeEventListener('click',
        // (event) => {console.log('click on target btn')} => doesn`t work in pairs, because function - object and has same link
        OnTargetBtnClick);
});


// ()=> {} анонимная ф-ция, по ссылке не равны;
// function OnTargetBtnClick() => this function has same link and callback, ссылочная идентичность колбеков
// колбек сохраняем во внешней независимой ф-ции, если хотим отписаться, когда отписываться не надо  - анонимная ф-ция
// при подписке и отписке одинаковые данные - как подписывалисьб так и отписываемся
//targetBtn.addEventListener('click', OnTargetBtnClick);
// targetBtn.removeEventListener('click', OnTargetBtnClick);


function OnTargetBtnClick(event) {
    console.log("click on target btn");
}

*/

//==================================================================================================================

const targetBtn = document.querySelector(".js-target-btn");
const addListenerBtn = document.querySelector(".js-add-listener-btn");
const removeListenerBtn = document.querySelector(".js-remove-listener-btn");

// targetBtn1.addEventListener('click', (e) => {
//     console.log('event');
//     console.log('click on btn');
// });


addListenerBtn.addEventListener('click', (event) => {
    console.log(event);
    console.log('add event listener on target btn');
    targetBtn.addEventListener('click', onTargetBtnClick);
})

removeListenerBtn.addEventListener('click', (event) => {
    console.log(event);
    console.log('remove event listener from target btn');
    targetBtn.removeEventListener('click', onTargetBtnClick);
})

function onTargetBtnClick(event) {
    console.log(event);
    console.log('click on btn');
}







/*
const swapBtnRef = document.querySelector(".js-swap-btn");
const clearBtnRef = document.querySelector(".js-remove-listener");
const imgRef = document.querySelector(".js-img");

swapBtnRef.addEventListener("click", swapImage);

function swapImage(e) {
    e.currentTarget.disabled = true;

    imgRef.src = "https://picsum.photos/200/300";
    imgRef.alt = "random picture";
    imgRef.width = "500";
    imgRef.style.height = "auto";
}

clearBtnRef.addEventListener("click", clearListener);

function clearListener() {
    swapBtnRef.addEventListener("click", swapImage);
}

document.documentElement.addEventListener("keyup", keyupFun);

function keyupFun() {
    console.log("data");
}
*/