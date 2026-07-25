/* ==========================================
   TELEGRAM MINI APP
========================================== */

Telegram.WebApp.ready();
Telegram.WebApp.expand();

/* ==========================================
   USER INFO
========================================== */

const tg = window.Telegram.WebApp;

const user = tg.initDataUnsafe?.user;

const username = document.getElementById("username");

if (user) {

    username.innerText =
        user.first_name || "Player";

}

/* ==========================================
   LOCAL STORAGE
========================================== */

let coin =
    Number(localStorage.getItem("coin")) || 0;

let totalTap =
    Number(localStorage.getItem("totalTap")) || 0;

let keys =
    Number(localStorage.getItem("keys")) || 1;

/* ==========================================
   ELEMENTS
========================================== */

const coinText =
    document.getElementById("coin");

const hamsterCoin =
    document.getElementById("hamsterCoin");

const totalTapText =
    document.getElementById("totalTap");

const totalCoinText =
    document.getElementById("totalCoin");

const keyCount =
    document.getElementById("keyCount");

/* ==========================================
   UPDATE UI
========================================== */

function updateUI() {

    coinText.innerText = coin;

    hamsterCoin.innerText = coin;

    totalCoinText.innerText = coin;

    totalTapText.innerText = totalTap;

    keyCount.innerText = keys;

}

/* ==========================================
   SAVE
========================================== */

function saveGame() {

    localStorage.setItem("coin", coin);

    localStorage.setItem("totalTap", totalTap);

    localStorage.setItem("keys", keys);

}

/* ==========================================
   SCREEN
========================================== */

const homeScreen =
    document.getElementById("homeScreen");

const hamsterScreen =
    document.getElementById("hamsterScreen");

const mysteryScreen =
    document.getElementById("mysteryScreen");

const dailyScreen =
    document.getElementById("dailyScreen");

const shopScreen =
    document.getElementById("shopScreen");

const achievementScreen =
    document.getElementById("achievementScreen");

/* ==========================================
   HIDE ALL
========================================== */

function hideAll() {

    homeScreen.classList.remove("active");

    hamsterScreen.classList.remove("active");

    mysteryScreen.classList.remove("active");

    dailyScreen.classList.remove("active");

    shopScreen.classList.remove("active");

    achievementScreen.classList.remove("active");

}

/* ==========================================
   HOME
========================================== */

function goHome() {

    hideAll();

    homeScreen.classList.add("active");

}

/* ==========================================
   BUTTONS
========================================== */

document
.getElementById("btnHamster")
.onclick = () => {

    hideAll();

    hamsterScreen.classList.add("active");

};

document
.getElementById("btnMystery")
.onclick = () => {

    hideAll();

    mysteryScreen.classList.add("active");

};

document
.getElementById("btnDaily")
.onclick = () => {

    hideAll();

    dailyScreen.classList.add("active");

};

document
.getElementById("btnShop")
.onclick = () => {

    hideAll();

    shopScreen.classList.add("active");

};

document
.getElementById("btnAchievement")
.onclick = () => {

    hideAll();

    achievementScreen.classList.add("active");

};

/* ==========================================
   BACK BUTTON
========================================== */

document
.getElementById("backHome1")
.onclick = goHome;

document
.getElementById("backHome2")
.onclick = goHome;

document
.getElementById("backHome3")
.onclick = goHome;

document
.getElementById("backHome4")
.onclick = goHome;

document
.getElementById("backHome5")
.onclick = goHome;

/* ==========================================
   START
========================================== */

updateUI();
saveGame();
/* ==========================================
   HAMSTER CLICKER
========================================== */

const hamsterBtn =
    document.getElementById("hamsterBtn");

let boost = false;

let boostTime = 0;

const boostTimer =
    document.getElementById("boostTimer");

hamsterBtn.onclick = () => {

    let earn = boost ? 2 : 1;

    coin += earn;

    totalTap++;

    updateUI();

    saveGame();

};

/* ==========================================
   BOOST TIMER
========================================== */

setInterval(() => {

    if (boostTime > 0) {

        boostTime--;

        boostTimer.innerText =
            "⚡ x2 Coins: " + boostTime + "s";

        if (boostTime === 0) {

            boost = false;

            boostTimer.innerText =
                "";

        }

    }

},1000);

