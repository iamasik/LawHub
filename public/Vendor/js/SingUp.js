const logins=async(Myobj)=>{
    const Input=document.querySelector('.message')
    try{
        const res=await axios({
            method:'POST',
            url:'http://127.0.0.1:8004/Api/v1/User/SingUp',
            data:Myobj
        })
    if(res.data.status=="success"){
        window.setTimeout(()=>{
            Input.innerHTML=`<div class="alert alert-success" role="alert" style="padding: 8px;">
                                    Singup Success..
                            </div>`
            location.assign("/")
        },1500)
    }
    }catch(err){
        Input.innerHTML=`<div class="alert alert alert-danger" role="alert" style="padding: 8px;">
                                ${err.response.data.message}
                        </div>`
        window.setTimeout(()=>{
            Input.innerHTML=""
        },2500)
        
    }

}


document.querySelector(".SingUp").addEventListener('submit',e=>{
    e.preventDefault()
    const Myobj={}
    Myobj.userRole=document.getElementById("role").value
    Myobj.name=document.getElementById("name").value
    Myobj.phone=document.getElementById("phone").value
    Myobj.identityNo=parseInt(document.getElementById("nidbc").value)
    Myobj.district=document.getElementById("district").value
    Myobj.upzilla=document.getElementById("upazila").value
    Myobj.postOffice=document.getElementById("postoffice").value
    Myobj.email=document.getElementById("mail").value
    Myobj.dateOfBirth=document.getElementById("dob").value
    Myobj.gender=document.getElementById("Gender").value
    Myobj.username=document.getElementById("usname").value
    Myobj.address=document.getElementById("address").value
    Myobj.password=document.getElementById("pwd").value
    Myobj.confirmPassword=document.getElementById("cpwd").value
    logins(Myobj)
})