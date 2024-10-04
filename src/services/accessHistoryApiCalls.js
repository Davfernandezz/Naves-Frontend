const URL = 'http://localhost:4000/api/access_histories';

//ACCESS HISTORY

function formatDate(date) {
    return date.toISOString().split('T')[0];
}

export const getAccessHistories = async (token, startDate, endDate) => {
    try {
        const queryParams = new URLSearchParams({
            start_date: formatDate(new Date(startDate)),
            end_date: formatDate(new Date(endDate))
        });
        const response = await fetch(`${URL}?${queryParams}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error("Error fetching access histories:", error);
        throw error;
    }
};

export const getRoomAccessHistories = async (token, roomId, startDate, endDate) => {
    try {
        const queryParams = new URLSearchParams({
            start_date: formatDate(new Date(startDate)),
            end_date: formatDate(new Date(endDate))
        });
        const response = await fetch(`${URL}/room/${roomId}?${queryParams}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error("Error fetching room access histories:", error);
        throw error;
    }
};