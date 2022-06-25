export default class GenericObject {
    constructor(x, y, image) {
        this.position = {
            x: x,
            y: y
        }
        this.size = {
            width: image.width,
            height: image.height    
        }
        this.image = image
        this.velocity = 0

    }
    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y)
    }
    update(ctx) {
        this.draw(ctx)
        this.position.x += this.velocity
    }
}