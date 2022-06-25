export default class Player {
    constructor(image1, image2, image3, image4) {
        this.width = 70;
        this.height = 150;
        this.gravity = 0.6
        this.imageStandRight = image1
        this.imageStandLeft = image2
        this.imageRunRight = image3
        this.imageRunLeft = image4
        this.position = {
            x: 100,
            y: 400
        }
        this.velocity = {
            x: 0,
            y: 1
        }
        this.currentImage = {
            stand: {
                right: this.imageStandRight,
                left: this.imageStandLeft,
                cropWidth: 177,
                width: 70
            },
            run: {
                right: this.imageRunRight,
                left: this.imageRunLeft,
                cropWidth: 341,
                width: 129

            }
        }
        this.current = this.currentImage.stand.right
        this.currentCropWidth = 177
        this.frame = 0
    }
    draw(ctx) {
        ctx.drawImage(this.current, this.currentCropWidth * this.frame, 0, this.currentCropWidth, 400, this.position.x, this.position.y, this.width, this.height)

    }

    update(canvas, ctx) {
        this.frame++
        if (this.frame >= 28) this.frame = 0
        this.draw(ctx)
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        if (this.position.y > canvas.height - this.height) {
            this.velocity.y += 100
        } else {
            this.velocity.y += this.gravity
        }
    }

}