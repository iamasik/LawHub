const CreateJobs=async(Myobj)=>{
    const Input=document.querySelector('.message')
    try{
        const res=await axios({
            method:'POST',
            url:'http://127.0.0.1:8004/Api/v1/GIg/Add',
            data:Myobj
        })
    if(res.data.status=="success"){
        window.setTimeout(()=>{
            Input.innerHTML=`<div class="alert alert-success" role="alert" style="padding: 8px;">
                                    Create Job Success..
                            </div>`
          location.assign("/Alljobs")
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


document.querySelector(".NewGig").addEventListener('submit',e=>{
    e.preventDefault()
    const Myobj={}
    Myobj.title=document.getElementById("Title").value
    Myobj.catagory=document.getElementById("Category").value
    Myobj.price=parseInt(document.getElementById("service-price").value)
    Myobj.keywords=document.getElementById("Keyword").value
    Myobj.description=document.getElementById("description").value
    CreateJobs(Myobj)
})