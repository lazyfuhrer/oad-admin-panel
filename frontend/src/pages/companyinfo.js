import CompanyInfoCard from '@/components/CompanyInfoCard';
import { Box, Stack } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { teamworkCompanyGet } from '../../utils/TeamworkCompanies';
import { UserContext } from '@/context/UserContext';

export default function CompanyInfo() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [companyData, setCompanyData] = useState({});
  const [companyAddress, setCompanyAddress] = useState('NA');
  const companyId = router.query.id;
  const companyAddressRef = useRef(companyAddress);
  const { allCompanies, selectedValue } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await teamworkCompanyGet();
      setData(response);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (typeof companyId !== 'undefined' && data.length > 0) {
      setCompanyData(data[companyId]);
    }
  }, [companyId, data]);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        if (companyData.entity_name && allCompanies) {
          const foundCompany = allCompanies.find((company) => company.companyName === selectedValue);
          if (foundCompany) {
            companyAddressRef.current = foundCompany.companyBlock+', '+foundCompany.companyStreet+', '+foundCompany.companyBuilding+', '+foundCompany.companyUnit+', '+foundCompany.companyCity+', '+foundCompany.companyCountry+', '+foundCompany.companyPincode;
            setCompanyAddress(companyAddressRef.current);
          }
          else {
            companyAddressRef.current = 'NA';
            setCompanyAddress(companyAddressRef.current);
          }
        }        
      } catch (error) {
        console.log(error);
      }
    };

    if (companyData.entity_name) {
      fetchCompany();
    }
  }, [companyData]);

  return (
    <>
      {data.length > 0 && (
        <Stack spacing={'2'} mb={'1'}>
          <Box mb={'5'}>
            <CompanyInfoCard field={'UEN'} value={companyData?.acra_uen} />
            <CompanyInfoCard field={'COMPANY NAME'} value={companyData?.entity_name} />
            <CompanyInfoCard field={'INCORPORATION DATE'} value={companyData?.incorporation_date} />
            <CompanyInfoCard field={'COMPANY TYPE'} value={companyData?.entity_type} />
            <CompanyInfoCard field={'PRINCIPAL ACTIVITY 1'} value={companyData?.default_ssic_description_I} />
            <CompanyInfoCard field={'PRINCIPAL ACTIVITY 2'} value={companyData?.default_ssic_description_II} />
            <CompanyInfoCard field={'REGISTERED OFFICE ADDRESS'} value={companyAddress} />
            <CompanyInfoCard field={'FINANCIAL YEAR END'} value={''} />
            <CompanyInfoCard field={'DATE OF LAST AGM'} value={''} />
            <CompanyInfoCard field={'WEBSITE'} value={companyData?.website} />
          </Box>
        </Stack>
      )}
    </>
  );
};