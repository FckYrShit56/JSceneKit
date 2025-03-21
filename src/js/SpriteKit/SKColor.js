'use strict'

import NSObject from '../ObjectiveC/NSObject'
//import NSColorSpaceModel from '../AppKit/NSColorSpaceModel'

/**
 * An object that stores color data and sometimes opacity (that is, alpha value). 
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/documentation/uikit/uicolor
 */
export default class SKColor extends NSObject {
  static get _propTypes() {
    return {
      $constructor: (propNames, propValues) => {
        if(typeof propValues.NSColorSpace !== 'undefined'){
          // initialize for NSColor
          /*
          const buf = propValues.NSRGB || propValues.NSWhite
          const ascii = buf.toString('ascii')
          const values = ascii.split(' ')
          const space = propValues.NSColorSpace - 1
          switch(space){
            case NSColorSpaceModel.gray:
              break
            case NSColorSpaceModel.RGB: {
              const r = parseFloat(values[0])
              const g = parseFloat(values[1])
              const b = parseFloat(values[2])
              const a = 1.0
              console.log(`NSColor -> SKColor: r:${r} g:${g} b:${b} a:${a}`)
              return new SKColor(r, g, b, a)
            }
            case NSColorSpaceModel.CMYK:
              if(propValues.NSWhite){
                const w = parseFloat(values[0])
                return new SKColor(w, w, w, 1.0)
              }
              break
            case NSColorSpaceModel.LAB:
              break
            case NSColorSpaceModel.deviceN:
              break
            case NSColorSpaceModel.indexed:
              break
            case NSColorSpaceModel.patterned:
              break
          }
          console.error(`unknown color space: ${propValues.NSColorSpace}`)
          throw new Error(`unknown color space: ${propValues.NSColorSpace}`)
          */
          if(typeof propValues.NSRGB !== 'undefined'){
            const ascii = propValues.NSRGB.toString('ascii')
            const values = ascii.split(' ')
            const r = parseFloat(values[0])
            const g = parseFloat(values[1])
            const b = parseFloat(values[2])
            const a = 1.0
            //console.log(`NSColor -> SKColor NSRGB: r:${r} g:${g} b:${b} a:${a}`)
            //if(propValues.NSColorSpace === 1){
            //  return new SKColor(1, 1, 1, 1)
            //}
            return new SKColor(r, g, b, a)
          }else if(typeof propValues.NSWhite !== 'undefined'){
            const ascii = propValues.NSWhite.toString('ascii')
            const values = ascii.split(' ')
            const w = parseFloat(values[0])
            const a = 1.0
            //console.log(`NSColor -> SKColor NSWhite: r:${w} g:${w} b:${w} a:${a}`)
            return new SKColor(w, w, w, a)
          }

          console.error('unknown color space')
          throw new Error('unknown color space')
        }

        // TODO: implement
        return new SKColor()
      },
      // for NSColor
      NSRGB: ['bytes', null],
      NSWhite: ['bytes', null],
      NSComponents: ['bytes', null],
      NSColorSpace: ['integer', null],
      NSCustomColorSpace: ['NSColorSpace', null]
    }
  }

  /**
   * @access private
   * @param {Buffer} data -
   * @param {number} [offset = 0] -
   * @param {boolean} [bigEndian = false] -
   * @returns {SKColor}
   */
  static _initWithData(data, offset = 0, bigEndian = false) {
    const instance = new SKColor()
    if(bigEndian){
      instance.red = data.readFloatBE(offset + 0)
      instance.green = data.readFloatBE(offset + 4)
      instance.blue = data.readFloatBE(offset + 8)
      instance.alpha = data.readFloatBE(offset + 12)
    }else{
      instance.red = data.readFloatLE(offset + 0)
      instance.green = data.readFloatLE(offset + 4)
      instance.blue = data.readFloatLE(offset + 8)
      instance.alpha = data.readFloatLE(offset + 12)
    }
    return instance
  }

  // Initializers

