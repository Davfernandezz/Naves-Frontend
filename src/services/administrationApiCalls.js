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