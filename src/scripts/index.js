import { users, posts, suggestUsers } from "./database.js";
import { closeModal, renderModal, toggleFollowButton } from "./modal.js";

function renderAside(users){
    const asideContainer = document.querySelector('.suggestions__list')

    users.forEach((user) => {
       const suggestions = createUsersSuggest(user)

       asideContainer.appendChild(suggestions)
    })
}

function createUsersSuggest(arrayUsers){
    const li = document.createElement('li')
    const divSuggestions = document.createElement('div')
    const img = document.createElement('img')
    const divDescription = document.createElement('div')
    const userName = document.createElement('h2')
    const userDescription = document.createElement('p')
    const divButton = document.createElement('div')
    const button = document.createElement('button')

    divSuggestions.classList.add('name-userSuggestions')

    img.classList.add('img-home')
    img.src = arrayUsers.img
    img.alt = `Foto de ${arrayUsers.user}`

    userName.innerText = arrayUsers.user
    userDescription.innerText = arrayUsers.stack

    divButton.classList.add('divSuggestions__button')

    button.classList.add('follow-button')
    button.innerText = 'Seguir'

    li.append(divSuggestions, divDescription, divButton)
    divSuggestions.append(img, divDescription)
    divDescription.append(userName, userDescription)
    divButton.appendChild(button)
    

    return li
}

function renderPosts(postsUsers){
    const postsContainer = document.querySelector('.posts__timeline')
    postsContainer.innerText = ''

    postsUsers.forEach((post) => {
        const newPost = createPosts(post)

        postsContainer.appendChild(newPost)
    })

    renderModal(postsUsers)
    
}

function createPosts(posts){
    const postsContainer = document.createElement('div')
    const divFlex = document.createElement('div')
    const postImg = document.createElement('img')
    const divDescription = document.createElement('div')
    const userName = document.createElement('h2')
    const userStack = document.createElement('p')
    const divPost = document.createElement('div')
    const description = document.createElement('h3')
    const post = document.createElement('p')
    const divOpenPost = document.createElement('div')
    const button = document.createElement('button')
    const icon = document.createElement('img')
    const span = document.createElement('span')

    postsContainer.classList.add('posts__div')
    divFlex.classList.add('flex-posts')

    postImg.classList.add('img-home')
    postImg.src = posts.img
    postImg.alt = `Foto de ${posts.user}`

    divDescription.classList.add('flex-div')
    
    userName.innerText = posts.user
    userStack.innerText = posts.stack

    divPost.classList.add('descriptionPost__container')

    description.innerText = posts.title
    post.innerText = posts.text

    divOpenPost.classList.add('openPost__container')

    button.classList.add('open-post')
    button.innerText = 'Abrir post'
    button.dataset.buttonId = posts.id

    icon.classList.add('like-icon')
    icon.src = './src/assets/img/favorite_FILL0_wght400_GRAD0_opsz48.svg'
    icon.alt = 'like icon'

    span.innerText = posts.likes
    span.dataset.likeId = posts.id
    span.classList.add('likes-button')

    postsContainer.append(divFlex, divDescription, divPost)
    divFlex.append(postImg, divDescription)
    divDescription.append(userName, userStack)
    divPost.append(description, post, divOpenPost)
    divOpenPost.append(button, icon, span)

    return postsContainer
}

function registerPost(array, userFind){
    const inputs = document.querySelectorAll('#register__post')

    const findPostUser = userFind.find(user => user.id == 1)

    const newPost = {}
    let empty = 0

    inputs.forEach((input => {
        if(input.value == ''){
            empty++
        }
        newPost[input.name] = input.value
    }))

    newPost.user = findPostUser.user
    newPost.stack = findPostUser.stack
    newPost.img = findPostUser.img
    newPost.likes = 0
    newPost.id = array.length + 1

    if(empty !== 0){
        alert('Preencha todos os campos para fazer um post')
    }

    array.unshift(newPost)
}

function registerEvent(array, users){
    const submitButton = document.querySelector('#submit')

    submitButton.addEventListener('click', () => {

        registerPost(array, users)
        renderPosts(array)
    })
}

// function accountLikes(arrayPosts){
//     const likeButton = document.querySelectorAll('.like-icon')
//     const accountLikes = arrayPosts
//     console.log(accountLikes)

//     likeButton.forEach((button) => {
//         button.addEventListener('click', () => {
//             accountLikes.forEach((element) => {
//                 console.log(element.likes)
//             })
//         })
//     })
// }

renderAside(suggestUsers)

renderPosts(posts)

toggleFollowButton()

registerEvent(posts, users)

// accountLikes(posts)