let data;

fetch("json/vn_only_simplified_json_generated_data_vn_units.json")
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData;
        populateProvinces();
    })
    .catch(error => console.error('Error loading JSON:', error));

function populateProvinces() {
    const provinces = data.map(item => ({
        code: item.Code,
        name: item.FullName
    }));

    const provinceSelect = document.getElementById('province');

    provinces.forEach(province => {
        const option = document.createElement('option');
        option.value = province.code;
        option.text = province.name;
        provinceSelect.appendChild(option);
    });

    provinceSelect.addEventListener('change', function() {
        populateDistricts(this.value);
        document.getElementById('ward').disabled = true;
        document.getElementById('ward').innerHTML = '<option value="">Chọn xã / phường</option>';
    });
}

function populateDistricts(provinceCode) {
    const districts = data.find(province => province.Code === provinceCode).District;
    const districtSelect = document.getElementById('district');

    districtSelect.innerHTML = '<option value="">Chọn quận / huyện</option>';
    districtSelect.disabled = false;

    districts.forEach(district => {
        const option = document.createElement('option');
        option.value = district.Code;
        option.text = district.FullName;
        districtSelect.appendChild(option);
    });

    districtSelect.addEventListener('change', function() {
        populateWards(this.value);
    });
}

function populateWards(districtCode) {
    const selectedProvince = data.find(province => province.District.some(district => district.Code === districtCode));
    const wards = selectedProvince.District.find(district => district.Code === districtCode).Ward;
    const wardSelect = document.getElementById('ward');

    wardSelect.innerHTML = '<option value="">Chọn xã / phường</option>';
    wardSelect.disabled = false;

    wards.forEach(ward => {
        const option = document.createElement('option');
        option.value = ward.Code;
        option.text = ward.FullName;
        wardSelect.appendChild(option);
    });
}

//cap nhat san pham tu gio hang
function getCart() {
    const cart = sessionStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function displayCart() {
    const cart = getCart();
    const cartItemsContainer = document.querySelector('.cart-items-container');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');

    let cartTotal = 0;
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `
            <p>${item.name} - ${item.price} VND</p>
        `;
        cartItemsContainer.appendChild(itemElement);
        cartTotal += item.price;
    });

    subtotalElement.textContent = `${cartTotal} VND`;
    totalElement.textContent = `${cartTotal} VND`;
}

window.onload = function() {
    displayCart();
};
//cap nhat thong bao sau khi bam hoan tat don
document.getElementById('order').addEventListener('click', function(event) {
    event.preventDefault();
    const noti = document.querySelector('.noti');
    noti.style.display = 'block';
    document.querySelector('.pay').style.display = 'none';
});