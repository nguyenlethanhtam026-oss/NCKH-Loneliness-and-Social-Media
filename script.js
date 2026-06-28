document.getElementById("surveyForm")
.addEventListener("submit", function(event){

    event.preventDefault();

    let totalLoneliness = 0;
    let totalSocial = 0;

    let answersA = [];
    let answersB = [];

    // ===== PHẦN A =====

    for(let i = 1; i <= 20; i++){

        let answer =
        document.querySelector(`input[name="q${i}"]:checked`);

        if(answer == null){
            alert("Bạn chưa trả lời hết phần A!");
            return;
        }

        totalLoneliness += Number(answer.value);

        answersA.push(
            Number(answer.value)
);
    }

    // ===== PHẦN B =====

    for(let i = 31; i <= 42; i++){

        let answer =
        document.querySelector(`input[name="q${i}"]:checked`);

        if(answer == null){
            alert("Bạn chưa trả lời hết phần B!");
            return;
        }

        totalSocial += Number(answer.value);

        answersB.push(
            Number(answer.value)
);
    }

    // Lưu điểm cho result.html

    localStorage.setItem(
        "lonelinessScore",
        totalLoneliness
    );

    localStorage.setItem(
        "socialScore",
        totalSocial
    );

    let lonelinessLevel;

if(totalLoneliness <= 39){
    lonelinessLevel = "Thấp";
}
else if(totalLoneliness <= 59){
    lonelinessLevel = "Trung bình";
}
else{
    lonelinessLevel = "Cao";
}

let socialLevel;

if(totalSocial <= 28){
    socialLevel = "Thấp";
}
else if(totalSocial <= 44){
    socialLevel = "Trung bình";
}
else{
    socialLevel = "Cao";
}

let gender =
document.querySelector(
'input[name="graded"]:checked'
);

if(gender != null){
    gender = gender.value;
}
else{
    gender = "";
}

let grade =
document.querySelector(
'input[name="grade"]:checked'
);

let subjectGroup =
document.querySelector(
'input[name="subject_group"]:checked'
);

let timeSocial =
document.querySelector(
'input[name="time_social"]:checked'
);

let aloneActivity = [];

let activities =
document.querySelectorAll(
'input[name="alone_activity"]:checked'
);

let socialPurpose = [];

document
.querySelectorAll(
'input[name="social_purpose"]:checked'
)
.forEach(function(item){

    if(item.value != "other"){

        socialPurpose.push(
            item.parentElement.textContent.trim()
        );

    }

});

if(
document.getElementById("otherCheck2").checked
){

    let otherText =
    document.getElementById("otherText2")
    .value
    .trim();

    if(otherText){

        socialPurpose.push(otherText);

    }

}

socialPurpose = socialPurpose.join(", ");

activities.forEach(function(item){

    if(item.value != "other"){

        aloneActivity.push(item.parentElement.textContent.trim());

    }

});

if(
document.getElementById("otherCheck1").checked
){

    let otherText =
    document.getElementById(
        "otherText1"
    ).value;

    if(otherText != ""){

        aloneActivity.push(otherText);

    }

}

aloneActivity =
aloneActivity.join(", ");

if(timeSocial != null){

    timeSocial = timeSocial.value;

}
else{

    timeSocial = "";

}

if(timeSocial == "1"){
    timeSocial = "Dưới 1 giờ";
}
else if(timeSocial == "2"){
    timeSocial = "1 - 2 giờ";
}
else if(timeSocial == "3"){
    timeSocial = "2 - 4 giờ";
}
else if(timeSocial == "4"){
    timeSocial = "Trên 4 giờ";
}

if(subjectGroup != null){

    subjectGroup = subjectGroup.value;

}
else{

    subjectGroup = "";

}

if(subjectGroup == "other"){

    subjectGroup =
    document.getElementById(
        "subject_other"
    ).value;

}

if(grade != null){
    grade = grade.value;
}
else{
    grade = "";
}

let friendConnection =
document.querySelector(
'input[name="mucdoketban"]:checked'
);

if(friendConnection != null){

    friendConnection =
    friendConnection.value;

}
else{

    friendConnection = "";

}

let emotionSharing =
document.querySelector(
'input[name="mucdocamxuc"]:checked'
);

if(emotionSharing != null){

    emotionSharing =
    emotionSharing.value;

}
else{

    emotionSharing = "";

}

if(friendConnection == "1"){
    friendConnection = "Rất thấp";
}
else if(friendConnection == "2"){
    friendConnection = "Thấp";
}
else if(friendConnection == "3"){
    friendConnection = "Trung bình";
}
else if(friendConnection == "4"){
    friendConnection = "Cao";
}
else if(friendConnection == "5"){
    friendConnection = "Rất cao";
}

if(emotionSharing == "1"){
    emotionSharing = "Rất khó";
}
else if(emotionSharing == "2"){
    emotionSharing = "Khó";
}
else if(emotionSharing == "3"){
    emotionSharing = "Bình thường";
}
else if(emotionSharing == "4"){
    emotionSharing = "Dễ";
}
else if(emotionSharing == "5"){
    emotionSharing = "Rất dễ";
}

console.log("aloneActivity =", aloneActivity);
console.log("socialPurpose =", socialPurpose);

    // Gửi dữ liệu lên Google Sheet
let submitBtn =
document.getElementById("submitBtn");

submitBtn.disabled = true;

submitBtn.textContent =
"Đang gửi...";

    fetch(
"https://script.google.com/macros/s/AKfycby4WM9nd9fAhSfawLYHeiY2O2IiegvoiK57lCgR5ysNtaGzU_aSu8XKqYp7DAv3hhM/exec",
{
    method: "POST",
    body: JSON.stringify({

    lonelinessScore: totalLoneliness,
    lonelinessLevel: lonelinessLevel,

    socialScore: totalSocial,
    socialLevel: socialLevel,

    gender: gender,
    grade: grade,

    subjectGroup: subjectGroup,

    timeSocial: timeSocial,

    aloneActivity: aloneActivity,

    socialPurpose: socialPurpose,
    friendConnection: friendConnection,

    emotionSharing: emotionSharing,
    answersA: answersA,
    answersB: answersB,
})
}
)
.then(response => response.text())
.then(data => {

    console.log(data);

    document.body.insertAdjacentHTML(
        "beforeend",
        `
        <div id="loadingScreen">

            <div class="loading-box">

                <div class="spinner"></div>

                <p>
                    Đang xử lý kết quả khảo sát...
                </p>

            </div>

        </div>
        `
    );

    setTimeout(function(){

        window.location.href =
        "result.html";

    },1500);

})
.catch(error => {

    console.error(error);

    alert("Lỗi: " + error);

    submitBtn.disabled = false;

submitBtn.textContent =
"Gửi khảo sát";
});

});

