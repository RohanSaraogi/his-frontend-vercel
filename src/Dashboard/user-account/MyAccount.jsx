import React, { useContext, useState } from "react";
import { BASE_URL } from "../../config";

import { authContext } from "../../context/AuthContext";
import MyBookings from "./MyBookings";
import Profile from "./Profile";

// default value export can be imported by any name
import useGetProfile from "../../hooks/useFetchData.jsx"; 

import Loading from "../../components/Loader/Loading.jsx";
import Error from "../../components/Error/Error.jsx";
const MyAccount = () => {
  const { dispatch } = useContext(authContext);
  const [tab, setTab] = useState("bookings");
  const {
    data: userData,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/users/profile/me`);
  console.log(userData, "user data");

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return ( 
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loading />}

        {error && !loading && <Error errMessage={error} />}

        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-10">
            <div className="pb-[50px] px-[30px] rounded-md">
              <div className="flex items-center justify-center">
                <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
                  <img
                    src={userData.photo}
                    alt=""
                    className="w-full h-full rounded-full"
                  />
                </figure>
              </div>

              <div className="text-center mt-4">
                <h3 className="text-[18px] leading-[30px] text-headingColor font-bold ">
                  {userData.name}
                </h3>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  {userData.email}
                </p>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  Blood type:
                  <span className="ml-2 text-[22px] leading-8 text-headingColor">
                    {" "}
                    {userData.bloodType}
                  </span>
                </p>
              </div>

              <div className="mt-[50px] md:mt-[100px] text-white">
                <button
                  onClick={handleLogout}
                  className="w-full bg-[#181A1E] p-3 text-[18px] leading-7 rounded-md"
                >
                  Logout
                </button>
                <button className="w-full bg-red-600 mt-4 p-3 text-[18px] leading-7 rounded-md">
                  Delete Account
                </button>
              </div>
            </div>

            <div className="md:col-span-2 md:px-[30px]">
              <div className="">
                <button
                  onClick={() => setTab("bookings")}
                  className={`p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor ${
                    tab === "bookings" &&
                    "bg-primaryColor text-white font-normal"
                  }`}
                >
                  My Bookings
                </button>

                <button
                  onClick={() => setTab("settings")}
                  className={`p-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor ${
                    tab === "settings" &&
                    "bg-primaryColor text-white font-normal"
                  }`}
                >
                  Profile Settings
                </button>
              </div>

              {tab === "bookings" && <MyBookings />}  
              {/* if tab is bookings then MyBookings similary if setting then Profile with userData as a prop*/}
              {tab === "settings" && <Profile user={userData}/>}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyAccount;
