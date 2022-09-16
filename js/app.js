const loadCategory = () =>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayPortal(data.data.news_category
        ));
}
const displayPortal = (categories) =>{
    const allItems = document.getElementById('display-details');
    categories.forEach(element =>{
        const div = document.createElement("div");
        div.innerHTML=`
        <div>${element.category_name}</div>
        `;
        allItems.appendChild(div);
    })
}


//loding category files

const loadPhones = async(dataLimit) =>{ //searchText for seacrhing phones
    const url = 'https://openapi.programming-hero.com/api/news/category/01'
    const res = await fetch(url);
    const data = await res.json();
    console.log(data)
    displayPhones(data.data[0], dataLimit); //2nd data is from api
}

const displayPhoneDetails = phone =>{
    console.log(phone);
    // const modalTitle = document.getElementById('phones-container');
    // modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phones-container');
    console.log();
    phoneDetails.innerHTML = `
        <img>Release Date: ${phone.img}</img>
        <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Information '}</p>
        <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information'}</p>
        <p>Sensor: ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] : 'no sensor'}</p>
    `
}
    
    

    


loadPhones();
loadCategory();