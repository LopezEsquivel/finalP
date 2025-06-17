//////////LLAMADO POST//////////
async function postData(obj,endpoint) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/${endpoint}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });
        return await response.json();
    } catch (error) {
        console.error('Error posting user:', error);
        throw error;
    }
}


export default { postData };

