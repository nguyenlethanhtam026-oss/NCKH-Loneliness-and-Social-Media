// ================= LẤY DỮ LIỆU TỪ SURVEY =================
let lonelinessScore = Number(localStorage.getItem("lonelinessScore"));
let socialScore = Number(localStorage.getItem("socialScore"));

// ================= KIỂM TRA LỖI =================
if (isNaN(lonelinessScore) || isNaN(socialScore)) {
    alert("Không tìm thấy dữ liệu. Hãy làm lại khảo sát.");
}

// ================= HÀM PHÂN LOẠI =================
function getLevel(percent){
    if(percent < 33){
        return { text: "🟢 Thấp", color: "#00ff88" };
    }
    else if(percent < 66){
        return { text: "🟡 Trung bình", color: "#facc15" };
    }
    else{
        return { text: "🔴 Cao", color: "#ef4444" };
    }
}

// ================= ANIMATE THANH =================
function animateBar(bar, targetPercent, color){
    let width = 0;

    bar.style.background = color;

    let interval = setInterval(() => {
        if(width >= targetPercent){
            clearInterval(interval);
        } else {
            width++;
            bar.style.width = width + "%";
        }
    }, 10);
}

// ================= U C L A (CÔ ĐƠN) =================
let lonelinessPercent = Math.round((lonelinessScore / 80) * 100);
let lonelinessLevel = getLevel(lonelinessPercent);

document.getElementById("lonelinessScore").innerText =
    `Điểm: ${lonelinessScore}/80`;

animateBar(
    document.getElementById("lonelinessBar"),
    lonelinessPercent,
    lonelinessLevel.color
);

document.getElementById("lonelinessLevel").innerText =
    `${lonelinessLevel.text} - ${lonelinessPercent}%`;

// ================= C I U (MXH) =================
let socialPercent = Math.round((socialScore / 60) * 100);
let socialLevel = getLevel(socialPercent);

document.getElementById("socialScore").innerText =
    `Điểm: ${socialScore}/60`;

animateBar(
    document.getElementById("socialBar"),
    socialPercent,
    socialLevel.color
);

document.getElementById("socialLevel").innerText =
    `${socialLevel.text} - ${socialPercent}%`;

// ================= LỜI KHUYÊN =================
let advice = "";

// cô đơn
if(lonelinessPercent >= 66){
    advice += "Bạn đang có mức độ cô đơn cao. Hãy tăng kết nối xã hội và chia sẻ nhiều hơn. ";
}
else if(lonelinessPercent >= 33){
    advice += "Bạn có mức độ cô đơn trung bình. Duy trì và mở rộng mối quan hệ hiện tại. ";
}
else{
    advice += "Bạn có mức độ cô đơn thấp, trạng thái khá ổn định. ";
}

// mạng xã hội
if(socialPercent >= 66){
    advice += "Bạn có xu hướng dùng mạng xã hội để bù đắp cảm xúc. Nên cân bằng lại thời gian online/offline. ";
}
else if(socialPercent >= 33){
    advice += "Bạn dùng mạng xã hội ở mức vừa phải. Tiếp tục kiểm soát tốt. ";
}
else{
    advice += "Bạn ít phụ thuộc mạng xã hội, đây là tín hiệu tốt. ";
}

// hiển thị lời khuyên
document.getElementById("advice").innerText = advice;

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