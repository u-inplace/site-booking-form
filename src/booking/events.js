import Steps from './steps'

/**
 * Workaround to avoid ciclic dependence between slider and Steps to raise
 * onSlideActive
 */
export default class EventController {
    static raiseOnActive(stepNo) {
        Steps[stepNo].onActive()
    }
}
