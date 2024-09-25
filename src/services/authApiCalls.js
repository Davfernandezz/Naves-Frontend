const URL = 'http://localhost:4000/api/auth'

//AUTH

export const registerUser = async (credentials) => {
    try {
        const request = await fetch(`${URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        const result = await request.json();
        return result;
    } catch (error) {
        console.error("User register error:", error);
        throw error;
    }
}

export const loginUser = async (credentials) => {
    try {
        const request = await fetch(`${URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        const result = await request.json();
        return result;
    } catch (error) {
        console.error("User logging error:", error);
        throw error;
    }
}