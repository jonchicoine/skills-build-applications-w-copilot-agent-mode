import React, { useEffect, useState } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('https://miniature-space-adventure-xv57rv9xph65r4-8000.app.github.dev/api/leaderboard/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setLeaderboard(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching leaderboard:', error);
        setError('Failed to load leaderboard. Please try again later.');
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
      <div className="card-header bg-success text-white">
        <h2 className="mb-0">Leaderboard</h2>
      </div>
      <div className="card-body">
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading leaderboard data...</p>
          </div>
        ) : (
          <>
            <p className="card-text">See who's leading the fitness challenge!</p>
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Rank</th>
                    <th scope="col">Name</th>
                    <th scope="col">Team</th>
                    <th scope="col">Score</th>
                    <th scope="col">Achievement</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.length > 0 ? (
                    leaderboard.map((entry, index) => (
                      <tr key={entry.id} className={index < 3 ? 'table-warning' : ''}>
                        <td>
                          {index === 0 ? <span className="badge rounded-pill bg-warning text-dark">🥇 1st</span> : 
                           index === 1 ? <span className="badge rounded-pill bg-secondary">🥈 2nd</span> : 
                           index === 2 ? <span className="badge rounded-pill bg-danger">🥉 3rd</span> : 
                           <span className="badge rounded-pill bg-light text-dark">{index + 1}</span>}
                        </td>
                        <td>{entry.user_name}</td>
                        <td>{entry.team_name}</td>
                        <td><span className="badge bg-success">{entry.score}</span></td>
                        <td>
                          {entry.score > 1000 ? 
                            <span className="badge bg-warning text-dark">Elite</span> :
                            entry.score > 500 ? 
                            <span className="badge bg-info">Advanced</span> :
                            <span className="badge bg-secondary">Beginner</span>
                          }
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">No leaderboard data found</td>
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

export default Leaderboard;