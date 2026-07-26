// =====================================
// REWARD LAND
// PART 1
// =====================================

Telegram.WebApp.ready();
Telegram.WebApp.expand();

const tg = window.Telegram.WebApp;

const user = tg.initDataUnsafe?.user || {};

const username = document.getElementById("username");

if (username) {

    username.textContent = user.first_name || "Guest";

}

// =====================================
// LOCAL STORAGE
// =====================================

let rewards = Number(localStorage.getItem("rewards")) || 0;

let totalRewards = Number(localStorage.getItem("totalRewards")) || 0;

let rewardLevel = Number(localStorage.getItem("rewardLevel")) || 1;

// lượt miễn phí

let firstReward = localStorage.getItem("firstReward");

if (firstReward === null) {

    firstReward = true;

} else {

    firstReward = firstReward === "true";

}

// =====================================
// ELEMENTS
// =====================================

const rewardCounter = document.getElementById("coin");

const rewardDisplay = document.getElementById("hamsterCoin");

const totalTap = document.getElementById("totalTap");

const totalCoin = document.getElementById("totalCoin");

// =====================================
// SAVE
// =====================================

function saveData(){

    localStorage.setItem("rewards", rewards);

    localStorage.setItem("totalRewards", totalRewards);

    localStorage.setItem("rewardLevel", rewardLevel);

    localStorage.setItem("firstReward", firstReward);

}

// =====================================
// UPDATE UI
// =====================================

function updateUI(){

    if(rewardCounter){

        rewardCounter.textContent = rewards;

    }

    if(rewardDisplay){

        rewardDisplay.textContent = rewards;

    }

    if(totalTap){

        totalTap.textContent = totalRewards;

    }

    if(totalCoin){

        totalCoin.textContent = rewards;

    }

    saveData();

}

// =====================================
// SCREEN
// =====================================

const screens = [

    "homeScreen",

    "hamsterScreen",

    "mysteryScreen",

    "dailyScreen",

    "shopScreen",

    "achievementScreen"

];

function showScreen(id){

    screens.forEach(screen=>{

        const page = document.getElementById(screen);

        if(page){

            page.classList.remove("active");

        }

    });

    document.getElementById(id).classList.add("active");

}

// =====================================
// HOME BUTTON
// =====================================

document.getElementById("btnHamster").onclick = ()=>{

    showScreen("hamsterScreen");

};

document.getElementById("btnMystery").onclick = ()=>{

    showScreen("mysteryScreen");

};

document.getElementById("btnDaily").onclick = ()=>{

    showScreen("dailyScreen");

};

document.getElementById("btnShop").onclick = ()=>{

    showScreen("shopScreen");

};

document.getElementById("btnAchievement").onclick = ()=>{

    showScreen("achievementScreen");

};

// =====================================
// BACK BUTTON
// =====================================

for(let i=1;i<=5;i++){

    const btn=document.getElementById("backHome"+i);

    if(btn){

        btn.onclick=()=>{

            showScreen("homeScreen");

        }

    }

}

updateUI();

console.log("Reward Land Loaded");
// =====================================
// PART 2
// REWARD ENGINE
// =====================================

function addReward(amount){

    rewards += amount;

    totalRewards++;

    updateUI();

}

// =====================================
// SHOW AD + CLAIM
// =====================================

async function claimReward(amount, title){

    const ok = confirm(
        title +
        "\n\nWatch a short sponsored ad to claim your reward."
    );

    if(!ok){

        return;

    }

    try{

        if(typeof show_11395263 === "function"){

            await show_11395263();

        }

        addReward(amount);

        alert("🎉 Reward claimed successfully!");

    }catch(error){

        alert("⚠️ Ad unavailable. Please try again.");

    }

}

// =====================================
// REWARD CENTER
// =====================================

const rewardBtn = document.getElementById("hamsterBtn");

if(rewardBtn){

    rewardBtn.onclick = ()=>{

        // Lần đầu miễn phí

        if(firstReward){

            firstReward = false;

            addReward(10);

            saveData();

            alert("🎉 First reward claimed!");

            return;

        }

        claimReward(

            10,

            "🎁 Reward Ready!"

        );

    };

}

