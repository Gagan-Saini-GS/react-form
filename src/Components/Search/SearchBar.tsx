import { useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../config";
import { SearchInputInterface } from "../../types/types";

const SearchBar: React.FC<SearchInputInterface> = ({ setSearchResults }) => {
  const [allUsers, setAllUsers] = useState<any>([]);
  const [searchUser, setSearchUser] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);

  const getAllUser = async () => {
    try {
      const response = await axios.get(SERVER_URL + "/users");
      setAllUsers(response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e: any) => {
    const value = e.target.value;
    setSearchUser(value);

    // The only remaining feature
    // Filter data on basis of searchUser input text

    const filteredUsers = allUsers.filter((user: any) => {
      const fullName = user.body.firstName + " " + user.body.lastName;
      return fullName.toLowerCase().includes(value.toLowerCase());
    });

    setSearchResults(filteredUsers);
  };
  return (
    <div className="w-full">
      <input
        className={`w-1/3 mx-auto mt-2 mb-1 px-4 py-2 block rounded bg-transparent text-lg cursor-pointer outline-none border-2 ${
          isActive
            ? "border-[#9ecaed] shadow shadow-[#9ecaed]"
            : "border-[#4b4b4b]"
        }`}
        type="text"
        placeholder="Search User...."
        value={searchUser}
        onChange={handleSearch}
        onFocus={() => {
          setIsActive(true);
          getAllUser();
        }}
        onBlur={() => setIsActive(false)}
      />
    </div>
  );
};

export default SearchBar;
