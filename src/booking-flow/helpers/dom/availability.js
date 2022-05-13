/* eslint-disable max-classes-per-file */
import dom from '../dom'

/**
 * Ironing
 */
class AvailDom {
    static openings = class {
        static cleanUp() {
            dom.id('start-time-block')
                ?.querySelectorAll('.start-time')
                ?.forEach(e => e.parentNode.removeChild(e))
        }

        static showWarning() {
            dom.id('aval-warning')?.classList.add('msg-active')
        }

        static hideWarning() {
            dom.id('aval-warning')?.classList.remove('msg-active')
        }
    }

    static team = class {
        static showBlock() {
            dom.id('team-members-block')?.classList.add('visible')
        }

        static hideBlock() {
            dom.id('team-members-block')?.classList.remove('visible')
        }

        static cleanUp() {
            dom.id('team-members-block')
                ?.querySelectorAll('.team-member')
                ?.forEach(e => e.parentNode.removeChild(e))
        }

        static get memberTemplate() {
            return dom.id('team-member-template')
        }
    }

    static teamMember = class {
        static get name() {
            return dom.id('team-member-name').value
        }

        static set name(name) {
            dom.id('team-member-name').value = name
        }

        static get firstName() {
            return dom.id('team-member-first-name').value
        }

        static set firstName(first) {
            dom.id('team-member-first-name').value = first
        }

        static get avatar() {
            return dom.id('team-members-block')?.querySelector('img').src
        }
    }
}

const domAvail = AvailDom
export default domAvail
