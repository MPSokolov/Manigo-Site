function arrowToTop() {
    document.addEventListener('scroll', () => {
        const fromTop = window.scrollY;
        const upArrow = document.getElementById('to-top');

        if (fromTop > 150) {
            if (upArrow.style.opacity < 1) {
                upArrow.style.display = 'block';
                setTimeout(function () { upArrow.style.opacity = 1; }, 100);
            }
        } else {
            if (upArrow.style.opacity > 0) {
                upArrow.style.opacity = 0;
                setTimeout(function () { upArrow.style.display = "none" }, 1000);
            }
        }
    });
}

function logoAngryAnimation() {
    let img = new Image();
    img.src = './resources/angry5.png';
    img.onload = function () {
        init();
    };

    let canvases = document.getElementsByClassName("angry-left");
    let currentCtx;
    let curentCanvas;

    let scale = 1.04; /*0.33*/
    if (window.innerWidth < 1000) {
        scale = 0.33
    }
    const width = 364;
    const height = 375;
    let scaledWidth = scale * width;
    let scaledHeight = scale * height;

    function drawFrame(frameX, frameY, canvasX, canvasY) {
        currentCtx.drawImage(img,
            frameX * width, frameY * height, width, height,
            canvasX, canvasY, scaledWidth, scaledHeight);
    }

    const cycleLoopX = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const cycleLoopY = [0, 1, 2, 3, 4];
    let currentLoopIndexX = 0;
    let currentLoopIndexY = 0;
    // let frameCount = 0;

    function loop() {
        // frameCount++;
        // if (frameCount < 2) {
        //     window.requestAnimationFrame(loop);
        //     return;
        // }
        // frameCount = 0;
        currentCtx.clearRect(0, 0, curentCanvas.width, curentCanvas.height);
        drawFrame(cycleLoopX[currentLoopIndexX], cycleLoopY[currentLoopIndexY], 0, 0);
        currentLoopIndexX++;
        if (currentLoopIndexX >= cycleLoopX.length) {
            currentLoopIndexX = 0;
            currentLoopIndexY++;
        }
        if (currentLoopIndexY >= cycleLoopY.length) {
            currentLoopIndexY = 0;
        }
        if (currentLoopIndexY == 4 && cycleLoopX[currentLoopIndexX] == 10) {
            currentLoopIndexX = 0;
            currentLoopIndexY = 0;
            drawFrame(0, 0, 0, 0);
            return;
        }
        window.requestAnimationFrame(loop);
    }

    function init() {
        Array.from(canvases).forEach(canvas => {

            canvas.addEventListener('click', () => {
                currentCtx = canvas.getContext('2d');
                curentCanvas = canvas;
                setAndUpdateScale(canvas)
                window.requestAnimationFrame(loop);
            });

            setAndUpdateScale(canvas)
            currentCtx = canvas.getContext('2d');

            drawFrame(0, 0, 0, 0);
        });
    }

    function setAndUpdateScale(canvas) {
        if (canvas.id === "contact-logo") {
            scale = 0.84;
        } else {
            if (window.innerWidth < 1000) {
                scale = 0.33
                canvas.setAttribute("width", "121px")
                canvas.setAttribute("height", "125px")
            } else {
                scale = 1.04;
            }
        }
        scaledWidth = scale * width;
        scaledHeight = scale * height;
    }
}

function servicesAnimation() {
    const selectedBgColor = "#7ac3ff";
    const notSelectedBgColor = "#c670ff";

    let texts = Array.from(document.getElementsByClassName('article-text'));
    let buttons = Array.from(document.querySelectorAll('.services > div:nth-of-type(2) > div'));

    for (let index = 0; index < buttons.length; index++) {
        const button = buttons[index];
        button.addEventListener('click', () => {
            buttons.forEach(i => {
                i.style.backgroundColor = notSelectedBgColor;
            });
            texts.forEach(i => {
                i.style.display = 'none';
            });
            button.style.backgroundColor = selectedBgColor;
            texts[index].style.display = 'block';
        });
    }


}

function eyesFollowCursor() {
    if (window.innerWidth > 1100) {
        let box = document.querySelector("body > main > section.nameless-section > img");

        document.addEventListener("mousemove", event => {
            const boxRect = box.getBoundingClientRect();
            const boxCenterX = boxRect.left + boxRect.width / 2;
            const boxCenterY = boxRect.top + boxRect.height / 2;
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            const deltaX = mouseX - boxCenterX;
            const deltaY = mouseY - boxCenterY;
            const angleInDegrees = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
            box.style.transform = `rotate(${angleInDegrees}deg)`;
        })
    }
}

function excitedAnimation() {
    const inputs = Array.from(document.getElementsByClassName('form-input'));
    const img = document.querySelector('#contacts > div.form > img')
    let typingTimer;
    const typingInterval = 2000;
    let isTyping = false;

    function startTypingTimer() {
        isTyping = true;
        img.addEventListener("animationiteration", eventHandler1, { once: true });
        clearTimeout(typingTimer);
    }

    function stopTypingTimer() {
        typingTimer = setTimeout(function () {
            isTyping = false;
            img.addEventListener("animationiteration", eventHandler2, { once: true });
        }, typingInterval);
    }

    inputs.forEach(inputField => {
        inputField.addEventListener("input", startTypingTimer);
        inputField.addEventListener("keyup", stopTypingTimer);
    })

    function eventHandler1() {
        img.classList.remove('floating');
        // img.removeEventListener("animationiteration", eventHandler1)
        img.classList.add('floating-fast');

    }

    function eventHandler2() {
        img.classList.remove('floating-fast');
        // img.removeEventListener("animationiteration", eventHandler2)
        // img.classList.add('floating');
        setTimeout(() => img.classList.add('floating'), 10)

    }
}

function phoneNavigation() {
    if (window.innerWidth <= 1000) {
        const navBtn = document.querySelector("body > header:nth-child(1) > nav:nth-child(1) > img:nth-child(4)");
        const menu = document.querySelector("nav ul");
        const body = document.querySelector("body")

        navBtn.addEventListener('click', () => {
            menu.style.display = "unset";
            setTimeout(() => { menu.style.right = "0" }, 1)
        })

        body.addEventListener('click', () => {
            menu.style.right = "-40vw";
            setTimeout(() => { menu.style.display = "unset"; }, 300)
        })
    }
}

logoAngryAnimation();
arrowToTop();
servicesAnimation();
eyesFollowCursor();
excitedAnimation();
phoneNavigation();