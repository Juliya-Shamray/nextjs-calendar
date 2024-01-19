"use client";

import { logoutThunk } from "@/redux/auth/operations";
import { selectName } from "@/redux/auth/selectors";
import { useDispatch, useSelector } from "react-redux";

const Logout = () => {
  const name = useSelector(selectName);
  const dispatch = useDispatch();

  return (
    <li>
      <span>{name}</span>
      <button onClick={() => dispatch(logoutThunk())}>Logout</button>
    </li>
  );
};

export default Logout;
