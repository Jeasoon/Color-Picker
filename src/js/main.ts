import ColorPicker from "./color-picker/ColorPicker";
import Color from "./color-picker/Color";

const colorPicker = new ColorPicker()
colorPicker.value = '#00FF00'
colorPicker.colorChangeListener = (newColor: Color) => {
    console.log(`[color] hsv: ${newColor.hsv}, hsl: ${newColor.hsl}, rgb: ${newColor.rgb}, hex: ${newColor.hex}`)
}

