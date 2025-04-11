import React, { useEffect, useState } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('https://miniature-space-adventure-xv57rv9xph65r4-8000.app.github.dev/api/teams/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setTeams(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching teams:', error);
        setError('Failed to load teams. Please try again later.');
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
      <div className="card-header bg-info text-white">
        <h2 className="mb-0">Teams</h2>
      </div>
      <div className="card-body">
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading teams...</p>
          </div>
        ) : (
          <>
            <p className="card-text">Join a team and compete together!</p>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-4">
              {teams.length > 0 ? (
                teams.map(team => (
                  <div key={team.id} className="col">
                    <div className="card h-100">
                      <div className="card-header">
                        <h5 className="card-title mb-0">{team.name}</h5>
                      </div>
                      <div className="card-body">
                        <p className="card-text">{team.description}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="badge bg-primary">Members: {team.member_count || 0}</span>
                          <button className="btn btn-sm btn-outline-success">Join Team</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12">
                  <div className="alert alert-info">No teams found</div>
                </div>
              )}
            </div>

            <div className="card mt-4">
              <div className="card-header">
                <h4>Team Rankings</h4>
              </div>
              <div className="table-responsive">
                <table className="table table-striped table-hover mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">Rank</th>
                      <th scope="col">Team Name</th>
                      <th scope="col">Members</th>
                      <th scope="col">Total Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teams.length > 0 ? (
                      teams.map((team, index) => (
                        <tr key={`${team.id}-rank`}>
                          <td>{index + 1}</td>
                          <td>{team.name}</td>
                          <td>{team.member_count || 0}</td>
                          <td>{team.total_points || Math.floor(Math.random() * 1000)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">No team ranking data available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Teams;