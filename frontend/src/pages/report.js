import { useEffect, useState } from "react";
import axios from 'axios';

export default function Report() {
  const [managerUsers, setManagerUsers] = useState([]);
  const [executiveUsers, setExecutiveUsers] = useState([]);
  const [selectedManager, setSelectedManager] = useState('');
  const [selectedExecutive, setSelectedExecutive] = useState('');
  const [selectedExecutiveCompanies, setSelectedExecutiveCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [availableExecutives, setAvailableExecutives] = useState([]);
  const [availableCompanies, setAvailableCompanies] = useState([]);

  useEffect(() => {
    async function getUserData() {
      const response = await axios.get('/api/getuser');
      const allUsers = response.data.allUsers;

      // Create an object to group users by role
      const usersByRole = {
        manager: [],
        executive: []
      };

      // Iterate over all users and add them to the corresponding array inside the usersByRole object
      allUsers.forEach(user => {
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
      const availableExecutives = executiveUsers.filter(executive => executive.report !== selectedManager);
      setAvailableExecutives(availableExecutives);
    } else {
      setAvailableExecutives(executiveUsers);
    }
  }, [selectedManager, executiveUsers]);

  useEffect(() => {
    if (selectedExecutive) {
      const executive = executiveUsers.find(
        (executive) =>
          `${executive.firstname} ${executive.lastname}` === selectedExecutive
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
      (companies, executive) => [...companies, ...executive.reportCompany],
      []
    );

    const uniqueAssignedCompanies = [...new Set(assignedCompanies)];
    const unassignedCompanies = uniqueAssignedCompanies.filter(
      (company) => !selectedExecutiveCompanies.includes(company)
    );

    setAvailableCompanies(unassignedCompanies);
  }, [selectedExecutiveCompanies, executiveUsers]);

  // Create an object to group executives by manager name
  const executivesByManager = {};

  executiveUsers.forEach(executive => {
    const managerName = executive.report;

    if (!executivesByManager[managerName]) {
      executivesByManager[managerName] = [];
    }

    executivesByManager[managerName] = executivesByManager[managerName].concat(executive.reportCompany.map(company => `${company} (${executive.firstname} ${executive.lastname})`));
  });

  // Function to handle reassigning an executive to a new manager and make API call
  const handleReassignManager = async () => {
    if (selectedExecutive && selectedManager) {
      try {
        const response = await axios.put('/api/updatemanager', {
          executive: selectedExecutive,
          manager: selectedManager
        });
        console.log(response.data); // Handle the response as needed
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  // Function to handle reassigning an executive to a new manager and make API call
  const handleReassignCompany = async () => {
    if (selectedExecutive && selectedCompany) {
      try {
        // Find the executive assigned to the selectedCompany
        const assignedExecutive = executiveUsers.find(
          (executive) => executive.reportCompany.includes(selectedCompany)
        );
  
        if (assignedExecutive) {
          const assignedExecutiveUsername = assignedExecutive.username;
  
          // Make API call to remove selectedCompany from assignedExecutive's reportCompany
          const removeCompanyResponse = await axios.delete('/api/deletecompany', {
            data: {
              executiveUsername: assignedExecutiveUsername,
              company: selectedCompany
            }
          });
  
          console.log(removeCompanyResponse.data); // Handle the response as needed
        }
  
        // Find the selectedExecutive
        const selectedExecutiveObj = executiveUsers.find(
          (executive) =>
            `${executive.firstname} ${executive.lastname}` === selectedExecutive
        );
  
        if (selectedExecutiveObj) {
          // Add the selectedCompany to the selectedExecutive's reportCompany array
          const updatedSelectedCompany = [
            ...selectedExecutiveObj.reportCompany,
            selectedCompany,
          ];
  
          // Make API call to update the selectedExecutive's reportCompany
          const updateCompanyResponse = await axios.put('/api/updatereportcompany', {
            executiveUsername: selectedExecutiveObj.username,
            reportCompany: updatedSelectedCompany
          });
  
          console.log(updateCompanyResponse.data); // Handle the response as needed
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };  

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ marginRight: "20px" }}>
          <label htmlFor="managerDropdown">Select Manager: </label>
          <select id="managerDropdown" value={selectedManager} onChange={(e) => setSelectedManager(e.target.value)}>
            <option value="">All Managers</option>
            {managerUsers.map((manager, index) => (
              <option key={index} value={`${manager.firstname} ${manager.lastname}`}>
                {`${manager.firstname} ${manager.lastname}`}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="executiveDropdown">Select Executive: </label>
          <select id="executiveDropdown" value={selectedExecutive} onChange={(e) => setSelectedExecutive(e.target.value)}>
            <option value="">All Executives</option>
            {availableExecutives.map((executive, index) => (
              <option key={index} value={`${executive.firstname} ${executive.lastname}`}>
                {`${executive.firstname} ${executive.lastname}`}
              </option>
              ))}
          </select>
        </div>
        <button onClick={handleReassignManager}>Reassign</button>
      </div>
      {/* seperated ------------------------------------------------------------*/}
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>
          <label htmlFor="executiveDropdown">Select Executive: </label>
          <select id="executiveDropdown" value={selectedExecutive} onChange={(e) => setSelectedExecutive(e.target.value)}>
            <option value="">All Executives</option>
            {executiveUsers.map((executive, index) => (
              <option key={index} value={`${executive.firstname} ${executive.lastname}`}>
                {`${executive.firstname} ${executive.lastname}`}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="companyDropdown">Select Company: </label>
          <select
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
          </select>
        </div>
        <button onClick={handleReassignCompany}>Reassign</button>
      </div>

  <h1>Managers:</h1>
  {managerUsers.map((manager, index) => {
    const managerName = `${manager.firstname} ${manager.lastname}`;

    return (
      <div key={index}>
        <h3>{managerName}</h3>
        {executivesByManager[managerName] && (
          <ul>
            {executivesByManager[managerName].map((company, index) => {
              return (
                <li key={index}>{company}</li>
              );
            })}
          </ul>
        )}
      </div>
    );
  })}
</>
);
}