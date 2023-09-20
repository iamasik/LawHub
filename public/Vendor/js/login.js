const logins=async(email,password)=>{
    const Input=document.querySelector('.message')
    try{
        const res=await axios({
            method:'POST',
            url:'http://127.0.0.1:8004/Api/v1/User/LogIn',
            data:{
                email,
                password
            }
        })
    if(res.data.status=="success"){
        window.setTimeout(()=>{
            Input.innerHTML=`<div class="alert alert-success" role="alert" style="padding: 8px;">
                                    Login Success..
                            </div>`
            location.assign("/")
        },1500)
    }
    }catch(err){
        window.setTimeout(()=>{
            Input.innerHTML=`<div class="alert alert alert-danger" role="alert" style="padding: 8px;">
                                    ${err.response.data.message}
                            </div>`
        },2500)
        Input.innerHTML=""
    }
}


document.querySelector(".login").addEventListener('submit',e=>{
    e.preventDefault()
    const email=document.getElementById("email").value
    const password=document.getElementById("pwd").value
    logins(email,password)
})