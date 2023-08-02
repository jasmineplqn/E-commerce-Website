import { createContext } from "react";

import { useState } from "react";
// we made all of this so we can still get the information from the backend upon refreshing the page
export const CategoryContext = createContext(null);
export const CategoryProvider = ({ children }) => {
  const [category, setCategory] = useState(0);

  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};
