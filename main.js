const btnColorPicker = document.getElementById('color-picker'),
listColors = document.querySelector('.list-colors'),
pickedColorContainer = document.querySelector('.picked-colors'),
btnClear = document.getElementById('btn-clear')

var localKey = 'pickedColor'

var arrColorPicker = JSON.parse(localStorage.getItem(localKey)) || []

btnColorPicker.onclick = () => {
    const eyeDropper = new EyeDropper()

    document.body.style.display = 'none'
    setTimeout(() => {
        eyeDropper.open().then(result => {
            let { sRGBHex } = result 
            if (!arrColorPicker.includes(sRGBHex)) {
                arrColorPicker.push(sRGBHex)
                localStorage.setItem(localKey, JSON.stringify(arrColorPicker))
                loadColorsPicked()                             
            }
            document.body.style.display = 'block'   
        })
    }, 10)
  
}

btnClear.onclick = () => {
    arrColorPicker.length = 0
    loadColorsPicked()
    localStorage.removeItem(localKey)
}

function loadColorsPicked() {
    arrColorPicker.length === 0 ? pickedColorContainer.style.display = 'none' : pickedColorContainer.style.display = 'block'

    listColors.innerHTML = ''
    arrColorPicker.map(color => {
        let liElement = document.createElement('li')
        liElement.className = 'color'
        // liElement.setAttribute('onclick', 'copyColor(this)')
        liElement.onclick = copyColor
        liElement.innerHTML = `
            <span class="rect" style="background: ${color}; border: 1px solid ${color == '#ffffff' ? '#ccc' : color}"></span>
            <span class="value">${color}</span>
        `
        listColors.appendChild(liElement)
    })
}

function copyColor(evt) {
    let element = evt.target.parentElement
    let valueElement = element.querySelector('.value')
    let value = valueElement.innerText
    navigator.clipboard.writeText(value)
    valueElement.innerText = 'Copied!'
    setTimeout(() => {
        valueElement.innerText = value
    }, 1000)
}

loadColorsPicked()