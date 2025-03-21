'use strict'

import NSObject from '../ObjectiveC/NSObject'
//import SCNAnimatable from './SCNAnimatable'
import SCNFilterMode from './SCNFilterMode'
//import SCNMatrix4 from './SCNMatrix4'
import SCNMatrix4MakeTranslation from './SCNMatrix4MakeTranslation'
import SCNOrderedDictionary from './SCNOrderedDictionary'
import SCNTransaction from './SCNTransaction'
import SCNWrapMode from './SCNWrapMode'
import SKColor from '../SpriteKit/SKColor'
import _InstanceOf from '../util/_InstanceOf'


/**
 * A container for the color or texture of one of a material’s visual properties. 
 * @access public
 * @extends {NSObject}
 * @implements {SCNAnimatable}
 * @see https://developer.apple.com/documentation/scenekit/scnmaterialproperty
 */
export default class SCNMaterialProperty extends NSObject {
  static get _propTypes() {
    return {
      color: ['NSColor', '_contents'],
      image: ['NSMutableDictionary', (obj, dict, key, coder) => {
        if(typeof dict.data !== 'undefined'){
          obj._loadContentsImageByData(dict.data)
          return
        }
        let path = ''
        if(typeof dict.path !== 'undefined'){
          path = dict.path
        }else if(typeof dict.URL !== 'undefined'){
          path = dict.URL
        }
        if(coder._urlTranslator){
          path = coder._urlTranslator(path, coder)
        }
        obj._loadContentsImage(path, coder._directoryPath)
      }],
      float: ['float', (obj, value) => {
        obj._contents = new SKColor(value, value, value, 1.0)
      }],
      intensity: 'float',
      // contentsTransform
      wrapS: 'integer',
      wrapT: 'integer',
      minificationFilter: 'integer',
      magnificationFilter: 'integer',
      mipFilter: 'integer',
      maxAnisotropy: 'float',
      mappingChannel: 'integer',
      borderColor: 'plist',

      propertyType: ['integer', null],
      parent: ['SCNMaterial', '_parent'],
      isCommonProfileProperty: ['boolean', null],
      sRGB: ['boolean', null],
      customSlotName: ['string', null],
      textureComponents: ['integer', null]
    }
  }

  // Creating a Material Property

  /**
   * Creates a new material property object with the specified contents.
   * @access public
   * @constructor
   * @param {Object} contents - The visual contents of the material property—a color, image, or source of animated content. For details, see the discussion of the  contents property.
   * @desc Newly created SCNMaterial objects contain SCNMaterialProperty instances for all of their visual properties. To change a material’s visual properties, you modify those instances rather than creating new material property objects.You create new SCNMaterialProperty instances to provide textures for use with custom GLSL shaders—for details, see SCNShadable.
   * @see https://developer.apple.com/documentation/scenekit/scnmaterialproperty/1395386-init
   */
  constructor(contents = null) {
    super()

    // Working with Material Property Contents

    /**
     * The visual contents of the material property—a color, image, or source of animated content. Animatable.
     * @access private
     * @type {?Object}
     * @see https://developer.apple.com/documentation/scenekit/scnmaterialproperty/1395372-contents
     */
    this._contents = contents

    /**
     * A number between 0.0 and 1.0 that modulates the effect of the material property. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnmaterialproperty/1395407-intensity
     */
    this.intensity = 0


    // Configuring Texture Mapping Attributes

    /**
     * The transformation applied to the material property’s visual contents. Animatable.
     * @type {SCNMatrix4}
     * @see https://developer.apple.com/documentation/scenekit/scnmaterialproperty/1395388-contentstransform
     */
    this.contentsTransform = SCNMatrix4MakeTranslation(0, 0, 0)

    /**
     * The wrapping behavior for the S texture coordinate.
     * @type {SCNWrapMode}
     * @see https://developer.apple.com/documentation/scenekit/scnmaterialproperty/1395384-wraps
     */
    this.wrapS = SCNWrapMode.clamp

    /**
     * The wrapping behavior for the T texture coordinate.
     * @type {SCNWrapMode}
     * @see https://developer.apple.com/documentation/scenekit/scnmaterialproperty/1395382-wrapt
     */
    this.wrapT = SCNWrapMode.clamp

    /**
     * Texture filtering for rendering the material property’s image contents at a size smaller than that of the original image.
     * @type {SCNFilterMode}
     * @see https://developer.apple.com/documentation/scenekit/scnmaterialproperty/1395390-minificationfilter
     */
    this.minificationFilter = SCNFilterMode.linear

    /**
     * Texture filtering for rendering the material property’s image contents at a size larger than that of the original image.
     * @type {SCNFilterMode}
     * @see https://developer.apple.com/documentation/scenekit/scnmaterialproperty/1395378-magnificationfilter
     */
    this.magnificationFilter = SCNFilterMode.linear

    /**
     * Texture filtering for using mipmaps to render the material property’s image contents at a size smaller than that of the original image.
     * @type {SCNFilterMode}
     * @see https://developer.apple.com/documentation/scenekit/scnmaterialproperty/1395398-mipfilter
     */
    this.mipFilter = SCNFilterMode.nearest

    /**
     * The amount of anisotropic texture filtering to be used when rendering the material property’s image contents.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnmaterialproperty/1395402-maxanisotropy
     */
    this.maxAnisotropy = 0

    /**
     * The source of texture coordinates for mapping the material property’s image contents.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnmaterialproperty/1395405-mappingchannel
     */
    this.mappingChannel = 0

    /**
     * A color used to fill in areas of a material’s surface not covered by the material property’s image contents.
     * @type {?Object}
     * @deprecated
     * @see https://developer.apple.com/documentation/scenekit/scnmaterialproperty/1395376-bordercolor
     */
    this.borderColor = null

    /**
     * @access private
     * @type {SCNMaterial}
     */
    this._parent = null

    ///////////////////
    // SCNAnimatable //
    ///////////////////

    /**
     * @access private
     * @type {Map}
     */
    this._animations = new SCNOrderedDictionary()

    this.__presentation = null

    /**
     * @access private
     * @type {Promise}
     */
    this._loadedPromise = null
  }

