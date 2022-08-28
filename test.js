'use strict'
import gCertCheck from './index.js'

(async () => {

  console.log('Run all concurrently but fail all if any error')

  const sites1 = ['garyscott.net', 'omnomnm.com']

  const promises1 = sites1.map(url => gCertCheck(url))

  await Promise.all(promises1)
    .then(result => console.table(result))
    .catch(error => console.table(error))


  console.log('Run all concurrently showing both success and failure')

  const sites2 = ['garyscott.net', 'does-not-exist.garyscott.net']

  const promises2 = sites2.map(url => gCertCheck(url))

  await Promise.allSettled(promises2)
    .then((results) => results.forEach((result) => console.table(result)))


  console.log('Run one')
  try {

    const result = await gCertCheck('garyscott.net')
    console.table(result)

  } catch (error) {

    console.table(error)
  }


})()
