
document.querySelector(".search_item").addEventListener('submit',e=>{
    e.preventDefault()
    const item=document.getElementById("search").value
    location.assign(`/Search/${item}`)
})