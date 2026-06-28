const facts = [

"Người cảm thấy cô đơn thường có xu hướng tìm kiếm kết nối xã hội qua Internet để bù đắp cảm giác thiếu hụt ngoài đời thực. (Kardefelt-Winther (2014), Computers in Human Behavior)",

"Mạng xã hội có thể chỉ mang lại cảm giác kết nối tạm thời, nhưng không thay thế được tương tác trực tiếp. Điều này khiến cảm giác cô đơn có thể vẫn tồn tại hoặc quay lại. (Yao & Zhong (2014), Computers in Human Behavior)",

"Không chỉ cô đơn khiến người ta dùng mạng xã hội nhiều hơn, mà việc sử dụng mạng xã hội quá mức cũng có thể làm tăng cảm giác cô đơn theo thời gian. (Yao & Zhong (2014), nghiên cứu cross-lagged)",

"Người có mức cô đơn cao thường có xu hướng dùng mạng xã hội nhiều phiên ngắn, kiểm tra thường xuyên hơn, tập trung vào các nền tảng tương tác (chat, mạng xã hội). (Wang et al. (2025), nghiên cứu hành vi digital trace)",

"Việc dùng mạng là chiến lược đối phó (coping strategy) hợp lý trong ngắn hạn, dù có thể gây hệ quả tiêu cực nếu kéo dài. (Kardefelt-Winther (2014))"

];

let currentFact = 0;

function updateFact(){

    document.getElementById(
        "factText"
    ).textContent =
    facts[currentFact];

   document.getElementById(
    "factCounter"
).textContent =
"Fact "
+ (currentFact + 1)
+ " / "
+ facts.length;

}

function nextFact(){

    currentFact++;

    if(currentFact >= facts.length){

        currentFact = 0;

    }

    updateFact();

}

function prevFact(){

    currentFact--;

    if(currentFact < 0){

        currentFact =
        facts.length - 1;

    }

    updateFact();

}

updateFact();