  _createPresentation() {
    if(this.__presentation === null){
      this.__presentation = this.copy()
    }
  }

  _copyPresentation() {
    // TODO: copy other properties
    this.__presentation._contents = this._contents
  }

  get _presentation() {
    if(this.__presentation === null){
      return null
    }
    return this.__presentation
  }

  /**
   *
   * @access public
   * @returns {SCNMaterialProperty} -
   */
  copy() {
    const p = new SCNMaterialProperty()
    p._contents = this._contents // TODO: copy
    p.intensity = this.intensity
    p.contentsTransform = this.contentsTransform // TODO: copy
    p.wrapS = this.wrapS
    p.wrapT = this.wrapT
    p.minificationFilter = this.minificationFilter
    p.magnicifactionFilter = this.maginicifactionFilter
    p.mipFilter = this.mipFilter
    p.maxAnisotropy = this.maxAnisotropy
    p.mappingChannel = this.mappingChannel
    p.borderColor = this.borderColor // TODO: copy
    //p._parent
    //p._animations
    //p._presentation

    return p
  }

  valueForKeyPath(keyPath) {
    const target = this.__presentation ? this.__presentation : this

    // TODO: add other keys
    if(keyPath === 'contents'){
      return target._contents
    }

    return super.valueForKeyPath(keyPath)
  }

  setValueForKeyPath(value, keyPath) {
    const target = this.__presentation ? this.__presentation : this

    // TODO: add other keys
    if(keyPath === 'contents'){
      target._contents = value
    }else{
      super.setValueForKeyPath(value, keyPath)
    }
  }

  /**
   * The visual contents of the material property—a color, image, or source of animated content. Animatable.
   * @type {?Object}
   * @see https://developer.apple.com/documentation/scenekit/scnmaterialproperty/1395372-contents
   */
  get contents() {
    return this._contents
  }

  set contents(newValue) {
    const oldValue = this._contents
    this._contents = newValue
    SCNTransaction._addChange(this, 'contents', oldValue, newValue)
  }

  ///////////////////
  // SCNAnimatable //
  ///////////////////

  // Managing Animations

  /**
   * Required. Adds an animation object for the specified key.
   * @access public
   * @param {CAAnimation} animation - The animation object to be added.
   * @param {?string} key - An string identifying the animation for later retrieval. You may pass nil if you don’t need to reference the animation later.
   * @returns {void}
   * @desc Newly added animations begin executing after the current run loop cycle ends.SceneKit does not define any requirements for the contents of the key parameter—it need only be unique among the keys for other animations you add. If you add an animation with an existing key, this method overwrites the existing animation.
   * @see https://developer.apple.com/documentation/scenekit/scnanimatable/1523386-addanimation
   */
  addAnimationForKey(animation, key) {
    //console.log('SCNMaterialProperty addAnimationForKey')
    if(typeof key === 'undefined' || key === null){
      key = Symbol()
    }
    const anim = animation.copy()
    // FIXME: use current frame time
    anim._animationStartTime = Date.now() * 0.001
    anim._prevTime = anim._animationStartTime - 0.0000001

    this._animations.set(key, anim)
  }

  /**
   * Required. Returns the animation with the specified key.
   * @access public
   * @param {string} key - A string identifying a previously added animation.
   * @returns {?CAAnimation} - 
   * @desc Attempting to modify any properties of the returned object results in undefined behavior.
   * @see https://developer.apple.com/documentation/scenekit/scnanimatable/1524020-animation
   */
  animationForKey(key) {
    return this._animations.get(key)
  }

