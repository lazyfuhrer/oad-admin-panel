import { useState } from 'react'

const data = {
    "executives": [
      {
        "id": 1,
        "name": "John Doe",
        "companies": [1, 2, 3]
      },
      {
        "id": 2,
        "name": "Jane Smith",
        "companies": [4, 5, 6]
      }
    ],
    "companies": [
      {
        "id": 1,
        "name": "Acme Inc.",
        "executiveId": 1
      },
      {
        "id": 2,
        "name": "XYZ Corp.",
        "executiveId": 1
      },
      {
        "id": 3,
        "name": "ABC Ltd.",
        "executiveId": 1
      },
      {
        "id": 4,
        "name": "Big Co.",
        "executiveId": 2
      },
      {
        "id": 5,
        "name": "Small Co.",
        "executiveId": 2
      },
      {
        "id": 6,
        "name": "Medium Co.",
        "executiveId": 2
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
return (
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
    {data.executives.map((executive) => (
    <li key={executive.id}>
    {executive.name}
    <ul>
    {executive.companies.map((companyId) => (
    <li key={companyId}>
    {data.companies.find((company) => company.id === companyId)
    .name}
    </li>
    ))}
    <p>----------------------------------------</p>
    </ul>
    </li>
    ))}
    </ul>
    </div>
    )
    }
         
