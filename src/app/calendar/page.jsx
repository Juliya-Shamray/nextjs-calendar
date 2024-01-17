import "./styles.css";

const generateTimeSlots = () => {
  const startHour = 8;
  const timeSlots = [];

  for (let i = 0; i < 19; i++) {
    let hour = startHour + Math.floor(i / 2);
    const minute = (i % 2) * 30;

    if (hour > 12) {
      hour -= 12;
    }

    timeSlots.push({
      time: `${hour}:${minute === 0 ? "00" : minute}`,
      isHalf: i % 2 === 1,
    });
  }

  return timeSlots;
};

const MyCalendar = () => {
  const timeSlots = generateTimeSlots();

  return (
    <div className="container">
      <div className="wrapper">
        <ul>
          {timeSlots.slice(0, 10).map((slot, index) => (
            <li
              key={index}
              className={`${slot.isHalf ? "time half-hour" : "time full-hour"}`}
            >
              {slot.time}
            </li>
          ))}
        </ul>
        <ul className="list">
          {timeSlots.slice(10).map((slot, index) => (
            <li
              key={index + 10}
              className={`${slot.isHalf ? "time half-hour" : "time full-hour"}`}
            >
              {slot.time}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyCalendar;
