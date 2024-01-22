"use client";
import { useEffect, useState } from "react";
import "./styles.css";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { addEvent } from "@/redux/calendar/operations";

const convertTime = (timeString) => {
  const date = new Date(`January 22, 2024 ${timeString}`);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};

const Modal = ({ selectedSlot, closeModal }) => {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [time, setTime] = useState(convertTime(selectedSlot.time));
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  const onBackDropClick = (e) => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addEvent({ title, time, duration }));
    closeModal();
  };
  const handleDelete = () => {};

  return (
    <div className="overlay" onClick={onBackDropClick}>
      <div className="modal-content">
        <button className="modal-btn-close" onClick={closeModal}>
          <IoMdClose />
        </button>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="time"
              placeholder="time"
              min={8}
              max={17}
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>
          <button>Add event</button>
        </form>
        <button onClick={handleDelete}>Delete event</button>
      </div>
    </div>
  );
};

export default Modal;
