const drag_list = document.getElementById('drag-list')
const checkSelection = document.getElementById('validate')

const topCrypto = [
  'Bitcoin',
  'Ethereum',
  'Binance Coin',
  'Ripple',
  'Terra Luna',
  'Cadano',
  'Solana',
  'Avalanche',
  'Polkadot',
  'Doge Coin',
  'Terra USD',
  'Polygon Matic',
  'Cosmos ATOM',
  'Litecoin',
  'Near Protocol',
  'Tron',
  'Bitcoin Cash',
  'Algorand',
  'Stellar',
  'Fantom',
  'Hedera',
  'Ethereum Classic',
  'Internet Computer',
  'Filecoin',
  'VeChain',
  'Monero',
  'Klatyn',
  'Elrond',
  'Theta Network',
  'Tezos'
]

// store crypto items
const cryptoCoins = []

let dragStartIndex

let touchStartIndex

createItems()

// insert crypto items into DOM
function createItems() {
  // copies the ordered array
  ;[...topCrypto]

    // this changes the array to objects with a value and a sort
    .map((c) => ({ value: c, sort: Math.random() }))

    // compares and sorts the coins according to (random)index property
    .sort((a, b) => a.sort - b.sort)

    // returns the value of the (c) object wth property of 'value' as strings but this time scrambled
    .map((c) => c.value)

    // callback functiion
    .forEach((coin, index) => {
      const cryptoItem = document.createElement('li')

      cryptoItem.setAttribute('data-index', index)

      cryptoItem.innerHTML = `
    <span class="number">${index + 1}</span>
    <div class="draggable" draggable="true">
     <p class="coin-name">${coin}</p>
     <i class="fas fa-grip-lines"></i>
    </div>
    `

      // this pushes the element into the empty array
      cryptoCoins.push(cryptoItem)

      drag_list.appendChild(cryptoItem)
    })

  addEvents()
}

// DRAG EVENTS FOR DESKTOP
function dragStart() {
  // console.log('Event: ', 'dragstart')

  // actuall move items using the dragStart_index we initialized above
  dragStartIndex = +this.closest('li').getAttribute('data-index')
}
function dragEnter() {
  // console.log('Event: ', 'dragenter')
  this.classList.add('over')
}
function dragLeave() {
  // console.log('Event: ', 'dragleave')
  this.classList.remove('over')
}
function dragOver(evt) {
  // console.log('Event: ', 'dragover')

  // event to prevent default action getting in the way
  evt.preventDefault()
}
function dragDrop() {
  // console.log('Event: ', 'drop')

  // drag end index
  const dragEndIndex = +this.getAttribute('data-index')

  // actuall swap items function
  swapCoins(dragStartIndex, dragEndIndex)

  // this removes the over background after an item is dropped in a new position
  this.classList.remove('over')
}

//

// TOUCH CALLBACK FUNCTION FOR MOBILE
function touchStart(evt) {
  // console.log('Event: ', 'touchstart')

  // evt.preventDefault()
  // touchStartIndex = +this.closest('li').getAttribute('data-index')
  originalX = evt.target.offsetLeft - 10 + 'px'
  originalY = evt.target.offsetTop - 10 + 'px'
  activeEvent = 'touchstart'

  this.classList.add('over')
}

function touchMove(event) {
  // console.log('Event: ', 'touchmove')
  // this.classList.add('over')
  // const touchEndIndex = +this.getAttribute('data-index')

  const touchLocation = event.targetTouches[index]
  const pageX = touchLocation.pageX - 50 + 'px'
  const pageY = touchLocation.pageY - 50 + 'px'

  activeEvent = 'touchmove'
}

function touchEnd(evt) {
  // console.log('Event: ', 'touchend')
  // touchSwap(touchStartIndex, touchEndIndex)

  evt.preventDefault()

  if ((activeEvent = 'touchmove')) {
    const pageX = parseInt(evt.target.style.left) - 50
    const pageY = parseInt(evt.target.style.top) - 50
  } else {
    evt.target.style.left = originalX
    evt.target.style.top = originalY
  }

  this.classList.remove('over')
}

function touchCancel(evt) {
  // console.log('Event: ', 'touchcancel')
  this.classList.remove('over')
  // evt.preventDefault()
}

// CALLBACK FUNCTION FOR TOUCH

function touchSwap(fromTouch, toTouch) {
  const touchOne = cryptoCoins[fromTouch].querySelector('.draggable')
  const touchTwo = cryptoCoins[toTouch].querySelector('.draggable')

  cryptoCoins[fromTouch].appendChild(touchTwo)
  cryptoCoins[toTouch].appendChild(touchOne)
}

//

//

// SWAP ITEMS ON DROP
function swapCoins(fromIndex, toIndex) {
  const coinOne = cryptoCoins[fromIndex].querySelector('.draggable')
  const coinTwo = cryptoCoins[toIndex].querySelector('.draggable')

  // swapping the coins in the DOm
  cryptoCoins[fromIndex].appendChild(coinTwo)
  cryptoCoins[toIndex].appendChild(coinOne)
}

// CALLBACK for CHECK Button on Click
function checkOrder() {
  cryptoCoins.forEach((cryptoItem, index) => {
    const coinName = cryptoItem.querySelector('.draggable').innerText.trim()

    if (coinName != topCrypto[index]) {
      cryptoItem.classList.add('wrong')
    } else {
      cryptoItem.classList.remove('wrong')
      cryptoItem.classList.add('right')
    }
  })
}

//  event listeners for DESKTOP
function addEvents() {
  const draggs = document.querySelectorAll('.draggable')
  const draggListItems = document.querySelectorAll('.drag-list li')
  const touches = document.querySelectorAll('.draggable')
  const touchListItems = document.querySelectorAll('.drag-list li')

  // DESKTOP
  draggs.forEach((dragg) => {
    dragg.addEventListener('dragstart', dragStart)
  })

  draggListItems.forEach((items) => {
    items.addEventListener('dragover', dragOver)
    items.addEventListener('drop', dragDrop)
    items.addEventListener('dragenter', dragEnter)
    items.addEventListener('dragleave', dragLeave)
  })

  // MOBILE
  touches.forEach((touch) => {
    touch.addEventListener('touchstart', touchStart, false)
  })

  touchListItems.forEach((touchItems) => {
    touchItems.addEventListener('touchend', touchEnd, false)
    touchItems.addEventListener('touchmove', touchMove, false)
    touchItems.addEventListener('touchcancel', touchCancel)
  })
}

// EVENT LISTENER FOR THE CHECK BUTTON
checkSelection.addEventListener('click', checkOrder)

//

//

// function getPositionX(event) {
//   return event.type.includes('mouse') ? pageX : event.touches[0].clientX
// }

// function amimation() {
//   setSliderPosition()
//   if (addEvents) requestAnimationFrame(animation)
// }

// function setSliderPosition() {
//   slider.style.transform = `translateX(${currentTranslate}px)`
// }

// function setSliderPositionIndex() {
//   currentTranslate = currentIndex * -window.innerWidth
//   prevTranslate = currentTranslate

//   setSliderPosition()
// }