  /**
   * 
   * @access public
   * @constructor
   * @param {number} red - 
   * @param {number} green - 
   * @param {number} blue - 
   * @param {number} alpha - 
   * @see https://developer.apple.com/documentation/uikit/uicolor/1625015-init
   */
  constructor(red, green, blue, alpha) {
    super()

    /**
     * @type {number}
     */
    this.red = red

    /**
     * @type {number}
     */
    this.green = green

    /**
     * @type {number}
     */
    this.blue = blue

    /**
     * @type {number}
     */
    this.alpha = alpha
  }

  // Creating a Color Object with a Predefined Color

  /**
   * A color object in the sRGB color space whose grayscale value is 0.0 and whose alpha value is 1.0.
   * @type {SKColor}
   * @desc 
   * @see https://developer.apple.com/documentation/uikit/uicolor/1621929-black
   */
  static get black() {
    return new SKColor(0.0, 0.0, 0.0, 1.0)
  }

  /**
   * A color object whose RGB values are 0.0, 0.0, and 1.0 and whose alpha value is 1.0.
   * @type {SKColor}
   * @desc 
   * @see https://developer.apple.com/documentation/uikit/uicolor/1621947-blue
   */
  static get blue() {
    return new SKColor(0.0, 0.0, 1.0, 1.0)
  }

  /**
   * A color object whose RGB values are 0.6, 0.4, and 0.2 and whose alpha value is 1.0.
   * @type {SKColor}
   * @desc 
   * @see https://developer.apple.com/documentation/uikit/uicolor/1621950-brown
   */
  static get brown() {
    return new SKColor(0.6, 0.4, 0.2, 1.0)
  }

  /**
   * A color object whose grayscale and alpha values are both 0.0.
   * @type {SKColor}
   * @desc 
   * @see https://developer.apple.com/documentation/uikit/uicolor/1621945-clear
   */
  static get clear() {
    return new SKColor(0.0, 0.0, 0.0, 0.0)
  }

  /**
   * A color object whose RGB values are 0.0, 1.0, and 1.0 and whose alpha value is 1.0.
   * @type {SKColor}
   * @desc 
   * @see https://developer.apple.com/documentation/uikit/uicolor/1621942-cyan
   */
  static get cyan() {
    return new SKColor(0.0, 1.0, 1.0, 1.0)
  }

  /**
   * A color object whose grayscale value is 1/3 and whose alpha value is 1.0.
   * @type {SKColor}
   * @desc 
   * @see https://developer.apple.com/documentation/uikit/uicolor/1621952-darkgray
   */
  static get darkGray() {
    const third = 1.0 / 3.0
    return new SKColor(third, third, third, 1.0)
  }

  /**
   * A color object whose grayscale value is 0.5 and whose alpha value is 1.0.
   * @type {SKColor}
   * @desc 
   * @see https://developer.apple.com/documentation/uikit/uicolor/1621941-gray
   */
  static get gray() {
    return new SKColor(0.5, 0.5, 0.5, 1.0)
  }

  /**
   * A color object whose RGB values are 0.0, 1.0, and 0.0 and whose alpha value is 1.0.
   * @type {SKColor}
   * @desc 
   * @see https://developer.apple.com/documentation/uikit/uicolor/1621946-green
   */
  static get green() {
    return new SKColor(0.0, 1.0, 0.0, 1.0)
  }

  /**
   * A color object whose grayscale value is 2/3 and whose alpha value is 1.0.
   * @type {SKColor}
   * @desc 
   * @see https://developer.apple.com/documentation/uikit/uicolor/1621932-lightgray
   */
  static get lightGray() {
    const twoThirds = 2.0 / 3.0
    return new SKColor(twoThirds, twoThirds, twoThirds, 1.0)
  }

  /**
   * A color object whose RGB values are 1.0, 0.0, and 1.0 and whose alpha value is 1.0.
   * @type {SKColor}
   * @desc 
   * @see https://developer.apple.com/documentation/uikit/uicolor/1621934-magenta
   */
  static get magenta() {
    return new SKColor(1.0, 0.0, 1.0, 1.0)
  }

  /**
   * A color object whose RGB values are 1.0, 0.5, and 0.0 and whose alpha value is 1.0.
   * @type {SKColor}
   * @desc 
   * @see https://developer.apple.com/documentation/uikit/uicolor/1621956-orange
   */
  static get orange() {
    return new SKColor(1.0, 0.5, 0.0, 1.0)
  }

