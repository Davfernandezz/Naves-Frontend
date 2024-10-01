const URL = 'http://localhost:4000/api/accesses'

//ACCESS

export const registerEntry = async (data, token) => {
    try {
        const response = await fetch(`${URL}/entry`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    } catch (error) {
        console.error("Error registering entry:", error);
        throw error;
    }
}

export const registerExit = async (data, token) => {
    try {
        const response = await fetch(`${URL}/exit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    } catch (error) {
        console.error("Error registering exit:", error);
        throw error;
    }
}