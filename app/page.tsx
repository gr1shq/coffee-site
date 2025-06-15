import Footer from "./(components)/Footer";
import Header from "./(components)/Header";
import Booking from "./(sections)/Booking";
import Gallery from "./(sections)/Gallery";
import Hero from "./(sections)/Hero";
import Map from "./(sections)/Map";
import Menu from "./(sections)/Menu";
import Social from "./(sections)/Social";

export default function Home() {

  return (
    <div>
      <Header />
      <Hero />
      <Menu />  
      <Booking />
      <Gallery />
      <Map />
      <Social />
      <Footer />
    </div>
  )
}