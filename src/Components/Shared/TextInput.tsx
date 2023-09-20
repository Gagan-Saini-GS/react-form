import { useState } from "react";
import { TextInputInterface } from "../../types/types";
import convertString from "../../Utils/convertStringToCapital";
import Error from "./Error";

const TextInput: React.FC<TextInputInterface> = ({
  label,
  inputType,
  placeholder,
  value,
  changeUserData,
  errorMessage,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <>
      <fieldset
        className={`w-full px-2 rounded my-2 border ${
          isActive
            ? "border-[#9ecaed] shadow shadow-[#9ecaed]"
            : "border-[#4b4b4b]"
        }`}
      >
        <legend className="px-1">{label}</legend>
        <div className="mb-1 w-full flex">
          <div className="w-full">
            <input
              type={inputType}
              value={value}
              placeholder={placeholder}
              className="w-full rounded inline-block outline-none bg-transparent pl-1"
              onChange={(e) => {
                if (inputType === "email")
                  changeUserData(
                    convertString(label),
                    e.target.value.toLowerCase()
                  );
                else changeUserData(convertString(label), e.target.value);
              }}
              onFocus={() => setIsActive(true)}
              onBlur={() => setIsActive(false)}
            />
          </div>
        </div>
      </fieldset>
      <Error errorMessage={errorMessage} />
    </>
  );
};

export default TextInput;
