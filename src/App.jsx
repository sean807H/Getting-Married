import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "./components/Header";
import Countdown from "./components/Countdown";
import Invitation from "./components/Invitation";
import Gallery from "./components/Gallery";
import Location from "./components/Location";
import GuestBook from "./components/GuestBook";
import RSVP from "./components/RSVP";
import "./App.css";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
      easing: "ease-in-out",
      offset: 120,
    });
  }, []);

  return (
    <div>
      <Header />
      <Invitation />
      <Countdown />
      <Gallery />
      <Location />
      <GuestBook />
      <RSVP />
    </div>
  );
}

export default App;
