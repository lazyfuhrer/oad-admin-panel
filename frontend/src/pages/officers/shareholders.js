import ProfileCard from "@/components/ProfileCard";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

export default function Shareholders() {
  const { allCompanies } = useContext(UserContext);
  return (
    <>
      {allCompanies && allCompanies[2].shareholders.map((shareholder, index) => (
        <ProfileCard key={index} name={shareholder.data.nameOfShareholder}/>
      ))}
    </>
  );
};