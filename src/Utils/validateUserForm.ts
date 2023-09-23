import { UserInterface } from "../types/types";

const validateUserForm = (user: UserInterface) => {
  const errors: UserInterface = {
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
  };
  const emailRegex = /^[\w\.-]+@[\w\.-]+\.\w+$/;
  const phoneRegex =
    /^(?:\+\d{1,3}\s?)?(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/;

  if (!user.firstName) errors.firstName = "First Name is required!";
  if (!user.lastName) errors.lastName = "Last Name is required!";
  if (!user.dateOfBirth) errors.dateOfBirth = "Date of Birth is required!";
  if (!user.gender) errors.gender = "Gender is required!";
  if (!user.address) errors.address = "Address is required!";
  if (!user.city) errors.city = "City is required!";
  if (!user.state) errors.state = "State is required!";
  if (!user.idType) errors.idType = "Id type is required!";
  if (!user.idValue) errors.idValue = "Id value is required!";
  if (!user.nationality) errors.nationality = "Nationality is required!";

  if (!user.email) errors.email = "Email is required!";
  else if (!emailRegex.test(user.email)) errors.email = "Invalid Email!";

  if (!user.phoneNumber) errors.phoneNumber = "Phone Number is required!";
  else if (!phoneRegex.test(user.phoneNumber))
    errors.phoneNumber = "Invalid Phone Number";

  if (!user.company) errors.company = "Company is required!";

  let isError = false;

  const errArr = Object.values(errors);

  for (let i = 0; i < errArr.length; i++) {
    if (errArr[i] !== "") isError = true;
  }

  return { errors: errors, isError: isError };
};

export default validateUserForm;
