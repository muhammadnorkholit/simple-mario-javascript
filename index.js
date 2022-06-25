import Player from "./library/Player.js"
import Platform from "./library/Platform.js"
import Helpers from "./library/Helpers.js"
import GenObj from './library/genericObject.js'


let helper = new Helpers(),
    genObj = [new GenObj(-1, -1, helper.createImage("images/background.png")), new GenObj(-1, 20, helper.createImage("images/hills.png"))],
    platformImg = helper.createImage("images/platform.png"),
    miniPlatform = helper.createImage("images/platformSmallTall.png"),
    playerStandRight = helper.createImage("images/spriteStandRight.png"),
    playerStandLeft = helper.createImage("images/spriteStandLeft.png"),
    playerRunLeft = helper.createImage("images/spriteRunLeft.png"),
    playerRunRight = helper.createImage("images/spriteRunRight.png"),
    player = new Player(playerStandRight, playerStandLeft, playerRunRight, playerRunLeft),
    platforms = [
        new Platform(platformImg.width * 4 - 550 + miniPlatform.width, 440, miniPlatform),
        new Platform(platformImg.width - miniPlatform.width, 440, miniPlatform),
        new Platform(0, 600, platformImg),
        new Platform(platformImg.width * 1.5, 600, platformImg),
        new Platform(platformImg.width * 4 - 550, 600, platformImg),
        new Platform(platformImg.width * 2.2 - 20, 600, platformImg),
        new Platform(platformImg.width * 4.5, 600, platformImg),
        new Platform(platformImg.width * 5, 600, platformImg),
        new Platform(platformImg.width * 6.1 - 7, 600, platformImg),
    ]

let scrollOffset = 1
let Scores = document.querySelector("span .poin")
let score = 0
Scores.innerText = 0
const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")
canvas.width = innerWidth
canvas.height = innerHeight
document.body.appendChild(canvas)
let keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    top: {
        pressed: false
    }
}


function init() {
    helper = new Helpers(),
        genObj = [new GenObj(-1, -1, helper.createImage("images/background.png")), new GenObj(-1, 20, helper.createImage("images/hills.png"))],
        platformImg = helper.createImage("images/platform.png"),
        miniPlatform = helper.createImage("images/platformSmallTall.png"),
        playerStandRight = helper.createImage("images/spriteStandRight.png"),
        playerStandLeft = helper.createImage("images/spriteStandLeft.png"),
        playerRunLeft = helper.createImage("images/spriteRunLeft.png"),
        playerRunRight = helper.createImage("images/spriteRunRight.png"),
        player = new Player(playerStandRight, playerStandLeft, playerRunRight, playerRunLeft),
        platforms = [
            new Platform(platformImg.width * 4 - 550 + miniPlatform.width, 440, miniPlatform),
            new Platform(platformImg.width - miniPlatform.width, 440, miniPlatform),
            new Platform(0, 600, platformImg),
            new Platform(platformImg.width * 1.2, 600, platformImg),
            new Platform(platformImg.width * 4 - 550, 600, platformImg),
            new Platform(platformImg.width * 2.3 + 10, 600, platformImg),
            new Platform(platformImg.width * 4.5, 600, platformImg),
            new Platform(platformImg.width * 5, 600, platformImg),
            new Platform(platformImg.width * 6.1 - 7, 600, platformImg),
        ]
    scrollOffset = 0
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    canvas.width = innerWidth
    canvas.height = innerHeight
    document.body.appendChild(canvas)


}

function animate(params) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)


    genObj.forEach(gen => {
        gen.update(ctx)
    })
    platforms.forEach(platform => {

        platform.draw(ctx)
    })

    player.update(canvas, ctx)
    if (keys.right.pressed && player.position.x <= 400) {
        player.velocity.x = 5
    } else if (keys.left.pressed && player.position.x >= 100) {
        player.velocity.x = -5
    } else {
        player.velocity.x = 0
        if (keys.right.pressed) {
            scrollOffset += 11
            genObj.forEach(gen => {
                gen.position.x -= 10
            })
            platforms.forEach(platform => {
                platform.position.x -= 10
            })
        } else if (keys.left.pressed) {
            scrollOffset -= 11
            genObj.forEach(gen => {
                gen.position.x += 10
            })
            platforms.forEach(platform => {
                platform.position.x += 10
            })
        }
    };


    if ((scrollOffset % 100 == 0)) {
        score += 10
        Scores.innerText = score
    }
    if (keys.top.pressed) {

        player.velocity.y = -12
    }

    platforms.forEach(platform => {

        if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0
        }
    })
    if (player.position.y >= canvas.height + 600) {
        if (confirm("Restart")) {

            init()
        }
    }

    genObj.forEach(gen => {
        if (scrollOffset >= gen.size.width) {
            console.log("win")
        }
    })
    requestAnimationFrame(animate)
}

animate()




window.addEventListener("keydown", ({
    keyCode
}) => {
    // console.log(ke)

    switch (keyCode) {
        case 83:
            break;
        case 68:
            keys.right.pressed = true
            player.current = player.currentImage.run.right
            player.currentCropWidth = player.currentImage.run.cropWidth
            player.width = player.currentImage.run.width

            break;
        case 65:
            player.current = player.currentImage.run.left
            player.currentCropWidth = player.currentImage.run.cropWidth
            player.width = player.currentImage.run.width

            keys.left.pressed = true
            break;
        case 87:
            keys.top.pressed = true
            break;
        case 32:
            keys.top.pressed = true
            break;
        default:
            break;
    }
})
window.addEventListener("keyup", ({
    keyCode
}) => {

    switch (keyCode) {
        case 83:
            break;
        case 68:
            keys.right.pressed = false
            player.current = player.currentImage.stand.right
            player.currentCropWidth = player.currentImage.stand.cropWidth
            player.width = player.currentImage.stand.width


            break;
        case 65:
            keys.left.pressed = false
            player.current = player.currentImage.stand.left
            player.currentCropWidth = player.currentImage.stand.cropWidth
            player.width = player.currentImage.stand.width

            break;
        case 87:
            keys.top.pressed = false
            break;
        case 32:
            keys.top.pressed = false
            break;
        default:
            break;
    }
})