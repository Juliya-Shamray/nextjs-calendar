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
      ? Math.floor(Math.floor(minutes / 60 + 8) - 12)
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
    });
  }
  console.log(timeSlots);
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

  const findEventsForSlot = (slot) => {
    const eventsForSlot = events.filter((event) =>
      eventOccupiesSlots(event, slot)
    );

    if (eventsForSlot.length > 0) {
      const slotStartTime = parseTimeToMinutes(slot.time);

      return eventsForSlot.map((event) => {
        const eventStartTime = parseTimeToMinutes(minutesToTime(event.start));
        const slotIndex = Math.floor((eventStartTime - slotStartTime) / 30);
        return { ...event, slotIndex };
      });
    }

    return [];
  };

  return (
    <PrivateRoutes>
      <div className="container">
        <button onClick={() => openModal()}>Add event</button>
        <div className="wrapper">
          <ul>
            {timeSlots.slice(0, 10).map((slot, index) => {
              const eventsForSlot = findEventsForSlot(slot);
              return (
                <li
                  key={index}
                  className={`${
                    slot.isHalf ? "time half-hour" : "time full-hour"
                  } `}
                >
                  <div className="slot">{slot.time}</div>
                  <div className="events">
                    {eventsForSlot.length > 0 &&
                      eventsForSlot.map((event, eventIndex) => {
                        const eventStartTime = parseTimeToMinutes(
                          minutesToTime(event.start)
                        );
                        const slotStartTime = parseTimeToMinutes(slot.time);
                        const timeDifference = eventStartTime - slotStartTime;
                        return (
                          <div
                            key={eventIndex}
                            className="event"
                            style={{
                              height: calculateEventHeight(event, slot) + "px",
                              visibility:
                                event.slotIndex === 0 ? "visible" : "hidden",
                              marginTop: `${2 * timeDifference}px`,
                            }}
                          >
                            {event.slotIndex === 0 && `${event.title}`}
                          </div>
                        );
                      })}
                  </div>
                </li>
              );
            })}
          </ul>
          <ul>
            {timeSlots.slice(10).map((slot, index) => {
              const eventsForSlot = findEventsForSlot(slot);

              return (
                <li
                  key={index}
                  className={`${
                    slot.isHalf ? "time half-hour" : "time full-hour"
                  } `}
                >
                  <div className="slot">{slot.time}</div>
                  <div className="events">
                    {eventsForSlot.length > 0 &&
                      eventsForSlot.map((event, eventIndex) => {
                        const eventStartTime = parseTimeToMinutes(
                          minutesToTime(event.start)
                        );
                        const slotStartTime = parseTimeToMinutes(slot.time);
                        const timeDifference = eventStartTime - slotStartTime;
                        return (
                          <div
                            key={eventIndex}
                            className="event"
                            style={{
                              height: calculateEventHeight(event, slot) + "px",
                              visibility:
                                event.slotIndex === 0 ? "visible" : "hidden",
                              marginTop: `${2 * timeDifference}px`,
                            }}
                          >
                            {event.slotIndex === 0 && `${event.title}`}
                          </div>
                        );
                      })}
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
