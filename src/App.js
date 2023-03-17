import { useState } from "react";
import "./App.css";
import { FileUpload } from "./Components/FileUpload";
import { HelpSteps } from "./Components/HelpSteps";
import { NavBar } from "./Components/NavBar";
import { Stats } from "./Components/Stats";
function App() {
  const [fileContent, setFileContent] = useState("None");
  const [helpOn, setHelp] = useState(false);
  function helpClicked() {
    setHelp(!helpOn);
  }
  return (
    <>
      <NavBar helpClicked={helpClicked} />
      <HelpSteps helpOn={helpOn}/>
      <div className="container flex flex-row mx-auto w-full">
        <FileUpload setFileContent={setFileContent} />
      </div>
      {<Stats fileContent={fileContent} />}
    </>
  );
}

export default App;