  /**
   * A color object whose RGB values are 0.5, 0.0, and 0.5 and whose alpha value is 1.0.
   * @type {SKColor}
   * @desc 
   * @see https://developer.apple.com/documentation/uikit/uicolor/1621923-purple
   */
  static get purple() {
    return new SKColor(0.5, 0.0, 0.5, 1.0)
  }
  
  /**
   * A color object whose RGB values are 1.0, 0.0, and 0.0 and whose alpha value is 1.0.
   * @type {SKColor}
   * @desc 
   * @see https://developer.apple.com/documentation/uikit/uicolor/1621924-red
   */
  static get red() {
    return new SKColor(1.0, 0.0, 0.0, 1.0)
  }

  /**
   * A color object whose grayscale value is 1.0 and whose alpha value is 1.0.
   * @type {SKColor}
   * @desc 
   * @see https://developer.apple.com/documentation/uikit/uicolor/1621920-white
   */
  static get white() {
    return new SKColor(1.0, 1.0, 1.0, 1.0)
  }

  /**
   * A color object whose RGB values are 1.0, 1.0, and 0.0 and whose alpha value is 1.0.
   * @type {SKColor}
   * @desc 
   * @see https://developer.apple.com/documentation/uikit/uicolor/1621953-yellow
   */
  static get yellow() {
    return new SKColor(1.0, 1.0, 0.0, 1.0)
  }

  // Creating a Custom UIColor Object in a Specific Color Space

  /**
   * Initializes and returns a color object using the specified opacity and grayscale values. 
   * @access public
   * @param {number} white - The grayscale value of the color object. On applications linked for iOS 10 or later, the color is specified in an extended color space, and the input value  is never clamped. On earlier versions of iOS, white values below 0.0 are interpreted as 0.0, and values above 1.0 are interpreted as 1.0.
   * @param {number} alpha - The opacity value of the color object, specified as a value from 0.0 to 1.0. Alpha values below 0.0 are interpreted as 0.0, and values above 1.0 are interpreted as 1.0
   * @returns {void}
   * @desc On applications linked on iOS 10 or later, the input parameters are not clamped. On earlier versions of iOS, values below 0.0 are interpreted as 0.0, and values above 1.0 are interpreted as 1.0.
   * @see https://developer.apple.com/documentation/uikit/uicolor/1621944-init
   */
  //init(white, alpha) {
  //}

  // Creating a UIColor Object from another Representation of Color

  /**
   * Creates and returns a color object that has the same color space and component values as the receiver, but has the specified alpha component. 
   * @access public
   * @param {number} alpha - The opacity value of the new color object, specified as a value from 0.0 to 1.0. Alpha values below 0.0 are interpreted as 0.0, and values above 1.0 are interpreted as 1.0
   * @returns {SKColor} - 
   * @desc A subclass with explicit opacity components should override this method to return a color with the specified alpha.
   * @see https://developer.apple.com/documentation/uikit/uicolor/1621922-withalphacomponent
   */
  withAlphaComponent(alpha) {
    return new SKColor(this.red, this.green, this.blue, alpha)
  }

  // Creating a UIColor Object that Draws Using a Pattern

  /**
   * Initializes and returns a color object using the specified Quartz color reference. 
   * @access public
   * @param {Image} image - The image to use when creating the pattern color. 
   * @returns {void}
   * @desc You can use pattern colors to set the fill or stroke color just as you would a solid color. During drawing, the image in the pattern color is tiled as necessary to cover the given area. By default, the phase of the returned color is 0, which causes the top-left corner of the image to be aligned with the drawing origin. To change the phase, make the color the current color and then use the setPatternPhase(_:) function to change the phase.
   * @see https://developer.apple.com/documentation/uikit/uicolor/1621933-init
   */
  initPatternImage(image) {
  }

  // Setting the Graphics Context’s Drawing Color

  /**
   * Sets the color of subsequent stroke and fill operations to the color that the receiver represents. 
   * @access public
   * @returns {void}
   * @desc If you subclass UIColor, you must implement this method in your subclass. Your custom implementation should modify both the stroke and fill color in the current graphics context by setting them both to the color represented by the receiver.
   * @see https://developer.apple.com/documentation/uikit/uicolor/1621928-set
   */
  set() {
  }

