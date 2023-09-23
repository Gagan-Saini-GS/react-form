import { useState } from "react";
import { TextareaInputInterface } from "../../types/types";
import Error from "./Error";

const TextareaInput: React.FC<TextareaInputInterface> = ({
  label,
  userLabel,
  placeholder,
  value,
  changeUserData,
  errorMessage,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <>
      <fieldset
        className={`w-full border px-2 rounded my-2  ${
          isActive
            ? "border-[#9ecaed] shadow shadow-[#9ecaed]"
            : "border-[#4b4b4b]"
        }`}
      >
        <legend className="px-1">{label}</legend>
        <div className="mb-1 w-full flex items-start">
          <div className="w-full">
            <textarea
              value={value}
              placeholder={placeholder}
              className="w-full h-20 rounded inline-block resize-none outline-none bg-transparent pl-1"
              onChange={(e) => changeUserData(userLabel, e.target.value)}
              onFocus={() => setIsActive(true)}
              onBlur={() => setIsActive(false)}
            ></textarea>
          </div>
        </div>
      </fieldset>
      <Error errorMessage={errorMessage} />
    </>
  );
};

export default TextareaInput;
