# @garster/cert-check

Node module to check how many days till a cert expires.

![Production is on fire when the cert expires](expired-cert.jpg)

Are you still manually installing HTTPS certificates like I am?

Are you using SAN certs to try to bring sanity to "HTTPS all the things"?

Do you have so many it's hard to keep track, they expire, and set Production on fire?

NO MORE! Check those certs, find out how many more days you can put it off.

## Install

Just like any other NPM package.

```sh
npm i @garster/cert-check
```

## Details

No dependencies, uses [Node's TLS API](https://nodejs.org/api/tls.html).

The module uses a default export so you can name it what ever you want when you import it. I like `gCertCheck`.

Takes 1 parameter, a string of the FQDN with or without port (will default to 443 if none given), for example `garyscott.net`, `garyscott.net:443`, `garyscott.net:8443`. No other validation, just spell your domain correctly and you will be golden.

Returns info about the cert (cn, fingerprint) you can use to identify the SAN cert a domain belongs to.

Returns a Promise, fulfilled with a tasty object of data or rejected with the error. That means you must use the aync/await, try/catch, and/or .then/.catch syntax.

Returned object:
```js
{
  site: "string", // the same domain/domain:port you passed in
  validTo: "iso-8601 date string", // when the cert expires, probally in UTC
  daysTillExp: number // days to expiration, ignoring timezone
  cn: "string", // the CN of the subject, the main domain in the cert, useful for SAN certs
  fingerprint: "string" // hash of the cert, again useful for grouping domains in SAN certs
}

```

## Usage

### Check one domain
```js
'use strict'
import gCertCheck from '@garster/cert-check'

(async () => {

  try {

    const result = await gCertCheck('garyscott.net')
    console.table(result)

  } catch (error) {

    console.table(error)
  }

})()
```

### Check many domains, all at once, one error fails them all
```js
'use strict'
import gCertCheck from '@garster/cert-check'

(async () => {

  const sites = ['garyscott.net', 'omnomnm.com']

  const promises = sites.map(url => gCertCheck(url))

  await Promise.all(promises)
    .then(result => console.table(result))
    .catch(error => console.table(error))

})()
```

### Check many domains, all at once, show success and fails
```js
'use strict'
import gCertCheck from '@garster/cert-check'

(async () => {

  const sites = ['garyscott.net', 'omnomnm.com']

  const promises = sites.map(url => gCertCheck(url))

  await Promise.allSettled(promises)
    .then((results) => results.forEach((result) => console.table(result)))

})()
```