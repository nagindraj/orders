const inventory_url = 'https://cors-anywhere.herokuapp.com/http://mobileapi.us-e2.cloudhub.io/api/listinventory';
fetch(inventory_url, {
    method: 'GET', // or 'PUT' // data can be `string` or {object}!
}).then(function (response) {
    return response.json();
}).then(function (data) {
    console.log(data);
    createCatalog(data);
});


function createCatalog(products) {
    document.querySelector('#order_details').style.display = 'none';
    document.querySelector('#confirm').style.display = 'none';
    let cards = '';
    products.forEach(product => {
        let options = '';
        product.size.forEach(size => {
            const sizeOption = '<option>'+size+'</option>';
            options = options + sizeOption;
        });
        const card = '<div class="card">' +
        '<img class="card-img-top img-thumbnail" src="'+ product.colours[0].imageurl +'" alt="Card image cap">' + 
        '<div class="card-body"><h6 class="card-title">'+ product.description +'</h6>' + 
        '<div class="images"><img class="img-thumbnail catalog_image" src="'+product.colours[0].imageurl+'">' +
        '<img class="img-thumbnail catalog_image" src="'+product.colours[1].imageurl+'">' +
        '<img class="img-thumbnail catalog_image" src="'+product.colours[2].imageurl+'"></div>' +
        '<div><select class="select-box">'+options+'</select></div>'+
        '<p class="card-text"></p><a href="#" class="btn btn-info">Add to Cart</a>' +
       '</div></div>'

       cards = cards + card;
    });

    document.querySelector('#catalog').innerHTML = cards;

    document.querySelector('.images').addEventListener('click', function(event) {
        console.log(event.target.getAttribute('src'));
        document.querySelector('.card-img-top').setAttribute('src', event.target.getAttribute('src'));
    });

    document.querySelector('.btn-info').addEventListener('click', function(event) {
        let cartItems = 0;
        if(document.querySelector('.badge-primary').innerHTML != "") {
            cartItems = parseInt(document.querySelector('.badge-primary').innerHTML);
        }
        
        document.querySelector('.badge-primary').innerHTML = cartItems + 1;
    });
}

document.querySelector('.fa-shopping-cart').addEventListener('click', function() {
    document.querySelector('#catalog').style.display = 'none';
    document.querySelector('#confirm').style.display = 'block';
});

