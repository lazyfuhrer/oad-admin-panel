import ProfileCard from "@/components/ProfileCard";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

export default function Directors() {
  const { allCompanies, selectedValue } = useContext(UserContext);
  const matchingCompany = allCompanies && allCompanies.find(company => company.companyName === selectedValue);

  return (
    <>
      {matchingCompany && matchingCompany.directors.map((director, index) => (
        <ProfileCard key={index} name={director.data.directorName}/>
      ))}
    </>
  );
};
