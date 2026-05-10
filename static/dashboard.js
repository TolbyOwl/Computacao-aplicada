document.addEventListener("DOMContentLoaded", function () {
  const monthYearEl = document.getElementById("month-year");
  const daysEl = document.getElementById("days");
  const prevMonthBtn = document.getElementById("prev-month");
  const nextMonthBtn = document.getElementById("next-month");
  const todayBtn = document.getElementById("today-btn");
  const eventPanel = document.getElementById("event-panel");
  const eventDateEl = document.getElementById("event-date");
  const eventListEl = document.getElementById("event-list");
  const notificationList = document.querySelector(".notification-list");

  let currentDate = new Date();
  let selectedDate = null;

  // Sample events data
  let events = {};

  // Render calendar
  function renderCalendar() {
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    );

    const lastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    );

    const prevLastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0,
    );

    const firstDayIndex = firstDay.getDay();
    const lastDayIndex = lastDay.getDay();
    const nextDays = 7 - lastDayIndex - 1;

    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    monthYearEl.innerHTML = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

    let days = "";

    // Previous month days
    for (let x = firstDayIndex; x > 0; x--) {
      const prevDate = prevLastDay.getDate() - x + 1;
      const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${prevDate}`;
      const hasEvent = events[dateKey] !== undefined;

      days += `<div class="day other-month${hasEvent ? " has-events" : ""}">${prevDate}</div>`;
    }

    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        i,
      );

      const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${i}`;
      const hasEvent = events[dateKey] !== undefined;

      let dayClass = "day";

      if (
        date.getDate() === new Date().getDate() &&
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === new Date().getFullYear()
      ) {
        dayClass += " today";
      }

      if (
        selectedDate &&
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear()
      ) {
        dayClass += " selected";
      }

      if (hasEvent) {
        dayClass += " has-events";
      }

      days += `<div class="${dayClass}" data-date="${dateKey}">${i}</div>`;
    }

    // Next month days
    for (let j = 1; j <= nextDays; j++) {
      const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 2}-${j}`;
      const hasEvent = events[dateKey] !== undefined;

      days += `<div class="day other-month${hasEvent ? " has-events" : ""}">${j}</div>`;
    }

    daysEl.innerHTML = days;

    // Add click event to days
    document.querySelectorAll(".day:not(.other-month)").forEach((day) => {
      day.addEventListener("click", () => {
        const dateStr = day.getAttribute("data-date");
        const [year, month, dayNum] = dateStr.split("-").map(Number);
        selectedDate = new Date(year, month - 1, dayNum);
        renderCalendar();
        showEvents(dateStr);
      });
    });
  }

  // Show events for selected date
  async function showEvents(dateStr) {
    let dayEvents = [];

    try {
      const response = await fetch("/get_events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dateStr, request: "fetch_events" }),
      });
      if (!response.ok) {
        throw new Error("Falha na requisição");
      }
      dayEvents = await response.json();
      console.log(dayEvents);
    } catch (error) {
      console.error(error);
      console.log(dayEvents);
      eventListEl.innerHTML = `<div class="no-events text-danger">Erro ao carregar eventos: ${error.message}</div>`;
      return;
    }

    const [year, month, day] = dateStr.split("-").map(Number);
    const dateObj = new Date(year, month - 1, day);
    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    const dayNames = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ];
    const dayName = dayNames[dateObj.getDay()];

    eventDateEl.textContent = `${dayName}, ${day} de ${months[dateObj.getMonth()]} de ${year}`;

    // Clear previous events
    eventListEl.innerHTML = "";

    if (
      dayEvents &&
      dayEvents.status === "success" &&
      dayEvents.events.length > 0
    ) {
      dayEvents.events.forEach((event) => {
        let eventTime = "Dia todo";

        if (event.start.dateTime && event.end.dateTime) {
          const dateObj = new Date(event.start.dateTime);
          eventTime = dateObj.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
        }

        const eventItem = document.createElement("div");
        eventItem.className = "event-item";
        eventItem.innerHTML = `
          <a href="/event/open/${event.id}" target="_blank" class="event-link">
            <div class="event-color"></div>
            <div class="event-time">${eventTime}</div>
            <div class="event-text">${event.summary}</div>
          </a>
        `;
        eventListEl.appendChild(eventItem);
      });
    } else {
      eventListEl.innerHTML =
        '<div class="no-events">Nenhuma consulta agendada para este dia</div>';
    }
  }

  // Previous month
  prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
    eventDateEl.textContent = "Select a date";
    eventListEl.innerHTML =
      '<div class="no-events">Select a date with events to view them here</div>';
  });

  // Next month
  nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
    eventDateEl.textContent = "Select a date";
    eventListEl.innerHTML =
      '<div class="no-events">Select a date with events to view them here</div>';
  });

  // Today button
  todayBtn.addEventListener("click", () => {
    currentDate = new Date();
    selectedDate = new Date();
    renderCalendar();

    const dateStr = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
    showEvents(dateStr);
  });

  // Initialize calendar
  renderCalendar();
  const todayStr = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
  showEvents(todayStr);

  // notifications
  notificationList.onclick = function (event) {
    let item = event.target.closest(".notification-item");

    if (!item) return;

    if (event.target.closest(".action-btn")) {
      const isAccept = event.target.closest(".btn-accept");
      item.style.transform = "translateX(100px)";
      item.style.opacity = "0";
      setTimeout(() => {
        item.remove();
      }, 300);
      return;
    }

    document.querySelectorAll(".notification-item").forEach((other) => {
      if (other !== item) other.classList.remove("active");
    });

    item.classList.toggle("active");
  };
});
