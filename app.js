const button1 = document.getElementById('button1')
const button2 = document.getElementById('button2')
const button3 = document.getElementById('button3')
const button5 = document.getElementById('button5')
const output = document.getElementById('output')
const orderSelect = document.getElementById('order')
const spinner = '<img src="spinner.gif" width="280 height="100" style="margin-top:40px; width:100%">'

button1.addEventListener('click', loadData)
button2.addEventListener('click', loadJSONObj)
button3.addEventListener('click', loadJSONArr)
button5.addEventListener('click', loadOrders)

document.getElementById('button4').addEventListener('click', function() {
  output.innerHTML = ''
})

// Get Data
function loadData(e) {
  const xhr = new XMLHttpRequest()

  xhr.open('GET', 'data.txt', true)

  xhr.onprogress = function() {
    output.innerHTML = spinner
  }

  xhr.onload = function() {
    if(this.status === 200) {
      output.innerHTML = this.responseText
    }
  }

  xhr.onerror = function() {
    console.log('error occured')
  }

  xhr.send()
}

// Get JSON-Object
function loadJSONObj(e) {
  const xhr = new XMLHttpRequest()

  xhr.open('GET', 'customer.json', true)

  xhr.onload = function() {
    if(this.status === 200) {
      const customer = JSON.parse(this.responseText)

      output.innerHTML = `
      <ul>
        <li>ID: ${customer.id}</li>
        <li>NAME: ${customer.name}</li>
        <li>AGE: ${customer.age}</li>
      </ul>
      `
    }
  }

  xhr.onerror = function() {
    output.innerHTML = '<p>something went wrong</p>'
    console.log('error occured')
  }

  xhr.send()
}

// Get JSON-Array
function loadJSONArr(e) {
  const xhr = new XMLHttpRequest()

  xhr.open('GET', 'customers.json', true)

  xhr.onload = function() {
    if(this.status === 200) {
      const customers = JSON.parse(this.responseText)

      let data = ''

      customers.forEach(function(customer) {
        data += `
        <ul>
          <li>ID: ${customer.id}</li>
          <li>NAME: ${customer.name}</li>
          <li>AGE: ${customer.age}</li>
        </ul>
        `
      })

      output.innerHTML = data
    }
  }

  xhr.onerror = function() {
    output.innerHTML = '<p>something went wrong</p>'
    console.log('error occured')
  }

  xhr.send()
}

function loadOrders(e) {
  let orderId = orderSelect.options[orderSelect.selectedIndex].value

  const xhr = new XMLHttpRequest()

  xhr.open('GET', `https://smm.nakrutka.by/api/?key=406e1ef4f7409d5feda9e618eb8833d1&action=status&order=${orderId}`, true)

  xhr.setRequestHeader('Content-Type', 'application/json')

  xhr.onload = function() {
    if(this.status === 200) {
      const response = this.responseText
      console.log(response)
    }
  }

  xhr.send()

  e.preventDefault()
}


//* tutorial
// document.getElementById('button').addEventListener('click', loadData)
// const spinner = '<img src="spinner.gif" width="280" height="100" style="margin-top:30px; width:100%;">'

// function loadData() {
//   // create XHR Object
//   const xhr = new XMLHttpRequest()
//   // OPEN
//   xhr.open('GET', 'data.txt', true)

//   console.log('READYSTATE', xhr.readyState)

//   // Optional - Used for spinners loaders
//   xhr.onprogress = function() {
//     console.log('READYSTATE', xhr.readyState)
//     document.getElementById('output').innerHTML = spinner
//   }

//   xhr.onload = function() {
//   console.log('READYSTATE', xhr.readyState)
//   if(this.status === 200) {
//     console.log(this.responseText)
//       document.getElementById('output').innerHTML = this.responseText
//     }
//   }


//   // Error Handling
//   xhr.onerror = function() {
//     console.log('request error')
//   }

//   //* old method
//   // xhr.onreadystatechange = function() {
//   //   console.log('READYSTATE', xhr.readyState)
//   //   if(this.status === 200 && this.readyState === 4) {
//   //     document.getElementById('output').innerHTML = this.responseText
//   //   }
//   // }

//   xhr.send()
// }

// // ready state values
// // 0: request not initialized
// // 1: server connection established
// // 2: request received
// // 3: processing request
// // 4: request finished and response is ready