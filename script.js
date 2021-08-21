let btnPlayerImg = document.querySelectorAll('.img-player-parent');
let playerArea = document.querySelector('.player-content');
let compArea = document.querySelector('.img-comp-container');
let scorPlayer = 0;
let scorComp = 0;
let btnResetScor = document.querySelector('.btn-reset');

btnPlayerImg.forEach(m => {
    m.addEventListener('click', function () {
        let compImg = compOption();
        let playerImg = this.dataset.img;

        playerArea.innerHTML = `<img src="img/${playerImg}.png" alt="batu" class="img-player-js">`;
        this.style.background = 'grey';

        setTimeout(() => compArea.innerHTML = `<img src="img/${compImg}.png" alt="batu" class="img-player-js">`, 700);
        gameResults(playerImg, compImg);

        setTimeout(() => {
            let x = window.matchMedia("(max-width: 900px)")
            scrollDown(x)
            x.addListener(scrollDown)
        }, 900);
    })
})

btnResetScor.addEventListener('click', function () {
    window.location.reload();
})

function compOption() {
    let compImg = Math.random();

    if (compImg < 0.34) return compImg = `batu`;
    if (compImg >= 0.34 && compImg < 0.67) return compImg = `kertas`;
    return compImg = `gunting`;
}

function randomImg() {
    return `<img src="img/batu.png" alt="batu" class="img-comp img-comp-1">
            <img src="img/gunting.png" alt="gunting" class="img-comp img-comp-2">
            <img src="img/kertas.png" alt="kertas" class="img-comp img-comp-3">`;
}

function popupBoxCodes(playerImg, compImg, resultText, scorTxt) {
    return `<div class="popup-box" style="animation: show-popup-box .5s ease forwards">
                <div class="body-popup-box">
                    <div class="item-popup-box"><strong>KAMU PILIH :</strong> ${playerImg}</div>
                    <div class="item-popup-box"><strong>KOMPUTER PILIH :</strong> ${compImg}</div>
                    <div class="item-popup-box"><strong>HASILNYA :</strong> ${resultText}</div>
                    <br>
                    <div class="item-popup-box item-popup-box-center"><strong>${scorTxt}</strong></div>
                </div>
                <div class="footer-popup-box">
                    <button onclick="hidePopupBox()">close</button>
                </div>
            </div>`;
}

function hidePopupBox() {
    let scorPlayerContainer = document.querySelector('.scor-player');
    let scorCompContainer = document.querySelector('.scor-comp');

    document.querySelector('.popup-container').style.animation = "hide-popup-container .5s ease 1 forwards";
    document.querySelector('.popup-box').style.animation = "hide-popup-box .5s ease 1 forwards";

    compArea.innerHTML = randomImg();
    scorCompContainer.innerHTML = scorComp;
    scorPlayerContainer.innerHTML = scorPlayer;
    playerArea.innerHTML = `SILAHKAN PILIH BATU / GUNTING / KERTAS`;

    btnPlayerImg.forEach(m => {
        m.style.background = 'white';
    })

    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });

}

function gameResults(playerImg, compImg) {
    let resultText = ``;
    let scorTxt = '';

    if (playerImg == compImg) {
        resultText = 'kamu dan komputer seri';
        scorTxt = 'KAMU DAN KOMPUTER TIDAK MENDAPATKAN SKOR 😀';
    }
    if (playerImg == `batu`) {
        if (compImg == `gunting`) {
            resultText = 'kamu menang dan komputer kalah';
            scorTxt = 'KAMU MENDAPATKAN 1 SKOR 🤩';
            scorPlayer += 1;
        }
        if (compImg == `kertas`) {
            resultText = 'kamu kalah dan komputer menang';
            scorTxt = 'KOMPUTER MENDAPATKAN 1 SKOR 😔';
            scorComp += 1;
        }
    }
    if (playerImg == `kertas`) {
        if (compImg == `gunting`) {
            resultText = 'kamu kalah dan komputer menang';
            scorTxt = 'KOMPUTER MENDAPATKAN 1 SKOR 😔';
            scorComp += 1;
        }
        if (compImg == `batu`) {
            resultText = 'kamu menang dan komputer kalah';
            scorTxt = 'KAMU MENDAPATKAN 1 SKOR 🤩';
            scorPlayer += 1;
        }
    }
    if (playerImg == `gunting`) {
        if (compImg == `batu`) {
            resultText = 'kamu kalah dan komputer menang';
            scorTxt = 'KOMPUTER MENDAPATKAN 1 SKOR 😔';
            scorComp += 1;
        }
        if (compImg == `kertas`) {
            resultText = 'kamu menang dan komputer kalah';
            scorTxt = 'KAMU MENDAPATKAN 1 SKOR 🤩';
            scorPlayer += 1;
        }
    }

    let popupContainer = document.querySelector('.popup-container');

    popupContainer.style.animation = "show-popup-container .5s ease 1 forwards";
    popupContainer.style.background = "transparent";
    popupContainer.style.transition = "none";

    setTimeout(() => {
        popupContainer.style.background = "rgba(0, 0, 0, .5)";
        popupContainer.style.transition = "all ease .5s";
        popupContainer.innerHTML = popupBoxCodes(playerImg, compImg, resultText, scorTxt);
    }, 2000);
}

let heightScrolled = document.body.scrollHeight / 1.7;

function scrollDown(x) {
    if (x.matches) {
        window.scroll({
            top: heightScrolled,
            left: 0,
            behavior: 'smooth'
        });
    } else {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }
}