/* header-banner.html */

HTMLCollection.prototype.forEach = Array.prototype.forEach;
const middleBanners = document.querySelector(".middle-header-banner");
const middleImage = document.querySelectorAll(".middle-header-banner img");
const middleLastImage = document.createElement("img");
const middleFirstImage = document.createElement("img");
const middleBefore = document.querySelector(".before-button");
const middleFollow = document.querySelector(".follow-button");
let middleCheckArrow = false;
let middleCount = 1;
let middleAuto = setInterval(autoSlide, 3000);

HTMLCollection.prototype.forEach = Array.prototype.forEach;
middleImage.forEach((img, i) => img.setAttribute('src', `../../static/images/middle-banner0${i+1}.png`));

middleBanners.style.transform = `translate(-768px)`;

middleBanners.appendChild(middleLastImage);
middleLastImage.setAttribute('src', `../../static/images/middle-banner01.png`);

middleBanners.insertBefore(middleFirstImage, document.querySelector(".middle-header-banner img"));
middleFirstImage.setAttribute('src', `../../static/images/middle-banner0${middleImage.length}.png`);

function autoSlide() {
    middleBanners.style.transition = 'transform 0.7s';
    middleBanners.style.transform = `translate(${-768 * ++middleCount}px)`;
    console.log(middleCount);
    if (middleCount == 6) {
        middleCount = 1;
       setTimeout(function(){
        middleBanners.style.transition = "transform 0s";
        middleBanners.style.transform = "translate(-768px)";
       }, 700);
    }
 };

 middleBefore.addEventListener("click", function(){
    if(middleCheckArrow){return;}
    middleCheckArrow = true;
    clearInterval(middleCount);
    middleBanners.style.transition = "transform 0.7s";
    middleBanners.style.transform = `translate(${-768 * --middleCount}px)`;
   
    if(middleCount == 0) {
        middleCount = 5;
        setTimeout(function(){
            middleBanners.style.transition = "transform 0s";
            middleBanners.style.transform = `translate(${-768 * (middleImage.length)}px)`;
        }, 700);
    }
    middleAuto = setInterval(autoSlide, 3000);
    setTimeout(()=>{middleCheckArrow = false}, 700);
});

middleFollow.addEventListener("click", function(){
    if(middleCheckArrow){return;}
    checkArrow = true;
    clearInterval(middleAuto);
    middleBanners.style.transition = "transform 0.7s";
    middleBanners.style.transform = `translate(${-768 * ++middleCount}px)`;
    
    if(middleCount == 6) {
        middleCount = 1;
        setTimeout(function(){
            middleBanners.style.transition = "transform 0s";
            middleBanners.style.transform = "translate(-768px)";
        }, 700);
    }
    middleAuto = setInterval(autoSlide, 3000);
    setTimeout(()=>{middleCheckArrow = false}, 700);
});


