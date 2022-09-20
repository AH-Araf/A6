const loadData1 = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayDataWeb(data.data);
}
const displayDataWeb = (Dataobject) => {
    Dataobject.news_category.forEach(element => {
        const ulEle = document.getElementById('ul-li');
        const createLi = document.createElement('li');
        createLi.classList.add('navbar-items');
        createLi.innerHTML = `
        <a onclick="valId('${element.category_id}','${element.category_name}')" class="nav-link" href="#">${element.category_name}</a>
        `
        ulEle.appendChild(createLi);
    });
}
const valId = (idName, catagoryName) => {
    AddSpinner(true);
    fetch(`https://openapi.programming-hero.com/api/news/category/${idName}`)
        .then(res => res.json())
        .then(data => displayof(data.data, catagoryName))
}
const displayof = (data, catName) => {
    const arrLength = data.length;
    const innerBody = document.getElementById('bodyPart');
    const data1 = document.getElementById('Data');
    innerBody.innerHTML = ``;
    const result1 = document.getElementById('result');
    result1.innerText = `${arrLength} items found for category ${catName}`
    if (arrLength === 0) {
        data1.innerHTML = `
        <div class="text-dark py-4 bg-info border border-5 border-dark rounded-4">
           <h1>No News</h1>
        </div>
        `;
        data1.classList.remove('d-none');
    }
    else {
        //sorting highest to lowest view
        data.sort((a, b) => b.total_view - a.total_view);
        let newArray = []; 
        data.forEach((e) => {
            newArray = newArray.concat(e);
        });
        data1.classList.add('d-none');
        newArray.forEach(element => {
            const createDivs = document.createElement('div');
            createDivs.innerHTML = `<div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${element.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h4 class="card-title">${element.title}</h4>
                            <p class="card-text">${element.details.slice(0, 200)}...</p> <br><br>
                            <div class = "d-flex justify-content-between">
                                <div class = "d-flex">
                                    <div class = "px-2">
                                    <img  width="35" height="35" src="${element.author.img}" class="rounded-circle" alt="image">
                                    </div>
                                    <div>
                                    ${element.author.name}
                                    </div>
                                <div>
                                </div>
                                </div>
                                <div>
                                <i class="fa-regular fa-eye"></i>
                                <div>
                                ${element.total_view}
                                </div>
                                </div>
                                <div>
                                <button  onclick ="arrowSym('${element._id}')"   type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right"></i></button>
                                </div>
                            </div>
                            <div>
                            ${element.author.published_date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
            innerBody.appendChild(createDivs);
        });
    }
    AddSpinner(false);
}
const arrowSym = eleId => {
    fetch(`https://openapi.programming-hero.com/api/news/${eleId}`)
        .then(res => res.json())
        .then(data => getDet(data.data))
}
const getDet = detDat => {
    const modalId = document.getElementById('Modal-Open');
    modalId.innerText = detDat[0].title;
    const modalIdBd = document.getElementById('modal-body');
    modalIdBd.innerHTML = `
    <p> ${detDat[0].details} </p>
`
}
const AddSpinner = isTrueVal => {
    const spinId = document.getElementById('spinner');
    if (isTrueVal) {
        spinId.classList.remove('d-none');
    }
    else {
        spinId.classList.add('d-none');
    }
}
loadData1();