  /**
   * Sets the color of subsequent fill operations to the color that the receiver represents.
   * @access public
   * @returns {void}
   * @desc If you subclass UIColor, you must implement this method in your subclass. Your custom implementation should modify the fill color in the current graphics context by setting it to the color represented by the receiver.
   * @see https://developer.apple.com/documentation/uikit/uicolor/1621926-setfill
   */
  setFill() {
  }

  /**
   * Sets the color of subsequent stroke operations to the color that the receiver represents.
   * @access public
   * @returns {void}
   * @desc If you subclass UIColor, you must implement this method in your subclass. Your custom implementation should modify the stroke color in the current graphics context by setting it to the color represented by the receiver.
   * @see https://developer.apple.com/documentation/uikit/uicolor/1621948-setstroke
   */
  setStroke() {
  }

  // Retrieving Color Information

  /**
   * Returns the components that make up the color in the HSB color space.
   * @access public
   * @returns {Object} -
   * @property {number} color.hue - On return, the hue component of the color object. On applications linked for iOS 10 or later, the hue component is specified in an extended range color space and can have any value. Values between 0.0 and 1.0 are inside the sRGB color gamut. On earlier versions of iOS, the specified value is always between 0.0 and 1.0.
   * @property {number} color.saturation - On return, the saturation component of the color object. On applications linked for iOS 10 or later, the saturation component is specified in an extended range color space and can have any value. Values between 0.0 and 1.0 are inside the sRGB color gamut. On earlier versions of iOS, the specified value is always between 0.0 and 1.0.
   * @property {number} color.brightness - On return, the brightness component of the color object. On applications linked for iOS 10 or later, the brightness component is specified in an extended range color space and can have any value. Values between 0.0 and 1.0 are inside the sRGB color gamut. On earlier versions of iOS, the specified value is always between 0.0 and 1.0.
   * @property {number} color.alpha - On return, the opacity component of the color object, specified as a value between 0.0 and 1.0.
   * @desc If the color is in a compatible color space, the color is converted into the HSB color space and its components are returned to your application. If the color is not in a compatible color space, the parameters are unchanged.
   * @see https://developer.apple.com/documentation/uikit/uicolor/1621949-gethue
   */
  getHSBA() {
    // TODO: implement
    const color = {
      hue: 0,
      saturation: 0,
      brightness: 0,
      alpha: 0
    }
    return color
  }

  /**
   * Returns the components that make up the color in the RGB color space.
   * @access public
   * @param {number} red -
   * @param {number} green -
   * @param {number} blue -
   * @param {number} alpha -
   * @returns {Object} -
   * @property {number} color.red - On return, the red component of the color object. On applications linked for iOS 10 or later, the red component is specified in an extended range sRGB color space and can have any value. Values between 0.0 and 1.0 are inside the sRGB color gamut. On earlier versions of iOS, the specified value is always between 0.0 and 1.0.
   * @property {number} color.green - On return, the green component of the color object. On applications linked for iOS 10 or later, the green component is specified in an extended range sRGB color space and can have any value. Values between 0.0 and 1.0 are inside the sRGB color gamut. On earlier versions of iOS, the specified value is always between 0.0 and 1.0.
   * @property {number} color.blue - On return, the blue component of the color object. On applications linked for iOS 10 or later, the blue component is specified in an extended range sRGB color space and can have any value. Values between 0.0 and 1.0 are inside the sRGB color gamut. On earlier versions of iOS, the specified value is always between 0.0 and 1.0.
   * @property {number} color.alpha - On return, the opacity component of the color object, specified as a value between 0.0 and 1.0.
   * @desc If the color is in a compatible color space, the color is converted into RGB format and its components are returned to your application. If the color is not in a compatible color space, the parameters are unchanged.
   * @see https://developer.apple.com/documentation/uikit/uicolor/1621919-getred
   */
  getRGBA(red, green, blue, alpha) {
    const color = {
      red: this.red,
      green: this.green,
      blue: this.blue,
      alpha: this.alpha
    }
    return color
  }

