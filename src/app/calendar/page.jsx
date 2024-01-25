"use client";
import PrivateRoutes from "@/components/PrivateRoutes";
import "./styles.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectEvents } from "@/redux/calendar/selectors";
import Modal from "@/components/Modal/Modal";
import { fetchEvents } from "@/redux/calendar/operations";

const minutesToTime = (minutes) => {
  const hours =
    Math.floor(minutes / 60) + 8 >= 13
      ? Math.floor(Math.floor(minutes / 60 + 8) / 12)
      : Math.floor(minutes / 60) + 8;
  const mins = minutes % 60;
  return `${String(hours)}:${String(mins).padStart(2, "0")}`;
};

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
      isVisible: true,
    });

    // Додавання додаткових слотів між 8:00 та 9:00
    if (i < 18 && i % 2 === 0) {
      const extraMinute1 = minute + 10;
      const extraMinute2 = minute + 20;

      timeSlots.push({
        time: `${hour}:${extraMinute1 === 0 ? "00" : extraMinute1}`,
        isHalf: true,
        isVisible: false,
      });

      timeSlots.push({
        time: `${hour}:${extraMinute2 === 0 ? "00" : extraMinute2}`,
        isHalf: true,
        isVisible: false,
      });
    }
  }
  console.log(timeSlots.length);
  return timeSlots;
};

const MyCalendar = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const events = useSelector(selectEvents);
  const timeSlots = generateTimeSlots();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const parseTimeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const eventOccupiesSlots = (event, slot) => {
    const eventStartTime = parseTimeToMinutes(minutesToTime(event.start));
    const eventEndTime = eventStartTime + event.duration;

    const slotStartTime = parseTimeToMinutes(slot.time);
    const slotEndTime = slotStartTime + 30;

    return (
      (eventStartTime >= slotStartTime && eventStartTime < slotEndTime) ||
      (eventEndTime > slotStartTime && eventEndTime <= slotEndTime) ||
      (eventStartTime < slotStartTime && eventEndTime > slotEndTime)
    );
  };

  const calculateEventHeight = (event) => {
    const slotDuration = 15;

    return (event.duration / slotDuration) * 30;
  };

  const calculateEventWidth = (eventsForSlot) => {
    if (eventsForSlot.length > 1) {
      return "50%";
    }
    return "100%";
  };

  const findEventsForSlot = (slot) => {
    const eventsForSlot = events.filter((event) =>
      eventOccupiesSlots(event, slot)
    );

    if (eventsForSlot.length > 0) {
      const eventStartTimes = eventsForSlot.map((event) =>
        parseTimeToMinutes(minutesToTime(event.start))
      );
      const slotStartTime = parseTimeToMinutes(slot.time);

      const TIME_TOLERANCE = 20;
      return eventsForSlot.filter(
        (event, index) =>
          Math.abs(eventStartTimes[index] - slotStartTime) <= TIME_TOLERANCE
      );
    }

    return [];
  };

  return (
    <PrivateRoutes>
      <div className="container">
        <div className="wrapper">
          <ul>
            {timeSlots.slice(0, 19).map((slot, index) => {
              const eventsForSlot = findEventsForSlot(slot);
              console.log(eventsForSlot);

              return (
                <li
                  key={index}
                  className={`${
                    slot.isHalf ? "time half-hour" : "time full-hour"
                  } ${slot.isVisible ? "visible" : "invisible"}`}
                  onClick={() => openModal(slot)}
                >
                  <span>{slot.time}</span>
                  <div className="events">
                    {eventsForSlot.length > 0 &&
                      eventsForSlot.map((event, eventIndex) => (
                        <div
                          key={eventIndex}
                          className="event"
                          style={{
                            height: calculateEventHeight(event) + "px",
                            width: calculateEventWidth(eventsForSlot),
                          }}
                        >
                          {`${event.title}`}
                        </div>
                      ))}
                  </div>
                </li>
              );
            })}
          </ul>
          <ul>
            {timeSlots.slice(19).map((slot, index) => {
              const eventsForSlot = findEventsForSlot(slot);
              console.log(eventsForSlot);
              if (index % 2 === 0)
                return (
                  <li
                    key={index}
                    className={`${
                      slot.isHalf ? "time half-hour" : "time full-hour"
                    } ${slot.isVisible ? "visible" : "invisible"}`}
                    onClick={() => openModal(slot)}
                  >
                    <span>{slot.time}</span>
                    <div className="events">
                      {eventsForSlot.length > 0 &&
                        eventsForSlot.map((event, eventIndex) => (
                          <div
                            key={eventIndex}
                            className="event"
                            style={{
                              height: calculateEventHeight(event) + "px",
                              width: calculateEventWidth(eventsForSlot),
                            }}
                          >
                            {`${event.title}`}
                          </div>
                        ))}
                    </div>
                  </li>
                );
            })}
          </ul>
        </div>
      </div>
      {isModalOpen && <Modal closeModal={closeModal} />}
    </PrivateRoutes>
  );
};

export default MyCalendar;
