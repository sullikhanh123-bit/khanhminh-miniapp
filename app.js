/* ==========================================
REWARD LAND
APP.JS - PART 1
CORE SYSTEM
========================================== */


/* ==========================================
TELEGRAM MINI APP
========================================== */

const tg = window.Telegram.WebApp;

if(tg){

    tg.ready();

    tg.expand();

}



/* ==========================================
USER SYSTEM
========================================== */

const usernameElement = document.getElementById("username");


function loadTelegramUser(){

    if(
        tg &&
        tg.initDataUnsafe &&
        tg.initDataUnsafe.user
    ){

        const user = tg.initDataUnsafe.user;


        usernameElement.innerText =
        user.first_name || "Reward User";


    }

}


loadTelegramUser();




/* ==========================================
LOCAL STORAGE DATA
========================================== */


let userData = {


    balance:0,

    totalReward:0,

    activities:0,

    level:1,

    lastDaily:null,


};



function loadData(){


    const saved =
    localStorage.getItem("rewardLandData");


    if(saved){

        userData =
        JSON.parse(saved);

    }


}



function saveData(){

    localStorage.setItem(
        "rewardLandData",
        JSON.stringify(userData)
    );

}



loadData();




/* ==========================================
UPDATE UI
========================================== */


function updateUI(){


    document.getElementById(
        "rewardBalance"
    ).innerText =
    userData.balance;



    document.getElementById(
        "rewardBalanceLarge"
    ).innerText =
    userData.balance;



    document.getElementById(
        "rewardTotal"
    ).innerText =
    userData.totalReward;



    document.getElementById(
        "activityTotal"
    ).innerText =
    userData.activities;



    document.getElementById(
        "rewardLevel"
    ).innerText =
    userData.level;



}


updateUI();




/* ==========================================
SCREEN SYSTEM
========================================== */


const screens = document.querySelectorAll(
    ".screen"
);



function showScreen(id){


    screens.forEach(screen=>{


        screen.classList.remove(
            "active"
        );


    });



    document
    .getElementById(id)
    .classList.add("active");



    window.scrollTo({

        top:0,

        behavior:"smooth"

    });


}





/* ==========================================
HOME BUTTONS
========================================== */


document
.getElementById("btnReward")
.onclick = ()=>{

    showScreen(
        "rewardScreen"
    );

};



document
.getElementById("btnBox")
.onclick = ()=>{

    showScreen(
        "boxScreen"
    );

};



document
.getElementById("btnDaily")
.onclick = ()=>{

    showScreen(
        "dailyScreen"
    );

};



document
.getElementById("btnOffer")
.onclick = ()=>{

    showScreen(
        "offerScreen"
    );

};



document
.getElementById("btnProgress")
.onclick = ()=>{

    showScreen(
        "progressScreen"
    );

};





/* ==========================================
BACK BUTTONS
========================================== */


document
.getElementById("backHome1")
.onclick = ()=>{

    showScreen(
        "homeScreen"
    );

};


document
.getElementById("backHome2")
.onclick = ()=>{

    showScreen(
        "homeScreen"
    );

};


document
.getElementById("backHome3")
.onclick = ()=>{

    showScreen(
        "homeScreen"
    );

};


document
.getElementById("backHome4")
.onclick = ()=>{

    showScreen(
        "homeScreen"
    );

};


document
.getElementById("backHome5")
.onclick = ()=>{

    showScreen(
        "homeScreen"
    );

};





/* ==========================================
POPUP SYSTEM
========================================== */


const popup =
document.getElementById(
    "rewardPopup"
);


const popupTitle =
document.getElementById(
    "popupTitle"
);


const popupMessage =
document.getElementById(
    "popupMessage"
);



function openPopup(
    title,
    message
){


    popupTitle.innerText =
    title;


    popupMessage.innerText =
    message;



    popup.style.display =
    "flex";


}



function closePopup(){


    popup.style.display =
    "none";


}



document
.getElementById("popupButton")
.onclick =
()=>{

    closePopup();

};




/* ==========================================
INITIALIZE
========================================== */


console.log(
    "Reward Land Loaded 🚀"
);
/* ==========================================
REWARD LAND
APP.JS - PART 2
REWARD LOGIC
========================================== */



/* ==========================================
ADD REWARD SYSTEM
========================================== */


function addReward(amount){


    userData.balance += amount;


    userData.totalReward += amount;


    userData.activities++;



    checkLevel();



    saveData();


    updateUI();


}





/* ==========================================
LEVEL SYSTEM
========================================== */


function checkLevel(){


    let newLevel =
    Math.floor(
        userData.activities / 5
    ) + 1;



    userData.level =
    newLevel;


}




/* ==========================================
FREE REWARD
========================================== */


let firstRewardClaimed =
localStorage.getItem(
    "firstRewardClaimed"
);



document
.getElementById("claimReward")
.onclick = ()=>{


    if(!firstRewardClaimed){


        addReward(10);



        localStorage.setItem(
            "firstRewardClaimed",
            "true"
        );



        openPopup(

            "🎉 Reward Claimed",

            "+10 coins added to your balance"

        );


    }

    else{


        openPopup(

            "🔒 Locked",

            "Complete a sponsored activity to unlock more rewards."

        );


    }



};






