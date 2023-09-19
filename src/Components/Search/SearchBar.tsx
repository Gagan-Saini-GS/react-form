import { useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../config";
import { SearchInputInterface } from "../../types/types";

const SearchBar: React.FC<SearchInputInterface> = ({ setSearchResults }) => {
  const [searchUser, setSearchUser] = useState<string>("");

  const getAllUser = async () => {
    try {
      const response = await axios.get(SERVER_URL + "/users");
      console.log(response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e: any) => {
    setSearchUser(e?.target?.value);
    // Filter data on basis of searchUser input text
  };
  return (
    <div className="w-full">
      <input
        className="w-1/3 mx-auto mt-2 mb-1 px-4 py-2 block rounded bg-transparent text-lg cursor-pointer outline-none border-2 border-slate-900"
        type="text"
        placeholder="Search User...."
        value={searchUser}
        onChange={handleSearch}
        onFocus={getAllUser}
      />
    </div>
  );
};

export default SearchBar;
