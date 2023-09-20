import { useState } from "react";
import { SelectInputInterface } from "../../types/types";
import convertString from "../../Utils/convertStringToCapital";
import Error from "./Error";

const SelectInput: React.FC<SelectInputInterface> = ({
  label,
  options,
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
        <div className="mb-1 w-full flex">
          <div className="w-full">
            <select
              className="w-full rounded inline-block outline-none bg-transparent"
              onChange={(e) =>
                changeUserData(convertString(label), e.target.value)
              }
              onFocus={() => setIsActive(true)}
              onBlur={() => setIsActive(false)}
              value={value}
            >
              {options?.map((option) => {
                return (
                  <option
                    key={option.id}
                    value={option.name}
                    hidden={option.id === "" ? true : false}
                  >
                    {option.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </fieldset>
      <Error errorMessage={errorMessage} />
    </>
  );
};

export default SelectInput;
