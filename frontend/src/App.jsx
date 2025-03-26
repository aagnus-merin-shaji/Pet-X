import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Main, Navigator, Product, Sidebar } from "./layout/index";
import { useGlobalContext } from "./context/context";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register"; // Adopter Register
import ShelterRegister from "./pages/shelter/ShelterRegister"; // Shelter Register
import SearchResults from "./components/SearchResults";
import Order from "./pages/Order";
import Wishlist from "./pages/Wishlist";
import Footer from "./components/Footer";
import UserProfile from "./components/UserProfile";
import Admindashbaordpage from "./pages/Admin/Admindashbaordpage";
import Payment from "./pages/Payment";
import Portfolio from "./pages/Portfolio";
import Services from "./pages/Services";
import GetStart from "./pages/GetStart";
import ClinicPage from "./pages/ClinicPage";
import ShelterNavbar from "./components/ShelterNavbar";
import ShelterHome from "./pages/shelter/ShelterHome";
import AddAnimal from "./pages/shelter/AddAnimal";
import Animals from "./pages/shelter/Animals";
import Adoptions from "./pages/shelter/Adoptions";
import Reports from "./pages/shelter/Reports";
import ShelterProfilePage from "./pages/shelter/ShelterProfilePage";
import ClinicNavbar from "./components/ClinicNavbar";
import ClinicAnimals from "./pages/ClinicAnimals";
import ClinicServices from "./pages/ClinicServices";
import ClinicContact from "./pages/ClinicContact";
import ClinicHome from "./pages/ClinicHome";
import PetMedicalDetailsForm from "./components/PetMedicalDetailsForm";
import ForgotPassword from "./pages/ForgotPassword";
import AdopterProfile from "./pages/AdopterProfile";
import AdopterAdoptions from "./pages/AdopterAdoptions";
import ContractSign from "./pages/ContractSign";
import AdopterMedicalDetails from "./pages/adopter/AdopterMedicalDetails";

function App() {
  const { state } = useGlobalContext();
  const location = useLocation();

  // Define admin-based routes
  const adminRoutes = ["/admin/dashboard"];

  // Define shelter-based routes
  const shelterRoutes = [
    "/shelterhome",
    "/shelter/add-animal",
    "/shelter/animals",
    "/shelter/adoptions",
    "/shelter/reports",
    "/shelter/profile",
  ];

  // Define clinic-based routes
  const clinicRoutes = [
    "/clinic",
    "/clinic/home",
    "/clinic/animals",
    "/clinic/animals/medical-details",
    "/clinic/services",
    "/clinic/contact",
  ];

  // Define adopter-based routes
  const adopterRoutes = [
    "/adopter-profile",
    "/adopter-adoptions",
    "/adopter/medical-details",
  ];

  // Define routes where no navbar should be displayed
  const noNavbarRoutes = ["/", "/login", "/register", "/shelter-register", "/forgot-password"];

  // Check if the current page is an admin-based page
  const isAdminPage = adminRoutes.includes(location.pathname);

  // Check if the current page is a shelter-based page
  const isShelterPage = shelterRoutes.includes(location.pathname);

  // Check if the current page is a clinic-based page
  const isClinicPage = clinicRoutes.includes(location.pathname);

  // Check if the current page is an adopter-based page
  const isAdopterPage = adopterRoutes.includes(location.pathname);

  // Check if the current page is the profile page
  const isProfilePage = location.pathname === "/profile";

  // Check if the current page is a no-navbar page
  const isNoNavbarPage = noNavbarRoutes.includes(location.pathname);

  return (
    <div className="App">
      {/* Render the appropriate navbar based on the current route */}
      {!isNoNavbarPage && (
        <>
          {isShelterPage && <ShelterNavbar />}
          {isClinicPage && <ClinicNavbar />}
          {!isShelterPage && !isClinicPage && !isAdminPage && !isProfilePage && !isAdopterPage && <Navigator />}
        </>
      )}

      {/* Sidebar - Render only for non-admin, non-shelter, non-clinic, and non-profile pages */}
      {!isAdminPage && !isShelterPage && !isClinicPage && !isProfilePage && !isAdopterPage && !isNoNavbarPage && (
        <Sidebar isShowing={state.showSidebar} />
      )}

      {/* Routes */}
      <Routes>
        {/* Common Routes */}
        <Route path="/" element={<GetStart />} /> {/* Landing Page */}
        <Route path="/home" element={<Home />} /> {/* adopter Page */}
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/services" element={<Services />} />
        <Route path="/order" element={<Order />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Adopter Register */}
        <Route path="/shelter-register" element={<ShelterRegister />} /> {/* Shelter Register */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/adopter-profile" element={<AdopterProfile />} />
        <Route path="/adopter-adoptions" element={<AdopterAdoptions />} />
        <Route path="/adopter/medical-details" element={<AdopterMedicalDetails />} />
        <Route path="/contract-sign" element={<ContractSign />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<Admindashbaordpage />} />

        {/* Shelter Routes */}
        <Route path="/shelterhome" element={<ShelterHome />} />
        <Route path="/shelter/add-animal" element={<AddAnimal />} />
        <Route path="/shelter/animals" element={<Animals />} />
        <Route path="/shelter/adoptions" element={<Adoptions />} />
        <Route path="/shelter/reports" element={<Reports />} />
        <Route path="/shelter/profile" element={<ShelterProfilePage />} />

        {/* Clinic Routes */}
        <Route path="/clinic" element={<ClinicPage />} />
        <Route path="/clinic/home" element={<ClinicHome />} />
        <Route path="/clinic/animals" element={<ClinicAnimals />} />
        <Route path="/clinic/animals/medical-details" element={<PetMedicalDetailsForm />} />
        <Route path="/clinic/services" element={<ClinicServices />} />
        <Route path="/clinic/contact" element={<ClinicContact />} />
      </Routes>

      {/* Footer */}
      {!isNoNavbarPage && <Footer />} {/* Hide footer on no-navbar pages */}
    </div>
  );
}

export default App;