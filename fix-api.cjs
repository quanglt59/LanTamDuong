const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'OrderForm.jsx');
let content = fs.readFileSync(filePath, 'utf-8');

// Replace provinces fetch
content = content.replace(
/  \/\/ Load provinces from API\r?\n  useEffect\(\(\) => \{\r?\n    fetch\('https:\/\/esgoo\.net\/api-tinh-thanh\/1\/0\.htm'\)\r?\n      \.then\(res => res\.json\(\)\)\r?\n      \.then\(data => \{\r?\n        if \(data\.error === 0\) setProvincesList\(data\.data\);\r?\n      \}\)\r?\n      \.catch\(err => console\.error\('Error fetching provinces:', err\)\);\r?\n  \}, \[\]\);/g,
`  // Load provinces from API
  useEffect(() => {
    fetch('https://provinces.open-api.vn/api/p/')
      .then(res => res.json())
      .then(data => {
        setProvincesList(data);
      })
      .catch(err => console.error('Error fetching provinces:', err));
  }, []);`
);


// Replace districts fetch
content = content.replace(
/      fetch\(\`https:\/\/esgoo\.net\/api-tinh-thanh\/2\/\$\{cityId\}\.htm\`\)\r?\n        \.then\(res => res\.json\(\)\)\r?\n        \.then\(data => \{\r?\n          if \(data\.error === 0\) setDistrictsList\(data\.data\);\r?\n          setWardsList\(\[\]\);\r?\n        \}\)/g,
`      fetch(\`https://provinces.open-api.vn/api/p/\${cityId}?depth=2\`)
        .then(res => res.json())
        .then(data => {
          if (data.districts) setDistrictsList(data.districts);
          setWardsList([]);
        })`
);

// Replace wards fetch
content = content.replace(
/      fetch\(\`https:\/\/esgoo\.net\/api-tinh-thanh\/3\/\$\{districtId\}\.htm\`\)\r?\n        \.then\(res => res\.json\(\)\)\r?\n        \.then\(data => \{\r?\n          if \(data\.error === 0\) setWardsList\(data\.data\);\r?\n        \}\)/g,
`      fetch(\`https://provinces.open-api.vn/api/d/\${districtId}?depth=2\`)
        .then(res => res.json())
        .then(data => {
          if (data.wards) setWardsList(data.wards);
        })`
);

// Replace object matching `c.id === data.city`
content = content.replace(
/const cityObj = provincesList\.find\(c => c\.id === data\.city\);\s*const cityName = cityObj\?\.full_name \|\| '';\s*const districtObj = districtsList\.find\(d => d\.id === data\.district\);\s*const districtName = districtObj\?\.full_name \|\| '';\s*const wardObj = wardsList\.find\(w => w\.id === data\.ward\);\s*const wardName = wardObj\?\.full_name \|\| '';/g,
`    const cityObj = provincesList.find(c => c.code.toString() === data.city.toString());
    const cityName = cityObj?.name || '';
    
    const districtObj = districtsList.find(d => d.code.toString() === data.district.toString());
    const districtName = districtObj?.name || '';
    
    const wardObj = wardsList.find(w => w.code.toString() === data.ward.toString());
    const wardName = wardObj?.name || '';`
);

// Replace object matching in handleSubmit `c.id === formData.city`
content = content.replace(
/const cityName = provincesList\.find\(c => c\.id === formData\.city\)\?\.full_name \|\| '';\s*const districtName = districtsList\.find\(d => d\.id === formData\.district\)\?\.full_name \|\| '';\s*const wardName = wardsList\.find\(w => w\.id === formData\.ward\)\?\.full_name \|\| '';/g,
`        const cityName = provincesList.find(c => c.code.toString() === formData.city.toString())?.name || '';
        const districtName = districtsList.find(d => d.code.toString() === formData.district.toString())?.name || '';
        const wardName = wardsList.find(w => w.code.toString() === formData.ward.toString())?.name || '';`
);

// Replace JSX options mapping
// City
content = content.replace(
/\{provincesList\.map\(\(city\) => \([\s\S]*?<option key=\{city\.id\} value=\{city\.id\}>[\s\S]*?\{city\.full_name\}[\s\S]*?<\/option>[\s\S]*?\)\)\}/g,
`{provincesList.map((city) => (
        <option key={city.code} value={city.code}>
          {city.name}
        </option>
      ))}`
);

// District
content = content.replace(
/\{districtsList\.map\(\(district\) => \([\s\S]*?<option key=\{district\.id\} value=\{district\.id\}>[\s\S]*?\{district\.full_name\}[\s\S]*?<\/option>[\s\S]*?\)\)\}/g,
`{districtsList.map((district) => (
          <option key={district.code} value={district.code}>
            {district.name}
          </option>
        ))}`
);

// Ward
content = content.replace(
/\{wardsList\.map\(\(ward\) => \([\s\S]*?<option key=\{ward\.id\} value=\{ward\.id\}>[\s\S]*?\{ward\.full_name\}[\s\S]*?<\/option>[\s\S]*?\)\)\}/g,
`{wardsList.map((ward) => (
          <option key={ward.code} value={ward.code}>
            {ward.name}
          </option>
        ))}`
);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Fixed API to open-api.vn successfully.');
