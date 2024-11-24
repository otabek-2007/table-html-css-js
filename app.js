const data = [
    { id: 1, category: "teal", name: "Kids English", teacher: "Ahmedova Moxira", room_number: "Ke-20 [Wh2]", color: "#043232", start_time: "10:00", end_time: "11:30", extra: "1 sep - 31 oct" },

    { id: 2, category: "teal", name: "Kids English(s)", teacher: "Ahmedova Moxira", room_number: "Ke-20 [Wh2]", color: "#043232", start_time: "12:00", end_time: "13:30", extra: "1 sep - 31 oct" },

    { id: 3, category: "Green", name: "General English", teacher: "Afijonova Saidka", room_number: "Ke-20 [Wh2]", color: "#99d3ba", start_time: "11:00", end_time: "12:30", extra: "1 dec - 1 jan" },

    { id: 4, category: "Brown", name: "General English", teacher: "Nazarova Maftuna", room_number: "Ke-20 [Wh2]", color: "#503022", start_time: "14:00", end_time: "15:30", extra: "10 sep - 10 may" },

    { id: 5, category: "Pink", name: "IELTS", teacher: "Dilnoza", room_number: "Ke-20 [Wh2]", color: "#f97ea5", start_time: "9:30", end_time: "11:00", extra: "9 nov - 6 dec" },
    { id: 6, category: "Pink", name: "IELTS", teacher: "Dilnoza", room_number: "Ke-20 [Wh2]", color: "#f97ea5", start_time: "17:30", end_time: "19:00", extra: "9 nov - 6 dec" }
];

function generateTimeSlots(start, end) {
    const times = [];
    let [hour, minute] = start.split(":").map(Number);

    while (hour < parseInt(end.split(":")[0]) || (hour === parseInt(end.split(":")[0]) && minute < parseInt(end.split(":")[1]))) {
        times.push(`${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`);
        minute += 30;
        if (minute === 60) {
            minute = 0;
            hour += 1;
        }
    }
    return times;
}

const timeSlots = generateTimeSlots("09:00", "19:30");

function renderSchedule(data) {
    const scheduleTable = document.getElementById("scheduleTable");
    scheduleTable.innerHTML = "";

    const headerRow = document.createElement("div");
    headerRow.classList.add("row");
    headerRow.innerHTML = `<div class="time-header"></div>` +
        timeSlots.map(time => {
            const timeClass = time === "10:00" || time === "14:00" || time === "11:30" || time === "18:30" || time === "16:30" ? 'bold' : 'gray';
            return `<div class="time-header ${timeClass}">${time}</div>`;
        }).join("");
    scheduleTable.appendChild(headerRow);


    const categories = ["Teal", "Green", "Brown", "Pink"];
    categories.forEach((category) => {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row");

        rowDiv.innerHTML = `<div class="color-row">${category}</div>`;

        timeSlots.forEach((time, index) => {
            const event = data.find(d =>
                d.category.toLowerCase() === category.toLowerCase() &&
                time >= d.start_time &&
                time < d.end_time
            );
            function lightenColor(color, percent) {
                const r = parseInt(color.slice(1, 3), 16);
                const g = parseInt(color.slice(3, 5), 16);
                const b = parseInt(color.slice(5, 7), 16);

                const newR = Math.min(255, Math.floor(r + (255 - r) * percent));
                const newG = Math.min(255, Math.floor(g + (255 - g) * percent));
                const newB = Math.min(255, Math.floor(b + (255 - b) * percent));

                return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
            }
            if (event && time === event.start_time) {
                const startIndex = index;
                const endIndex = timeSlots.findIndex(t => t === event.end_time);

                const spanLength = endIndex - startIndex;
                const teacherNameColor = lightenColor(event.color, 0.2);

                rowDiv.innerHTML += `<div class="event" style="grid-column: ${startIndex + 2} / span ${spanLength};">
                    <div class="inner-div" style="background-color: ${event.color};">
                        <div class="room-number">
                            <span style="background-color:white; color:black; padding:3px; border-radius:4px;">
                                ${event.room_number} 
                            </span>
                            <span class="event-name">${event.name}</span>
                        </div>
                        
                        <div class="teacher-name" style="background-color:${teacherNameColor}; padding: 3px;">
                            ${event.teacher}
                        </div>
                        <div class="extra-info">${event.extra}</div>
                    </div>
                </div>
                `;
            } else if (!event) {
                rowDiv.innerHTML += `<div class="event"></div>`;
            }
        });

        scheduleTable.appendChild(rowDiv);
    });
}

renderSchedule(data);
