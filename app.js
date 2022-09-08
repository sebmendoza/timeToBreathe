// Access all of our required elements through the DOM
const circleProgress = document.querySelector('.circle-progress');
const start = document.querySelector('.start');
const instructions = document.querySelector('.instructions')
const breathsText = document.querySelector('.breaths-text')
const threeBreaths = document.querySelector('.breaths3');
const fiveBreaths = document.querySelector('.breaths5');
const tenBreaths = document.querySelector('.breaths10');
const breathePattern0 = document.querySelector('.pattern0');
const breathePattern1 = document.querySelector('.pattern1');
const breathePattern2 = document.querySelector('.pattern2');
const proverb = document.querySelector('.proverb');


// Initalize variables 
let breathsLeft = 3;
let inhale = 4000;
let hold = 4000;
let exhale = 4000;
let totalTime = 12000;
const buttons = [ threeBreaths, fiveBreaths, tenBreaths]
const patternsofBreathe = [ breathePattern0, breathePattern1, breathePattern2]


const allBreaths = {
    option1: 3,
    option2: 5,
    option3: 10
}


const allproverbs = [
    "\"For God gave us a spirit not of fear but of power and love and self-control.\" ~ 2 Timothy 1:7",
    "\"Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own.' ~ Matthew 6:34\"",
    "\"Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God.\" ~ Philippians 4:6",
    "\"I can do all this through him who gives me strength.\" ~ Philippians 4:13"
];


const allPatterns = [
    {
        in: 4000,
        hold: 4000,
        out: 4000,
        transition: 'all 2s ease',
        selector: breathePattern0
    },
    {
        in: 5000,
        hold: 5000,
        out: 5000,
        transition: 'all 4s ease',
        selector: breathePattern1
    },
    {
        in: 4000,
        hold: 7000,
        out: 8000,
        transition: 'all 8s ease',
        selector: breathePattern2
    }
];


// If a button is selected, it will be 'on' changing it's backround colour
// so it's unique from the others in it's group
const selectedButton = ( group, target) => {
    for (i in group) { 
        if (i == target) {
            group[i].classList.remove('off')
            group[i].classList.add('on')
        } else {
            group[i].classList.add('off')
            group[i].classList.remove('on')
        }
    }
}


// This updates the patterns settings. This should be
// called when a user clicks on on of these buttons
const setPatternStats = (index) => {
    inhale = allPatterns[index].in;
    hold = allPatterns[index].hold;
    exhale = allPatterns[index].out;
    totalTime = inhale + hold + exhale;
    circleProgress.style.transition = allPatterns[index].transition;
};


// Listen for clicks on the buttons and update the settings
// I have to use this longer format so selectedButtons can work properly
threeBreaths.addEventListener('click', () => {
    breathsLeft = allBreaths.option1;
    breathsText.innerText = breathsLeft;
    selectedButton(buttons, 0);
})
fiveBreaths.addEventListener('click', () => {
    breathsLeft = allBreaths.option2;
    breathsText.innerText = breathsLeft;
    selectedButton(buttons, 1);
})
tenBreaths.addEventListener('click', () => {
    breathsLeft = allBreaths.option3;
    breathsText.innerText = breathsLeft;
    selectedButton(buttons, 2)
})
breathePattern0.addEventListener('click', () => {
    setPatternStats(0)
    selectedButton(patternsofBreathe, 0)
});
breathePattern1.addEventListener('click', () => {
    setPatternStats(1)
    selectedButton(patternsofBreathe, 1)
});
breathePattern2.addEventListener('click', () => {
    setPatternStats(2)
    selectedButton(patternsofBreathe, 2)
});


// Grow/shrink circle by adding/removing classes and utilizing transitions
const growCircle = () => {
    circleProgress.classList.add('circle-grow')
    setTimeout( () => {
        circleProgress.classList.remove('circle-grow')
    }, inhale + hold)
};

// test test
// Update the breathing instructions as the breathing application runs
const breatheTextUpdate = () => {
    breathsLeft -= 1;
    breathsText.innerText = breathsLeft;

    instructions.innerText = `breathe in`;
    setTimeout(() => {
        instructions.innerText = `hold breath`;
        setTimeout(() => {
            instructions.innerText = `exhale slowly`;
        }, hold)
    }, inhale)
}


// Breathing app function
// Allows the app to continously run and will reset the necesssarily things when it's complete
const breathingApp = () => {
    const continuousBreathingAnimation = setInterval( () => {
        // check if breathing is over
        if (breathsLeft == 0) {
            clearInterval(continuousBreathingAnimation);
            instructions.innerText = "breathing session complete. \n select your prefered top buttons and click begin to start again.";
            proverb.style.opacity = '.9'    
            start.classList.remove('start-button-inactive')
            for (button of buttons) { button.classList.remove('nav-button-inactive') }
            for (pattern of patternsofBreathe) {pattern.classList.remove('nav-button-inactive')}

            setTimeout( () => {
                threeBreaths.click();
                breathePattern0.click();
            }, 1500)
            
            return;
        }
    growCircle();
    breatheTextUpdate();
    }, totalTime)
};


// Listens for the start button to be clicked and starts the countdown and selects a random proverb.
// Then it runs the breathing app and the first iteration of growCircle and breatheTextUpdate

start.addEventListener('click', () => {
    proverb.style.opacity = '0';
    setTimeout(() => {
        let randomNum = Math.floor(Math.random() * 4);
        if (randomNum === 4) {randomNum -= 1}
        console.log(randomNum)
        proverb.innerText = allproverbs[randomNum];
    },8000)
   

    start.classList.add('start-button-inactive')
    for (button of buttons) { button.classList.add('nav-button-inactive') }
    for (pattern of patternsofBreathe) {pattern.classList.add('nav-button-inactive')}

    let seconds = 5;
    const countdown = setInterval( () => {
        instructions.innerText = `about to begin in: ${seconds}`;
        seconds -= 1;
        if (seconds === 0){
            clearInterval(countdown);
        }
    }, 1000)

    setTimeout( () => {
        breathingApp();
        growCircle();
        breatheTextUpdate();
    }, 6000)
});
