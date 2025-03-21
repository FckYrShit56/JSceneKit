'use strict'

import SCNConstraint from './SCNConstraint'
import SCNNode from './SCNNode'
import SCNVector3 from './SCNVector3'


/**
 * A constraint that orients a node to always point toward a specified other node. 
 * @access public
 * @extends {SCNConstraint}
 * @see https://developer.apple.com/documentation/scenekit/scnlookatconstraint
 */
export default class SCNLookAtConstraint extends SCNConstraint {

  /**
   * constructor
   * @access public
   * @constructor
   */
  constructor() {
    super()

    // Modifying a Constraint

    /**
     * A Boolean value that specifies whether constrained nodes are allowed to rotate.
     * @type {boolean}
     * @see https://developer.apple.com/documentation/scenekit/scnlookatconstraint/1468675-isgimballockenabled
     */
    this.isGimbalLockEnabled = false

    /**
     * The node toward which constrained nodes will point after being reoriented.
     * @type {?SCNNode}
     * @see https://developer.apple.com/documentation/scenekit/scnlookatconstraint/1468677-target
     */
    this.target = null


    // Instance Properties

    /**
     * 
     * @type {SCNVector3}
     * @see https://developer.apple.com/documentation/scenekit/scnlookatconstraint/2867570-localfront
     */
    this.localFront = null

    /**
     * 
     * @type {SCNVector3}
     * @see https://developer.apple.com/documentation/scenekit/scnlookatconstraint/2867488-targetoffset
     */
    this.targetOffset = null

    /**
     * 
     * @type {SCNVector3}
     * @see https://developer.apple.com/documentation/scenekit/scnlookatconstraint/2902240-worldup
     */
    this.worldUp = null

  }

  // Creating a Look-At Constraint

  /**
   * Creates a look-at constraint for a specified target node.
   * @access public
   * @param {?SCNNode} target - The node that constrained nodes will be reoriented to point toward.
   * @returns {void}
   * @desc To attach constraints to an SCNNode object, use its constraints property.
   * @see https://developer.apple.com/documentation/scenekit/scnlookatconstraint/1468683-init
   */
  static constraintWithTarget(target) {
    const constraint = new SCNLookAtConstraint()
    // TODO: implement
    return constraint
  }
}
