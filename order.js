const order_path = 'https://cors-anywhere.herokuapp.com/http://mobileapi.us-e2.cloudhub.io/api/orders/';
const order_url = order_path + '22253513-0135-45b7-bb94-d26b3679bcf9';
fetch(order_url, {
    method: 'GET', // or 'PUT' // data can be `string` or {object}!
}).then(function (response) {
    return response.json();
}).then(function (data) {
    console.log(data);
    createConfirmDetails(data)
    createOrderDetails(data);
});

function createConfirmDetails(data) {
    const confirmInfo = '<div class="font-weight-bold">ORDER SUMMARY </div><div class="dropdown-divider"></div>' + 
    '<div class="font-weight-bold">DELIVERY OPTION </div>';
    const deliveryDate = '<div><input type="radio" checked="true"/><label>'+
    data.deliveryDate+'</label></div>';
    const product = data.productDetails[0];
    const card = '<div class="card">' +
        '<img class="card-img-left" src="'+ product.imageurl+'" alt="Card image cap">' + 
        '<div class="card-body"><p>'+ product.description +'</p>' + 
        '<p> color: '+ product.color +'</p>'+
        '<p> size: '+ product.size +'</p><p>'+product.price+'</p>'+
       '</div></div>';
    const orderInfo = '<div class="font-weight-bold">ORDER</div>' + card;

    document.querySelector('#confirm').innerHTML = confirmInfo + deliveryDate + orderInfo;
}

function createOrderDetails(orderData) {
    const orderInfo = '<div class="font-weight-bold">ORDER NUMBER </div>' + 
    '<div>'+ orderData.orderId +'</div>';

    document.querySelector('#order_info').innerHTML = orderInfo;
}
