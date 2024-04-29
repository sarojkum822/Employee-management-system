import React, { useContext, useEffect } from "react";
import { Context, server } from "../main";
import Loader from "../components/Loader";
import axios from "axios";
import '../styles/profile.CSS'

const Profile = () => {

  const { setUser, setIsAuthenticated, setLoading,isAuthenticated,loading,user } = useContext(Context);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${server}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(true);
        setLoading(false);
      })
      .catch((error) => {
        setUser({});
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <div className="profile">
      <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
      </div>
    </div>
  );
};

export default Profile;
