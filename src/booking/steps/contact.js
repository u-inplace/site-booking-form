/* eslint-disable class-methods-use-this */
import { STEP } from '../constants'
import BaseStep from './base'

export default class ContactStep extends BaseStep {
    constructor() {
        super(STEP.Contact)
    }

    onActive() {}
}