// ======================================
// 1 CÂU HỎI / 1 MÀN HÌNH
// ======================================

const questions =
document.querySelectorAll(".question-card");

let currentQuestion = 0;


// ======================================
// HIỆN TIÊU ĐỀ ĐÚNG PHẦN
// ======================================

function updateTitles(){

    let titleA =
    document.getElementById("titleA");

    let titleB =
    document.getElementById("titleB");

    let titleC =
    document.getElementById("titleC");

    if(!titleA || !titleB || !titleC) return;

    titleA.classList.remove("active");
    titleB.classList.remove("active");
    titleC.classList.remove("active");

    if(currentQuestion <= 19){

        titleA.classList.add("active");

    }

    else if(currentQuestion <= 31){

        titleB.classList.add("active");

    }

    else{

        titleC.classList.add("active");

    }

}


// ======================================
// CHUYỂN SANG CÂU TIẾP
// ======================================

function autoNextQuestion(){

    setTimeout(function(){

        if(currentQuestion < questions.length - 1){

            questions[currentQuestion]
            .classList.remove("active");

            currentQuestion++;
            updateActiveNav();
            questions[currentQuestion]
            .classList.add("active");

            updateTitles();

        }

    },200);

}


// ======================================
// PHẦN A
// ======================================

for(let i = 1; i <= 20; i++){

    document
    .querySelectorAll(`input[name="q${i}"]`)
    .forEach(function(input){

        input.addEventListener("change", function(){

            document
            .getElementById(`nav${i}`)
            ?.classList.add("answered");

            updateProgress();

            autoNextQuestion();

        });

    });

}


// ======================================
// PHẦN B
// ======================================

for(let i = 31; i <= 42; i++){

    document
    .querySelectorAll(`input[name="q${i}"]`)
    .forEach(function(input){

        input.addEventListener("change", function(){

            document
            .getElementById(`nav${i}`)
            ?.classList.add("answered");

            updateProgress();

            autoNextQuestion();

        });

    });

}


// ======================================
// PHẦN C
// ======================================

function markPartC(){

    const map = {

        graded: "nav51",
        grade: "nav52",
        subject_group: "nav53",
        time_social: "nav54",
        alone_activity: "nav55",
        social_purpose: "nav56",
        mucdoketban: "nav57",
        mucdocamxuc: "nav58"

    };

    Object.keys(map).forEach(function(name){

        if(
            document.querySelector(
                `input[name="${name}"]:checked`
            )
        ){

            document
            .getElementById(map[name])
            ?.classList.add("answered");

        }

    });

}


// ======================================
// GẮN SỰ KIỆN PHẦN C
// ======================================

[
    "graded",
    "grade",
    "subject_group",
    "time_social",
    "alone_activity",
    "social_purpose",
    "mucdoketban",
    "mucdocamxuc"
]

.forEach(function(name){

    document
    .querySelectorAll(
        `input[name="${name}"]`
    )

    .forEach(function(input){

        input.addEventListener(
            "change",
            function(){

                markPartC();

                updateProgress();

                autoNextQuestion();

            }
        );

    });

});


// ======================================
// UPDATE PROGRESS
// ======================================

