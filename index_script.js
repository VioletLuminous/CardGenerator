var card_obj = {
    type: "monster",
    color: "img/c1.png",
    name: "Name",
    attr: "img/1.png",
    star: 1,
    img: "img/none.png",
    skill: "SKILL",
    text: "TEXT",
    atk: "0000",
    def: "1111"
}

function card_output(card_x) {  //把卡片資料輸出成HTML--怪獸卡
    var text = "";
    text += "<div class='m3_l_card'>"
    text += "<img class='m3_l_card_color' src='" + card_x.color + "'>";
    text += "<div class='m3_l_card_name'>" + card_x.name + "</div>";
    text += "<img class='m3_l_card_attr' src='" + card_x.attr + "'>";
    text += "<img class='m3_l_card_img' src='" + card_x.img + "'>";
    text += "<div class='m3_l_card_skill'>" + "【" + card_x.skill + "】" + "</div>";
    text += "<div class='m3_l_card_text'>" + card_x.text + "</div>";
    text += "<div class='m3_l_card_add'>ATK/" + card_x.atk + " DEF/" + card_x.def + "</div>";

    var imgX;
    switch (card_x.attr) {
        case 'img/1.png':
            imgX = 'img/1dark.png';
            break;
        case 'img/2.png':
            imgX = 'img/2fighting.png';
            break;
        case 'img/3.png':
            imgX = 'img/3metal.png';
            break;
        case 'img/4.png':
            imgX = 'img/4water.png';
            break;
        case 'img/5.png':
            imgX = 'img/5grass.png';
            break;
        case 'img/6.png':
            imgX = 'img/6fire.png';
            break;
        default: ;
            alert('cerr');
            break;
    }
    text += `<div class = 'm3_l_card_star' src = '${imgX}'>`;
    for (let i = 1; i <= card_x.star; i++) {
        text += `<img class = 'm3_l_card_star_Plus' src= '${imgX}'>`;
    }
    text += "</div>";

    text += "</div>";
    document.getElementById("m3_l").innerHTML = text;

    if (card_x.color == "img/c1.png") {
        document.querySelector('.m3_l_card_name').classList.add('w');
    }
}

function data2html() { //把資料寫入obj
    var img = document.getElementById("card_img").files[0];

    if (img) {
        var imgT = img['type'];
        if (imgT == 'image/gif' || imgT == 'image/png' || imgT == 'image/jpeg') {
            var url = window.URL.createObjectURL(img);
            window.URL.revokeObjectURL(img);
            card_obj.img = url;
        }
        else {
            alert("檔案非圖像");
            return 0;
        }
    }

    card_obj.type = document.getElementById("card_type").value;
    card_obj.color = document.getElementById("card_color").value;
    card_obj.name = document.getElementById("card_name").value;
    card_obj.attr = document.getElementById("card_attr").value;
    card_obj.star = document.getElementById("card_star").value;
    card_obj.skill = document.getElementById("card_skill").value;
    card_obj.text = document.getElementById("card_text").value;
    card_obj.atk = document.getElementById("card_atk").value;
    card_obj.def = document.getElementById("card_def").value;

    card_output(card_obj);
}

function html2img() {  //把HTML轉換成canvas
    let oCard = document.querySelector(".m3_l_card");
    var oCanvas = document.querySelector("#showimg");

    html2canvas(oCard, { useCORS: true })
        /*
        .then(canvas => {
            download(canvas);}*/
        .then(canvas => {
            download(canvas);
        });
}
/*
  function download(downloadUrl){
	let aLink = document.createElement('a');
	aLink.style.display = 'none';
	aLink.href = downloadUrl;
	aLink.download = "下載檔名xxx.png";
	// 觸發點選-然後移除
	document.body.appendChild(aLink);
	aLink.click();
	document.body.removeChild(aLink);
};*/


function download(x) {  //下載圖片

    x.setAttribute("crossOrigin", 'Anonymous');
    var anchor = document.createElement('a');
    document.body.appendChild(anchor);

    anchor.download = card_obj.name + '.jpeg';
    anchor.href = x.toDataURL("image/jpeg", 1);
    anchor.click();
    anchor.remove();
}

card_output(card_obj);
