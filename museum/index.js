let items = document.querySelectorAll('.item');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
    current = (n + items.length) % items.length;
}
function PreviousItem(n) {
    hideItem('to-right');
    changeCurrentItem(n-1);
    showItem('from-left');
}
function nextItem(n) {
    hideItem('to-left');
    changeCurrentItem(n-1);
    showItem('from-right');
}
function hideItem(direction) {
    isEnabled=false;
    items[currentItem].classList.add(direction);
    items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('active', direction);
    });
}
function showItem(direction) {
    items[currentItem].classList.add('next', direction);
    items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('next', direction);
        this.classList.add('active');
        isEnabled = true;
    });
}
document.querySelector('.slider-arrow.left').addEventListener ('click', function() {
    if (isEnabled) {
        PreviousItem(currentItem);
    }
    });
document.querySelector ('.slider-arrow.right').addEventListener ('click', function() {
    if (isEnabled) {
        nextItem(currentItem);
    }
    });

const swipedetect = (el) => {
    let surface = el;
    let startX = 0;
    let startY = 0;
    let distX = 0;
    let distY = 0;
    let startTime = 0;
    let elapsedTime = 0;
    let threshold = 150;
    let restraint = 100;
    let allowedTime = 300;

    surface.addEventListener('mousedown', function(e) {
        dist = 0;
        startX = e.pageX;
        startY = e.pageY;
        startTime = new Date().getTime();
        e.preventDefault();    
    });
    surface.addEventListener('mouseup', function(e) {
        distX = e.pageX-startX;
        distY = e.pageY-startY;
        elapsedTime = new Date().getTime()-startTime;
          if(elapsedTime <= allowedTime){            
            if(Math.abs(distX) >= threshold && Math.abs(distY) <=restraint){
                if ((distX > 0)) {
                    if (isEnabled) {
                        PreviousItem(currentItem);
                    }
                } else {
                    if (isEnabled) {
                        nextItemItem(currentItem);
                    }
                }
            }
          }
          e.preventDefault();
    }, false);    
}
let el = document.querySelector('.welc-slider');
swipedetect(el);
surface.addEventListener('touchstart', function(e){
		if (e.target.classList.contains('slider-arrow')) {
        if (e.target.classList.contains('left')) {
            if (isEnabled) {
                PreviousItem(currentItem);
            }
        } else if (e.target.classList.contains('right')) {
            if (isEnabled) {
                nextItem(currentItem);
            }
        }
    }
    let touchObj = e.changedTouches[0];
    startX = touchObj.pageX;
    startY = touchObj.pageY;
    startTime = new Date().getTime();
    e.preventDefault();
});
surface.addEventListener('touchend', function(e) {
    let touchObj = e.changedTouches[0];
    distX = touchObj.pageX-startX;
    disty = touchObj.pageY-startY;
    elapsedTime = new Date().getTime()-startTime;
    e.preventDefault();
});
surface.addEventListener('touchmove', function(e) {
    e.preventDefault();
});


swipedetect(el);