/* ==========================================
REWARD BOX
========================================== */


document
.getElementById("openRewardBox")
.onclick = ()=>{


    const rewards = [

        5,

        10,

        20,

        50,

        100

    ];



    const randomReward =
    rewards[
        Math.floor(
            Math.random()
            *
            rewards.length
        )
    ];



    addReward(
        randomReward
    );



    openPopup(

        "📦 Mystery Box Opened",

        `You received +${randomReward} coins`

    );



};







/* ==========================================
DAILY BONUS
========================================== */


document
.getElementById("claimDaily")
.onclick = ()=>{


    const now =
    Date.now();



    const last =
    userData.lastDaily;



    const cooldown =
    24 * 60 * 60 * 1000;



    if(
        last &&
        now - last < cooldown
    ){


        const remaining =
        cooldown -
        (now-last);



        const hours =
        Math.ceil(
            remaining /
            (1000*60*60)
        );



        openPopup(

            "⏳ Come Back Later",

            `Daily bonus available in ${hours} hours`

        );



        return;


    }



    userData.lastDaily =
    now;



    addReward(25);



    openPopup(

        "📅 Daily Bonus",

        "+25 coins claimed successfully!"

    );



};








/* ==========================================
SPECIAL OFFERS
========================================== */



document
.getElementById("offerCash")
.onclick = ()=>{


    openPopup(

        "📺 Sponsored Activity",

        "Watch a sponsored activity to unlock your reward."

    );


};





document
.getElementById("offerBonus")
.onclick = ()=>{


    addReward(15);



    openPopup(

        "⭐ Bonus Reward",

        "+15 coins added!"

    );


};






/* ==========================================
POPUP CLOSE OUTSIDE
========================================== */


popup.onclick =
(e)=>{


    if(
        e.target === popup
    ){

        closePopup();

    }


};





/* ==========================================
SYNC DATA
========================================== */


window.addEventListener(
"beforeunload",
()=>{


    saveData();


});



console.log(
"Reward System Loaded 🎁"
);
/* ==========================================
REWARD LAND
APP.JS - PART 3
MONETAG ADS SYSTEM
========================================== */



/* ==========================================
MONETAG CONFIG
========================================== */


let adCooldown = false;


const adRewardAmount = 30;



/* ==========================================
SHOW MONETAG REWARDED ADS
========================================== */


function showRewardAd(
    callback
){



    if(adCooldown){


        openPopup(

            "⏳ Please Wait",

            "Please wait before watching another activity."

        );


        return;


    }



    adCooldown = true;



    openPopup(

        "📺 Loading Activity",

        "Preparing sponsored activity..."

    );





    if(
        typeof show_11395263 === "function"
    ){



        show_11395263()

        .then(()=>{


            console.log(
                "Ad completed"
            );



            adCooldown = false;



            callback();



        })

        .catch((error)=>{


            console.log(
                "Ad error",
                error
            );



            adCooldown = false;



            openPopup(

                "⚠️ Advertisement Failed",

                "Unable to load activity. Try again later."

            );


        });



    }

    else{


        /*
        TEST MODE
        When SDK is unavailable
        */


        console.log(
            "Monetag SDK missing - test mode"
        );



        setTimeout(()=>{


            adCooldown=false;



            callback();



        },2000);



    }




}






/* ==========================================
CASH REWARD ACTIVITY
========================================== */


document
.getElementById("offerCash")
.onclick =
()=>{


    showRewardAd(()=>{


        addReward(
            adRewardAmount
        );



        openPopup(

            "💰 Reward Received",

            `+${adRewardAmount} coins from sponsored activity`

        );


    });



};








/* ==========================================
REWARD CENTER LOCK SYSTEM
========================================== */


document
.getElementById("claimReward")
.onclick =
()=>{



    if(!firstRewardClaimed){



        addReward(10);



        localStorage.setItem(
            "firstRewardClaimed",
            "true"
        );



        firstRewardClaimed=true;



        openPopup(

            "🎁 First Reward",

            "+10 coins received!"

        );


    }

    else{


        showRewardAd(()=>{


            addReward(20);



            openPopup(

                "🎉 Reward Unlocked",

                "+20 coins received after activity"

            );


        });



    }



};







/* ==========================================
BOX WITH ADS
========================================== */


document
.getElementById("openRewardBox")
.onclick =
()=>{


    showRewardAd(()=>{


        const rewards=[

            10,

            25,

            50,

            100

        ];



        const reward =
        rewards[
            Math.floor(
                Math.random()
                *
                rewards.length
            )
        ];



        addReward(
            reward
        );



        openPopup(

            "📦 Mystery Box",

            `You got +${reward} coins`

        );



    });



};






console.log(
"Monetag System Loaded 📺"
);
/* ==========================================
REWARD LAND
APP.JS - PART 4
MISSIONS + STREAK + USER SYSTEM
========================================== */



/* ==========================================
TELEGRAM USER DATA
========================================== */


