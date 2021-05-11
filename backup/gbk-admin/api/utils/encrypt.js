const { createHash } = require('crypto');

/**
 * @param {string} algorithm
 * @param {any} content
 *  @return {string}
 */
const encrypt = (algorithm, content) => {
  let hash = createHash(algorithm)
  hash.update(content)
  return hash.digest('hex')
}

/**
 * @param {any} content
 *  @return {string}
 */
const sha1 = (content) => encrypt('sha1', content)

/**
 * @param {any} content
 *  @return {string}
 */
const md5 = (content) => encrypt('md5', content)

const createAuth = (data = '', use_time = true, salt = '_chiro#3521') => sha1((use_time ? (new Date().toString()) : '') + salt + data);

// export default encrypt;

module.exports = { encrypt, sha1, createAuth, md5 };