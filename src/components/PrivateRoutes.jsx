"use client";
import { selectIsLogin } from "@/redux/auth/selectors";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const PrivateRoutes = ({ children }) => {
  const router = useRouter();
  const isLogin = useSelector(selectIsLogin);
  useEffect(() => {
    if (!isLogin) {
      router.push("/login");
    }
  }, [isLogin, router]);

  return isLogin ? children : null;
};

export default PrivateRoutes;
