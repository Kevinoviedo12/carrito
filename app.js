//variables
//me devuelve la lista de elementos de la clase .products
let allContainerCart = document.querySelector('.products');
let containerBuyCart = document.querySelector('.card-items')
let buyThings = [];
//functions
//Añado los listenrs a los selectores
loadEventListenrs();
function loadEventListenrs(){
    allContainerCart.addEventListener('click', addProduct );
    containerBuyCart.addEventListener('click', deleteProduct);
}

function addProduct(e) {
    e.preventDefault(); //tengo que utilizar el prevent default para que el boton no me recargue la pagina
    //Hago esta condicion asi solo me agrega el producto cuando presiono en el btn ad to cart
    //el classList me devuelve la clase contains
    if(e.target.classList.contains('btn-add-cart')){
    const selectProduct = e.target.parentElement;
    readTheContent(selectProduct);
    //console.log(e.target.parentElement); El parent element me recupera el padre del elemento
    }   
}
//esta funcion lo que hagao es que si son distintos no los devuelva y crea otro arreglo
function deleteProduct(e){
    if(e.target.classList.contains('delete-product')){
        const deleteId = e.target.getAttribute('data-id');
        buyThings = buyThings.filter(product => product.id !== deleteId);
        } 
    loadHtml(); 
}
function readTheContent(product){
    //saco lo necesario de cada producto
    const infoProduct = {
        image: product.querySelector('div img').src, //recupero el link de cada imagen
        titulo: product.querySelector('.title').textContent, //Para recuperar el contenido de un p o h
        price: product.querySelector('div p span').textContent,
        id: product.querySelector('a').getAttribute('date-id'), //para recuperar un atributo personalizado .getAtribute y el nombre del atributo
        amount: 1
    }
    buyThings = [...buyThings, infoProduct] //con los ... hago una copia con todo lo que hay en buythings y lo concateno con infoPorduct
    loadHtml();
    console.log(infoProduct);
}
function loadHtml(){
    clearHtml();
    buyThings.forEach(product => {
        const {image, title, price,amount,id} = product; //destructuro el objeto, lo que hago es sacar kis atributos del objeto y al mismo tiempo declararlas con sus mismas variables
        const row = document.createElement('div');
        row.classList.add('item'); //agrego la clase item al div
        row.innerHTML = ` 
            <img src="${image}" alt="">
                <div class="item-content">
                    <h5>${title}</h5>
                    <h5 class="cart-price">${price}</h5>
                    <h6>Amount: ${amount}</h6>
                    </div>
            <span class="delete-product" data-id="${id}">X</span>
        `//innerHTML, nos permite agregar una cadenita de cualquier contenido
        //concateno image

        containerBuyCart.appendChild(row); //le agrego un hijo al selector row
    });
}
//con esta funcion hago que me limpie y no se repitan los productos guardados en el carrito
function clearHtml(){
    containerBuyCart.innerHTML = '';
}



