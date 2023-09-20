const Waiting=document.querySelector('.waiting')
const Support=document.querySelector('.Support')
const complete=document.querySelector('.complete')
const review=document.querySelector('.review')
const id=document.getElementById('CaseID').innerText

const Action=async(text,id)=>{
    try{
        const res=await axios({
            method:'PATCH',
            url:`http://127.0.0.1:8004/Api/v1/Order/Update/${id}`,
            data:{
                Status:text
            }
        })
    if(res.data.status=="success"){
        location.assign(`/Order/${id}`)
    }
    }catch(err){
        location.assign(`/Order/${id}`)
    }
}

if(Waiting){
    Waiting.addEventListener('click',e=>{
        e.preventDefault()
        Action("Waiting",id)
    })
}
if(Support){
    Support.addEventListener('click',e=>{
        e.preventDefault()
        location.assign(`/Contact`)
    })
    

}
if(complete){
    complete.addEventListener('click',e=>{
        e.preventDefault()
        Action("Complete",id)
    })

}
if(review){
    review.addEventListener('click',e=>{
        e.preventDefault()
        Action("Running",id)
    })
}