console.log('Client side javascript loaded!')

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')

const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    messageTwo.textContent=''
    messageOne.textContent='loading...'
    const address='http://localhost:3000/weather?address=' + search.value
    fetch(address).then((res)=>{
        res.json().then((data)=>{
            messageOne.textContent=''
            if(data.error)
                messageTwo.textContent=data.error
            else {
                messageOne.textContent=data.location
                messageTwo.textContent=data.forecast
            }
        })
    })
})