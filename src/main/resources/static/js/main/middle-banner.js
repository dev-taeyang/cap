/* header-banner.html */

HTMLCollection.prototype.forEach = Array.prototype.forEach;
const banners = document.querySelector(".middle-header-banner");
const image = document.querySelectorAll(".middle-header-banner img");
const lastImage = document.createElement("img");
const firstImage = document.createElement("img");
const before = document.querySelector(".before-button");
const follow = document.querySelector(".follow-button");
let checkArrow = false;
let count = 1;
let auto = setInterval(autoSlide, 3000);

HTMLCollection.prototype.forEach = Array.prototype.forEach;
image.forEach((img, i) => img.setAttribute('src', `../../static/images/middle-banner0${i+1}.png`));

banners.style.transform = `translate(-768px)`;

banners.appendChild(lastImage);
lastImage.setAttribute('src', `../../static/images/middle-banner01.png`);

banners.insertBefore(firstImage, document.querySelector(".middle-header-banner img"));
firstImage.setAttribute('src', `../../static/images/middle-banner0${image.length}.png`);

function autoSlide() {
    banners.style.transition = 'transform 0.7s';
    banners.style.transform = `translate(${-768 * ++count}px)`;
    console.log(count);
    if (count == 6) {
        count = 1;
       setTimeout(function(){
            banners.style.transition = "transform 0s";
            banners.style.transform = "translate(-768px)";
       }, 700);
    }
 };

 before.addEventListener("click", function(){
    if(checkArrow){return;}
    checkArrow = true;
    clearInterval(auto);
    banners.style.transition = "transform 0.7s";
    banners.style.transform = `translate(${-768 * --count}px)`;
   
    if(count == 0) {
        count = 5;
        setTimeout(function(){
            banners.style.transition = "transform 0s";
            banners.style.transform = `translate(${-768 * (image.length)}px)`;
        }, 700);
    }
    auto = setInterval(autoSlide, 3000);
    setTimeout(()=>{checkArrow = false}, 700);
});

follow.addEventListener("click", function(){
    if(checkArrow){return;}
    checkArrow = true;
    clearInterval(auto);
    banners.style.transition = "transform 0.7s";
    banners.style.transform = `translate(${-768 * ++count}px)`;
    
    if(count == 6) {
        count = 1;
        setTimeout(function(){
            banners.style.transition = "transform 0s";
            banners.style.transform = "translate(-768px)";
        }, 700);
    }
    auto = setInterval(autoSlide, 3000);
    setTimeout(()=>{checkArrow = false}, 700);
});


