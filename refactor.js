const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'OrderForm.jsx');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Remove the huge const cities, districts, wards
const startIdx = content.indexOf('  // Dữ liệu 34 tỉnh thành');
const endIdx = content.indexOf('  // Danh sách nhóm bệnh');

if (startIdx !== -1 && endIdx !== -1) {
  content = content.substring(0, startIdx) + 
`  const [provincesList, setProvincesList] = useState([]);
  const [districtsList, setDistrictsList] = useState([]);
  const [wardsList, setWardsList] = useState([]);

  // Load provinces from API
  useEffect(() => {
    fetch('https://esgoo.net/api-tinh-thanh/1/0.htm')
      .then(res => res.json())
      .then(data => {
        if (data.error === 0) setProvincesList(data.data);
      })
      .catch(err => console.error('Error fetching provinces:', err));
  }, []);

` + content.substring(endIdx);
} else {
  console.error("Could not find start or end index for cities/districts/wards block");
}

// 2. Update handleCityChange
content = content.replace(
/  const handleCityChange = \(e\) => {[\s\S]*?  };/m,
`  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setFormData({
      ...formData,
      city: cityId,
      district: '',
      ward: ''
    });
    
    if (cityId) {
      fetch(\`https://esgoo.net/api-tinh-thanh/2/\${cityId}.htm\`)
        .then(res => res.json())
        .then(data => {
          if (data.error === 0) setDistrictsList(data.data);
          setWardsList([]);
        })
        .catch(err => console.error('Error fetching districts:', err));
    } else {
      setDistrictsList([]);
      setWardsList([]);
    }
  };`
);

// 3. Update handleDistrictChange
content = content.replace(
/  const handleDistrictChange = \(e\) => {[\s\S]*?  };/m,
`  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setFormData({
      ...formData,
      district: districtId,
      ward: ''
    });
    
    if (districtId) {
      fetch(\`https://esgoo.net/api-tinh-thanh/3/\${districtId}.htm\`)
        .then(res => res.json())
        .then(data => {
          if (data.error === 0) setWardsList(data.data);
        })
        .catch(err => console.error('Error fetching wards:', err));
    } else {
      setWardsList([]);
    }
  };`
);

// 4. Update sendToGoogleSheets city/district/ward extraction
content = content.replace(
/    const cityObj = cities\.find\(c => c\.id === data\.city\);\s*const cityName = cityObj\?\.name \|\| '';\s*const districtObj = districts\[data\.city\]\?\.find\(d => d\.id === data\.district\);\s*const districtName = districtObj\?\.name \|\| '';\s*const wardObj = wards\[data\.district\]\?\.find\(w => w\.id === data\.ward\);\s*const wardName = wardObj\?\.name \|\| '';/m,
`    const cityObj = provincesList.find(c => c.id === data.city);
    const cityName = cityObj?.full_name || '';
    
    const districtObj = districtsList.find(d => d.id === data.district);
    const districtName = districtObj?.full_name || '';
    
    const wardObj = wardsList.find(w => w.id === data.ward);
    const wardName = wardObj?.full_name || '';`
);

// 5. Update handleSubmit city/district/ward extraction
content = content.replace(
/        const cityName = cities\.find\(c => c\.id === formData\.city\)\?\.name \|\| '';\s*const districtName = districts\[formData\.city\]\?\.find\(d => d\.id === formData\.district\)\?\.name \|\| '';\s*const wardName = wards\[formData\.district\]\?\.find\(w => w\.id === formData\.ward\)\?\.name \|\| '';/m,
`        const cityName = provincesList.find(c => c.id === formData.city)?.full_name || '';
        const districtName = districtsList.find(d => d.id === formData.district)?.full_name || '';
        const wardName = wardsList.find(w => w.id === formData.ward)?.full_name || '';`
);

// 6. Update JSX selects mapping
// City
content = content.replace(
/\{cities\.map\(\(city\) => \([\s\S]*?<option key=\{city\.id\} value=\{city\.id\}>[\s\S]*?\{city\.name\}[\s\S]*?<\/option>[\s\S]*?\)\)\}/m,
`{provincesList.map((city) => (
        <option key={city.id} value={city.id}>
          {city.full_name}
        </option>
      ))}`
);

// District
content = content.replace(
/\{districts\[formData\.city\]\?\.map\(\(district\) => \([\s\S]*?<option key=\{district\.id\} value=\{district\.id\}>[\s\S]*?\{district\.name\}[\s\S]*?<\/option>[\s\S]*?\)\)\}/m,
`{districtsList.map((district) => (
          <option key={district.id} value={district.id}>
            {district.full_name}
          </option>
        ))}`
);

// Ward
content = content.replace(
/\{wards\[formData\.district\]\?\.map\(\(ward\) => \([\s\S]*?<option key=\{ward\.id\} value=\{ward\.id\}>[\s\S]*?\{ward\.name\}[\s\S]*?<\/option>[\s\S]*?\)\)\}/m,
`{wardsList.map((ward) => (
          <option key={ward.id} value={ward.id}>
            {ward.full_name}
          </option>
        ))}`
);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Refactoring completed successfully.');
