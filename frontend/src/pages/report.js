import { useState } from 'react'

const data = {
    "managers": [
    {
      "id": 1,
      "name": "Manager 1",
      "executives": [1, 3]
    },
    {
      "id": 2,
      "name": "Manager 2",
      "executives": [2, 4]
    }
  ],
    "executives": [
      {
        "id": 1,
        "name": "Executive 1",
        "companies": [1, 3, 5]
      },
      {
        "id": 2,
        "name": "Executive 2",
        "companies": [2, 4]
      },
      {
        "id": 3,
        "name": "Executive 3",
        "companies": [6, 8, 10]
      },
      {
        "id": 4,
        "name": "Executive 4",
        "companies": [7, 9]
      }
    ],
    "companies": [
      {
        "id": 1,
        "name": "Company 1",
        "executiveId": 1
      },
      {
        "id": 2,
        "name": "Company 2",
        "executiveId": 2
      },
      {
        "id": 3,
        "name": "Company 3",
        "executiveId": 1
      },
      {
        "id": 4,
        "name": "Company 4",
        "executiveId": 2
      },
      {
        "id": 5,
        "name": "Company 5",
        "executiveId": 1
      },
      {
        "id": 6,
        "name": "Company 6",
        "executiveId": 3
      },
      {
        "id": 7,
        "name": "Company 7",
        "executiveId": 4
      },
      {
        "id": 8,
        "name": "Company 8",
        "executiveId": 3
      },
      {
        "id": 9,
        "name": "Company 9",
        "executiveId": 4
      },
      {
        "id": 10,
        "name": "Company 10",
        "executiveId": 3
      }
    ]
  }  

export default function Home() {
  const [selectedExecutiveId, setSelectedExecutiveId] = useState(null)
  const [selectedCompanyId, setSelectedCompanyId] = useState(null)

  function saveData() {
    localStorage.setItem('data', JSON.stringify(data))
  }  

  const handleExecutiveChange = (event) => {
    setSelectedExecutiveId(parseInt(event.target.value))
    setSelectedCompanyId(null)
  }

  const handleCompanyChange = (event) => {
    setSelectedCompanyId(parseInt(event.target.value))
  }

  function handleReassign() {
    if (selectedExecutiveId === null || selectedCompanyId === null) {
      return
    }
  
    const executive = data.executives.find(
      (executive) => executive.id === selectedExecutiveId
    )
    const companies = executive.companies.slice()
    if (companies.length >= 5) {
      alert("An executive can have at most 5 companies assigned to them.")
      return
    }
  
    companies.push(selectedCompanyId)
  
    data.executives = data.executives.map((executive) => {
      if (executive.id === selectedExecutiveId) {
        return { ...executive, companies }
      } else if (executive.companies.includes(selectedCompanyId)) {
        return { ...executive, companies: executive.companies.filter((id) => id !== selectedCompanyId) }
      } else {
        return executive
      }
    })
  
    saveData()
    setSelectedExecutiveId(null)
    setSelectedCompanyId(null)
  }  

  const executives = data.executives.map((executive) => (
    <option key={executive.id} value={executive.id}>
      {executive.name}
    </option>
  ))

  const companies =
    selectedExecutiveId !== null
      ? data.companies
          .filter(
            (company) =>
              !data.executives
                .find((executive) => executive.id === selectedExecutiveId)
                .companies.includes(company.id)
          )
          .map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))
      : []
      
  return(
    <div>
      <h1>Executives and Companies</h1>
      <div>
        <select value={selectedExecutiveId} onChange={handleExecutiveChange}>
          <option value={null}>Select an executive</option>
          {executives}
        </select>
        <select value={selectedCompanyId} onChange={handleCompanyChange}>
          <option value={null}>Select a company</option>
          {companies}
        </select>
        <button onClick={handleReassign}>Reassign</button>
      </div>
      <ul>
      {data.managers.map((manager) => (
        <li key={manager.id}>
          {manager.name}
          <ul>
            {manager.executives.map((executiveId) => {
              const executive = data.executives.find(
                (exec) => exec.id === executiveId
              );
              return executive.companies.map((companyId) => {
                const company = data.companies.find(
                  (comp) => comp.id === companyId
                );
                return (
                  <li key={company.id}>{company.name}</li>
                );
              });
            })}
              <p>---------------------</p>
          </ul>
        </li>
      ))}
    </ul>
  </div>
  )};
         
