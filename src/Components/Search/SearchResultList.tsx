import { SearchResultsListInterface } from "../../types/types";

const SearchResultList: React.FC<SearchResultsListInterface> = ({
  setUser,
  searchResults,
  setSearchResults,
  setSelectedUserId,
}) => {
  return (
    <div className="w-1/3 m-auto bg-slate-200 rounded max-h-64 overflow-y-scroll">
      {searchResults?.map((result) => {
        return (
          <div
            key={result.id}
            className="px-4 py-2 font-medium text-lg hover:bg-slate-300"
            onClick={() => {
              setUser(result.body);
              setSelectedUserId(result.id);
              setSearchResults([]);
            }}
          >
            {result?.body?.firstName} {result?.body?.lastName}
          </div>
        );
      })}
    </div>
  );
};

export default SearchResultList;
