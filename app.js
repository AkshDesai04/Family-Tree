const form = document.querySelector('#form'),
      passInput = document.querySelector('#pass'),
      errMsg = document.querySelector("#error")

function redirect(e) {
  const password = passInput.value

  if (password === 'aksh') {
    window.open('./family/family.html', '_self')
  } else if(password === 'harry') {
    window.open('./harry/harry.html', '_self')
  } else {
    errMsg.classList.add('show')
  }
  e.preventDefault()
}

form.addEventListener('submit', redirect)