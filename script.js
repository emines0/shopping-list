const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')
const clearBtn = document.getElementById('clear')
const itemFilter = document.getElementById('filter')
const items = itemList.querySelectorAll('li')
const formBtn = itemForm.querySelector('button')

let isEditMode = false

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

function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage()

    // Add the new item to the array of the itemsFromStorage
    itemsFromStorage.push(item)

    // Convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function getItemsFromStorage() {
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

    return itemsFromStorage
}

function displayItems() {
    const itemsFromStorage = getItemsFromStorage()

    itemsFromStorage.forEach((item) => addItemToDOM(item))

    checkUI()
}

function onAddItemSubmit(e) {
    e.preventDefault()

    const newItem = itemInput.value

    // Validate Input
    if (newItem === '') {
        alert('Please add an item')
        return
    }

    // Check for edit mode
    if (isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-mode')

        removeItemFromStorage(itemToEdit.textContent)
        itemToEdit.classList.remove('edit-mode')
        itemToEdit.remove()
        isEditMode = false
    } else {
        if (checkIfItemExist(newItem)) {
            alert('That item already exist!')
            return
        }
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

function onClickItem(e) {
    // Check if user clicks on remove button icon
    if (e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement)
    } else {
        setItemToEdit(e.target)
    }
}

function setItemToEdit(item) {
    isEditMode = true

    // Remove edit-mode class from other list items
    itemList
        .querySelectorAll('li')
        .forEach((listItem) => listItem.classList.remove('edit-mode'))

    // Lighter color of edited item
    item.classList.add('edit-mode')
    // Change icon/text/color of form btn
    formBtn.innerHTML = '<i class="fas fa-solid fa-pen"></i> Update Item '
    formBtn.style.backgroundColor = '#228B22'
    // Set text content of edited item to the input field
    itemInput.value = item.textContent

    // Update clicked item
    updateItem()
}

function removeItem(item) {
    if (confirm('Are you sure?')) {
        // remove item from DOM
        item.remove()

        // remove item from LocalStorage
        // don't need whole element just his text content
        removeItemFromStorage(item.textContent)
    }
    checkUI()
}

function removeItemFromStorage(itemText) {
    let itemsFromStorage = getItemsFromStorage()

    // Filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((item) => item !== itemText)

    // Reset to LocalStorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function clearItems(e) {
    while (itemList.firstChild) {
        // while itemList has first child
        itemList.removeChild(itemList.firstChild) // remove first child from itemList
    }

    // Clear from LocalStorage
    localStorage.removeItem('items')

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

function checkIfItemExist(item) {
    const itemsFromStorage = getItemsFromStorage()
    return itemsFromStorage.includes(item)
}

function checkUI() {
    itemInput.value = ''

    const items = itemList.querySelectorAll('li')

    if (items.length === 0) {
        clearBtn.style.display = 'none'
        itemFilter.style.display = 'none'
    } else {
        clearBtn.style.display = 'block'
        itemFilter.style.display = 'block'
    }

    formBtn.innerHTML = '<i class="fas fa-solid fa-plus"></i> Add Item'
    formBtn.style.backgroundColor = '#333'
    isEditMode = false
}

// Initialize app
function init() {
    // Event Listeners
    itemForm.addEventListener('submit', onAddItemSubmit)
    itemList.addEventListener('click', onClickItem)
    clearBtn.addEventListener('click', clearItems)
    itemFilter.addEventListener('input', filterItems)

    // Show items from local storage when DOM is loaded
    document.addEventListener('DOMContentLoaded', displayItems)

    checkUI()
}

// Global Scope
init()
