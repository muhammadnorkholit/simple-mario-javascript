export default class Helpers {
    createImage(url) {
        const image = new Image()
        image.src = url
        return image
    }
}