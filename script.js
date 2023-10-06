const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')
const clearBtn = document.getElementById('clear')

// Functions

function createButton(classes) {
    const button = document.createElement('button')
    button.className = classes
    const icon = createIcon('fa-solid fa-xmark')
    button.appendChild(icon)
    return button
}

function createIcon(classes) {
    const icon = document.createElement('i')
    icon.className = classes
    return icon
}

function addItem(e) {
    e.preventDefault()

    const newItem = itemInput.value

    // Validate Input
    if (newItem === '') {
        alert('Please add an item')
        return
    }

    // Create list item
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(newItem))

    const button = createButton('remove-item btn-link text-red')
    li.appendChild(button)

    // Add list item to DOM
    itemList.appendChild(li)
    itemInput.value = ''
}

function removeItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        // Check if user clicks on remove button icon
        e.target.parentElement.parentElement.remove() // remove whole list item parent,parent element of an remove button icon
    }
}

function clearItems(e) {
    while (itemList.firstChild) {
        // while itemList has first child
        itemList.removeChild(itemList.firstChild) // remove first child from itemList
    }
}

// Event Listeners
itemForm.addEventListener('submit', addItem)
itemList.addEventListener('click', removeItem)
clearBtn.addEventListener('click', clearItems)