  /**
   * Required. Removes all the animations currently attached to the object.
   * @access public
   * @returns {void}
   * @see https://developer.apple.com/documentation/scenekit/scnanimatable/1522762-removeallanimations
   */
  removeAllAnimations() {
    this._animations.clear()
  }

  /**
   * Required. Removes the animation attached to the object with the specified key.
   * @access public
   * @param {string} key - A string identifying an attached animation to remove.
   * @returns {void}
   * @see https://developer.apple.com/documentation/scenekit/scnanimatable/1522880-removeanimation
   */
  removeAnimationForKey(key) {
    this._animations.delete(key)
    // TODO: reset values
  }

  /**
   * Required. Removes the animation attached to the object with the specified key, smoothly transitioning out of the animation’s effect.
   * @access public
   * @param {string} key - A string identifying an attached animation to remove.
   * @param {number} duration - The duration for transitioning out of the animation’s effect before it is removed.
   * @returns {void}
   * @desc Use this method to create smooth transitions between the effects of multiple animations. For example, the geometry loaded from a scene file for a game character may have associated animations for player actions such as walking and jumping. When the player lands from a jump, you remove the jump animation so the character continues walking. If you use the removeAnimation(forKey:) method to remove the jump animation, SceneKit abruptly switches from the current frame of the jump animation to the current frame of the walk animation. If you use the removeAnimation(forKey:fadeOutDuration:) method instead, SceneKit plays both animations at once during that duration and interpolates vertex positions from one animation to the other, creating a smooth transition.
   * @see https://developer.apple.com/documentation/scenekit/scnanimatable/1522841-removeanimation
   */
  removeAnimationForKeyFadeOutDuration(key, duration) {
  }

  /**
   * Required. An array containing the keys of all animations currently attached to the object.
   * @type {string[]}
   * @desc This array contains all keys for which animations are attached to the object, or is empty if there are no attached animations. The ordering of animation keys in the array is arbitrary.
   * @see https://developer.apple.com/documentation/scenekit/scnanimatable/1523610-animationkeys
   */
  get animationKeys() {
    const keys = []
    for(const key of this._animations.keys()){
      keys.push(key)
    }
    return keys
  }

  // Pausing and Resuming Animations

  /**
   * Required. Pauses the animation attached to the object with the specified key.
   * @access public
   * @param {string} key - A string identifying an attached animation.
   * @returns {void}
   * @desc This method has no effect if no animation is attached to the object with the specified key.
   * @see https://developer.apple.com/documentation/scenekit/scnanimatable/1523592-pauseanimation
   */
  pauseAnimationForKey(key) {
  }

  /**
   * Required. Resumes a previously paused animation attached to the object with the specified key.
   * @access public
   * @param {string} key - A string identifying an attached animation.
   * @returns {void}
   * @desc This method has no effect if no animation is attached to the object with the specified key or if the specified animation is not currently paused.
   * @see https://developer.apple.com/documentation/scenekit/scnanimatable/1523332-resumeanimation
   */
  resumeAnimationForKey(key) {
  }

  /**
   * Required. Returns a Boolean value indicating whether the animation attached to the object with the specified key is paused.
   * @access public
   * @param {string} key - A string identifying an attached animation.
   * @returns {boolean} - 
   * @see https://developer.apple.com/documentation/scenekit/scnanimatable/1523703-isanimationpaused
   */
  isAnimationPausedForKey(key) {
    return false
  }

  // Instance Methods

  /**
   * Required. 
   * @access public
   * @param {number} speed - 
   * @param {string} key - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/scenekit/scnanimatable/1778343-setanimationspeed
   */
  setAnimationSpeedForKey(speed, key) {
  }

  /**
   * @access private
   * @param {WebGLContext} gl -
   * @returns {number} -
   */
  _wrapSFor(gl) {
    switch(this.wrapS){
      case SCNWrapMode.clamp:
        return gl.CLAMP_TO_EDGE // FIXME: do not apply the texture out of 0-1
      case SCNWrapMode.repeat:
        return gl.REPEAT
      case SCNWrapMode.clampToBorder:
        return gl.CLAMP_TO_EDGE
      case SCNWrapMode.mirror:
        return gl.MIRRORED_REPEAT
      default:
        throw new Error(`unknown wrapS: ${this.wrapS}`)
    }
  }

  /**
   * @access private
   * @param {WebGLContext} gl -
   * @returns {number} -
   */
  _wrapTFor(gl) {
    switch(this.wrapT){
      case SCNWrapMode.clamp:
        return gl.CLAMP_TO_EDGE // FIXME: do not apply the texture out of 0-1
      case SCNWrapMode.repeat:
        return gl.REPEAT
      case SCNWrapMode.clampToBorder:
        return gl.CLAMP_TO_EDGE
      case SCNWrapMode.mirror:
        return gl.MIRRORED_REPEAT
      default:
        throw new Error(`unknown wrapT: ${this.wrapT}`)
    }
  }

