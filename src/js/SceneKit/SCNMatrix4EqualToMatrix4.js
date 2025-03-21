'use strict'

import SCNMatrix4 from './SCNMatrix4'
import _InstanceOf from '../util/_InstanceOf'

/**
 * Returns a Boolean value that indicates whether the corresponding elements of two matrices are equal.
 * @access public
 * @param {SCNMatrix4} a - 
 * @param {SCNMatrix4} b - 
 * @returns {boolean} - 
 * @desc This function performs a numeric (not bitwise) comparison of each pair of elements.
 * @see https://developer.apple.com/documentation/scenekit/1409665-scnmatrix4equaltomatrix4
 */
const SCNMatrix4EqualToMatrix4 = function(a, b) {
  if(!_InstanceOf(a, SCNMatrix4)){
    return false
  }
  return a.equalTo(b)
}

export default SCNMatrix4EqualToMatrix4