/* ==========================================
   WATCH BOOST AD
========================================== */

document
.getElementById("watchBoost")
.onclick = () => {

    if(typeof show_11395263 === "function"){

        Promise.resolve(show_11395263())

        .then(()=>{

            boost = true;

            boostTime = 30;

            boostTimer.innerText =
                "⚡ x2 Coins: 30s";

        })

        .catch(()=>{

            alert("Không thể hiển thị quảng cáo.");

        });

    }

    else{

        alert("Monetag SDK chưa tải.");

    }

};

/* ==========================================
   MYSTERY BOX
========================================== */

const rewardResult =
    document.getElementById("rewardResult");

document
.getElementById("openMysteryBox")
.onclick = () => {

    if(keys <= 0){

        rewardResult.innerHTML =
            "❌ Bạn không còn Key.";

        return;

    }

    keys--;

    let random =
        Math.floor(Math.random()*100)+1;

    let reward = 0;

    let text = "";

    if(random <= 50){

        reward = 20;

        text = "🥉 Common<br>+20 Coins";

    }

    else if(random <= 80){

        reward = 50;

        text = "🥈 Rare<br>+50 Coins";

    }

    else if(random <= 95){

        reward = 100;

        text = "🥇 Epic<br>+100 Coins";

    }

    else if(random <= 99){

        reward = 500;

        text = "💎 Legendary<br>+500 Coins";

    }

    else{

        reward = 1000;

        text = "🌈 Mythic<br>+1000 Coins";

    }

    coin += reward;

    rewardResult.innerHTML = text;

    updateUI();

    saveGame();

};

/* ==========================================
   WATCH AD FOR KEY
========================================== */

document
.getElementById("watchKeyAd")
.onclick = () => {

    if(typeof show_11395263 === "function"){

        Promise.resolve(show_11395263())

        .then(()=>{

            keys++;

            updateUI();

            saveGame();

            rewardResult.innerHTML =
                "🔑 +1 Key";

        })

        .catch(()=>{

            alert("Quảng cáo chưa sẵn sàng.");

        });

    }

};
/* ==========================================
   DAILY REWARD
========================================== */

const dailyStatus =
    document.getElementById("dailyStatus");

const claimDaily =
    document.getElementById("claimDaily");

claimDaily.onclick = () => {

    const today =
        new Date().toDateString();

    const lastClaim =
        localStorage.getItem("dailyReward");

    if(lastClaim === today){

        dailyStatus.innerHTML =
            "❌ Bạn đã nhận thưởng hôm nay.";

        return;

    }

    coin += 100;

    localStorage.setItem(
        "dailyReward",
        today
    );

    updateUI();

    saveGame();

    dailyStatus.innerHTML =
        "🎉 +100 Coins";

};

/* ==========================================
   SHOP
========================================== */

document
.getElementById("buyGolden")
.onclick = () => {

    if(coin < 5000){

        alert("Không đủ Coin.");

        return;

    }

    coin -= 5000;

    updateUI();

    saveGame();

    alert("✨ Đã mua Golden Hamster!");

};

document
.getElementById("buyPink")
.onclick = () => {

    if(coin < 10000){

        alert("Không đủ Coin.");

        return;

    }

    coin -= 10000;

    updateUI();

    saveGame();

    alert("🩷 Đã mua Pink Hamster!");

};

/* ==========================================
   ACHIEVEMENTS
========================================== */

function checkAchievement(){

    if(totalTap >= 100){

        console.log(
            "Achievement: First Tap"
        );

    }

    if(coin >= 10000){

        console.log(
            "Achievement: Rich Player"
        );

    }

}

setInterval(checkAchievement,1000);

/* ==========================================
   POPUP
========================================== */

const popup =
    document.getElementById("rewardPopup");

const popupReward =
    document.getElementById("popupReward");

const closePopup =
    document.getElementById("closePopup");

function showPopup(text){

    popup.style.display =
        "flex";

    popupReward.innerHTML =
        text;

}

closePopup.onclick = () => {

    popup.style.display =
        "none";

};

/* ==========================================
   SAVE BEFORE EXIT
========================================== */

window.addEventListener(
    "beforeunload",
    () => {

        saveGame();

    }
);

/* ==========================================
   START GAME
========================================== */

updateUI();

goHome();

console.log(
    "🐹 Coin Land Ready!"
);
