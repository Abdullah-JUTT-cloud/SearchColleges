// let url="http://universities.hipolabs.com/search?name=";
// let btn=document.querySelector("button");

// btn.addEventListener("click",async ()=>{
//     let country=document.querySelector("input").value;
//     console.log(country);

//     let colleges=await getColleges(country);
//     showColleges(colleges);
// });

// function showColleges(colleges){
//     let list=document.querySelector("#list");
//     list.innerText="";

  // group by province
//     let grouped = {};

//     for (let col of colleges){
//         let province = col["state-province"] || "Unknown";
//         if (!grouped[province]){
//             grouped[province] = [];
//         }
//         grouped[province].push(col.name);
//     }

//     // now display
//     for (let province in grouped){
//         let h3 = document.createElement("h3");
//         h3.innerText = province;
//         list.appendChild(h3);

//         let ul = document.createElement("ul");
//         for (let college of grouped[province]){
//             let li = document.createElement("li");
//             li.innerText = college;
//             ul.appendChild(li);
//         }
//         list.appendChild(ul);
//     }
// }
// async function getColleges(country){
//     try {
//         let res = await axios.get(url+country);
//         console.log(res.data);
//         return res.data;
//     } catch (error) {
//         console.log(error);
//     }
// }
// btn.addEventListener("click",()=>{
//     let input=document.querySelector("input");
//     input.value="";
// });

let url = "https://cors-anywhere.herokuapp.com/http://universities.hipolabs.com/search?name=";
let btn = document.querySelector("button");

window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 3500);
});

setInterval(() => {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.top = Math.random() * 50 + '%';
    star.style.left = Math.random() * 50 + '%';
    document.body.appendChild(star);
    
    setTimeout(() => star.remove(), 4000);
}, 3000);

setInterval(() => {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 8000);
}, 600);

btn.addEventListener("click", async () => {
    let country = document.querySelector("input").value;
    console.log(country);
    
    if (!country.trim()) {
        alert("Please enter a country name!");
        return;
    }

    const landingRocket = document.createElement('div');
    landingRocket.className = 'search-rocket-landing';
    landingRocket.textContent = '🚀';
    document.body.appendChild(landingRocket);

    setTimeout(() => {
        const explosion = document.createElement('div');
        explosion.className = 'explosion';
        explosion.textContent = '💥';
        document.body.appendChild(explosion);
        
        setTimeout(() => explosion.remove(), 1000);
    }, 1800);

    setTimeout(() => landingRocket.remove(), 3000);

    setTimeout(async () => {
        let colleges = await getColleges(country);
        showColleges(colleges);
    }, 2800);
});

function showColleges(colleges) {
    let list = document.querySelector("#list");
    list.innerText = "";

    if (!colleges || colleges.length === 0) {
        let message = document.createElement("p");
        message.id = "State";
        message.innerText = "❌ No colleges found for this country!";
        list.appendChild(message);
        return;
    }

    let successMsg = document.createElement("p");
    successMsg.id = "State";
    successMsg.innerText = `✨ Found ${colleges.length} colleges! ✨`;
    list.appendChild(successMsg);

    let grouped = {};

    for (let col of colleges) {
        let province = col["state-province"] || "Unknown";
        if (!grouped[province]) {
            grouped[province] = [];
        }
        grouped[province].push({
            name: col.name,
            web: col.web_pages[0]
        });
    }

    for (let province in grouped) {
        let h3 = document.createElement("h3");
        h3.innerText = `📍 ${province}`;
        h3.style.color = "#00ffff";
        h3.style.textShadow = "0 0 20px #00ffff";
        h3.style.marginTop = "30px";
        h3.style.marginBottom = "15px";
        h3.style.fontSize = "24px";
        list.appendChild(h3);

        let ul = document.createElement("ul");
        ul.style.listStyle = "none";
        ul.style.padding = "0";
        
        for (let college of grouped[province]) {
            let li = document.createElement("li");
            
            let nameDiv = document.createElement("div");
            nameDiv.className = "college-name";
            nameDiv.innerText = college.name;
            
            let linkDiv = document.createElement("div");
            linkDiv.className = "college-domain";
            let link = document.createElement("a");
            link.href = college.web;
            link.target = "_blank";
            link.innerText = college.web;
            linkDiv.appendChild(link);
            
            li.appendChild(nameDiv);
            li.appendChild(linkDiv);
            ul.appendChild(li);
        }
        list.appendChild(ul);
    }
}

async function getColleges(country) {
    try {
        let res = await axios.get(url + country);
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
        let list = document.querySelector("#list");
        list.innerHTML = '<p id="State">⚠️ Error fetching colleges. Please try again!</p>';
        return [];
    }
}

btn.addEventListener("click", () => {
    setTimeout(() => {
        let input = document.querySelector("input");
        input.value = "";
    }, 3000);
});



