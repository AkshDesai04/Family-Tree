const body = document.querySelector('body'),
      root = document.documentElement
const reqUrl = 'https://raw.githubusercontent.com/Dev-AkshDesai/Family-Tree/Tree-JSON-edit/harry/harry.json',
      request = new XMLHttpRequest()

request.open('GET', reqUrl)

request.responseType = 'json'
request.send()

request.onload = () => {
  const potters = request.response
  // createPotters(potters)
  createTree(createPersonNode(potters))
}

// function createPotters(obj) {
//   addPotters()
//   obj.forEach(potter => {
//   });
// }

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

  name.addEventListener('click', e => {
    console.log(e.target.offsetTop/2);
    console.log(e.target.offsetLeft/2);
    root.style.setProperty('--mouse-x', e.clientX + "px");
    root.style.setProperty('--mouse-y', e.clientY + "px");
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
  <i class="fas fa-times" id="closeCardBtn"></i>
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
  
  // cardContainer.addEventListener('click', e => {
  //   if(e.target.classList.contains('card-container')) {
  //     e.target.remove()
  //   }
  // })

  // ADD ABILITY TO CLOSE CARD
  cardContainer.querySelector('#closeCardBtn').addEventListener('click', closeCard)
}


function closeCard(e) {
  const container = e.target.closest('.card-container')
  
  container.classList.add('hidden')
  
  container.addEventListener('transitionend', (event) => {
    if(event.target.classList.contains('card-container')) {
      event.target.remove()
    }
  })
}

// Create Tree


function createTree(nodes) {
  const chart = new OrgChart(document.getElementById("orgchart"), {
    nodeBinding: {
        field_0: "name",
        img_0: "img"
    },
    nodes: nodes,
    // nodes: [
    //     { id: 1, name: "James Potter", img:'https://bit.ly/3zFZQUo'},
    //     { id: 2, pid: 1, name: "Lily Potter", tags: ['left-partner'], img:'https://bit.ly/3zFZQUo'},
    //     { id: 3, pid: 1, name:"Harry Potter", img:'https://bit.ly/3zFZQUo'},
    //     { id: 4, pid: 3, name:"Geany Potter",tags: ['left-partner'], img:'https://bit.ly/3zFZQUo'},
    //     { id: 5, pid: 3, name:"Albus Potter", img:'https://bit.ly/3zFZQUo'},
    //     { id: 6, pid: 3, name:"Severus Potter", img:'https://bit.ly/3zFZQUo'},
    //     { id: 7, pid: 3, name:"Lily harry Potter", img:'https://bit.ly/3zFZQUo'},
    // ]
  });
}

function createPersonNode(data) {
  const nodes = []

  data.forEach(person => {
    const per = new Person(person)
    // console.log(per);
    nodes.push(per)
  });

  return nodes
}

function Person(data) {
  this.id = data.id

  if(data.parent) {
    this.pid = data.parent
  } else if (data['Married-to']) {
    this.pid = data['Married-to']
    this.tags = ['left-partner'];
  } 
  this.name = data.name
  this.img = data.photograph
}