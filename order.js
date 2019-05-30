const order_path = 'https://cors-anywhere.herokuapp.com/http://mobileapithreads.us-e2.cloudhub.io/api/orders/';
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
    const addressDetails = data.addressDetails;
    const card = '<div class="card">' +
        '<img class="card-img-left" src="'+ product.imageurl+'" alt="Card image cap">' + 
        '<div class="card-body"><p>'+ product.description +'</p>' + 
        '<p> color: '+ product.color +'</p>'+
        '<p> size: '+ product.size +'</p><p>'+product.price+'</p>'+
       '</div></div>';
    const orderInfo = '<div class="font-weight-bold">ORDER</div>' + card;
    const deliveryAddress = '<div><h6>DELIVERY ADDRESS</h6>'+ 
        addressDetails.address1 +'</div><div>'+addressDetails.city +'</div><span>'+addressDetails.stateOrProvince +', </span><span>'+addressDetails.postalCode +'</span><div>' +addressDetails.country +'</div>';
    const paymentDetails = '<div> <h6>Payment Details :</h6><span><i class="fab fa-cc-paypal"></i></span>'+ data.paymentDetails.paymentMethod+'</div><div class="btn btn-success">Confirm Payment </div>'   

    document.querySelector('#confirm').innerHTML = confirmInfo + deliveryDate + orderInfo + deliveryAddress +paymentDetails;
    document.querySelector('.btn-success').addEventListener('click',function(event){
        console.log('BUtton Clicked ');
        document.querySelector('#catalog').style.display = 'none';
        document.querySelector('#order_info').style.display = 'none';
        document.querySelector('#confirm').style.display = 'none';
        document.querySelector('#order_details').style.display ='block';
    
    })
}

function createOrderDetails(orderData) {
    const orderInfo = '<div class="font-weight-bold">ORDER NUMBER </div>' + 
    '<div>'+ orderData.orderId +'</div>';

    document.querySelector('#order_info').innerHTML = orderInfo;
}
