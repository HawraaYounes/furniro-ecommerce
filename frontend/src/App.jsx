import "./App.css";
import Hero from "./components/Hero";
import Nav from "./components/Nav";

function App() {
  return (
    <>
      <div className=" bg-hero-pattern bg-no-repeat bg-cover bg-center " >
        <Nav />
        <Hero />
      </div>
    </>
  );
}

export default App;
