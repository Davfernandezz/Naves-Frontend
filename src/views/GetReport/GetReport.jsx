import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getDateReport } from '../../services/administrationApiCalls';
import './GetReport.css';

export const GetReport = () => {
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [visibleItems, setVisibleItems] = useState({
      accesses: 2,
      absences: 2,
      frequentUsers: 2,
      infrequentUsers: 2,
    });
    const { passport } = useAuth();
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!passport || !passport.token) {
        navigate("/login");
      }
    }, [passport, navigate]);
  
    const handleInputChange = (e) => {
      setDateRange({ ...dateRange, [e.target.name]: e.target.value });
    };
  
    const fetchDateReport = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
      try {
        const queryParams = new URLSearchParams({
          start_date: dateRange.startDate,
          end_date: dateRange.endDate
        });
        const response = await getDateReport(passport.token, queryParams);
        if (response.success) {
          setReport(response.data);
        } else {
          setError(response.message || "Could not generate report");
        }
      } catch (error) {
        setError("Error generating report: " + (error.message || "Unknown error"));
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
      <div className="get-report-wrapper">
        <div className="get-report-container">
          <h1 className="get-report-title">Get Custom Date Report</h1>
          <h2 className="get-report-subtitle">Select Date Range:</h2>
          {error && <p className="get-report-error">{error}</p>}
          <form onSubmit={fetchDateReport}>
            <div className="mb-3">
              <input
                type="date"
                name="startDate"
                value={dateRange.startDate}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="date"
                name="endDate"
                value={dateRange.endDate}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 get-report-button">
              Generate Report
            </button>
          </form>
  
          {loading && <p className="text-center mt-4">Loading...</p>}
          
          {report && (
            <div className="get-report-content mt-4">
              <h3>Report Period: {new Date(report.report_period.start_date).toLocaleDateString("en-US")} - {new Date(report.report_period.end_date).toLocaleDateString("en-US")}</h3>
              <p>Total Accesses: {report.total_accesses} | Total Absences: {report.total_absences}</p>
  
              <div className="get-report-section">
                <h4>Accesses</h4>
                {report.accesses.length > 0 ? (
                  <>
                    <ul className="get-report-list">
                      {report.accesses.slice(0, visibleItems.accesses).map((access, index) => (
                        <li key={index} className="get-report-item">
                          <strong>{access.person}</strong>
                          <span>Room: {access.room}</span>
                          <span>In: {formatDate(access.entry_time)}</span>
                          <span>Out: {formatDate(access.exit_time)}</span>
                        </li>
                      ))}
                    </ul>
                    {visibleItems.accesses < report.accesses.length && (
                      <button onClick={() => loadMore("accesses")} className="btn btn-secondary get-report-load-more">
                        Load More
                      </button>
                    )}
                  </>
                ) : (
                  <p>No accesses recorded for this period.</p>
                )}
              </div>
  
              <div className="get-report-section">
                <h4>Absences</h4>
                {report.absences.length > 0 ? (
                  <>
                    <ul className="get-report-list">
                      {report.absences.slice(0, visibleItems.absences).map((absence, index) => (
                        <li key={index} className="get-report-item">
                          <strong>{absence.person}</strong>
                          <span>Room: {absence.room}</span>
                          <span>Scheduled: {formatDate(absence.scheduled_entry_time)}</span>
                        </li>
                      ))}
                    </ul>
                    {visibleItems.absences < report.absences.length && (
                      <button onClick={() => loadMore("absences")} className="btn btn-secondary get-report-load-more">
                        Load More
                      </button>
                    )}
                  </>
                ) : (
                  <p>No absences recorded for this period.</p>
                )}
              </div>
  
              <div className="get-report-section">
                <h4>Frequent Users</h4>
                {report.frequent_users.length > 0 ? (
                  <>
                    <ul className="get-report-list">
                      {report.frequent_users.slice(0, visibleItems.frequentUsers).map((user, index) => (
                        <li key={index} className="get-report-item">
                          <strong>{user.name}</strong>
                          <span>Accesses: {user.accessCount}</span>
                        </li>
                      ))}
                    </ul>
                    {visibleItems.frequentUsers < report.frequent_users.length && (
                      <button onClick={() => loadMore("frequentUsers")} className="btn btn-secondary get-report-load-more">
                        Load More
                      </button>
                    )}
                  </>
                ) : (
                  <p>No frequent users for this period.</p>
                )}
              </div>
  
              <div className="get-report-section">
                <h4>Infrequent Users</h4>
                {report.infrequent_users.length > 0 ? (
                  <>
                    <ul className="get-report-list">
                      {report.infrequent_users.slice(0, visibleItems.infrequentUsers).map((user, index) => (
                        <li key={index} className="get-report-item">
                          <strong>{user.name}</strong>
                          <span>Accesses: {user.accessCount}</span>
                        </li>
                      ))}
                    </ul>
                    {visibleItems.infrequentUsers < report.infrequent_users.length && (
                      <button onClick={() => loadMore("infrequentUsers")} className="btn btn-secondary get-report-load-more">
                        Load More
                      </button>
                    )}
                  </>
                ) : (
                  <p>No infrequent users for this period.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default GetReport;