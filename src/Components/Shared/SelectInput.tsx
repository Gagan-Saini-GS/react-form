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
  return (
    <>
      <fieldset className="w-full border border-[#4b4b4b] px-2 rounded my-2">
        <legend className="px-1">{label}</legend>
        <div className="mb-1 w-full flex">
          <div className="w-full">
            <select
              className="w-full rounded inline-block outline-none bg-transparent"
              onChange={(e) =>
                changeUserData(convertString(label), e.target.value)
              }
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
