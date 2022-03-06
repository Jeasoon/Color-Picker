const canvasId = "color-picker"
const canvas = <HTMLCanvasElement>document.getElementById(canvasId)
const ctx = canvas ? canvas.getContext('2d') : null

const sampleColorPadding = 20
const sampleColorRadius = 20


const canvasWidth = canvas.width
const canvasHeight = canvas.height - sampleColorRadius * 2 - sampleColorPadding * 2

const sampleColorX = sampleColorPadding + sampleColorRadius
const sampleColorY = canvas.height - sampleColorPadding - sampleColorRadius

const hueBarHeight = 20
const hueBarX = sampleColorPadding * 2 + sampleColorRadius * 2
const hueBarY = canvas.height - sampleColorPadding - sampleColorRadius - hueBarHeight / 2
const hueBarWidth = canvasWidth

if (ctx) {
    // 底色
    ctx.fillStyle = '#FF0000'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // 横向白色
    const whiteGrd = ctx.createLinearGradient(0, 0, canvasWidth, 0)
    whiteGrd.addColorStop(0, 'rgba(255,255,255,1)')
    whiteGrd.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = whiteGrd
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // 纵向黑色
    const blackGrd = ctx.createLinearGradient(0, 0, 0, canvasHeight)
    blackGrd.addColorStop(0, 'rgba(0,0,0,0)')
    blackGrd.addColorStop(1, 'rgba(0,0,0,1)')
    ctx.fillStyle = blackGrd
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // 采样色
    ctx.beginPath()
    ctx.arc(sampleColorX, sampleColorY, sampleColorRadius, 0, Math.PI * 2)
    ctx.fillStyle = '#FF0000'
    ctx.fill()

    // 色环
    const hueGrd = ctx.createLinearGradient(0, 0, canvasWidth, 0)
    hueGrd.addColorStop(0 / 6, 'rgb(255, 0, 0)')
    hueGrd.addColorStop(1 / 6, 'rgb(255, 255, 0)')
    hueGrd.addColorStop(2 / 6, 'rgb(0, 255, 0)')
    hueGrd.addColorStop(3 / 6, 'rgb(0, 255, 255)')
    hueGrd.addColorStop(4 / 6, 'rgb(0, 0, 255)')
    hueGrd.addColorStop(5 / 6, 'rgb(255, 0, 255)')
    hueGrd.addColorStop(6 / 6, 'rgb(255, 0, 0)')
    ctx.fillStyle = hueGrd
    ctx.fillRect(hueBarX, hueBarY, hueBarWidth, hueBarHeight)

    const moveListener = function (event: MouseEvent) {
        console.log('x: ', event.x, ', y: ', event.y)
    }
    canvas.addEventListener('mousedown', function (event) {
        console.log('x: ', event.x, ', y: ', event.y)
        canvas.addEventListener('mousemove', moveListener)
    })
    canvas.addEventListener('mouseup', function (event) {
        canvas.removeEventListener('mousemove', moveListener)
    })
}

export default {}