const URL = 'http://localhost:4000/api/administration';

//ADMINISTRATION

export const generateDailyReport = async (token) => {
    try {
        const response = await fetch(`${URL}/daily-report`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error("Error generating daily report:", error);
        throw error;
    }
};

export const getDateReport = async (token, queryParams) => {
    try {
      const response = await fetch(`${URL}/reports?${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error generating date report:", error);
      throw error;
    }
  };

  export const getRoomUsageStats = async (token) => {
    try {
      const response = await fetch(`${URL}/room-usage`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error retrieving room usage statistics:", error);
      throw error;
    }
  };