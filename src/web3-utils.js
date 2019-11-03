/**
 * Returns the injected provider, if there is one.
 * @returns {Object} Returns web3 object.
 */
export function getInjectedProvider() {
  if (window.ethereum) {
    return window.ethereum
  }
  if (window.web3 && window.web3.currentProvider) {
    return window.web3.currentProvider
  }
  return null
}
