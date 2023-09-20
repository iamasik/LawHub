const PlcaeOrder=async(Data)=>{
    const Input=document.querySelector('.message')
    try{
        const res=await axios({
            method:'POST',
            url:`http://127.0.0.1:8004/Api/v1/User/${Data}/Make-order`,
        })
    if(res.data.status=="success"){
        window.setTimeout(()=>{
            Input.innerHTML=`<div class="alert alert-success" role="alert" style="padding: 8px;">
                                    Order placed..
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


document.querySelector("#gigsubmit").addEventListener('click',e=>{
    e.preventDefault()
    const Data=document.getElementById("gigsubmit").value

    PlcaeOrder(Data)
})