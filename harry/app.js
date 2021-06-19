const body = document.querySelector('body')
const reqUrl = 'https://raw.githubusercontent.com/Dev-AkshDesai/Family-Tree/Harry-Potter-Family/Harry.json',
      request = new XMLHttpRequest()

request.open('GET', reqUrl)

request.responseType = 'json'
request.send()

request.onload = () => {
  const potters = request.response
  createPotters(potters)
}

function createPotters(obj) {
  obj.forEach(potter => {
    addPotters(potter)
  });
}

// Add potters to the page
function addPotters(potter) {
  const name = document.createElement('h1'),
        birth = document.createElement('p'),
        death = document.createElement('p'),
        education = document.createElement('p')

  name.textContent = potter.Name
  birth.textContent = `Birth - ${potter['Birth Date']}`
  death.textContent = `Death - ${potter['Date f Death']}`
  education.textContent = `Education - ${potter.Education}`

  name.addEventListener('click', () => {
    createCard(potter)
  })

  body.appendChild(name)
  body.appendChild(birth)
  body.appendChild(death)
  body.appendChild(education)
}

// Create Card
function createCard(data) {
  const cardContainer = document.createElement('div')
  const card = document.createElement('div')
  const top = document.createElement('div')
  const closeIcn = document.createElement('i')
  const avatar = document.createElement('div')
  const avatarImg = document.createElement('img')
  const name = document.createElement('h1')
  
  cardContainer.classList.add('card-container')
  cardContainer.appendChild(card)
  card.classList.add('card')
  card.appendChild(top)
  top.classList.add('top')
  top.appendChild(closeIcn)
  closeIcn.classList.add('fas')
  closeIcn.classList.add('fa-times')
  avatar.classList.add('avatar')
  avatar.appendChild(avatarImg)
  // avatarImg.setAttribute('src', data.Photograph)
  top.appendChild(name)
  name.innerText = data.Name
  
  const mid = document.createElement('div')
  const h2 = document.createElement('h2')
  const ul = document.createElement('ul')
  const li1 = document.createElement('li')
  const li2 = document.createElement('li')
  const li3 = document.createElement('li')
  const li4 = document.createElement('li')
  const li5 = document.createElement('li')
  
  const i1 = document.createElement('i')
  const i2 = document.createElement('i')
  const i3 = document.createElement('i')
  const i4 = document.createElement('i')
  const i5 = document.createElement('i')

  i1.classList.add('fad')
  i1.classList.add('fa-birthday-cake')
  i2.classList.add('fas')
  i2.classList.add('fa-tombstone')
  i3.classList.add('far')
  i3.classList.add('fa-book-open')
  i4.classList.add('fal')
  i4.classList.add('fa-phone-alt')
  i5.classList.add('fal')
  i5.classList.add('fa-phone-alt')


  mid.classList.add('mid')
  mid.appendChild(h2)
  h2.innerText = 'Details'
  mid.appendChild(ul)
  ul.classList.add('details')

  li1.appendChild(i1)
  li1.append(data['Birth Date'])
  li2.appendChild(i2)
  li2.append(data['Date f Death'])
  li3.appendChild(i3)
  li3.append(data.Education)
  li4.appendChild(i4)
  li4.append(data['Ph No 1'])
  li5.appendChild(i5)
  li5.append(data['Ph no 2'])
  
  ul.appendChild(li1)
  ul.appendChild(li2)
  ul.appendChild(li3)
  ul.appendChild(li4)
  ul.appendChild(li5)

  card.appendChild(mid)

  body.appendChild(cardContainer)

  // ADD ABILITY TO CLOSE CARD
  closeIcn.addEventListener('click', closeCard)
}


function closeCard(e) {
  e.target.parentElement.parentElement.parentElement.classList.add('hidden')

  e.target.parentElement.parentElement.parentElement.addEventListener('transitionend', (event) => {
    if(event.target.classList.contains('card-container')) {
      event.target.remove()
    }
  })
}