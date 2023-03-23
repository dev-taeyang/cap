/* header-banner.html */

HTMLCollection.prototype.forEach = Array.prototype.forEach;
const banner = document.querySelector(".main-header-banner");
const images = document.querySelectorAll(".main-header-banner img");
const pages = document.querySelector(".header-banner-page");
const lastImage = document.createElement("img");
const firstImage = document.createElement("img");
const next = document.querySelector(".next-button");
const prev = document.querySelector(".prev-button");
let checkArrow = false;
let count = 1;
let auto = setInterval(autoSlide, 3000);

HTMLCollection.prototype.forEach = Array.prototype.forEach;
images.forEach((img, i) => img.setAttribute('src', `../../static/images/main-header-banner0${i+1}.png`));

banner.style.transform = `translate(-768px)`;

banner.appendChild(lastImage);
lastImage.setAttribute('src', `../../static/images/main-header-banner01.png`);

banner.insertBefore(firstImage, document.querySelector(".main-header-banner img"));
firstImage.setAttribute('src', `../../static/images/main-header-banner0${images.length}.png`);

function autoSlide() {
    banner.style.transition = 'transform 0.7s';
    banner.style.transform = `translate(${-768 * ++count}px)`;
    pages.innerHTML = count == 6 ? 1 : count;
    if (count == 6) {
        count = 1;
       setTimeout(function(){
           banner.style.transition = "transform 0s";
           banner.style.transform = "translate(-768px)";
       }, 700);
    }
 };

prev.addEventListener("click", function(){
    if(checkArrow){return;}
    checkArrow = true;
    clearInterval(auto);
    banner.style.transition = "transform 0.7s";
    banner.style.transform = `translate(${-768 * --count}px)`;
    switch(count){
        case 0:
            pages.innerHTML = `${images.length }`;
            break;
        case 1: case 6:
            pages.innerHTML = 1;
            break; 
        case 2: case 3: case 4: case 5:
            pages.innerHTML = count;
            break;
    }
    if(count == 0) {
        count = 5;
        setTimeout(function(){
            banner.style.transition = "transform 0s";
            banner.style.transform = `translate(${-768 * (images.length)}px)`;
        }, 700);
    }
    auto = setInterval(autoSlide, 3000);
    setTimeout(()=>{checkArrow = false}, 700);
    console.log("큰배너 왼쪽으로 이동 : " + count);
});

next.addEventListener("click", function(){
    if(checkArrow){return;}
    checkArrow = true;
    clearInterval(auto);
    banner.style.transition = "transform 0.7s";
    banner.style.transform = `translate(${-768 * ++count}px)`;
    switch(count){
        case 0:
            pages.innerHTML = `${images.length }`;
            break;
        case 1: case 6:
            pages.innerHTML = 1;
            break; 
        case 2: case 3: case 4: case 5:
            pages.innerHTML = count;
            break;
    }
    if(count == 6) {
        count = 1;
        setTimeout(function(){
            banner.style.transition = "transform 0s";
            banner.style.transform = "translate(-768px)";
        }, 700);
    }
    auto = setInterval(autoSlide, 3000);
    setTimeout(()=>{checkArrow = false}, 700);
    console.log("큰배너 오른쪽으로 이동 : " + count);
});


