import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type SearchBarProps = {
   onSearch: (value: string) => void;
};

const SearchBar = (props: SearchBarProps) => {
   const [input, setInput] = useState("");

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
   };

   const handleSearchClick = () => {
      props.onSearch(input);
   };

   return (
      <div className="w-full flex gap-4">
         <Input
            id="search-pokemon"
            type="text"
            placeholder="pikachu..."
            value={input}
            onChange={handleInputChange}
         />
         <Button className="w-36" onClick={handleSearchClick}>
            Search
         </Button>
      </div>
   );
};

export default SearchBar;
