import { useEffect, useState } from "react";
import axios from 'axios';

export default function Report() {
  const [managerUsers, setManagerUsers] = useState([]);
  const [executiveUsers, setExecutiveUsers] = useState([]);
  const [selectedManager, setSelectedManager] = useState('');
  const [selectedExecutive, setSelectedExecutive] = useState('');
  const [availableExecutives, setAvailableExecutives] = useState([]);

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
  const handleReassign = async () => {
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
              <button onClick={handleReassign}>Reassign</button>
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