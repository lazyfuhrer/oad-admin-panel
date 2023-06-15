import { useState } from "react";
import { Tooltip, Box, CSSReset } from "@chakra-ui/react";
import OfficerProfile from "@/components/OfficerProfile";
import ProfileCard from "@/components/ProfileCard";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

export default function Shareholders() {
  const { allCompanies, selectedValue } = useContext(UserContext);
  const matchingCompany =
    allCompanies && allCompanies.find((company) => company.companyName === selectedValue);

  const [hoveredShareholder, setHoveredShareholder] = useState(null);

  const handleShareholderHover = (shareholder) => {
    setTimeout(() => {
      setHoveredShareholder(shareholder);
    }, 500);
  };

  const handleShareholderLeave = () => {
    setHoveredShareholder(null);
  };

  const address = matchingCompany
    ? `${matchingCompany.companyBlock}, ${matchingCompany.companyBuilding}, ${matchingCompany.companyStreet}, ${matchingCompany.companyLevel}, ${matchingCompany.companyCity}, ${matchingCompany.companyPincode}`
    : "";

  return (
    <>
      <CSSReset />
      {matchingCompany &&
        matchingCompany.shareholders.map((shareholder, index) => (
          <Tooltip
            hasArrow
            key={index}
            label={
              <Box maxW="250px">
                <OfficerProfile
                  name={shareholder.data.nameOfShareholder}
                  country={"Singapore"}
                  mobileNumber={shareholder.data.phone}
                  email={shareholder.data.email}
                  address={address}
                  avatarUrl={"https://bit.ly/sage-adebayo"}
                  licensed={true}
                />
              </Box>
            }
            isOpen={hoveredShareholder === shareholder}
            placement="auto" 
            border="none"
            closeDelay={0}
          >
            <Box
              as="span"
              onMouseEnter={() => handleShareholderHover(shareholder)}
              onMouseLeave={handleShareholderLeave}
              display="inline-block"
              position="relative"
            >
              <ProfileCard name={shareholder.data.nameOfShareholder} />
            </Box>
          </Tooltip>
        ))}
    </>
  );
}