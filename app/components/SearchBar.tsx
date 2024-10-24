import { Input } from "@/components/ui/input";

const SearchBar = () => {
   return (
      <div className="w-full flex gap-4">
         <Input
            id="search-pokemon"
            type="text"
            placeholder="What pokemon are you looking for?"
         />
      </div>
   );
};

export default SearchBar;
