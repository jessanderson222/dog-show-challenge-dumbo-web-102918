const tableBody = document.getElementById('dog-table')
const addBtn = document.querySelector('#submit-button')
const dogForm = document.querySelector('#dog-form')
const editName = document.querySelector('#e-name')
const editBreed = document.querySelector('#e-breed')
const editSex = document.querySelector('#e-sex')
const editForm = document.querySelector('#edit-form')
const editSubmit = document.querySelector('#e-submit-button')
document.addEventListener('DOMContentLoaded', fetchDogs)

  
//STEP 1: Render existing dogs
function fetchDogs() {
        fetch("http://localhost:3000/dogs")
        .then(response => response.json())
        .then(data => {
            data.forEach(dog => renderDog(dog))
        })
    }

function renderDog(dog) {
        // console.log(dog)
    let tableBody = document.getElementById('dog-table')
    let dogTr = document.createElement('tr')
    dogTr.className = 'dog-tr'
    dogTr.dataset.id = dog.id

    let dogName = document.createElement('td')
        dogName.innerText = dog.name
    let dogBreed = document.createElement('td')
        dogBreed.innerText = dog.breed 
    let dogSex = document.createElement('td')
        dogSex.innerText = dog.sex 
    let editButton = document.createElement('button')
        editButton.innerText = "Edit"
        editButton.className = "edit-button"
    let deleteButton = document.createElement('button')
        deleteButton.innerText = "Delete"
        deleteButton.className = "delete-button"

    tableBody.appendChild(dogTr)
        dogTr.appendChild(dogName)
        dogTr.appendChild(dogBreed)
        dogTr.appendChild(dogSex)
        dogTr.appendChild(editButton)
        dogTr.appendChild(deleteButton)
    }

//STEP 2 Create a Dog
    const newDogForm = document.querySelector('#dog-form')
    newDogForm.addEventListener("submit", inputHandler);

    function inputHandler(event) {
        event.preventDefault()
        let name = newDogForm.elements.namedItem("name").value
        let breed = newDogForm.elements.namedItem("breed").value
        let sex = newDogForm.elements.namedItem("sex").value

        postDog(name, breed, sex)
    }

    function postDog(name, breed, sex) {
    
        fetch("http://localhost:3000/dogs", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                name: name,
                breed: breed,
                sex: sex
            })
         })
         .then(res => res.json())
         .then(json => {
             
             renderDog(json)
         });
    }

//STEP 3: Delete or Edit a Dog
tableBody.addEventListener("click", function(event) {
    if(event.target.classList.contains("delete-button")){
        event.target.parentNode.remove()
        deleteDog(event.target.parentNode)
    }
    if(event.target.classList.contains("edit-button")) {
       let editDog = event.target.parentElement
        let name = editDog.childNodes[0].innerText
        let breed = editDog.childNodes[1].innerText
        let sex = editDog.childNodes[2].innerText 
        let id = event.target.parentElement.dataset.id
        // debugger 
        populateForm(name, breed, sex, id)
    }
})

function populateForm(name, breed, sex, id){
    
    editName.value = name
    editBreed.value = breed
    editSex.value = sex
    
    editForm.addEventListener("click", function(event){
        
        if (event.target.classList.contains("edit-btn")) {
            let newName = editName.value 
            let newBreed = editBreed.value
            let newSex = editSex.value
            // debugger 
            patchDog(newName, newBreed, newSex, id)
        }
})
}

function patchDog(name, breed, sex, id){
    // debugger 
    fetch(`http://localhost:3000/dogs/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                name: name,
                breed: breed,
                sex: sex
            })
         })
         .then(r => console.log(r.json()))
         .then(data => console.log(data))
    }

    function deleteDog(dog){
        console.log(dog)
        let id = dog.dataset.id
        fetch(`http://localhost:3000/dogs/${id}`, {
            method: 'delete'
        }).then(response =>
            response.json().then(json => {
              return json;
            })
        )}