function updateProgress(){

    let completed = 0;

    for(let i = 1; i <= 20; i++){

        if(
            document.querySelector(
                `input[name="q${i}"]:checked`
            )
        ){

            completed++;

        }

    }

    for(let i = 31; i <= 42; i++){

        if(
            document.querySelector(
                `input[name="q${i}"]:checked`
            )
        ){

            completed++;

        }

    }

    const partC = [

        "graded",
        "grade",
        "subject_group",
        "time_social",
        "alone_activity",
        "social_purpose",
        "mucdoketban",
        "mucdocamxuc"

    ];

    partC.forEach(function(name){

        if(
            document.querySelector(
                `input[name="${name}"]:checked`
            )
        ){

            completed++;

        }

    });

    document
    .getElementById("progressText")
    .textContent =
    `${completed} / 40 câu đã hoàn thành`;

    document
    .getElementById("progressFill")
    .style.width =
    (completed / 40) * 100 + "%";

}


// ======================================
// NAVIGATION
// ======================================

document
.querySelectorAll(".question-number")

.forEach(function(nav){

    nav.addEventListener(
        "click",
        function(e){

            e.preventDefault();

            let target =
            nav.getAttribute("href");

            let el =
            document.querySelector(target);

            if(!el) return;

            let card =
            el.closest(".question-card");

            let index =
            Array.from(questions)
            .indexOf(card);

            questions.forEach(function(q){
                q.classList.remove("active");
            });

            currentQuestion = index;

            questions[currentQuestion]
            .classList.add("active");

            updateTitles();
            markPartC();
            updateProgress();
            updateActiveNav();

        }
    );

});


// ======================================
// NÚT TIẾP THEO
// ======================================

document
.getElementById("nextBtn")
.addEventListener("click", function(){

    let currentCard =
    questions[currentQuestion];

    let checked =
    currentCard.querySelector(
        'input[type="radio"]:checked, input[type="checkbox"]:checked'
    );

    if(!checked){

        alert("Cậu chưa chọn đáp án.");

        return;

    }

    if(currentQuestion < questions.length - 1){

        questions[currentQuestion]
        .classList.remove("active");

        currentQuestion++;

        updateTitles();
        updateActiveNav();

        questions[currentQuestion]
        .classList.add("active");

    }

});

// ======================================
// NÚT QUAY LẠI
// ======================================

document
.getElementById("prevBtn")
?.addEventListener(
    "click",
    function(){

        if(currentQuestion > 0){

            questions[currentQuestion]
            .classList.remove("active");

            currentQuestion--;
            updateActiveNav();
            questions[currentQuestion]
            .classList.add("active");

            updateTitles();

        }

    }
);


// ======================================
// KHỞI TẠO
// ======================================

window.addEventListener(
    "DOMContentLoaded",
    function(){
        updateTitles();

        questions.forEach(function(q){

            q.classList.remove("active");

        });

        if(questions.length > 0){

            questions[0]
            .classList.add("active");

        }

        markPartC();

        updateActiveNav(); // THÊM DÒNG NÀY

    
        // ===========================
// RESTORE SAVED ANSWERS
// ===========================

document.querySelectorAll("input").forEach(input => {

    if(input.type === "radio"){

        let saved =
        localStorage.getItem(input.name);

        if(saved === input.value){

            input.checked = true;

        }

    }

    if(input.type === "checkbox"){

        let saved =
        JSON.parse(
            localStorage.getItem(input.name)
            || "[]"
        );

        if(saved.includes(input.value)){

            input.checked = true;

        }

    }

});

        questions.forEach(function(q){

            q.classList.remove("active");

        });

        if(questions.length > 0){

            questions[0]
            .classList.add("active");

        }

        updateTitles();

        markPartC();

        updateProgress();

    }
);

// ===========================
// AUTO SAVE
// ===========================

document.querySelectorAll("input").forEach(input => {

    input.addEventListener("change", function(){

        if(input.type === "radio"){

            localStorage.setItem(
                input.name,
                input.value
            );

        }

        if(input.type === "checkbox"){

            let checkedValues = [];

            document
            .querySelectorAll(
                `input[name="${input.name}"]:checked`
            )
            .forEach(item => {

                checkedValues.push(item.value);

            });

            localStorage.setItem(
                input.name,
                JSON.stringify(checkedValues)
            );

        }

    });

});

function updateActiveNav(){

    document
    .querySelectorAll(".question-number")
    .forEach(item => {

        item.classList.remove("active");

    });

    let currentCard =
    questions[currentQuestion];

    if(!currentCard) return;

    let navId =
    currentCard.dataset.nav;

    if(!navId) return;

    let activeNav =
    document.getElementById(navId);

    if(activeNav){

        activeNav.classList.add("active");

    }

}
// ================= FOOTER ANIMATION =================

function animateFooter(){

const footer = document.querySelector(".footer");

    if(!footer) return;

    const footerTop = footer.getBoundingClientRect().top;

    const windowHeight = window.innerHeight;

    if(footerTop < windowHeight - 100){

        footer.classList.add("show");

    }

}

window.addEventListener("load", animateFooter);

window.addEventListener("scroll", animateFooter);

window.addEventListener("resize", animateFooter);