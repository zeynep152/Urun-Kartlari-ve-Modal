let data = [];
let container = document.getElementById("container");
let modal = document.getElementById("product-modal");

fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((res) => {
        data = res;
        data.forEach(val => {
            let fullStar = parseInt(val.rating.rate);
            let emptyStar = 5 - fullStar;

            let starsDiv = document.createElement("div");
            starsDiv.setAttribute("class", "stars");

            for (let i = 0; i < fullStar; i++) {
                starsDiv.innerHTML += `<span class="full-star">&#9733;</span>`;
            }
            for (let i = 0; i < emptyStar; i++) {
                starsDiv.innerHTML += `<span class="empty-star">&#9734;</span>`;
            }

            container.innerHTML += `
                <div class="cards">
                    <img class="image" alt="image" src="${val.image}" />
                    <div class="details">
                        <span class="product-name">${val.title}</span>
                        <div class="stars">
                            ${starsDiv.innerHTML}
                            <span class="rating-count">${val.rating.count}</span>
                        </div>
                        <span class="price">${val.price}$</span>
                        <button class="view-details-btn" data-id="${val.id}">Sepete ekle</button>
                    </div>
                </div>
            `;
        });

        // Kart tıklama olayını ekle
        document.querySelectorAll(".view-details-btn").forEach(button => {
            button.addEventListener("click", (event) => {
                let productId = event.target.getAttribute("data-id");
                let product = data.find(p => p.id == productId);
                showModal(product);
            });
        });
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });


    function showModal(product) {
        document.getElementById("modal-image").src = product.image;
        document.getElementById("modal-name").textContent = product.title;
    
        let starsDiv = document.getElementById("modal-stars");
        starsDiv.innerHTML = "";
        let fullStar = parseInt(product.rating.rate);
        let emptyStar = 5 - fullStar;
    
        for (let i = 0; i < fullStar; i++) {
            starsDiv.innerHTML += `<span class="full-star">&#9733;</span>`;
        }
        for (let i = 0; i < emptyStar; i++) {
            starsDiv.innerHTML += `<span class="empty-star">&#9734;</span>`;
        }
        starsDiv.innerHTML += `<span class="modal-rating-count">${product.rating.count}</span>`
        document.getElementById("modal-description").textContent = product.description;
        document.getElementById("modal-price").textContent = `${product.price}$`;
    
        modal.style.display = "block";
    }
    
    document.getElementById("close-btn").onclick = function(){
        modal.style.display = "none";
    }