import React, { useEffect, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('https://miniature-space-adventure-xv57rv9xph65r4-8000.app.github.dev/api/activities/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setActivities(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching activities:', error);
        setError('Failed to load activities. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header bg-primary text-white">
        <h2 className="mb-0">Activities</h2>
      </div>
      <div className="card-body">
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading activities...</p>
          </div>
        ) : (
          <>
            <p className="card-text">Track your fitness journey with these activities to earn points!</p>
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Activity Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Points</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.length > 0 ? (
                    activities.map((activity, index) => (
                      <tr key={activity.id}>
                        <td>{index + 1}</td>
                        <td>{activity.name}</td>
                        <td>{activity.description}</td>
                        <td><span className="badge bg-success">{activity.points}</span></td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-1">Log</button>
                          <button className="btn btn-sm btn-outline-info">Details</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">No activities found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Activities;