import ProfileCard from '@/components/ProfileCard'
import React from 'react'

export default function Officers() {
  const officers = ['JILL HILL SMITH', 'JACK SUPERSTAR DENVERS', 'HADWICK BOTZMAN'];
  return (
    <>
      {officers.map((officer, index) => (
        <ProfileCard key={index} name={officer} />
      ))}
    </>
  )
}