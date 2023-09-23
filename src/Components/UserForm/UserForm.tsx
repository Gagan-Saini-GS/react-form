import { useEffect, useState } from "react";
import { SERVER_URL } from "../../config";
import validateUserForm from "../../Utils/validateUserForm";
import TextInput from "../Shared/TextInput";
import { UserInterface } from "../../types/types";
import TextareaInput from "../Shared/TextareaInput";
import SelectInput from "../Shared/SelectInput";
import axios from "axios";
import SearchBar from "../Search/SearchBar";
import SearchResultList from "../Search/SearchResultList";

const UserForm = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [idTypes, setIdTypes] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [allGender, setAllGender] = useState([]);

  const [searchResults, setSearchResults] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [submitFlag, setSubmitFlag] = useState<boolean>(false);
  const [alertDisplay, setAlertDisplay] = useState<boolean>(false);
  const [user, setUser] = useState<UserInterface>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    idType: "",
    idValue: "",
    nationality: "",
    email: "",
    phoneNumber: "",
    company: "",
  });
  const [errors, setErrors] = useState<UserInterface>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    idType: "",
    idValue: "",
    nationality: "",
    email: "",
    phoneNumber: "",
    company: "",
  });

  const changeUserData = (label: string, value: any) => {
    setUser((prev) => {
      return { ...prev, [label]: value };
    });
  };

  const showAlert = () => {
    setAlertDisplay(true);

    setTimeout(() => {
      setAlertDisplay(false);
    }, 3000);
  };

  const submitUserForm = async () => {
    try {
      await axios.post(`${SERVER_URL}/users`, {
        headers: { "Content-Type": "application/json" },
        body: user,
      });

      showAlert();
      setUser({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        address: "",
        city: "",
        state: "",
        idType: "",
        idValue: "",
        nationality: "",
        email: "",
        phoneNumber: "",
        company: "",
      });
      setSubmitFlag(false);
      setIsDisabled(true);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserForm = async () => {
    try {
      await axios.patch(`${SERVER_URL}/users/${selectedUserId}`, {
        body: { ...user },
      });

      showAlert();
      setUser({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        address: "",
        city: "",
        state: "",
        idType: "",
        idValue: "",
        nationality: "",
        email: "",
        phoneNumber: "",
        company: "",
      });
      setSubmitFlag(false);
      setIsDisabled(true);
      setSelectedUserId(0);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmission = (e: React.FormEvent) => {
    // On Submit or Update
    e.preventDefault();

    setSubmitFlag(true);
    if (isDisabled) return;

    const err = validateUserForm(user);

    if (err?.isError) {
      setIsDisabled(true);
      return;
    }

    selectedUserId === 0 ? submitUserForm() : updateUserForm();
  };

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/states`)
      .then((res) => setStates(res.data))
      .catch((err) => console.log(err));

    axios
      .get(`${SERVER_URL}/cities`)
      .then((res) => setCities(res.data))
      .catch((err) => console.log(err));

    axios
      .get(`${SERVER_URL}/idTypes`)
      .then((res) => setIdTypes(res.data))
      .catch((err) => console.log(err));

    axios
      .get(`${SERVER_URL}/companies`)
      .then((res) => setCompanies(res.data))
      .catch((err) => console.log(err));

    axios
      .get(`${SERVER_URL}/gender`)
      .then((res) => setAllGender(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (submitFlag) setErrors(validateUserForm(user).errors);
  }, [submitFlag, user]);

  useEffect(() => {
    const err = Object.values(errors);
    let errFlag: boolean = false;

    for (let i = 0; i < err.length; i++) {
      if (err[i] !== "") errFlag = true;
    }

    const curr = Object.values(user);

    for (let i = 0; i < curr.length; i++) {
      if (curr[i] === "") errFlag = true;
    }

    if (errFlag) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [errors, user]);

  return (
    <div className="p-4">
      {alertDisplay && (
        <div
          className="mb-3 absolute right-4 top-4 inline-flex w-2/5 items-center rounded-lg bg-green-200 px-6 py-5 text-base text-green-700"
          role="alert"
        >
          <span className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          Your Form Submitted Successfully!
        </div>
      )}
      <form onSubmit={handleSubmission}>
        <SearchBar setSearchResults={setSearchResults} />
        <SearchResultList
          setUser={setUser}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          setSelectedUserId={setSelectedUserId}
        />
        <div className="w-full flex justify-center my-8 gap-10">
          <div className="w-2/6">
            <TextInput
              label="First Name"
              userLabel="firstName"
              inputType="text"
              placeholder="First Name"
              value={user.firstName}
              changeUserData={changeUserData}
              errorMessage={errors?.firstName}
            />
            <TextInput
              label="Last Name"
              userLabel="lastName"
              inputType="text"
              placeholder="Last Name"
              value={user.lastName}
              changeUserData={changeUserData}
              errorMessage={errors?.lastName}
            />
            <TextInput
              label="Date Of Birth"
              userLabel="dateOfBirth"
              inputType="date"
              placeholder="dd-mm-yyyy"
              value={user.dateOfBirth}
              changeUserData={changeUserData}
              errorMessage={errors?.dateOfBirth}
            />
            <SelectInput
              label="Gender"
              userLabel="gender"
              options={allGender}
              value={user.gender}
              changeUserData={changeUserData}
              errorMessage={errors?.gender}
            />
            <TextareaInput
              label="Address"
              userLabel="address"
              placeholder="Write your address"
              value={user.address}
              changeUserData={changeUserData}
              errorMessage={errors?.address}
            />
            <SelectInput
              label="City"
              userLabel="city"
              options={cities}
              value={user.city}
              changeUserData={changeUserData}
              errorMessage={errors?.city}
            />
          </div>
          <div className="w-2/6">
            <SelectInput
              label="State"
              userLabel="state"
              options={states}
              value={user.state}
              changeUserData={changeUserData}
              errorMessage={errors?.state}
            />
            <SelectInput
              label="Id Type"
              userLabel="idType"
              options={idTypes}
              value={user.idType}
              changeUserData={changeUserData}
              errorMessage={errors?.idType}
            />
            <TextInput
              label="Id Value"
              userLabel="idValue"
              inputType="text"
              placeholder="Enter Id Value"
              value={user.idValue}
              changeUserData={changeUserData}
              errorMessage={errors?.idValue}
            />
            <TextInput
              label="Nationality"
              userLabel="nationality"
              inputType="text"
              placeholder="Nationality"
              value={user.nationality}
              changeUserData={changeUserData}
              errorMessage={errors?.nationality}
            />
            <TextInput
              label="Email"
              userLabel="email"
              inputType="email"
              placeholder="xyz@gmail.com"
              value={user.email}
              changeUserData={changeUserData}
              errorMessage={errors?.email}
            />
            <TextInput
              label="Phone Number"
              userLabel="phoneNumber"
              inputType="number"
              placeholder="1234567890"
              value={user.phoneNumber}
              changeUserData={changeUserData}
              errorMessage={errors?.phoneNumber}
            />
            <SelectInput
              label="Company"
              userLabel="company"
              options={companies}
              value={user.company}
              changeUserData={changeUserData}
              errorMessage={errors?.company}
            />
          </div>
        </div>
        <div className="w-full">
          <button
            className={`px-8 py-2 mx-auto my-2 block text-white text-2xl rounded-lg uppercase ${
              isDisabled
                ? "bg-gray-200 cursor-not-allowed text-gray-500"
                : "bg-blue-700 cursor-pointer"
            }`}
            onClick={handleSubmission}
            type="submit"
          >
            {selectedUserId === 0 ? "Submit" : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
