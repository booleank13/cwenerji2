document.addEventListener('DOMContentLoaded', () => {
    const regionData = {
        'ege': { name: 'Ege Bölgesi', projects: 26, energy: '90,76' },
        'ic-anadolu': { name: 'İç Anadolu Bölgesi', projects: 25, energy: '84,50' },
        'akdeniz': { name: 'Akdeniz Bölgesi', projects: 44, energy: '70,41' },
        'marmara': { name: 'Marmara Bölgesi', projects: 34, energy: '64,14' },
        'guneydogu-anadolu': { name: 'Güneydoğu Anadolu Bölgesi', projects: 15, energy: '42,67' },
        'dogu-anadolu': { name: 'Doğu Anadolu Bölgesi', projects: 6, energy: '27,34' },
        'karadeniz': { name: 'Karadeniz Bölgesi', projects: 7, energy: '14,80' }
    };

    const regionNameEl = document.getElementById('region-name');
    const regionDetailsEl = document.getElementById('region-details');

    // Add click listeners to groups
    const groups = document.querySelectorAll('.region-group');

    groups.forEach(group => {
        group.addEventListener('click', () => {
            // Remove active class from all regions
            document.querySelectorAll('.region').forEach(r => r.classList.remove('active'));

            // Add active class to the clicked region path
            const path = group.querySelector('.region');
            if (path) {
                path.classList.add('active');
            }

            const regionId = group.id;
            const data = regionData[regionId];

            if (data) {
                regionNameEl.textContent = data.name;
                regionDetailsEl.innerHTML = `
                    <div class="detail-item">
                        <span class="detail-label">Proje Sayısı:</span> ${data.projects}
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Enerji Miktarı:</span> ${data.energy} MW
                    </div>
                `;
            } else {
                console.warn(`No data for region: ${regionId}`);
            }
        });
    });
});
