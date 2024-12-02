
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './LoginForm';
// 

const App: React.FC = () => {
      // State to manage the visibility of the login modal
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Function to toggle the modal visibility
  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
      </Routes>
      <div className="container mt-5">

        <h1>Welcome To Your Task Manager</h1> 

        <button
          className="btn btn-primary"
          onClick={toggleLoginModal}
        >
          Login
        </button>

        {/* Login Modal */}
        {showLoginModal && (
          <div
            className="modal show d-block"
            tabIndex={-1}
            role="dialog"
            onClick={toggleLoginModal}  
          >
            <div className="modal-dialog" role="document">
              <div 
                className="modal-content" 
                onClick={(e) => e.stopPropagation()}  
              >
                <div className="modal-header">
                  {/* Modal title */}
                  <h5 className="modal-title">Login</h5>

                  {/* Button to close the modal */}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={toggleLoginModal}
                  ></button>
                </div>

               
                <div className="modal-body">
                  <LoginForm />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
