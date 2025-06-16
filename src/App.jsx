 
import Header from './components/Header'
import Countdown from './components/Countdown'
import Invitation from './components/Invitation'
import Gallery from './components/Gallery'
import Location from './components/Location'
import GuestBook from './components/GuestBook'
import AccountInfo from './components/AcountInfo'
import RSVP from './components/RSVP'
import './App.css'

function App() {
  return (
     <div>
      <Header/>
      <Countdown/>
      <Invitation/>
      <Gallery/>
      {/* <Location/> */}
      <GuestBook/>
      <AccountInfo/>
      <RSVP/>
     </div>
  )
}

export default App
