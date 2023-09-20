const UpdateUser=async(Myobj)=>{
    const Input=document.querySelector('.message')

    try{
        const res=await axios({
            method:'PATCH',
            url:`http://127.0.0.1:8004/Api/v1/User/UpdateData`,
            data:Myobj
        })
    if(res.data.status=="success"){
        Input.innerHTML=`<div class="alert alert-success" role="alert" style="padding: 8px;">
                        Update Success..
                        </div>`
        window.setTimeout(()=>{
            location.assign("/AuthUserInfo")
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


document.querySelector(".UpdateUser").addEventListener('submit',e=>{
    e.preventDefault()
    const Myobj={}
    Myobj.name=document.getElementById("Name").value
    Myobj.phone=document.getElementById("Phone").value
    Myobj.identityNo=parseInt(document.getElementById("nid_bc").value)
    Myobj.district=document.getElementById("district").value
    Myobj.upzilla=document.getElementById("upazila").value
    Myobj.postOffice=document.getElementById("postoffice").value
    Myobj.address=document.getElementById("Address").value

    UpdateUser(Myobj)
})

const UpdatePass=async(Myobj)=>{
    const Input=document.querySelector('.message')

    try{
        const res=await axios({
            method:'PATCH',
            url:`http://127.0.0.1:8004/Api/v1/User/UpdatePass`,
            data:Myobj
        })
    if(res.data.status=="success"){
        Input.innerHTML=`<div class="alert alert-success" role="alert" style="padding: 8px;">
                        Update Success..
                        </div>`
        window.setTimeout(()=>{
            location.assign("/AuthUserInfo")
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

document.querySelector(".UpdatePass").addEventListener('submit',e=>{
    e.preventDefault()
    const Myobj={}
    Myobj.oldPassword=document.getElementById("oldPassword").value
    Myobj.password=document.getElementById("Password").value
    Myobj.confirmPassword=parseInt(document.getElementById("C_Password").value)

    UpdatePass(Myobj)
})