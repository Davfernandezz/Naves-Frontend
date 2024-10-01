const URL = 'http://localhost:4000/api/persons'

//PERSONS

export const getCurrentAccess = async (userId, token) => {
    try {
        const response = await fetch(`${URL}/${userId}/current-access`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error("Error getting current access:", error);
        throw error;
    }
};

export const getAccessHistory = async (userId, token) => {
    try {
        const response = await fetch(`${URL}/${userId}/access-history`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error("Error getting access history:", error);
        throw error;
    }
};