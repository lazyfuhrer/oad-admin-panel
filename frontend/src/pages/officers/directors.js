import { useState } from "react";
import { Tooltip, Box, CSSReset } from "@chakra-ui/react";
import OfficerProfile from "@/components/OfficerProfile";
import ProfileCard from "@/components/ProfileCard";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

export default function Directors() {
  const { allCompanies, selectedValue } = useContext(UserContext);
  const matchingCompany =
    allCompanies && allCompanies.find((company) => company.companyName === selectedValue);

  const [hoveredDirector, setHoveredDirector] = useState(null);

  const handleDirectorHover = (director) => {
    setTimeout(() => {
      setHoveredDirector(director);
    }, 500);
  };

  const handleDirectorLeave = () => {
    setHoveredDirector(null);
  };

  const address = matchingCompany
    ? `${matchingCompany.companyBlock}, ${matchingCompany.companyBuilding}, ${matchingCompany.companyStreet}, ${matchingCompany.companyLevel}, ${matchingCompany.companyCity}, ${matchingCompany.companyPincode}`
    : "";

  return (
    <>
      <CSSReset />
      {matchingCompany &&
        matchingCompany.directors.map((director, index) => (
          <Tooltip
            hasArrow
            key={index}
            label={
              <Box maxW="250px">
                <OfficerProfile
                  name={director.data.directorName}
                  country={"Singapore"}
                  mobileNumber={director.data.phone}
                  email={director.data.email}
                  address={address}
                  avatarUrl={"https://bit.ly/sage-adebayo"}
                  licensed={true}
                />
              </Box>
            }
            isOpen={hoveredDirector === director}
            placement="auto" 
            border="none"
            closeDelay={0}
          >
            <Box
              as="span"
              onMouseEnter={() => handleDirectorHover(director)}
              onMouseLeave={handleDirectorLeave}
              display="inline-block"
              position="relative"
            >
              <ProfileCard name={director.data.directorName} />
            </Box>
          </Tooltip>
        ))}
    </>
  );
}