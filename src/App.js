import { useState } from "react";
import "./App.css";
import { FileUpload } from "./Components/FileUpload";
import { NavBar } from "./Components/NavBar";
import { Stats } from "./Components/Stats";
function App() {
  const [fileContent, setFileContent] = useState("None");
  // document.documentElement.classList.add('dark');
  // document.body.style.backgroundColor="#1f1f60";
  return (
    <>
      <NavBar />
      <div className="container flex flex-row mx-auto w-full">
        <FileUpload setFileContent={setFileContent} />
      </div>
      {<Stats fileContent={fileContent} />}

      
    </>
  );
}

export default App;
