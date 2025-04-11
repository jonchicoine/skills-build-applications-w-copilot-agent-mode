import React, { useEffect, useState } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('https://miniature-space-adventure-xv57rv9xph65r4-8000.app.github.dev/api/workouts/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching workouts:', error);
        setError('Failed to load workouts. Please try again later.');
        setLoading(false);
      });
  }, []);

  const handleWorkoutClick = (workout) => {
    setSelectedWorkout(workout);
  };

  const closeModal = () => {
    setSelectedWorkout(null);
  };

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  // Helper function to render difficulty badges
  const renderDifficultyBadge = (difficulty) => {
    if (!difficulty) return null;
    
    const level = difficulty.toLowerCase();
    if (level === 'beginner' || level === 'easy') {
      return <span className="badge bg-success">Beginner</span>;
    } else if (level === 'intermediate' || level === 'medium') {
      return <span className="badge bg-warning text-dark">Intermediate</span>;
    } else if (level === 'advanced' || level === 'hard') {
      return <span className="badge bg-danger">Advanced</span>;
    }
    return <span className="badge bg-secondary">{difficulty}</span>;
  };

  return (
    <>
      <div className="card">
        <div className="card-header bg-danger text-white">
          <h2 className="mb-0">Workouts</h2>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading workouts...</p>
            </div>
          ) : (
            <>
              <p className="card-text">Choose a workout to get started with your fitness journey!</p>
              
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {workouts.length > 0 ? (
                  workouts.map(workout => (
                    <div key={workout.id} className="col">
                      <div className="card h-100">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h5 className="card-title mb-0">{workout.name}</h5>
                          {renderDifficultyBadge(workout.difficulty)}
                        </div>
                        <div className="card-body">
                          <p className="card-text">{workout.description}</p>
                          <p className="card-text">
                            <small className="text-muted">
                              Duration: {workout.duration} minutes
                            </small>
                          </p>
                        </div>
                        <div className="card-footer bg-white border-top-0">
                          <button 
                            className="btn btn-outline-danger w-100" 
                            onClick={() => handleWorkoutClick(workout)}
                          >
                            View Workout Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12">
                    <div className="alert alert-info">No workouts found</div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Workout Detail Modal */}
      {selectedWorkout && (
        <div className="modal fade show" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}} tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">{selectedWorkout.name}</h5>
                <button type="button" className="btn-close btn-close-white" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6>Description</h6>
                    <p>{selectedWorkout.description}</p>
                    <h6>Duration</h6>
                    <p>{selectedWorkout.duration} minutes</p>
                    <h6>Difficulty</h6>
                    <p>{renderDifficultyBadge(selectedWorkout.difficulty)}</p>
                  </div>
                  <div className="col-md-6">
                    <h6>Equipment Needed</h6>
                    <ul className="list-group">
                      <li className="list-group-item">Gym mat</li>
                      <li className="list-group-item">Water bottle</li>
                      <li className="list-group-item">Comfortable clothes</li>
                    </ul>
                    <h6 className="mt-3">Benefits</h6>
                    <ul className="list-group">
                      <li className="list-group-item">Improved cardiovascular health</li>
                      <li className="list-group-item">Increased strength</li>
                      <li className="list-group-item">Better flexibility</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                <button type="button" className="btn btn-danger">Start Workout</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Workouts;