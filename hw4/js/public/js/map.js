var map = L.map('map').setView([55.798329633985894, 37.43034513072014], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
L.marker([55.798329633985894, 37.43034513072014]).addTo(map)
        .bindPopup('Место силы')
        .openPopup();