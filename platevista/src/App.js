import Header from './components/Header';
import Log from './components/Log';
import DataEntery from './components/DataEntery';
import Detect from './components/Detect';
import Home from './components/Home';
import LiveStream from './components/Livestream';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';





function App() {
  return (
    <div className="App">
  
     <Router>
      
      <Routes>
       
       <Route exact path="/" element={<Log />} />
       <Route exact path="/header" element={<Header />} />
       <Route exact path="/log" element={<Log />} />
       <Route exact path="/dataentery" element={<DataEntery />} />
       <Route exact path="/detect" element={<Detect />} />
       <Route exact path="/home" element={<Home />} />
       <Route exact path="/liveStream" element={<LiveStream />} />
      </Routes>
      </Router>
     
  
      
      
      
      
    </div>
  );
}

export default App;