// =====================================
// CONTINUE BUTTON
// =====================================

const watchBtn = document.getElementById("watchBoost");

if(watchBtn){

    watchBtn.onclick = ()=>{

        claimReward(

            15,

            "💸 Bonus Reward"

        );

    };

}
// =====================================
// PART 3
// REWARD BOX
// DAILY BONUS
// SPECIAL OFFERS
// =====================================

// ---------- Reward Box ----------

const mysteryBtn = document.getElementById("openMysteryBox");

if (mysteryBtn) {

    mysteryBtn.onclick = () => {

        claimReward(

            20,

            "🎁 Mystery Reward Ready!"

        );

    };

}

// ---------- Extra Reward ----------

const extraBtn = document.getElementById("watchKeyAd");

if (extraBtn) {

    extraBtn.onclick = () => {

        claimReward(

            25,

            "📦 Bonus Reward Ready!"

        );

    };

}

// ---------- Daily Bonus ----------

const dailyBtn = document.getElementById("claimDaily");

if (dailyBtn) {

    dailyBtn.onclick = () => {

        const today = new Date().toDateString();

        const claimed = localStorage.getItem("dailyReward");

        if (claimed === today) {

            alert("✅ Today's reward has already been claimed.");

            return;

        }

        localStorage.setItem(

            "dailyReward",

            today

        );

        claimReward(

            50,

            "📅 Daily Bonus Ready!"

        );

    };

}

// ---------- Premium Reward ----------

const premiumBtn = document.getElementById("buyGolden");

if (premiumBtn) {

    premiumBtn.onclick = () => {

        claimReward(

            30,

            "⭐ Premium Reward Ready!"

        );

    };

}

// ---------- VIP Reward ----------

const vipBtn = document.getElementById("buyPink");

if (vipBtn) {

    vipBtn.onclick = () => {

        claimReward(

            40,

            "💎 VIP Reward Ready!"

        );

    };

}
// =====================================
// PART 4
// REWARD PROGRESS
// START APP
// =====================================

// ---------- Reward Progress ----------

function checkRewardLevel(){

    if(totalRewards >= 10){

        rewardLevel = 2;

    }

    if(totalRewards >= 30){

        rewardLevel = 3;

    }

    if(totalRewards >= 60){

        rewardLevel = 4;

    }

    if(totalRewards >= 100){

        rewardLevel = 5;

    }

    saveData();

}

// ---------- Achievement ----------

const achievementScreen =
document.getElementById("achievementScreen");

if(achievementScreen){

    achievementScreen.innerHTML=`

        <div class="screen-header">

            <button
                class="back-btn"
                id="backAchievement">

                ←

            </button>

            <h1>

                🔥 Reward Progress

            </h1>

        </div>

        <div class="achievement-list">

            <div class="achievement">

                <h3>

                    ⭐ Current Level

                </h3>

                <p id="levelText">

                    Level 1

                </p>

            </div>

            <div class="achievement">

                <h3>

                    🎁 Total Rewards

                </h3>

                <p id="rewardText">

                    0

                </p>

            </div>

            <div class="achievement">

                <h3>

                    📈 Total Activities

                </h3>

                <p id="activityText">

                    0

                </p>

            </div>

        </div>

    `;

}

// ---------- Refresh Progress ----------

function refreshProgress(){

    checkRewardLevel();

    const level=document.getElementById("levelText");

    const reward=document.getElementById("rewardText");

    const activity=document.getElementById("activityText");

    if(level){

        level.innerHTML=

        "Level "+rewardLevel;

    }

    if(reward){

        reward.innerHTML=

        rewards;

    }

    if(activity){

        activity.innerHTML=

        totalRewards;

    }

}

// ---------- Back Button ----------

setTimeout(()=>{

    const back=document.getElementById("backAchievement");

    if(back){

        back.onclick=()=>{

            showScreen("homeScreen");

        }

    }

},100);

// ---------- Auto Refresh ----------

setInterval(()=>{

    refreshProgress();

},1000);

// ---------- Start ----------

updateUI();

refreshProgress();

showScreen("homeScreen");

console.log("💸 Reward Land Ready");
