import { useEffect, useState } from "react";
import axios from 'axios';

export default function Report() {
  const [managerUsers, setManagerUsers] = useState([]);
  const [executiveUsers, setExecutiveUsers] = useState([]);

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

  // Create an object to group executives by manager name
  const executivesByManager = {};

  executiveUsers.forEach(executive => {
    const managerName = executive.report;

    if (!executivesByManager[managerName]) {
      executivesByManager[managerName] = [];
    }

    executivesByManager[managerName] = executivesByManager[managerName].concat(executive.reportCompany.map(company => `${company} (${executive.firstname} ${executive.lastname})`));
  });

  return (
    <>
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
};