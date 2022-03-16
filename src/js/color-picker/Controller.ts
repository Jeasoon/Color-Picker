import HtmlElement from "./HtmlElement";

export default class Controller {

    private readonly htmlElement: HtmlElement

    hexChangeListener: ((this: Controller, hex: string) => any) | null = null
    hsvChangeListener: ((this: Controller, h: number, s: number, l: number) => any) | null = null
    hslChangeListener: ((this: Controller, h: number, s: number, l: number) => any) | null = null
    rgbChangeListener: ((this: Controller, h: number, s: number, l: number) => any) | null = null
    svChangeListener: ((this: Controller, s: number, v: number) => any) | null = null
    hueChangeListener: ((this: Controller, h: number) => any) | null = null

    constructor(htmlElement: HtmlElement) {
        this.htmlElement = htmlElement

        this.setupListeners()
    }

    private setupListeners() {
        const htmlElement = this.htmlElement


        const clickBtnColorPickerListener = () => {
            const oldVisibility = htmlElement.colorDashboard.style.visibility
            if (oldVisibility == "visible") {
                htmlElement.colorDashboard.style.visibility = "hidden"
            } else {
                htmlElement.colorDashboard.style.visibility = "visible"
            }
        }
        htmlElement.btnColorPicker.addEventListener("click", clickBtnColorPickerListener)


        const hexListener = () => {
            const listener = this.hexChangeListener
            if (listener) {
                listener.call(this, htmlElement.inputHex.value)
            }
        }
        htmlElement.inputHex.addEventListener("input", hexListener)


        const hsvListener = () => {
            const listener = this.hsvChangeListener
            if (listener) {
                const h = parseFloat(htmlElement.inputHsvH.value)
                const s = parseFloat(htmlElement.inputHsvS.value)
                const v = parseFloat(htmlElement.inputHsvV.value)
                listener.call(this, h, s, v)
            }
        }
        htmlElement.inputHsvH.addEventListener("input", hsvListener)
        htmlElement.inputHsvS.addEventListener("input", hsvListener)
        htmlElement.inputHsvV.addEventListener("input", hsvListener)


        const hslListener = () => {
            const listener = this.hslChangeListener
            if (listener) {
                const h = parseFloat(htmlElement.inputHslH.value)
                const s = parseFloat(htmlElement.inputHslS.value)
                const l = parseFloat(htmlElement.inputHslL.value)
                listener.call(this, h, s, l)
            }
        }
        htmlElement.inputHslH.addEventListener("input", hslListener)
        htmlElement.inputHslS.addEventListener("input", hslListener)
        htmlElement.inputHslL.addEventListener("input", hslListener)


        const rgbListener = () => {
            const listener = this.rgbChangeListener
            if (listener) {
                const r = parseFloat(htmlElement.inputR.value)
                const g = parseFloat(htmlElement.inputG.value)
                const b = parseFloat(htmlElement.inputB.value)
                listener.call(this, r, g, b)
            }
        }
        htmlElement.inputR.addEventListener("input", rgbListener)
        htmlElement.inputG.addEventListener("input", rgbListener)
        htmlElement.inputB.addEventListener("input", rgbListener)


        const dragSvListener = (event: MouseEvent) => {
            if (event.buttons == 0 || event.button != 0) {
                return
            }
            const listener = this.svChangeListener
            if (listener) {
                const s = event.offsetX / htmlElement.panelSv.width * 100;
                const v = (1 - event.offsetY / htmlElement.panelSv.height) * 100
                listener.call(this, s, v)
            }
        }
        htmlElement.panelSv.addEventListener("mousedown", dragSvListener)
        htmlElement.panelSv.addEventListener("mouseup", dragSvListener)
        htmlElement.panelSv.addEventListener("mousemove", dragSvListener)


        const dragHueListener = (event: MouseEvent) => {
            if (event.buttons == 0 || event.button != 0) {
                return
            }
            const listener = this.hueChangeListener
            if (listener) {
                const hue = event.offsetX / htmlElement.panelHue.width * 360;
                listener.call(this, hue)
            }
        }
        htmlElement.panelHue.addEventListener("mousedown", dragHueListener)
        htmlElement.panelHue.addEventListener("mouseup", dragHueListener)
        htmlElement.panelHue.addEventListener("mousemove", dragHueListener)
    }

}
