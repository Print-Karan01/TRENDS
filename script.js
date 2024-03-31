const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');
const close= document.getElementById('close');
const words = ['deals', 'cloths', 'fashion', 'offers','savings'];
let wordIndex = 0;
let textIndex = 0;
const typingDelay = 200; // Delay between typing each character
const erasingDelay = 100; // Delay between erasing each character
const newTextDelay = 2000; // Delay before typing new word


if(bar){
    bar.addEventListener('click',()=>{
        nav.classList.add('active');
    });
}
if(close){
    close.addEventListener('click',()=>{
        nav.classList.remove('active');
    });
}

function type() {
    if (textIndex < words[wordIndex].length) {
        document.getElementById('dynamicText').textContent += words[wordIndex].charAt(textIndex);
        textIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (textIndex > 0) {
        document.getElementById('dynamicText').textContent = words[wordIndex].substring(0, textIndex - 1);
        textIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, typingDelay);
    }
}

// Start the typing animation
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(type, newTextDelay);
});