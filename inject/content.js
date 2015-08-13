var sloth;
var spinner;
var fallingDollar;
var spinners = [];
var dollars = [];
var numberOfDollars = 100;
var numberOfSpinners = 50;

var randomNumberUpTo = function(max){
    return Math.floor((Math.random() * max) + 1);
}

var createSloth = function() {
    sloth = document.createElement('img');
    sloth.setAttribute('src', chrome.extension.getURL("inject/assets/sloth.png"));
    sloth.setAttribute('class', 'grio-blog-sloth');
    sloth.style.width = '30%';
    sloth.style.position = 'fixed';
    sloth.style.bottom = '0';
    sloth.style.right = '0';
    sloth.style.zIndex = 300;
};

var createFallingDollar = function() {
    fallingDollar = document.createElement('img');
    fallingDollar.setAttribute('src', chrome.extension.getURL("inject/assets/onedollar.gif"));
    fallingDollar.setAttribute('class', 'grio-blog-falling-dollar');
    fallingDollar.style.position = 'fixed';
    fallingDollar.style.zIndex = 290;
};

var createSpinner = function() {
    spinner = document.createElement('img');
    spinner.setAttribute('src', chrome.extension.getURL("inject/assets/dollar.gif"));
    spinner.setAttribute('class', 'grio-blog-spinner');
    spinner.style.position = 'fixed';
    spinner.style.zIndex = 280;
};

var cloneDollars = function() {
    var clone;
    for(var i = 0; i < numberOfDollars; i++){
        clone = fallingDollar.cloneNode(false);
        clone.style.width = randomNumberUpTo(10) + '%';
        clone.style.top = randomNumberUpTo(100) + '%';
        clone.style.left = randomNumberUpTo(100) + '%';
        var rotation = randomNumberUpTo(360)
        clone.style['-webkit-transform'] = 'rotate(' + rotation + 'deg)';
        dollars.push(clone);
    }
};

var cloneSpinners = function() {
    var clone;
    for(var i = 0; i < numberOfSpinners; i++){
        clone = spinner.cloneNode(true);
        clone.style.width = randomNumberUpTo(10) + '%';
        clone.style.top = randomNumberUpTo(100) + '%';
        clone.style.left = randomNumberUpTo(100) + '%';
        spinners.push(clone);
    }
};

var appendElements = function() {
    var body = document.childNodes[1];

    body.appendChild(sloth);
    sloth = document.getElementsByClassName('grio-blog-sloth');

    for (var i = 0; i < spinners.length; i++){
        body.appendChild(spinners[i])
    }
    spinners = document.getElementsByClassName('grio-blog-spinner');

    for (var i = 0; i < dollars.length; i++){
        var speed = randomNumberUpTo(10);
        body.appendChild(dollars[i])
        animate(dollars[i], speed);
    }
    dollars = document.getElementsByClassName('grio-blog-falling-dollar');

    setTimeout(function(){
        removeElements(dollars);
        removeElements(spinners);
        removeElements(sloth);
    }, 10000)
};

var animate = function(element, speed){
    setInterval(function(){
        element.style.top = element.offsetTop + speed + 'px';
        if (element.offsetTop > window.screen.height) {
            element.style.top = "-" + element.offsetHeight + 'px'
        }
    }, 20)
};

var removeElements = function(htmlCollection){
     while(htmlCollection.length > 0){
         htmlCollection[0].parentNode.removeChild(htmlCollection[0]);
     }
}

createSloth();
createFallingDollar();
createSpinner()
cloneDollars();
cloneSpinners();
appendElements();