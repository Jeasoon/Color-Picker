import Color from "./Color";
import HtmlElement from "./HtmlElement";

export default class Renderer {

    private curColor: Color
    private readonly htmlElement: HtmlElement

    constructor(htmlElement: HtmlElement, color: Color = new Color()) {
        this.htmlElement = htmlElement
        this.curColor = color
        this.invalidate()
    }

    getColor(): Color {
        return this.curColor
    }

    setColor(newColor: Color | null) {
        if (!newColor) {
            return;
        }
        if (this.curColor.equals(newColor)) {
            return;
        }

        const oldColor = this.curColor
        this.curColor = newColor;

        if (oldColor.hsvH != newColor.hsvH) {
            this.invalidateHuePanel()
        }

        this.invalidatePreviewPanel()
        this.invalidateSvPanel()
        this.invalidateColorText()
    }

    invalidate() {
        this.invalidateHuePanel()
        this.invalidatePreviewPanel()
        this.invalidateSvPanel()
        this.invalidateColorText()
    }

    private invalidateColorText() {
        let curColor = this.curColor
        let renderElement = this.htmlElement

        // 文字信息 hsv
        renderElement.inputHsvH.value = Math.round(curColor.hsvH).toString()
        renderElement.inputHsvS.value = Math.round(curColor.hsvS).toString()
        renderElement.inputHsvV.value = Math.round(curColor.hsvV).toString()

        // 文字信息 hsl
        renderElement.inputHslH.value = Math.round(curColor.hslH).toString()
        renderElement.inputHslS.value = Math.round(curColor.hslS).toString()
        renderElement.inputHslL.value = Math.round(curColor.hslL).toString()

        // 文字信息 rgb
        renderElement.inputR.value = Math.round(curColor.rgbR).toString()
        renderElement.inputG.value = Math.round(curColor.rgbG).toString()
        renderElement.inputB.value = Math.round(curColor.rgbB).toString()

        // 文字信息 hex
        renderElement.inputHex.value = curColor.hex
    }


    private invalidatePreviewPanel() {
        let curColor = this.curColor
        let renderElement = this.htmlElement

        // 颜色预览
        renderElement.btnColorPicker.style.backgroundColor = curColor.hex
        renderElement.panelPreview.style.backgroundColor = curColor.hex
    }

    private invalidateHuePanel() {
        let curColor = this.curColor
        let ctxHue = this.htmlElement.ctxHue
        let panelHue = this.htmlElement.panelHue

        // 清屏
        ctxHue.clearRect(0,0, panelHue.width, panelHue.height)

        // 色相：色相环
        const hueGrd = ctxHue.createLinearGradient(0, 0, panelHue.width, 0)
        hueGrd.addColorStop(0 / 6, 'rgb(255, 0, 0)')
        hueGrd.addColorStop(1 / 6, 'rgb(255, 255, 0)')
        hueGrd.addColorStop(2 / 6, 'rgb(0, 255, 0)')
        hueGrd.addColorStop(3 / 6, 'rgb(0, 255, 255)')
        hueGrd.addColorStop(4 / 6, 'rgb(0, 0, 255)')
        hueGrd.addColorStop(5 / 6, 'rgb(255, 0, 255)')
        hueGrd.addColorStop(6 / 6, 'rgb(255, 0, 0)')
        ctxHue.fillStyle = hueGrd
        ctxHue.fillRect(0, panelHue.height / 6, panelHue.width, panelHue.height * 2 / 3)

        // 进度
        const huePositionX = (curColor.hsvH % 360) / 360 * panelHue.width
        ctxHue.fillStyle = 'rgb(0, 0, 0)'
        ctxHue.fillRect(huePositionX - 1, 0, 3, panelHue.height)
    }

    private invalidateSvPanel() {
        let curColor = this.curColor
        let ctxSv = this.htmlElement.ctxSv
        let panelSv = this.htmlElement.panelSv

        // 清屏
        ctxSv.clearRect(0,0, panelSv.width, panelSv.height)

        // 色相：底色
        ctxSv.fillStyle = new Color(curColor.hsvH).hsl
        ctxSv.fillRect(0, 0, panelSv.width, panelSv.height)

        // 饱和度：底色，横向白色渐变
        const satGrd = ctxSv.createLinearGradient(0, 0, panelSv.width, 0)
        satGrd.addColorStop(0, 'rgba(255,255,255,1)')
        satGrd.addColorStop(1, 'rgba(255,255,255,0)')
        ctxSv.fillStyle = satGrd
        ctxSv.fillRect(0, 0, panelSv.width, panelSv.height)

        // 亮度：底色，纵向黑色渐变
        const lgtGrd = ctxSv.createLinearGradient(0, 0, 0, panelSv.height)
        lgtGrd.addColorStop(0, 'rgba(0,0,0,0)')
        lgtGrd.addColorStop(1, 'rgba(0,0,0,1)')
        ctxSv.fillStyle = lgtGrd
        ctxSv.fillRect(0, 0, panelSv.width, panelSv.height)

        // 饱和度位置
        let svX = curColor.hsvS / 100 * panelSv.width
        // 亮度位置
        let svY = (1 - curColor.hsvV / 100) * panelSv.height

        // 外边框：黑色
        ctxSv.fillStyle = 'rgb(0, 0, 0)'
        ctxSv.beginPath()
        ctxSv.arc(svX, svY, 10, 0, 360)
        ctxSv.closePath()
        ctxSv.fill()

        // 内填充：白色
        ctxSv.fillStyle = 'rgb(255, 255, 255)'
        ctxSv.beginPath()
        ctxSv.arc(svX, svY, 8, 0, 360)
        ctxSv.closePath()
        ctxSv.fill()

        // 预览色：rgb
        ctxSv.fillStyle = curColor.rgb
        ctxSv.beginPath()
        ctxSv.arc(svX, svY, 6, 0, 360)
        ctxSv.closePath()
        ctxSv.fill()
    }
}
