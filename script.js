const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')
const clearBtn = document.getElementById('clear')
const itemFilter = document.getElementById('filter')
const items = itemList.querySelectorAll('li')

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

function onAddItemSubmit(e) {
    e.preventDefault()

    const newItem = itemInput.value

    // Validate Input
    if (newItem === '') {
        alert('Please add an item')
        return
    }

    // Create item DOM element
    addItemToDOM(newItem)

    // Add item to local storage
    addItemToStorage(newItem)

    checkUI()

    itemInput.value = ''
}

function addItemToDOM(item) {
    // Create list item
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(item))

    const button = createButton('remove-item btn-link text-red')
    li.appendChild(button)

    // Add list item to DOM
    itemList.appendChild(li)
}

function addItemToStorage(item) {
    let itemsFromStorage

    // Check if there is something in local storage
    if (localStorage.getItem('items') === null) {
        // If not then set itemsFromStorage to an empty array
        itemsFromStorage = []
    } else {
        /* If yes the set itemsFromStorage to array with items from local storage. 
           Data from local storage coming in JSON string we have to parse them to the array 
           with JSON.parse() method */
        itemsFromStorage = JSON.parse(localStorage.getItem('items')) // parse string to array
    }

    // Add the new item to the array of the itemsFromStorage
    itemsFromStorage.push(item)

    // Convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function removeItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        // Check if user clicks on remove button icon
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove() // remove whole list item parent,parent element of an remove button icon
        }
        checkUI()
    }
}

function clearItems(e) {
    while (itemList.firstChild) {
        // while itemList has first child
        itemList.removeChild(itemList.firstChild) // remove first child from itemList
    }
    checkUI()
}

function filterItems(e) {
    const text = e.target.value.toLowerCase()
    const items = itemList.querySelectorAll('li')

    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase()

        if (itemName.indexOf(text) != -1) {
            //if item name match what is in text
            item.style.display = 'flex'
        } else {
            item.style.display = 'none'
        }
    })
}

function checkUI() {
    const items = itemList.querySelectorAll('li')

    if (items.length === 0) {
        clearBtn.style.display = 'none'
        itemFilter.style.display = 'none'
    } else {
        clearBtn.style.display = 'block'
        itemFilter.style.display = 'block'
    }
}

// Event Listeners
itemForm.addEventListener('submit', onAddItemSubmit)
itemList.addEventListener('click', removeItem)
clearBtn.addEventListener('click', clearItems)
itemFilter.addEventListener('input', filterItems)

// Global Scope
checkUI()
