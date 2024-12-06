import { useEffect } from "react";
import { toggleMenu } from "../Store/Slices/menu";
import { useDispatch, useSelector } from "react-redux";

function closeMenu() {
  const menu = useSelector((state) => state.menu);
  const dispatch = useDispatch();

  useEffect(() => {
    if (menu.isOpen) {
      dispatch(toggleMenu());
    }
  }, []);
}

export default closeMenu;
