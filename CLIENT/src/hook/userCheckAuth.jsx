import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Store/Slices/user";

function userCheckAuth() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAuthentication() {
      try {
        const response = await fetch(
          "http://localhost:9000/api/v1/user/check_auth",
          {
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          dispatch(login(data));
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }
    fetchAuthentication();
  }, [dispatch]);

  return [user, isLoading];
}

export default userCheckAuth;
