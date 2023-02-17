import { posts } from "./database.js"

export function closeModal(){
    const dialog = document.querySelector('.dialog__container')
    const closeButton = document.querySelector('.absolute-button')

    closeButton.addEventListener('click', () =>{
        dialog.close()
    })
}

export function renderModal(posts){
    const dialog = document.querySelector('.dialog__container')
    const buttons = document.querySelectorAll('.open-post')

    buttons.forEach((button) => {
        button.addEventListener('click', (event) => {
            dialog.innerHTML = ''

            const modalContent = createModal(posts, event.target.dataset.buttonId)

            dialog.appendChild(modalContent)

            dialog.showModal()

            closeModal()
        })
    })
}

export function createModal(posts, id){
    const foundPost = posts.find(post => post.id == Number(id)) 

    const divModalContainer = document.createElement('div')
    const divWidth = document.createElement('div')
    const divDialog = document.createElement('div')
    const dialogImg = document.createElement('img')
    const divFlex = document.createElement('div')
    const userName = document.createElement('h2')
    const closeButton = document.createElement('span')
    const userStack = document.createElement('p')
    const postTitle = document.createElement('h2')
    const postDescription = document.createElement('p')

    divModalContainer.classList.add('modal__container')
    divWidth.classList.add('width-vw')
    divDialog.classList.add('dialog_div')
    dialogImg.classList.add('img-home', 'margin-left')

    dialogImg.src = foundPost.img
    dialogImg.alt = `Foto de ${foundPost.user}`

    divFlex.classList.add('flex-div')

    userName.innerText = foundPost.user

    closeButton.classList.add('absolute-button')
    closeButton.innerText = 'x'

    userStack.innerText = foundPost.stack

    postTitle.classList.add('dialog-description')
    postTitle.innerText = foundPost.title

    postDescription.classList.add('dialog-paragraph')
    postDescription.innerText = foundPost.text

    divModalContainer.append(divWidth,postTitle, postDescription)
    divWidth.appendChild(divDialog)
    divDialog.append(dialogImg, divFlex)
    divFlex.append(userName, closeButton, userStack)

    return divModalContainer
}

export function toggleFollowButton(){
    const buttons = document.querySelectorAll('.follow-button')

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            button.classList.toggle('unfollow-button')
            button.innerText = 'Seguindo'
            if(button.classList == 'follow-button'){
                button.innerText = 'Seguir'
            }
        })
    })
}
