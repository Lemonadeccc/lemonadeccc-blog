import Hero from "./components/Hero";
import Nav from "./components/Nav";



export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-none">
        <Nav />
      </div>
      <Hero />
    </main>
  );
}
