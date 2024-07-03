import React from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="app">
      <Header />
      <Toaster />
      <PlantPage />
    </div>
  );
}

export default App;
