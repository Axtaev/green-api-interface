const apiUrl = "https://7103.api.greenapi.com";

async function callApi(endpoint, method = 'GET', body = null) {
    const idInstance = document.getElementById('idInstance').value;
    const apiTokenInstance = document.getElementById('apiTokenInstance').value;
    const url = `${apiUrl}/waInstance${idInstance}/${endpoint}/${apiTokenInstance}`;
    
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        document.getElementById('response').value = JSON.stringify(data, null, 2);
    } catch (error) {
        document.getElementById('response').value = `Error: ${error.message}`;
    }
}

function getSettings() {
    callApi('getSettings');
}

function getStateInstance() {
    callApi('getStateInstance');
}

function sendMessage() {
    const chatId = document.getElementById('chatId').value;
    const message = document.getElementById('message').value;

    const body = {
        chatId: chatId,
        message: message
    };
    callApi('sendMessage', 'POST', body);
}

function sendFileByUrl() {
    const chatId = document.getElementById('chatId').value;
    const urlFile = document.getElementById('fileUrl').value;
    const fileName = document.getElementById('fileName').value;

    const body = {
        chatId: chatId,
        urlFile: urlFile,
        fileName: fileName,
        caption: "Here is your file"
    };
    callApi('sendFileByUrl', 'POST', body);
}
