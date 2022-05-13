import dom from '../dom'

/**
 * Ironing
 */
class IroningDom {
    static get selected() {
        return dom.getRadio('ironing-size', true)?.value?.replace(/^ironing-size-/, '')
    }
}

const domIroning = IroningDom
export default domIroning
