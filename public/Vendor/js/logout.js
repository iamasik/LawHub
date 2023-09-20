const logout=async()=>{
    try{
        const res=await axios({
            method:'GET',
            url:'http://127.0.0.1:8004/Api/v1/User//Logout',
        })
    if(res.data.status=="success"){
        location.assign("/")
    }
    }catch(err){
        alert("Something is wrong..")
    }
}

const Check=document.querySelector(".logout")
if(Check){
    Check.addEventListener('click',e=>{
        e.preventDefault()
        logout()
    })
}


document.querySelector('.txt_logo_container').addEventListener('click',e=>{
    location.assign("/")
})