
/**
 * Builds options object for use in tls.connect()
 * 
 * @param {string} site domain or domain:port
 * @returns {object} options for tls.connect()
 */
export const buildTlsOptions = function (site) {

  const [host, port] = site.split(':')

  const options = {
    host,
    servername: host,
    port: port || 443
  }

  return options
}

/**
 * Extract, format, calucate useful in then return it
 * 
 * @param {string} site domain or domain:port
 * @param {tls.PeerCertificate} cert the cert we need to extract data from
 * @returns {object} object with data about cert and expiration
 */
export const buildResult = function (site, cert) {

  const validTo = new Date(cert.valid_to).toJSON()
  const daysTillExp = diffInDays(new Date(), new Date(validTo))

  const result = {
    site,
    validTo,
    daysTillExp,
    cn: cert.subject.CN,
    fingerprint: cert.fingerprint
  }

  return result
}

/**
 * Finds number of days from date to date ignoring timezone
 * 
 * @param {Date} from Usually now
 * @param {Date} to Usually the valid_to date of cert
 * @returns {int} number of days from given date to given date
 */
const diffInDays = function (from, to) {

  const msInDay = 86400000
  const fromUtc = Date.UTC(from.getFullYear(), from.getMonth(), from.getDate())
  const toUtc = Date.UTC(to.getFullYear(), to.getMonth(), to.getDate())

  return Math.floor((toUtc - fromUtc) / msInDay)
}
