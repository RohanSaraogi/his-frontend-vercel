import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import uploadImageToCloudinary from "../../utils/uploadCloudinary.js";
import { BASE_URL, token } from "../../config.js";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader.js";
const Profile = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null); // selectedfile state
  const [loading, setLoading] = useState(false); // loading state

  // formdata usestate
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: selectedFile,
    gender: "",
    bloodType: "",
  });

  // navigate object function
  const navigate = useNavigate();

  // useEffect applies the setFormData function on any changes on user object in the props of Profile
  useEffect(() => {
    setFormData({
      name: user.name,
      email: user.email,
      photo: user.photo,
      gender: user.gender,
      bloodType: user.bloodType,
    });
  }, [user]);

  /*
   Function to handle input and update the state, 
   1) ...formData => create a shallow copy of formdata, so do not mutate the original state, Virtual DOM
   2) [e.target.name]: e.target.value => this means name is example username and value is whatever the user  types */

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /*
  Function to handle uploading of files
  1) e.target.files[0] => get the first file from the files array
  2) setFormData({ ...formData, photo: data.url }) => update the formData object with the new photo url
  */
  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];

    // cloudinary
    const data = await uploadImageToCloudinary(file);
    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };

  /*
   Function to handle form submission
   1) setLoading(true) => set the loading state to true
   2) setFormData({ ...formData, photo: selectedFile }) => update the formData object with the new photo url
   3) navigate('/users/profile/me') => navigate to the profile page
   */

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    // console.log(formData)
    try {
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        // fetching data from backend
        method: "put", // update method
        headers: {
          "Content-Type": "application/json", // denotes request body is in json format (input)
          Authorization: `Bearer ${token}`, // token for authorisation of role
        },
        body: JSON.stringify(formData), // passing formData as body, the details which have to be submitted
      });

      const { message } = await res.json(); // parses the JSON response and extracts the 'message' property
      console.log(message);
      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false);
      toast.success(message);

      navigate("/users/profile/me");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <form onSubmit={submitHandler}>
        <div className="mb-5">
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
            required
          />
        </div>
        <div className="mb-5">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
            aria-readonly
            readOnly
          />
        </div>
        <div className="mb-5">
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
          />
        </div>

        <div className="mb-5">
          <input
            type="text"
            name="bloodType"
            placeholder="Blood Type"
            value={formData.bloodType}
            onChange={handleInputChange}
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
            required
          />
        </div>

        <div className="mb-5 flex items-center justify-between">
          <label className="text-headingColor font-bold text-[16px] leading-7">
            Gender:
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
            >
              <option value="null">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </label>
        </div>

        <div className="mb-5 flex itrems-center gap-3">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
              <img
                src={formData.photo}
                alt=""
                className="w-full rounded-full"
              />
            </figure>
          )}

          <div className="relative w-[130px] h-[50px] ">
            <input
              type="file"
              name="photo"
              onChange={handleFileInputChange}
              id="customFile"
              accept=".jpg , .png"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <label
              htmlFor="customFile"
              className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
            >
              {selectedFile ? selectedFile.name : "Upload Photo"}
            </label>
          </div>
        </div>

        <div className="mt-7">
          <button
            disabled={loading && true}
            type="submit"
            className="w-full px-4 py-3 bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg"
          >
            {loading ? <HashLoader size={25} color="#ffffff" /> : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
