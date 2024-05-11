import './App.css';
import ProjectList from './components/ProjectList';
import AddProject from './components/AddProject';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditProject from './components/EditProject';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/" element={<AddProject />} />
        <Route path="/edit-project/:id" element={<EditProject />} />
      </Routes>
    </Router>
  );
};

export default App;
