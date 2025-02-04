import React from "react";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import DoctorCard from "../../components/Doctors/DoctorCard.jsx";
import Loading from "../../components/Loader/Loading.jsx";
import Error from "../../components/Error/Error.jsx";

const MyBookings = () => {
  const {
    data: appointments,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`);

  return (
    <div>
      {loading && !error && <Loading />}

      {error && !loading && <Error errMessage={error} />}

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {appointments.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      )}

      {!loading && !error && appointments.length === 0 && (
        <h2 className="mt-5 ml-2 text-[20px] leading-7 font-semibold text-primaryColor">
          No Appointments Found!
        </h2>
      )}
    </div>
  );
};

export default MyBookings;
