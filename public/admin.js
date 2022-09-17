
// Your Code Here

async function adminOperations() {
    let div = document.createElement('div')
    let ul = document.createElement('ul')
    div.append(ul)
    document.body.append(div)

    let response = await fetch('http://localhost:3001/listBooks')
    let books = await response.json()

    for (let i = 0; i < books.length; i++) {
        let li = document.createElement('li')

        let label = document.createElement('label')
        label.innerHTML = books[i].title

        let input = document.createElement('input')
        input.setAttribute('type', 'text')

        let saveButton = document.createElement('button')
        let deleteButton = document.createElement('button')
        saveButton.innerHTML = 'Save'
        deleteButton.innerHTML = 'Delete'

        let id = books[i].id

        saveButton.addEventListener('click', async function updateQuantity() {
            if (input.value) {
                let value = input.value

                await fetch('http://localhost:3001/updateBook', {
                    method: 'PATCH',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        'id': id,
                        'quantity': value
                    })
                })
            }
        })

        deleteButton.addEventListener('click', async function removeBook() {
            li.remove()
            await fetch(`http://localhost:3001/removeBook/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
            })
        })

        li.append(label, input, saveButton, deleteButton)
        document.body.append(li)
    }

}

adminOperations()