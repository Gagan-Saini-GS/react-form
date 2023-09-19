import { TextareaInputInterface } from "../../types/types";
import convertString from "../../Utils/convertStringToCapital";
import Error from "./Error";

const TextareaInput: React.FC<TextareaInputInterface> = ({
  label,
  placeholder,
  value,
  changeUserData,
  errorMessage,
}) => {
  return (
    <>
      <fieldset className="w-full border border-[#4b4b4b] px-2 rounded my-2">
        <legend className="px-1">{label}</legend>
        <div className="mb-1 w-full flex items-start">
          <div className="w-full">
            <textarea
              value={value}
              placeholder={placeholder}
              className="w-full h-20 rounded inline-block resize-none outline-none bg-transparent pl-1"
              onChange={(e) =>
                changeUserData(convertString(label), e.target.value)
              }
            ></textarea>
          </div>
        </div>
      </fieldset>
      <Error errorMessage={errorMessage} />
    </>
  );
};

export default TextareaInput;
