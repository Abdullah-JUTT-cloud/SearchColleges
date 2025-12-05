let url="http://universities.hipolabs.com/search?name=";
let btn=document.querySelector("button");

btn.addEventListener("click",async ()=>{
    let country=document.querySelector("input").value;
    console.log(country);

    let colleges=await getColleges(country);
    showColleges(colleges);
});

function showColleges(colleges){
    let list=document.querySelector("#list");
    list.innerText="";
    for(col of colleges){
        let li=document.createElement("li");
        li.innerText=col.name;
        list.appendChild(li);
    }
}
async function getColleges(country){
    try {
        let res = await axios.get(url+country);
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
btn.addEventListener("click",()=>{
    let input=document.querySelector("input");
    input.value="";
});