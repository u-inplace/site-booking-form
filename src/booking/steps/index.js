import { STEP } from '../constants'
import AvailabilityStep from './availability'
import CleaningStep from './cleaning'
import DurationStep from './duration'
import IroningStep from './ironing'
import PostalCodeStep from './postalCode'
import ServicesStep from './services'

const Steps = {
    [STEP.PostalCode]: new PostalCodeStep(),
    [STEP.Services]: new ServicesStep(),
    [STEP.Ironing]: new IroningStep(),
    [STEP.Cleaning]: new CleaningStep(),
    [STEP.Duration]: new DurationStep(),
    [STEP.Availability]: new AvailabilityStep()
}

export default Steps
