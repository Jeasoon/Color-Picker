import HtmlElement from "./HtmlElement";
import Renderer from "./Renderer";
import Controller from "./Controller";
import Color from "./Color";

export default class ColorPicker {

    private readonly htmlElement: HtmlElement
    private readonly renderer: Renderer
    private readonly controller: Controller

    private lastColor: Color | null = null

    colorChangeListener: ((this: ColorPicker, newColor: Color, oldColor: Color | null) => any) | null = null

    constructor(htmlElement: HtmlElement = HtmlElement.inflateDefault()) {
        this.htmlElement = htmlElement
        this.renderer = new Renderer(htmlElement)
        this.controller = new Controller(htmlElement)

        this.setupListeners()
        this.notifyColorChange()
    }

    set value(newValue: string) {
        this.renderer.setColor(Color.hex(newValue))
        this.notifyColorChange()
    }

    get value(): string {
        return this.renderer.getColor().hex
    }

    private setupListeners() {
        const renderer = this.renderer
        const controller = this.controller

        controller.hexChangeListener = (color: string) => {
            renderer.setColor(Color.hex(color))
            this.notifyColorChange()
        }

        controller.hsvChangeListener = (h, s, v) => {
            renderer.setColor(Color.hsv(h, s, v))
            this.notifyColorChange()
        }

        controller.hslChangeListener = (h, s, l) => {
            renderer.setColor(Color.hsl(h, s, l))
            this.notifyColorChange()
        }

        controller.rgbChangeListener = (r, g, b) => {
            renderer.setColor(Color.rgb(r, g, b))
            this.notifyColorChange()
        }

        controller.hueChangeListener = (h) => {
            const oldColor = renderer.getColor()
            renderer.setColor(Color.hsv(h, oldColor.hsvS, oldColor.hsvV))
            this.notifyColorChange()
        }

        controller.svChangeListener = (s, v) => {
            const oldColor = renderer.getColor()
            renderer.setColor(Color.hsv(oldColor.hsvH, s, v))
            this.notifyColorChange()
        }

    }

    private notifyColorChange() {
        const listener = this.colorChangeListener
        if (!listener) {
            return
        }
        const oldColor = this.lastColor
        const newColor = this.renderer.getColor()
        if (newColor.equals(oldColor)) {
            return
        }
        listener.call(this, newColor, oldColor)
    }

}

