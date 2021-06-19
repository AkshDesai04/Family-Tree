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
    // addPotters(potter)
  });
}

function addPotters(potter) {
  const name = document.createElement('h1'),
        birth = document.createElement('p'),
        death = document.createElement('p'),
        education = document.createElement('p')

  name.textContent = potter.Name
  birth.textContent = `Birth - ${potter['Birth Date']}`
  death.textContent = `Death - ${potter['Date f Death']}`
  education.textContent = `Education - ${potter.Education}`

  body.appendChild(name)
  body.appendChild(birth)
  body.appendChild(death)
  body.appendChild(education)
}