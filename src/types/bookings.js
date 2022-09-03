/**
 * @typedef {Object} BookingsReadResponse
 * @property {BookingsReadData[]} data
 * @property {Links} links
 * @property {Meta} meta
 */
/**
 * @typedef {Object} BookingsReadData
 * @property {string} id
 * @property {string} type
 * @property {BookingsReadAttrs} attributes
 */
/**
 * @typedef {Object} BookingsReadAttrs
 * @property {number} worker_contract_id
 * @property {number} customer_contract_id
 * @property {string} worker_display_name
 * @property {string} customer_display_name
 * @property {string} delivery_date
 * @property {string} start_time
 * @property {string} end_time
 * @property {boolean} recurrence
 * @property {string} service_delivery_start_time
 * @property {string} service_delivery_end_time
 * @property {'assigned' | 'cancelled'| 'finished'} service_delivery_status
 * @property {string} voucher_type
 * @property {number} billable_hours
 * @property {number} voucher_count
 * @property {string} customer_sodexo_reference
 * @property {string} worker_sodexo_reference
 * @property {'created'|'RemittedByProvider'|'ValidatedByProvider'} sodexo_status
 * @property {number} sodexo_duration
 */
/**
 * @typedef {Object} Links
 * @property {string} self
 * @property {string} first
 * @property {string} prev
 * @property {string} next
 * @property {string} last
 */
/**
 * @typedef {Object} Meta
 * @property {Pagination} pagination
 */
/**
 * @typedef {Object} Pagination
 * @property {number} current_page
 * @property {number} per_page
 * @property {number} total_pages
 * @property {number} total_objects
 */

/**
 * @type {BookingsReadResponse}
 */
const BookingReadResponse = {}
const BookingDummy = {}

export { BookingDummy, BookingReadResponse }
