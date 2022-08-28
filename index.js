import tls from 'tls'
import * as utils from './utils.js'

/**
 * Given a domain will connect, pull its HTTP cert, and extract useful info
 * 
 * @param {string} site valid domain or domain:port to check
 * @returns {Promise}
 */
function gCertCheck(site) {

  return new Promise((resolve, reject) => {

    try {

      const options = utils.buildTlsOptions(site)

      const socket = tls.connect(options, () => {

        const cert = socket.getPeerCertificate()

        socket.destroy()

        const result = utils.buildResult(site, cert)

        resolve(result)
      })

      socket.on('error', (error) => {
        reject(error)
      })

    } catch (error) {
      reject(error)
    }
  })
}

export default gCertCheck
