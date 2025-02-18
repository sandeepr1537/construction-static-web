async function loadKnowledgeBase() {
    const knowledgeBase = {
        about: await fetchPageContent('about.html'),
        services: await fetchPageContent('services.html'),
        contact: await fetchPageContent('contact.html')
    };
    return knowledgeBase;
}

async function fetchPageContent(page) {
    try {
        const response = await fetch(page);
        const text = await response.text();
        const doc = new DOMParser().parseFromString(text, "text/html");
        const content = doc.body.textContent || "";
        return content;
    } catch (error) {
        console.error(`Error loading ${page}:`, error);
        return "";
    }
}

async function sendMessage() {
    const userInput = document.getElementById("chat-input").value;
    const chatOutput = document.getElementById("chat-output");

    if (!userInput.trim()) return;

    chatOutput.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

    const knowledgeBase = await loadKnowledgeBase();
    let response = "Sorry, I don't have an answer for that.";

    if (userInput.toLowerCase().includes('about')) {
        response = knowledgeBase.about || response;
    } else if (userInput.toLowerCase().includes('services')) {
        response = knowledgeBase.services || response;
    } else if (userInput.toLowerCase().includes('contact')) {
        response = knowledgeBase.contact || response;
    }

    chatOutput.innerHTML += `<p><strong>Bot:</strong> ${response}</p>`;
    document.getElementById("chat-input").value = "";
}
