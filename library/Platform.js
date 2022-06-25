 export default class Platform {
     constructor(x, y, image) {
         this.width = image.width;
         this.height = image.height;
         this.image = image;
         this.position = {
             x: x,
             y: y
         }
     }
     draw(ctx) {
         ctx.drawImage(this.image, this.position.x, this.position.y)
         //  ctx.fillRect(this.position.x, this.position.y, this.width, this.height)


     }
 }