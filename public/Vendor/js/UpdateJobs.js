const CreateJobs=async(Myobj,extractedString)=>{
    const Input=document.querySelector('.message')
    try{
        const res=await axios({
            method:'PATCH',
            url:`http://127.0.0.1:8004/Api/v1/GIg/${extractedString}`,
            data:Myobj
        })
    if(res.data.status=="success"){
        window.setTimeout(()=>{
            Input.innerHTML=`<div class="alert alert-success" role="alert" style="padding: 8px;">
                                    Update Success..
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


document.querySelector(".UpdateGig").addEventListener('submit',e=>{
    e.preventDefault()
    const Myobj={}
    Myobj.title=document.getElementById("Title").value
    Myobj.catagory=document.getElementById("Category").value
    Myobj.price=parseInt(document.getElementById("service-price").value)
    Myobj.keywords=document.getElementById("Keyword").value
    Myobj.description=document.getElementById("description").value

    const pattern = /\/Modify\/(\w+)/;
    const match = window.location.pathname.match(pattern);
    if (match) {
        const extractedString = match[1];
        CreateJobs(Myobj,extractedString)
      }
})



const JobDelete=async(extractedString)=>{
    const Input=document.querySelector('.message')
    try{
        const res=await axios({
            method:'DELETE',
            url:`http://127.0.0.1:8004/Api/v1/GIg/${extractedString}`
        })
    if(res.data.status=="success"){
        location.assign("/Alljobs")
    }
    }catch(err){
        alert("Something is wrong...")
    }
}


document.querySelector(".JobDelete").addEventListener('click',e=>{
    e.preventDefault()
    const pattern = /\/Modify\/(\w+)/;
    const match = window.location.pathname.match(pattern);
    if (match) {
        const extractedString = match[1];
        JobDelete(extractedString)
      }
})