  /**
   * Returns the grayscale components of the color.
   * @access public
   * @param {?UnsafeMutablePointer<CGFloat>} white - On return, the grayscale component of the color object. On applications linked for iOS 10 or later, the grayscale component is specified in an extended range gray color space and can have any value. Values between 0.0 and 1.0 are inside the sRGB color gamut. On earlier versions of iOS, the specified value is always between 0.0 and 1.0.
   * @param {?UnsafeMutablePointer<CGFloat>} alpha - On return, the opacity component of the color object, specified as a value between 0.0 and 1.0.
   * @returns {boolean} - 
   * @desc If the color is in a compatible color space, the color is converted into grayscale format and returned to your application. If the color is not in a compatible color space, the parameters are unchanged.
   * @see https://developer.apple.com/documentation/uikit/uicolor/1621927-getwhite
   */
  //getWhite(white, alpha) {
  //  return false
  //}

  /**
   * HTML color representation
   * @access public
   * @type {string}
   */
  get htmlColor() {
    const r = Math.round(this.red * 255)
    const g = Math.round(this.green * 255)
    const b = Math.round(this.blue * 255)
    return `rgba(${r}, ${g}, ${b}, ${this.alpha})`
  }

  /**
   * HTML color representation
   * @access public
   * @type {string}
   */
  get hexColor() {
    const r = Math.round(this.red * 255).toString(16)
    const g = Math.round(this.green * 255).toString(16)
    const b = Math.round(this.blue * 255).toString(16)
    return `#${r}${g}${b}`
  }

  /**
   * @access private
   * @returns {SKColor} -
   */
  _copy() {
    return new SKColor(this.red, this.green, this.blue, this.alpha)
  }

  /**
   * @access private
   * @param {SKColor} c -
   * @param {number} rate -
   * @returns {SKColor} -
   */
  _lerp(c, rate) {
    const r = new SKColor()
    r.red = this.red + rate * (c.red - this.red)
    r.green = this.green + rate * (c.green - this.green)
    r.blue = this.blue + rate * (c.blue - this.blue)
    r.alpha = this.alpha + rate * (c.alpha - this.alpha)
    return r
  }

  zero() {
    return new SKColor(0, 0, 0, 0)
  }

  /**
   * @access public
   * @param {SKColor} c -
   * @returns {SKColor} -
   */
  add(c) {
    const r = new SKColor()
    r.red = this.red + c.red
    r.green = this.green + c.green
    r.blue = this.blue + c.blue
    r.alpha = this.alpha + c.alpha
    return r
  }

  /**
   * @access public
   * @param {SKColor} c -
   * @returns {SKColor} -
   */
  sub(c) {
    const r = new SKColor()
    r.red = this.red - c.red
    r.green = this.green - c.green
    r.blue = this.blue - c.blue
    r.alpha = this.alpha - c.alpha
    return r
  }

  /**
   * @access private
   * @param {number} val -
   * @returns {number} -
   */
  _srgbToLinear(val) {
    if(val <= 0.04045){
      return val / 12.92
    }
    return Math.pow((val + 0.055) / 1.055, 2.4)
  }

  /**
   * @access private
   * @param {number} val -
   * @returns {number} -
   */
  _linearToSrgb(val) {
    if(val <= 0.0031308){
      return val * 12.92
    }
    return 1.055 * Math.pow(val, 1.0 / 2.4)
  }

  /**
   * @access public
   * @returns {SKColor} -
   */
  srgbToLinear() {
    const r = new SKColor()
    r.red = this._srgbToLinear(this.red)
    r.green = this._srgbToLinear(this.green)
    r.blue = this._srgbToLinear(this.blue)
    r.alpha = this.alpha
    return r
  }

  /**
   * @access public
   * @returns {SKColor} -
   */
  linearToSrgb() {
    const r = new SKColor()
    r.red = this._linearToSrgb(this.red)
    r.green = this._linearToSrgb(this.green)
    r.blue = this._linearToSrgb(this.blue)
    r.alpha = this.alpha
    return r
  }

  /**
   * @access public
   * @returns {number[]} -
   */
  floatArray() {
    return [this.red, this.green, this.blue, this.alpha]
  }

  /**
   * @access public
   * @returns {Float32Array} -
   */
  float32Array() {
    return new Float32Array([this.red, this.green, this.blue, this.alpha])
  }
}
