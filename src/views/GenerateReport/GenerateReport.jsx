import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { generateDailyReport } from '../../services/administrationApiCalls';
import './GenerateReport.css';

export const GenerateReport = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [visibleItems, setVisibleItems] = useState({
    accesses: 2,
    absences: 2,
    frequentUsers: 2,
    infrequentUsers: 2,
  });
  const { passport } = useAuth();
  const navigate = useNavigate();
  const [reportGenerated, setReportGenerated] = useState(false); 

  useEffect(() => {
    if (!passport || !passport.token) {
      navigate("/login");
    } else if (!reportGenerated) {
      fetchDailyReport();
      setReportGenerated(true);
    }
  }, [passport, navigate, reportGenerated]);

  const fetchDailyReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await generateDailyReport(passport.token);
      if (response.success) {
        setReport(response.data);
      } else {
        setError(response.message || "Could not generate report");
      }
    } catch (error) {
      setError(
        "Error generating daily report: " + (error.message || "Unknown error")
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = (section) => {
    setVisibleItems((prev) => ({
      ...prev,
      [section]: prev[section] + 2,
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="generate-report-wrapper">
      <div className="generate-report-container">
        <h2>Daily Report</h2>
        {error && <p className="generate-report-error">{error}</p>}
        {report && (
          <div className="generate-report-content">
            <h3>of the month</h3>
            <p>Total Accesses: {report.total_accesses} | Total Absences: {report.total_absences}</p>

            <div className="generate-report-section">
              <h4>Accesses</h4>
              {report.accesses.length > 0 ? (
                <>
                  <ul className="generate-report-list">
                    {report.accesses.slice(0, visibleItems.accesses).map((access, index) => (
                      <li key={index} className="generate-report-item">
                        <strong>{access.person}</strong>
                        <span>{access.room}</span>
                        <span>In: {formatDate(access.entry_time)}</span>
                        <span>Out: {formatDate(access.exit_time)}</span>
                      </li>
                    ))}
                  </ul>
                  {visibleItems.accesses < report.accesses.length && (
                    <button
                      onClick={() => loadMore("accesses")}
                      className="generate-report-load-more"
                    >
                      Load More
                    </button>
                  )}
                </>
              ) : (
                <p>No accesses recorded for this day.</p>
              )}
            </div>

            <div className="generate-report-section">
              <h4>Absences</h4>
              {report.absences.length > 0 ? (
                <>
                  <ul className="generate-report-list">
                    {report.absences.slice(0, visibleItems.absences).map((absence, index) => (
                      <li key={index} className="generate-report-item">
                        <strong>{absence.person}</strong>
                        <span>{absence.room}</span>
                        <span>Scheduled: {formatDate(absence.scheduled_entry_time)}</span>
                      </li>
                    ))}
                  </ul>
                  {visibleItems.absences < report.absences.length && (
                    <button
                      onClick={() => loadMore("absences")}
                      className="generate-report-load-more"
                    >
                      Load More
                    </button>
                  )}
                </>
              ) : (
                <p>No absences recorded for this day.</p>
              )}
            </div>

            <div className="generate-report-section">
              <h4>Frequent Users</h4>
              {report.frequent_users.length > 0 ? (
                <>
                  <ul className="generate-report-list">
                    {report.frequent_users.slice(0, visibleItems.frequentUsers).map((user, index) => (
                      <li key={index} className="generate-report-item">
                        <strong>{user.name}</strong>
                        <span>Accesses: {user.accessCount}</span>
                      </li>
                    ))}
                  </ul>
                  {visibleItems.frequentUsers < report.frequent_users.length && (
                    <button
                      onClick={() => loadMore("frequentUsers")}
                      className="generate-report-load-more"
                    >
                      Load More
                    </button>
                  )}
                </>
              ) : (
                <p>No frequent users for this day.</p>
              )}
            </div>

            <div className="generate-report-section">
              <h4>Infrequent Users</h4>
              {report.infrequent_users.length > 0 ? (
                <>
                  <ul className="generate-report-list">
                    {report.infrequent_users.slice(0, visibleItems.infrequentUsers).map((user, index) => (
                      <li key={index} className="generate-report-item">
                        <strong>{user.name}</strong>
                        <span>Accesses: {user.accessCount}</span>
                      </li>
                    ))}
                  </ul>
                  {visibleItems.infrequentUsers < report.infrequent_users.length && (
                    <button
                      onClick={() => loadMore("infrequentUsers")}
                      className="generate-report-load-more"
                    >
                      Load More
                    </button>
                  )}
                </>
              ) : (
                <p>No infrequent users for this day.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateReport;