import React from 'react';
import Sidebar from './components/layouts/Sidebar';
import Navigation from './components/Navigation';

function App() {
  return (
    // <MuiThemeProvider>
    <div>
      <Sidebar />
      <Navigation />
    </div>
    // </MuiThemeProvider>
  );
}

export default App;
