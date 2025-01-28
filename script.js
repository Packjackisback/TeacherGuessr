let descriptions = [];
let currentDescription;
let correctName;

async function loadDescriptions() {
    try {
        const response = await fetch('descriptions.txt');
        const data = await response.text();
        parseDescriptions(data);
    } catch (error) {
        console.error('Error loading descriptions:', error);
    }
}

function parseDescriptions(text) {
    const lines = text.split('\n').filter(line => line.trim() !== '');
	descriptions = lines.map(line => {
        const [name, description] = line.split(':'); 
        return { name: name.trim(), description: description.trim() };
    });
    getRandomDescription(); 
}

function getRandomDescription() {
    const randomIndex = Math.floor(Math.random() * descriptions.length);
    currentDescription = descriptions[randomIndex];
    correctName = currentDescription.name;
    document.getElementById('description').textContent = currentDescription.description;
    populateNameOptions();
}

function populateNameOptions() {
    const datalist = document.getElementById('name-options');
    datalist.innerHTML = ''; 
    const names = [...new Set(descriptions.map(desc => desc.name))];
    names.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        datalist.appendChild(option);
    });
}

function checkAnswer() {
    const userInput = document.getElementById('name-input').value.trim();
    const body = document.body;
    if (userInput === correctName) {
        body.classList.add('correct');
        setTimeout(() => {
            body.classList.remove('correct');
            getRandomDescription();
            document.getElementById('name-input').value = '';
        }, 500);
    } else {
        body.classList.add('incorrect');
        setTimeout(() => {
            body.classList.remove('incorrect');
        }, 500);
    }
}

document.getElementById('submit').addEventListener('click', checkAnswer);

loadDescriptions();
