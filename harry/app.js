const body = document.querySelector('body')
const reqUrl = 'https://raw.githubusercontent.com/Dev-AkshDesai/Family-Tree/main/harry/harry.json',
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

  name.textContent = potter.name
  birth.textContent = `Birth - ${potter['birth-date']}`
  death.textContent = `Death - ${potter['date-of-death']}`
  education.textContent = `Education - ${potter.education}`

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
  
  cardContainer.classList.add('card-container')
  
  cardContainer.innerHTML = `
  <div class="card">
  <div class="top">
  <i class="fas fa-times"></i>
  <div class="avatar">
  <img src="${data.photograph}" alt="harry" />
  </div>
  <h1>${data.name}</h1>
  </div>
  <div class="mid">
  <h2>Details</h2>
  <ul class="details">
  <li>
  <i class="fad fa-birthday-cake"></i>
  ${data['birth-date']}
  </li>
  <li>
  <i class="fas fa-tombstone"></i>
  ${data['date-of-death']}
  </li>
  <li>
  <i class="far fa-book-open"></i>
  ${data.education}
  </li>
  <li><i class="fal fa-phone-alt"></i>${data['ph-no-1']}</li>
  <li><i class="fal fa-phone-alt"></i>${data['ph-no-2']}</li>
  </ul>
  </div>
  </div>`
  
  body.appendChild(cardContainer)
  
  // ADD ABILITY TO CLOSE CARD
  cardContainer.firstElementChild.firstElementChild.firstElementChild.addEventListener('click', closeCard)
}


function closeCard(e) {
  e.target.parentElement.parentElement.parentElement.classList.add('hidden')
  
  e.target.parentElement.parentElement.parentElement.addEventListener('transitionend', (event) => {
    if(event.target.classList.contains('card-container')) {
      event.target.remove()
    }
  })
}