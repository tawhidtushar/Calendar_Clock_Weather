function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const date = now.getDate();
    const year = now.getFullYear();

    document.getElementById('clock').innerHTML = `
        <div class="time-segment">
            <div class="digit">${hours[0]}</div>
            <div class="digit">${hours[1]}</div>
        </div>
        <div class="colon">:</div>
        <div class="time-segment">
            <div class="digit">${minutes[0]}</div>
            <div class="digit">${minutes[1]}</div>
        </div>
        <div class="colon">:</div>
        <div class="time-segment">
            <div class="digit">${seconds[0]}</div>
            <div class="digit">${seconds[1]}</div>
        </div>`;

    document.getElementById('date').textContent = `${dayName}, ${monthName} ${date}, ${year}`;
}

function updateCalendar() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const today = now.getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    document.getElementById('calendar-header').innerHTML = dayNames.map(
        day => `<div class="calendar-header">${day}</div>`).join('');

    let daysHTML = '';
    for (let i = 0; i < firstDay; i++) {
        daysHTML += `<div class="calendar-day other-month">${prevMonthDays - firstDay + i + 1}</div>`;
    }
    for (let i = 1; i <= daysInMonth; i++) {
        const isToday = i === today;
        daysHTML += `<div class="calendar-day ${isToday ? 'current' : ''}">${i}</div>`;
    }
    const remainingCells = 42 - (firstDay + daysInMonth);
    for (let i = 1; i <= remainingCells; i++) {
        daysHTML += `<div class="calendar-day other-month">${i}</div>`;
    }
    document.getElementById('calendar-days').innerHTML = daysHTML;
}

function updateBattery() {
    if ('getBattery' in navigator) {
        navigator.getBattery().then(battery => {
            const batteryLevel = Math.round(battery.level * 100);
            document.getElementById('battery-level').textContent = `${batteryLevel}%`;

            let batteryIcon = battery.charging ? '⚡' : batteryLevel > 75 ? '🔋' : batteryLevel > 25 ? '🪫' : '❗';
            document.getElementById('battery-icon').textContent = batteryIcon;

            battery.addEventListener('chargingchange', updateBattery);
            battery.addEventListener('levelchange', updateBattery);
        });
    } else {
        document.getElementById('battery-level').textContent = '';
        document.getElementById('battery-icon').textContent = '';
    }
}

function updateWeather() {
    const weatherConditions = ['☀️', '⛅', '🌧️', '⛈️', '❄️'];
    const weatherDescriptions = [
        'Sunny, feels like 26°C',
        'Partly cloudy, feels like 22°C',
        'Rainy, feels like 18°C',
        'Thunderstorm, feels like 20°C',
        'Snowy, feels like -2°C'
    ];
    const randomTemp = Math.floor(Math.random() * 15) + 15;
    const randomIndex = Math.floor(Math.random() * weatherConditions.length);

    document.getElementById('temperature').textContent = `${randomTemp}°C`;
    document.getElementById('weather-icon').textContent = weatherConditions[randomIndex];
    document.getElementById('weather-details').textContent = weatherDescriptions[randomIndex];
}

function init() {
    updateClock();
    updateCalendar();
    updateBattery();
    updateWeather();
    setInterval(updateClock, 1000);
    setInterval(updateWeather, 3600000);
    setInterval(updateCalendar, 86400000);
}

document.addEventListener('DOMContentLoaded', init);
