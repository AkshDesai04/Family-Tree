const body = document.querySelector('body'),
      root = document.documentElement,
      loader = document.querySelector('.loader-container')
const reqUrl = 'https://raw.githubusercontent.com/Dev-AkshDesai/Family-Tree/main/harry/harry.json',
      request = new XMLHttpRequest()

request.open('GET', reqUrl)

request.responseType = 'json'
request.send()

request.onload = () => {
  const potters = request.response
  // createPotters(potters)
  createTree(createPersonNode(potters))
}

// Hide LOADER
window.addEventListener('load', () => {
  loader.remove()
})

// function createPotters(obj) {
//   addPotters()
//   obj.forEach(potter => {
//   });
// }

// Add potters to the page
// function addPotters(potter) {
//   const name = document.createElement('h1'),
//         birth = document.createElement('p'),
//         death = document.createElement('p'),
//         education = document.createElement('p')

//   name.textContent = potter.name
//   birth.textContent = `Birth - ${potter['birth-date']}`
//   death.textContent = `Death - ${potter['date-of-death']}`
//   education.textContent = `Education - ${potter.education}`

//   name.addEventListener('click', e => {
//     console.log(e.target.offsetTop/2);
//     console.log(e.target.offsetLeft/2);
//     root.style.setProperty('--mouse-x', e.clientX + "px");
//     root.style.setProperty('--mouse-y', e.clientY + "px");
//     createCard(potter)
//   })

//   body.appendChild(name)
//   body.appendChild(birth)
//   body.appendChild(death)
//   body.appendChild(education)
// }

// Create Card
// function createCard(data) {
//   const cardContainer = document.createElement('div')
  
//   cardContainer.classList.add('card-container')
  
//   cardContainer.innerHTML = `
//   <div class="card">
//   <div class="top">
//   <i class="fas fa-times" id="closeCardBtn"></i>
//   <div class="avatar">
//   <img src="${data.photograph}" alt="harry" />
//   </div>
//   <h1>${data.name}</h1>
//   </div>
//   <div class="mid">
//   <h2>Details</h2>
//   <ul class="details">
//   <li>
//   <i class="fad fa-birthday-cake"></i>
//   ${data['birth-date']}
//   </li>
//   <li>
//   <i class="fas fa-tombstone"></i>
//   ${data['date-of-death']}
//   </li>
//   <li>
//   <i class="far fa-book-open"></i>
//   ${data.education}
//   </li>
//   <li><i class="fal fa-phone-alt"></i>${data['ph-no-1']}</li>
//   <li><i class="fal fa-phone-alt"></i>${data['ph-no-2']}</li>
//   </ul>
//   </div>
//   </div>`
  
//   body.appendChild(cardContainer)
  
//   // cardContainer.addEventListener('click', e => {
//   //   if(e.target.classList.contains('card-container')) {
//   //     e.target.remove()
//   //   }
//   // })

//   // ADD ABILITY TO CLOSE CARD
//   cardContainer.querySelector('#closeCardBtn').addEventListener('click', closeCard)
// }


// function closeCard(e) {
//   const container = e.target.closest('.card-container')
  
//   container.classList.add('hidden')
  
//   container.addEventListener('transitionend', (event) => {
//     if(event.target.classList.contains('card-container')) {
//       event.target.remove()
//     }
//   })
// }

// Create Tree


function createTree(nodes) {
  const chart = new OrgChart(document.getElementById("orgchart"), {
    template: "diva",
    nodeBinding: {
        field_0: "name",
        img_0: "img"
    },
    searchFields: ['Address','Education', 'Email', 'Phone1', 'Phone2', 'birthDate', 'dateOfDeath', 'dateOfMairrage', 'name'],
    nodes: nodes,
  });
}

function createPersonNode(data) {
  const nodes = []

  data.forEach(person => {
    const per = new Person(person)
    nodes.push(per)
  });
  console.log(nodes);
  return nodes
}

function Person(data) {
  this.id = data.id

  if(data['married-to']) {
    this.pid = data['married-to']
    data.male ? this.tags = ['left-partner'] : this.tags = ['right-partner']
  } else if (data['father-is']) {
    this.pid = data['father-is']
    this.ppid = data['mother-is']
  }

  this.name = data.name || '-'
  this.img = data.photograph || '-'
  this.birthDate = data['birth-date'] || '-'
  this.dateOfDeath = data['date-of-death'] || '-'
  this.Education = data.education || '-'
  this.dateOfMairrage = data['date-of-mairrage'] || '-'
  this.Phone1 = data['ph-no-1'] || '-'
  this.Phone2 = data['ph-no-2'] || '-'
  this.Email = data['email-address'] || '-'
  this.Address = data['residential-address'] || '-'
}