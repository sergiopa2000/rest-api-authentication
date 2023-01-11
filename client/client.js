const loginOptions = {
    method: "POST",
    headers: {
        'Content-Type': "application/json",
        'Accept': "application/json"
    },
    body: JSON.stringify({
        name: "pepe",
        id: 1
    })
}

fetch("http://localhost:3001/login", loginOptions)
    .then(response => response.json())
    .then(response => {
        const token = response.token;

        const getOptions = {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'Accept': "application/json",
                'Authorization': `Bearer ${token}`
            },
        }
        
        fetch("http://localhost:3001/request", getOptions)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