function saveTelegramUser(){


    if(
        tg &&
        tg.initDataUnsafe &&
        tg.initDataUnsafe.user
    ){


        const user =
        tg.initDataUnsafe.user;



        userData.telegramId =
        user.id;



        userData.telegramName =
        user.username || user.first_name;



        saveData();


    }


}


saveTelegramUser();






/* ==========================================
DAILY STREAK SYSTEM
========================================== */


function updateStreak(){


    const today =
    new Date()
    .toDateString();



    const lastLogin =
    localStorage.getItem(
        "lastLogin"
    );



    let streak =
    Number(
        localStorage.getItem(
            "loginStreak"
        )
    ) || 0;



    if(lastLogin !== today){



        if(lastLogin){


            const yesterday =
            new Date();



            yesterday.setDate(
                yesterday.getDate()-1
            );



            if(
                yesterday.toDateString()
                === lastLogin
            ){

                streak++;


            }
            else{


                streak=1;


            }


        }
        else{


            streak=1;


        }



        localStorage.setItem(
            "loginStreak",
            streak
        );



        localStorage.setItem(
            "lastLogin",
            today
        );


    }



    userData.streak =
    streak;



    saveData();


}



updateStreak();







/* ==========================================
MISSIONS
========================================== */


const missions = {


    dailyLogin:{

        name:"Daily Login",

        reward:10,

        completed:false

    },


    openBox:{

        name:"Open Reward Box",

        reward:20,

        completed:false

    },


    watchAd:{

        name:"Watch Sponsored Activity",

        reward:30,

        completed:false

    }



};





function completeMission(id){



    let mission =
    missions[id];



    if(
        !mission ||
        mission.completed
    ){

        return;

    }



    mission.completed=true;



    addReward(
        mission.reward
    );



    openPopup(

        "✅ Mission Completed",

        `${mission.name}: +${mission.reward} coins`

    );



}








/* ==========================================
ANTI SPAM CLICK
========================================== */


let lastAction = 0;



function actionLock(){


    const now =
    Date.now();



    if(
        now-lastAction < 1500
    ){


        openPopup(

            "⚠️ Slow Down",

            "Please wait a moment."

        );


        return false;


    }



    lastAction =
    now;



    return true;


}








/* ==========================================
CONNECT MISSION EVENTS
========================================== */



document
.getElementById("claimDaily")
.addEventListener(
"click",
()=>{


    if(
        actionLock()
    ){


        completeMission(
            "dailyLogin"
        );


    }


});





document
.getElementById("openRewardBox")
.addEventListener(
"click",
()=>{


    if(
        actionLock()
    ){


        completeMission(
            "openBox"
        );


    }


});






document
.getElementById("offerCash")
.addEventListener(
"click",
()=>{


    if(
        actionLock()
    ){


        completeMission(
            "watchAd"
        );


    }


});






/* ==========================================
STATS DISPLAY
========================================== */


console.log(
"User:",
userData.telegramName
);


console.log(
"Streak:",
userData.streak
);


console.log(
"Reward Land Ready 🔥"
);
/* ==========================================
REWARD LAND
APP.JS - PART 5
UI EXPERIENCE SYSTEM
========================================== */





/* ==========================================
LEVEL UI
========================================== */


function updateLevelUI(){


    const activity =
    userData.activities;



    const current =
    activity % 5;



    const percent =
    (current / 5) * 100;



    const bar =
    document.getElementById(
        "levelProgress"
    );



    const text =
    document.getElementById(
        "levelText"
    );



    const streak =
    document.getElementById(
        "streakCount"
    );



    if(bar){

        bar.style.width =
        percent + "%";

    }



    if(text){

        text.innerText =
        `${current} / 5 activities`;

    }



    if(streak){

        streak.innerText =
        userData.streak || 0;

    }



}




updateLevelUI();






/* ==========================================
OVERRIDE UPDATE UI
========================================== */


const oldUpdateUI =
updateUI;



updateUI = function(){


    oldUpdateUI();


    updateLevelUI();


};







/* ==========================================
REWARD ANIMATION
========================================== */


function rewardAnimation(){


    const balance =
    document.querySelector(
        ".reward-card"
    );



    if(!balance)
        return;



    balance.classList.remove(
        "reward-pop"
    );



    void balance.offsetWidth;



    balance.classList.add(
        "reward-pop"
    );


}





/* ==========================================
TOAST MESSAGE
========================================== */


function showToast(message){



    const toast =
    document.createElement(
        "div"
    );



    toast.className =
    "toast";



    toast.innerText =
    message;



    document.body.appendChild(
        toast
    );



    setTimeout(()=>{


        toast.remove();


    },2500);



}







/* ==========================================
HOOK REWARD EFFECT
========================================== */


const oldAddReward =
addReward;



addReward = function(amount){



    oldAddReward(amount);



    rewardAnimation();


    showToast(
        `💰 +${amount} coins`
    );


};







/* ==========================================
FAKE LOADING EFFECT
========================================== */


function rewardLoading(callback){



    openPopup(

        "⏳ Processing",

        "Checking reward activity..."

    );



    setTimeout(()=>{


        closePopup();


        callback();



    },1500);



}



console.log(
"UI Experience Loaded ✨"
);