  /**
   * @access private
   * @param {WebGLContext} gl -
   * @returns {number} -
   */
  _minificationFilterFor(gl) {
    switch(this.minificationFilter){
      case SCNFilterMode.none:
      case SCNFilterMode.linear: {
        switch(this.mipFilter){
          case SCNFilterMode.none:
            return gl.LINEAR
          case SCNFilterMode.nearest:
            return gl.LINEAR_MIPMAP_NEAREST
          case SCNFilterMode.linear:
            return gl.LINEAR_MIPMAP_LINEAR
          default:
            throw new Error(`unknown mipmapFilter: ${this.mipmapFilter}`)
        }
      }
      case SCNFilterMode.nearest: {
        switch(this.mipFilter){
          case SCNFilterMode.none:
            return gl.NEAREST
          case SCNFilterMode.nearest:
            return gl.NEAREST_MIPMAP_NEAREST
          case SCNFilterMode.linear:
            return gl.NEAREST_MIPMAP_LINEAR
          default:
            throw new Error(`unknown mipmapFilter: ${this.mipmapFilter}`)
        }
      }
      default:
        throw new Error(`unknown minificationFilter: ${this.minificationFilter}`)
    }
  }

  /**
   * @access private
   * @param {WebGLContext} gl -
   * @returns {number} -
   */
  _magnificationFilterFor(gl) {
    switch(this.magnificationFilter){
      case SCNFilterMode.none:
        return gl.LINEAR // default value
      case SCNFilterMode.nearest:
        return gl.NEAREST
      case SCNFilterMode.linear:
        return gl.LINEAR
      default:
        throw new Error(`unknown magnificationFilter: ${this.magnificationFilter}`)
    }
  }

  /**
   * @access private
   * @param {string} path -
   * @param {string} dirPath -
   * @returns {Image} -
   */
  _loadContentsImage(path, dirPath) {
    const image = new Image()
    // TODO: check option if it allows cross-domain.
    image.crossOrigin = 'anonymous'

    // TODO: refactoring
    if(typeof path === 'object' && typeof path.then === 'function'){
      this._loadedPromise = new Promise((resolve, reject) => {
        path.then((_path) => {
          image.onload = () => {
            this._contents = image
            resolve()
          }
          image.onerror = () => {
            reject(new Error(`image ${_path} load error.`))
          }
          image.src = _path
        })
      })
      return image
    }

    let __path = path
    if(__path.indexOf('file:///') === 0){
      __path = __path.slice(8)
    }
    // TODO: load OpenEXR File
    __path = __path.replace(/\.exr$/, '.png')

    this._loadedPromise = new Promise((resolve, reject) => {
      const paths = __path.split('/')
      let pathCount = 1
      let _path = dirPath + paths.slice(-pathCount).join('/')
      image.onload = () => {
        this._contents = image
        resolve()
      }
      image.onerror = () => {
        pathCount += 1
        if(pathCount > paths.length){
          // try the root path
          image.onerror = () => {
            // give up
            reject()
            throw new Error(`image ${path} load error.`)
          }
          image.src = __path
        }else{
          // retry
          _path = dirPath + paths.slice(-pathCount).join('/')
          image.src = _path
        }
      }
      image.src = _path
    })
    return image
  }

  /**
   * @access private
   * @param {Uint8Array} data - 
   * @returns {Image} -
   */
  _loadContentsImageByData(data) {
    const image = new Image()
    // TODO: check option if it allows cross-domain.
    image.crossOrigin = 'anonymous'

    this._loadedPromise = new Promise((resolve, reject) => {
      image.onload = () => {
        this._contents = image
        resolve()
      }
      image.onerror = () => {
        reject()
      }
      // TODO: check file type by magic
      let blob = new Blob([data], { type: 'image/png' })
      let url = URL.createObjectURL(blob)
      image.src = url
    })
    return image
  }

  /**
   * @access public
   * @returns {Float32Array} -
   */
  float32Array() {
    const target = this.__presentation ? this.__presentation : this
    if(_InstanceOf(target._contents, SKColor)){
      return target._contents.float32Array()
      //return target._contents.srgbToLinear().float32Array()
    }
    return new Float32Array([1, 1, 1, 1])
  }

  /**
   * @access private
   * @returns {Promise} -
   */
  _getLoadedPromise() {
    if(this._loadedPromise){
      return this._loadedPromise
    }
    
    return Promise.resolve()
  }

  /**
   * @access public
   * @type {Promise} -
   */
  get didLoad() {
    return this._getLoadedPromise()
  }
}

