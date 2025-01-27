import { Header } from "./components/headers/Header";
import { Outlet } from "react-router-dom";
import { useCartContext } from "./components/providers/CartProvider";
import { useEffect } from "react";

const Layout = () => {
  const { open } = useCartContext()!;
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);
  return (
    <>
      <div className={`overlay ${open ? "overlay-on" : ""}`}></div>
      <div className="absl">
        <Header />
      </div>
      <div className="cover" style={{ transform: "translateY(130px)" }}>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
