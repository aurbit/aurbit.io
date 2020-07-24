const ethereumButton = document.querySelector('.enableEthereumButton')

ethereumButton.addEventListener('click', async () => {
  //Will Start the metamask extension
  const accounts = ethereum.request({ method: 'eth_requestAccounts' })
})

if (typeof window.ethereum !== 'undefined') {
  const ethBtn = document.getElementById('ethereumButton')
  const chain = document.getElementById('chain')
  // add the address to the button text
  ethBtn.innerText = window.ethereum.selectedAddress
  // update the button text
  ethereum.on('accountsChanged', accounts => {
    ethBtn.innerText = accounts
  })

  // switch the chain text
  switch (window.ethereum.chainId) {
    case '0x1': {
      chain.innerText = 'Mainnet'
      break
    }

    case '0x3': {
      chain.innerText = 'Ropsten'
      break
    }
    case '0x4': {
      chain.innerText = 'Rinkeby'
      break
    }
    case '0x5': {
      chain.innerText = 'Goerli'
      break
    }
    case '0x2a': {
      chain.innerText = 'Kovan'
      break
    }
    default: {
      chain.innerText = 'Mainnet'
    }
  }

  // reload if the chain changes
  ethereum.on('chainChanged', chainId => {
    window.location.reload()
  })
}
