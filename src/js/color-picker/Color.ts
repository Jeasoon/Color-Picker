export default class Color {

    static hsv(h: number = 0, s: number = 100, v: number = 100): Color {
        return new Color(h, s, v)
    }

    static hsl(h: number = 0, s: number = 100, l: number = 50): Color {
        let hslArr = this.hslToHsv(h, s, l)
        return new Color(hslArr[0], hslArr[1], hslArr[2])
    }

    static rgb(r: number = 0, g: number = 0, b: number = 0): Color {
        let rgbArr = this.rgbToHsv(r, g, b)
        return new Color(rgbArr[0], rgbArr[1], rgbArr[2])
    }

    static hex(rawHex: string = ""): Color | null {
        const hex = rawHex.trim()
        if (hex.length < 7) return null
        if (!hex.startsWith("#")) return null
        const r = parseInt(hex.substring(1, 3), 16)
        const g = parseInt(hex.substring(3, 5), 16)
        const b = parseInt(hex.substring(5, 7), 16)
        let rgbArr = this.rgbToHsv(r, g, b)
        return new Color(rgbArr[0], rgbArr[1], rgbArr[2])
    }

    readonly hsvH: number = 0
    readonly hsvS: number = 100
    readonly hsvV: number = 100

    readonly hslH: number = 0
    readonly hslS: number = 100
    readonly hslL: number = 100

    readonly rgbR: number = 0
    readonly rgbG: number = 0
    readonly rgbB: number = 0

    readonly rgb: string = ""
    readonly hsl: string = ""
    readonly hsv: string = ""
    readonly hex: string = ""

    constructor(h: number = 0, s: number = 100, v: number = 100) {
        this.hsvH = h
        this.hsvS = s
        this.hsvV = v
        this.hsl = `hsl(${this.hsvH}, ${this.hsvS}%, ${this.hsvV}%)`

        const rgbArr = Color.hsvToRgb(h, s, v)
        this.rgbR = rgbArr[0]
        this.rgbG = rgbArr[1]
        this.rgbB = rgbArr[2]
        this.rgb = `rgb(${this.rgbR}, ${this.rgbG}, ${this.rgbB})`

        const hslArr = Color.hsvToHsl(h, s, v)
        this.hslH = hslArr[0]
        this.hslS = hslArr[1]
        this.hslL = hslArr[2]
        this.hsl = `hsl(${hslArr[0]}, ${hslArr[1]}%, ${hslArr[2]}%)`

        this.hex = `#${Color.toHexValue(this.rgbR)}${Color.toHexValue(this.rgbG)}${Color.toHexValue(this.rgbB)}`
    }

    equals(other: Color | null): boolean {
        if (!other) return false
        return (this.hsvH == other.hsvH) && (this.hsvS == other.hsvS) && (this.hsvV == other.hsvV);
    }

    private static hsvToRgb(hValue: number, sValue: number, vValue: number): Array<number> {
        let h = hValue
        let s = sValue / 100
        let v = vValue / 100

        let tempH = Math.floor(h / 60);
        let temp1 = h / 60 - tempH;
        let temp2 = v * (1 - s);
        let temp3 = v * (1 - temp1 * s);
        let temp4 = v * (1 - (1 - temp1) * s);

        let rgbByPercent;
        switch (tempH) {
            case 0:
                rgbByPercent = [v, temp4, temp2];
                break;
            case 1:
                rgbByPercent = [temp3, v, temp2];
                break;
            case 2:
                rgbByPercent = [temp2, v, temp4];
                break;
            case 3:
                rgbByPercent = [temp2, temp3, v];
                break;
            case 4:
                rgbByPercent = [temp4, temp2, v];
                break;
            case 5:
                rgbByPercent = [v, temp2, temp3];
                break;
            default:
                rgbByPercent = [0, 0, 0]
        }

        return [
            Math.round(rgbByPercent[0] * 255),
            Math.round(rgbByPercent[1] * 255),
            Math.round(rgbByPercent[2] * 255)
        ]
    }

    private static hsvToHsl(hValue: number, sValue: number, vValue: number): Array<number> {
        let h = hValue
        let s = sValue / 100
        let v = vValue / 100

        let hslH, hslS, hslL;

        hslH = h;

        if (v == 0) {
            hslS = 0;
            hslL = 0;
        } else if (v <= 1 / (2 - s)) {
            hslS = s / (2 - s);
            hslL = (2 * v - v * s) / 2;
        } else {
            hslS = v * s / (2 - 2 * v + v * s);
            hslL = (2 * v - v * s) / 2;
        }

        return [hslH, hslS * 100, hslL * 100]
    }

    private static rgbToHsv(rValue: number, gValue: number, bValue: number): Array<number> {
        let r = rValue / 255;
        let g = gValue / 255;
        let b = bValue / 255;

        let max = r;
        if (g > max) max = g;
        if (b > max) max = b;

        let min = r;
        if (g < min) min = g;
        if (b < min) min = b;

        let h = 0, s = 0, v = 0;

        if (max == min) h = 0;
        else if (max == r && g >= b) h = 60 * (g - b) / (max - min);
        else if (max == r && g < b) h = 60 * (g - b) / (max - min) + 360;
        else if (max == g) h = 60 * (b - r) / (max - min) + 120;
        else if (max == b) h = 60 * (r - g) / (max - min) + 240;

        if (max == 0) s = 0; else s = 1 - min / max;

        v = max;

        return [h, s * 100, v * 100];
    }


    private static hslToHsv(hValue: number, sValue: number, lValue: number): Array<number> {
        let h = hValue
        let s = sValue / 100
        let l = lValue / 100

        let hHsv, sHsv, vHsv;

        hHsv = h;

        if (l == 0) {
            sHsv = 0;
            vHsv = 0;
        } else if (l > 0 && l <= 0.5) {
            sHsv = 2 * s / (1 + s);
            vHsv = l * (1 + s);
        } else {
            sHsv = (2 * s - 2 * s * l) / (s - s * l + l);
            vHsv = s - s * l + l;
        }

        return [hHsv, sHsv * 100, vHsv * 100];
    }


    private static toHexValue(num: number): string {
        let hex = Math.round(num).toString(16)
        if (hex.length < 2) {
            hex = `0${hex}`
        }
        return hex.toUpperCase()
    }

}