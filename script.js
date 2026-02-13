document.addEventListener('DOMContentLoaded', () => {
    const regionData = {
        'ege': {
            name: 'Ege Bölgesi',
            projects: 26,
            energy: '90,76',
            provinces: [
                { name: 'İzmir', projects: 2, energy: '30,33' },
                { name: 'Denizli', projects: 6, energy: '16,43' },
                { name: 'Kütahya', projects: 4, energy: '13,59' },
                { name: 'Uşak', projects: 3, energy: '11,91' },
                { name: 'Manisa', projects: 4, energy: '10,82' },
                { name: 'Aydın', projects: 5, energy: '6,04' },
                { name: 'Afyonkarahisar', projects: 2, energy: '1,64' }
            ]
        },
        'ic-anadolu': {
            name: 'İç Anadolu Bölgesi',
            projects: 25,
            energy: '84,50',
            provinces: [
                { name: 'Kayseri', projects: 3, energy: '27,63' },
                { name: 'Çankırı', projects: 4, energy: '15,94' },
                { name: 'Aksaray', projects: 3, energy: '11,83' },
                { name: 'Nevşehir', projects: 4, energy: '10,65' },
                { name: 'Ankara', projects: 4, energy: '9,42' },
                { name: 'Konya', projects: 6, energy: '7,86' },
                { name: 'Kırşehir', projects: 1, energy: '1,17' }
            ]
        },
        'akdeniz': {
            name: 'Akdeniz Bölgesi',
            projects: 44,
            energy: '70,41',
            provinces: [
                { name: 'Antalya', projects: 38, energy: '45,29' },
                { name: 'Osmaniye', projects: 2, energy: '12,13' },
                { name: 'Kahramanmaraş', projects: 1, energy: '6,18' },
                { name: 'Adana', projects: 1, energy: '3,43' },
                { name: 'Burdur', projects: 2, energy: '3,38' }
            ]
        },
        'marmara': {
            name: 'Marmara Bölgesi',
            projects: 34,
            energy: '65,14',
            provinces: [
                { name: 'Bursa', projects: 18, energy: '23,39' },
                { name: 'Balıkesir', projects: 6, energy: '20,04' },
                { name: 'Tekirdağ', projects: 3, energy: '7,61' },
                { name: 'Kırklareli', projects: 2, energy: '6,35' },
                { name: 'Kocaeli', projects: 1, energy: '5,50' },
                { name: 'Bilecik', projects: 1, energy: '1,67' },
                { name: 'İstanbul', projects: 3, energy: '0,58' }
            ]
        },
        'guneydogu-anadolu': {
            name: 'Güneydoğu Anadolu Bölgesi',
            projects: 15,
            energy: '42,67',
            provinces: [
                { name: 'Şanlıurfa', projects: 6, energy: '16,06' },
                { name: 'Gaziantep', projects: 5, energy: '12,64' },
                { name: 'Batman', projects: 1, energy: '6,61' },
                { name: 'Kilis', projects: 1, energy: '4,50' },
                { name: 'Diyarbakır', projects: 1, energy: '2,31' },
                { name: 'Mardin', projects: 1, energy: '0,55' }
            ]
        },
        'dogu-anadolu': {
            name: 'Doğu Anadolu Bölgesi',
            projects: 6,
            energy: '27,34',
            provinces: [
                { name: 'Elazığ', projects: 2, energy: '20,48' },
                { name: 'Erzincan', projects: 2, energy: '3,33' },
                { name: 'Kars', projects: 1, energy: '2,53' },
                { name: 'Erzurum', projects: 1, energy: '1,00' }
            ]
        },
        'karadeniz': {
            name: 'Karadeniz Bölgesi',
            projects: 7,
            energy: '14,80',
            provinces: [
                { name: 'Ordu', projects: 1, energy: '5,90' },
                { name: 'Amasya', projects: 1, energy: '4,59' },
                { name: 'Düzce', projects: 2, energy: '2,37' },
                { name: 'Tokat', projects: 1, energy: '1,23' },
                { name: 'Çorum', projects: 2, energy: '0,71' }
            ]
        }
    };

    const regionNameEl = document.getElementById('region-name');
    const regionSummaryEl = document.getElementById('region-summary');
    const regionProvincesEl = document.getElementById('region-provinces');

    // Add click listeners to groups
    const groups = document.querySelectorAll('.region-group');

    groups.forEach(group => {
        group.addEventListener('click', () => {
            // Remove active class from all groups
            groups.forEach(g => g.classList.remove('active'));

            // Add active class to the clicked group
            group.classList.add('active');

            const regionId = group.id;
            const data = regionData[regionId];

            if (data) {
                regionNameEl.textContent = data.name;

                // Populate summary
                regionSummaryEl.innerHTML = `
                    <div class="summary-item">
                        <span class="summary-value">${data.projects}</span>
                        <span class="summary-label">proje</span>
                    </div>
                    <div class="summary-divider">,</div>
                    <div class="summary-item">
                        <span class="summary-value">${data.energy}</span>
                        <span class="summary-label">MW</span>
                    </div>
                `;

                // Populate provinces table
                let tableHtml = `
                    <table class="province-table">
                        <thead>
                            <tr>
                                <th>İl</th>
                                <th>Proje</th>
                                <th>MW</th>
                            </tr>
                        </thead>
                        <tbody>
                `;

                data.provinces.forEach(province => {
                    tableHtml += `
                        <tr>
                            <td>${province.name}</td>
                            <td>${province.projects}</td>
                            <td>${province.energy}</td>
                        </tr>
                    `;
                });

                tableHtml += `
                        </tbody>
                    </table>
                `;

                regionProvincesEl.innerHTML = tableHtml;
                regionProvincesEl.style.display = 'block';

            } else {
                console.warn(`No data for region: ${regionId}`);
            }
        });
    });
});
