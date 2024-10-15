
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

    provinceSelect.addEventListener('change', function () {
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

    districtSelect.addEventListener('change', function () {
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