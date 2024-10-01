const URL = 'http://localhost:4000/api/rooms'

//ROOM

export const getCurrentRoomStatus = async (roomId, token) => {
    try {
        const response = await fetch(`${URL}/${roomId}/current-status`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error("Error getting room current status:", error);
        throw error;
    }
};