const dataLoad = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data);
}
const displayData = (Dataobject) => {
    Dataobject.news_category.forEach(element => {
        const ulSel = document.getElementById('ul-li');
        const creLi = document.createElement('li');
        creLi.classList.add('nav-item');
        creLi.innerHTML = `
        <a onclick="valId('${element.category_id}','${element.category_name}')" class="nav-link" href="#">${element.category_name}</a>
        `
        ulSel.appendChild(creLi);
    });
}

const valId = (idName, catagoryName) => {
    spinnerFun(true);
    fetch(`https://openapi.programming-hero.com/api/news/category/${idName}`)
        .then(res => res.json())
        .then(data => displayof(data.data, catagoryName))
}
const displayof = (data, catName) => {
    const arrLen = data.length;
    const inerBdy = document.getElementById('innerBody');
    const nodata = document.getElementById('NoData');
    inerBdy.innerHTML = ``;
    const result1 = document.getElementById('result');
    result1.innerText = `${arrLen} items found for category ${catName}`
    if (arrLen === 0) {
        nodata.innerText = 'No data';
        nodata.classList.remove('d-none');
    }
    else {
        data.sort((a, b) => a.total_view - b.total_view);
        let newArr = [];
        data.forEach((e) => {
            newArr = newArr.concat(e);
        });
        nodata.classList.add('d-none');
        newArr.forEach(element => {
            const creDiv = document.createElement('div');
            creDiv.innerHTML = `<div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${element.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${element.title}</h5>
                            <p class="card-text">${element.details.slice(0, 200)}...</p>
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
            inerBdy.appendChild(creDiv);
        });
    }
    spinnerFun(false);
}

const arrowSym = eleId => {
    fetch(`https://openapi.programming-hero.com/api/news/${eleId}`)
        .then(res => res.json())
        .then(data => getDet(data.data))
}
const getDet = detDat => {
    const modalId = document.getElementById('exampleModalLabel');
    modalId.innerText = detDat[0].title;
    const modalIdBd = document.getElementById('modal-body');
    modalIdBd.innerHTML = `
    <p> ${detDat[0].details} </p>
`
}
const spinnerFun = isTrue => {
    const spinId = document.getElementById('spinner');
    if (isTrue) {
        spinId.classList.remove('d-none');
    }
    else {
        spinId.classList.add('d-none');
    }
}
dataLoad();