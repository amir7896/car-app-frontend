import * as Yup from "yup";

export const loginValidation = {
  email: "Email is required",
  password: "Password is required",
  validEmail: "Provide a valid email",
};

export const dealershipValidation = {
  dealership: "Dealership  name is required",
};

export const userInformationValidation = {
  firstName: "Firstname is required",
  lastName: "Lastname is required",
  position: "Position is required",
};

const carValidation = {
  CAR: "Car model is required",
  CAR_CHARACTERS: "Car model must be at least 3 characters",
  PRICE: "Price is required",
  PHONE: "Phone number is required",
  PHONE_DIGIT: "Phone number must be exactly 11 digits",
  CITY: "City is required",
  MAX_PIC: "Max pictures is required",
  MAX_PIC_MIN: "Minimum 1 picture",
  MAX_PIC_MAX: "Maximum 10 pictures",
};

export const carValidationSchema = Yup.object().shape({
  carModel: Yup.string()
    .min(3, carValidation.CAR_CHARACTERS)
    .required(carValidation.CAR),
  price: Yup.number().required(carValidation.PRICE),
  phoneNumber: Yup.string()
    .matches(/^\d{11}$/, carValidation.PHONE_DIGIT)
    .required(carValidation.PHONE),
  city: Yup.string().required(carValidation.CITY),
  maxPictures: Yup.number()
    .min(1, carValidation.MAX_PIC_MIN)
    .max(10, carValidation.MAX_PIC_MAX)
    .required(carValidation.MAX_PIC),
});
