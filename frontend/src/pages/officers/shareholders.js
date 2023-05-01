import ProfileCard from "@/components/ProfileCard";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

export default function Shareholders() {
  const { allCompanies, selectedValue } = useContext(UserContext);
  const matchingCompany = allCompanies && allCompanies.find(company => company.companyName === selectedValue);
  return (
    <>
      {matchingCompany && matchingCompany.shareholders.map((shareholder, index) => (
        <ProfileCard key={index} name={shareholder.data.nameOfShareholder}/>
      ))}
    </>
  );
};