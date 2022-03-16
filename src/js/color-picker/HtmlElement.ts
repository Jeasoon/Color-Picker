export default class HtmlElement {

    private static readonly BTN_COLOR_PICKER_ID = "btn-color-picker"
    private static readonly COLOR_DASHBOARD_ID = "color-dashboard"

    private static readonly PANEL_PREVIEW_ID = "panel-preview"
    private static readonly PANEL_SV_ID = "panel-sv"
    private static readonly PANEL_HUE_ID = "panel-hue"

    private static readonly INPUT_HSV_H_ID = "input-hsv-h"
    private static readonly INPUT_HSV_S_ID = "input-hsv-s"
    private static readonly INPUT_HSV_V_ID = "input-hsv-v"

    private static readonly INPUT_HSL_H_ID = "input-hsl-h"
    private static readonly INPUT_HSL_S_ID = "input-hsl-s"
    private static readonly INPUT_HSL_L_ID = "input-hsl-l"

    private static readonly INPUT_R_ID = "input-r"
    private static readonly INPUT_G_ID = "input-g"
    private static readonly INPUT_B_ID = "input-b"

    private static readonly INPUT_HEX_ID = "input-hex"

    static inflateDefault(): HtmlElement {
        const btnColorPicker = <HTMLButtonElement>document.getElementById(HtmlElement.BTN_COLOR_PICKER_ID)
        const colorDashboard = <HTMLElement>document.getElementById(HtmlElement.COLOR_DASHBOARD_ID)

        const panelPreview = <HTMLElement>document.getElementById(HtmlElement.PANEL_PREVIEW_ID)
        const panelSv = <HTMLCanvasElement>document.getElementById(HtmlElement.PANEL_SV_ID)
        const panelHue = <HTMLCanvasElement>document.getElementById(HtmlElement.PANEL_HUE_ID)
        const ctxSv = <CanvasRenderingContext2D>panelSv.getContext("2d")
        const ctxHue = <CanvasRenderingContext2D>panelHue.getContext("2d")

        const inputHsvH = <HTMLInputElement>document.getElementById(HtmlElement.INPUT_HSV_H_ID)
        const inputHsvS = <HTMLInputElement>document.getElementById(HtmlElement.INPUT_HSV_S_ID)
        const inputHsvV = <HTMLInputElement>document.getElementById(HtmlElement.INPUT_HSV_V_ID)

        const inputHslH = <HTMLInputElement>document.getElementById(HtmlElement.INPUT_HSL_H_ID)
        const inputHslS = <HTMLInputElement>document.getElementById(HtmlElement.INPUT_HSL_S_ID)
        const inputHslL = <HTMLInputElement>document.getElementById(HtmlElement.INPUT_HSL_L_ID)

        const inputR = <HTMLInputElement>document.getElementById(HtmlElement.INPUT_R_ID)
        const inputG = <HTMLInputElement>document.getElementById(HtmlElement.INPUT_G_ID)
        const inputB = <HTMLInputElement>document.getElementById(HtmlElement.INPUT_B_ID)

        const inputHex = <HTMLInputElement>document.getElementById(HtmlElement.INPUT_HEX_ID)

        return new HtmlElement(
            btnColorPicker, colorDashboard,
            panelPreview, panelSv, panelHue,
            ctxSv, ctxHue,
            inputHsvH, inputHsvS, inputHsvV,
            inputHslH, inputHslS, inputHslL,
            inputR, inputG, inputB,
            inputHex
        )
    }


    readonly btnColorPicker: HTMLButtonElement

    readonly colorDashboard: HTMLElement

    readonly panelPreview: HTMLElement
    readonly panelSv: HTMLCanvasElement
    readonly panelHue: HTMLCanvasElement
    readonly ctxSv: CanvasRenderingContext2D
    readonly ctxHue: CanvasRenderingContext2D

    readonly inputHsvH: HTMLInputElement
    readonly inputHsvS: HTMLInputElement
    readonly inputHsvV: HTMLInputElement

    readonly inputHslH: HTMLInputElement
    readonly inputHslS: HTMLInputElement
    readonly inputHslL: HTMLInputElement

    readonly inputR: HTMLInputElement
    readonly inputG: HTMLInputElement
    readonly inputB: HTMLInputElement

    readonly inputHex: HTMLInputElement

    constructor(
        btnColorPicker: HTMLButtonElement,
        colorDashboard: HTMLElement,
        panelPreview: HTMLElement,
        panelSv: HTMLCanvasElement,
        panelHue: HTMLCanvasElement,
        ctxSv: CanvasRenderingContext2D,
        ctxHue: CanvasRenderingContext2D,
        inputHsvH: HTMLInputElement,
        inputHsvS: HTMLInputElement,
        inputHsvV: HTMLInputElement,
        inputHslH: HTMLInputElement,
        inputHslS: HTMLInputElement,
        inputHslL: HTMLInputElement,
        inputR: HTMLInputElement,
        inputG: HTMLInputElement,
        inputB: HTMLInputElement,
        inputHex: HTMLInputElement,
    ) {

        this.btnColorPicker = btnColorPicker
        this.colorDashboard = colorDashboard
        this.panelPreview = panelPreview
        this.panelSv = panelSv
        this.panelHue = panelHue
        this.ctxSv = ctxSv
        this.ctxHue = ctxHue
        this.inputHsvH = inputHsvH
        this.inputHsvS = inputHsvS
        this.inputHsvV = inputHsvV
        this.inputHslH = inputHslH
        this.inputHslS = inputHslS
        this.inputHslL = inputHslL
        this.inputR = inputR
        this.inputG = inputG
        this.inputB = inputB
        this.inputHex = inputHex
    }
}