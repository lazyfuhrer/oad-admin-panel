import ProfileCard from "@/components/ProfileCard";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

export default function Directors() {
  const { allCompanies } = useContext(UserContext);

  return (
    <>
      {allCompanies && allCompanies[2].directors.map((director, index) => (
        <ProfileCard key={index} name={director.data.directorName}/>
      ))}
    </>
  );
};