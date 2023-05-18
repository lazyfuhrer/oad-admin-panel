import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";

export default function Report() {
  const [managerUsers, setManagerUsers] = useState([]);
  const [executiveUsers, setExecutiveUsers] = useState([]);
  const [selectedManager, setSelectedManager] = useState("");
  const [selectedExecutive, setSelectedExecutive] = useState("");
  const [selectedExecutiveCompanies, setSelectedExecutiveCompanies] =
    useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [availableExecutives, setAvailableExecutives] = useState([]);
  const [availableCompanies, setAvailableCompanies] = useState([]);

  useEffect(() => {
    async function getUserData() {
      const response = await axios.get("/api/getuser");
      const allUsers = response.data.allUsers;

      const usersByRole = {
        manager: [],
        executive: [],
      };

      allUsers.forEach((user) => {
        if (user.role === "manager") {
          usersByRole.manager.push(user);
        } else if (user.role === "executive") {
          usersByRole.executive.push(user);
        }
      });

      setManagerUsers(usersByRole.manager);
      setExecutiveUsers(usersByRole.executive);
    }

    getUserData();
  }, []);

  useEffect(() => {
    if (selectedManager) {
      const availableExecutives = executiveUsers.filter(
        (executive) => executive.report !== selectedManager
      );
      setAvailableExecutives(availableExecutives);
    } else {
      setAvailableExecutives(executiveUsers);
    }
  }, [selectedManager, executiveUsers]);

  useEffect(() => {
    if (selectedExecutive) {
      const executive = executiveUsers.find(
        (executive) =>
          `${executive.firstname} ${executive.lastname}` ===
          selectedExecutive
      );

      if (executive) {
        setSelectedExecutiveCompanies(executive.reportCompany);
      }
    } else {
      setSelectedExecutiveCompanies([]);
    }
  }, [selectedExecutive, executiveUsers]);

  useEffect(() => {
    const assignedCompanies = executiveUsers.reduce(
      (companies, executive) => [
        ...companies,
        ...executive.reportCompany,
      ],
      []
    );

    const uniqueAssignedCompanies = [...new Set(assignedCompanies)];
    const unassignedCompanies = uniqueAssignedCompanies.filter(
      (company) => !selectedExecutiveCompanies.includes(company)
    );

    setAvailableCompanies(unassignedCompanies);
  }, [selectedExecutiveCompanies, executiveUsers]);

  const executivesByManager = {};

  executiveUsers.forEach((executive) => {
    const managerName = executive.report;

    if (!executivesByManager[managerName]) {
      executivesByManager[managerName] = [];
    }

    executivesByManager[managerName] = executivesByManager[
      managerName
    ].concat(
      executive.reportCompany.map(
        (company) => `${company} (${executive.firstname} ${executive.lastname})`
      )
    );
  });

  const handleReassignManager = async () => {
    if (selectedExecutive && selectedManager) {
      try {
        const response = await axios.put("/api/updatemanager", {
          executive: selectedExecutive,
          manager: selectedManager,
        });
        console.log(response.data); // Handle the response as needed
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleReassignCompany = async () => {
    if (selectedExecutive && selectedCompany) {
      try {
        const assignedExecutive = executiveUsers.find((executive) =>
          executive.reportCompany.includes(selectedCompany)
        );

        if (assignedExecutive) {
          const assignedExecutiveUsername = assignedExecutive.username;

          const removeCompanyResponse = await axios.delete(
            "/api/deletecompany",
            {
              data: {
                executiveUsername: assignedExecutiveUsername,
                company: selectedCompany,
              },
            }
          );

          console.log(removeCompanyResponse.data); // Handle the response as needed
        }

        const selectedExecutiveObj = executiveUsers.find(
          (executive) =>
            `${executive.firstname} ${executive.lastname}` ===
            selectedExecutive
        );

        if (selectedExecutiveObj) {
          const updatedSelectedCompany = [
            ...selectedExecutiveObj.reportCompany,
            selectedCompany,
          ];

          const updateCompanyResponse = await axios.put(
            "/api/updatereportcompany",
            {
              executiveUsername: selectedExecutiveObj.username,
              reportCompany: updatedSelectedCompany,
            }
          );

          console.log(updateCompanyResponse.data); // Handle the response as needed
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <Stack spacing={4}>
      <Stack direction="row">
        <FormControl>
          <FormLabel htmlFor="managerDropdown">Select Manager:</FormLabel>
          <Select
            id="managerDropdown"
            value={selectedManager}
            onChange={(e) => setSelectedManager(e.target.value)}
          >
            <option value="">All Managers</option>
            {managerUsers.map((manager, index) => (
              <option
                key={index}
                value={`${manager.firstname} ${manager.lastname}`}
              >
                {`${manager.firstname} ${manager.lastname}`}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="executiveDropdown">Select Executive:</FormLabel>
          <Select
            id="executiveDropdown"
            value={selectedExecutive}
            onChange={(e) => setSelectedExecutive(e.target.value)}
          >
            <option value="">All Executives</option>
            {availableExecutives.map((executive, index) => (
              <option
                key={index}
                value={`${executive.firstname} ${executive.lastname}`}
              >
                {`${executive.firstname} ${executive.lastname}`}
              </option>
            ))}
          </Select>
        </FormControl>
        <Button onClick={handleReassignManager}>Reassign</Button>
      </Stack>

      <Stack direction="row">
        <FormControl>
          <FormLabel htmlFor="executiveDropdown">Select Executive:</FormLabel>
          <Select
            id="executiveDropdown"
            value={selectedExecutive}
            onChange={(e) => setSelectedExecutive(e.target.value)}
          >
            <option value="">All Executives</option>
            {executiveUsers.map((executive, index) => (
              <option
                key={index}
                value={`${executive.firstname} ${executive.lastname}`}
              >
                {`${executive.firstname} ${executive.lastname}`}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="companyDropdown">Select Company:</FormLabel>
          <Select
            id="companyDropdown"
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
          >
            <option value="">All Companies</option>
            {availableCompanies.map((company, index) => (
              <option key={index} value={company}>
                {company}
              </option>
            ))}
          </Select>
        </FormControl>
        <Button onClick={handleReassignCompany}>Reassign</Button>
      </Stack>

      <Box>
        {Object.keys(executivesByManager).map((managerName, index) => (
          <Box key={index} mb={4}>
            <Text fontWeight="bold">{managerName}</Text>
            {executivesByManager[managerName].map((executive, index) => (
              <Text key={index} ml={4}>
                {executive}
              </Text>
            ))}
          </Box>
        ))}
      </Box>
    </Stack>
  );
}