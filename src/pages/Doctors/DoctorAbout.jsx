import React from "react";
import { formatDate } from "../../utils/formateDate";

const DoctorAbout = ({ name, about, qualifications, experiences }) => {
  return (
    <div>
      <div className="">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
          About of
          <span className="text-irisBlueColor font-bold text-[24px] leading-9">
            {name}
          </span>
        </h3>
        <p className="text__para">{about}</p>
      </div>
      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Eductaion
        </h3>
        <ul className="mt-4 md:p-5">
          {qualifications?.map((item, index) => (
            <li
              key={index}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]"
            >
              <div>
                <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
                  {formatDate(item.startingDate)} -{" "}
                  {formatDate(item.endingDate)}
                </span>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  {item.degree}
                </p>
              </div>
              <p className="text-textColor text-[14px] leading-5 font-medium">
                {item.university}
              </p>
            </li>
          ))}

          {/* <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
            <div>
              <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
                {formatDate("07-04-2020")}
              </span>
              <p className="text-textColor text-[16px] leading-6 font-medium">
                PHD in surgeon
              </p>
            </div>
            <p className="text-textColor text-[14px] leading-5 font-medium">
              New Apollo Hospital, New York
            </p>
          </li> */}
        </ul>
      </div>

      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Experience
        </h3>
        <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
          {experiences?.map((item, index) => (
            <li key={index} className="p-4 rounded bg-[#f5e6c0]">
              <span className="text-yellowColor text-[15px] leading-6 font-semibold">
                {formatDate(item.startingDate)} - {formatDate(item.endingDate)}
              </span>
              <p className="text-textColor text-[15px] leading-6 font-medium">
                {item.position}
              </p>
              <p className="text-textColor text-[14px] leading-5 font-medium">
                {item.hospital}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DoctorAbout;
