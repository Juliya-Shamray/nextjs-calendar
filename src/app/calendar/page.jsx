"use client";
import PrivateRoutes from "@/components/PrivateRoutes";
import "./styles.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectEvents } from "@/redux/calendar/selectors";
import Modal from "@/components/Modal/Modal";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const events = useSelector(selectEvents);
  const timeSlots = generateTimeSlots();

  const openModal = (slot) => {
    setIsModalOpen(true);
    setSelectedSlot(slot);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <PrivateRoutes>
      <div className="container">
        <div className="wrapper">
          <ul>
            {timeSlots.slice(0, 10).map((slot, index) => (
              <li
                key={index}
                className={`${
                  slot.isHalf ? "time half-hour" : "time full-hour"
                }`}
                onClick={() => openModal(slot)}
              >
                {slot.time}
                {events.length > 0 &&
                  events.map((event, eventIndex) => (
                    <div key={eventIndex}>{event.title}</div>
                  ))}
              </li>
            ))}
          </ul>
          <ul className="list">
            {timeSlots.slice(10).map((slot, index) => (
              <li
                key={index + 10}
                className={`${
                  slot.isHalf ? "time half-hour" : "time full-hour"
                }`}
                onClick={() => openModal(slot)}
              >
                {slot.time}
                {events.length > 0 &&
                  events.map((event, eventIndex) => (
                    <div key={eventIndex}>{event.title}</div>
                  ))}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isModalOpen && (
        <Modal closeModal={closeModal} selectedSlot={selectedSlot} />
      )}
    </PrivateRoutes>
  );
};

export default MyCalendar;
