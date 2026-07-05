import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />
      <main className="min-h-[calc(100vh-8rem)]">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;