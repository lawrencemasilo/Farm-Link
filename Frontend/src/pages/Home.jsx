import '../styles/Home.css'
import HeaderSignIn from '../components/HeaderSignIn'
import SideBar from '../components/SideBar'
import Schedule from '../components/Schedule'
import Members from '../components/Members'
import { useState } from 'react'

export default function Home() {
  const [selectedSchedule, setSelectedSchedule] = useState('schedule');
  const [selected, setSelected] = useState('recent');

  return (
    <div className="home-container">
      <div className="home-header-container">
        {<HeaderSignIn />}
      </div>
      <div className="main-content-container">
        {<SideBar setSelectedSchedule={setSelectedSchedule} setSelectedItem={setSelected} />}
        {selectedSchedule === 'schedule' ? <Schedule /> : <Members selectedItem={selected} />}
      </div>
    </div>
  )
}
