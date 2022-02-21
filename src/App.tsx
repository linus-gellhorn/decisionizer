import "./App.css";
import MainContent from "./components/MainContent";
import PsychologyIcon from "@mui/icons-material/Psychology";

function App() {
  return (
    <>
      <div className="title-container">
        <PsychologyIcon sx={{ color: "rgb(233, 30, 99)", fontSize: 40 }} />
        <h1>Decisionizer </h1>
        <PsychologyIcon sx={{ color: "rgb(233, 30, 99)", fontSize: 40 }} />
      </div>

      <MainContent />
    </>
  );
}

export default App;
