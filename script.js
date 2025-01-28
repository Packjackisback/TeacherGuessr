let descriptions = [];
let currentDescription;
let correctName;

// Fetch descriptions from the external text file
async function loadDescriptions() {
    try {
        const response = await fetch('descriptions.txt');
        const data = await response.text();
        parseDescriptions(data);
    } catch (error) {
        console.error('Error loading descriptions:', error);
    }
}

// Parse the text file into an array of objects
function parseDescriptions(text) {
    const lines = text.split('\n').filter(line => line.trim() !== ''); // Split by lines and remove empty lines
    descriptions = lines.map(line => {
        const [name, description] = line.split(':'); // Split each line by the delimiter
        return { name: name.trim(), description: description.trim() };
    });
    getRandomDescription(); // Start the game after loading descriptions
}

// Get a random description from the loaded data
function getRandomDescription() {
    const randomIndex = Math.floor(Math.random() * descriptions.length);
    currentDescription = descriptions[randomIndex];
    correctName = currentDescription.name;
    document.getElementById('description').textContent = currentDescription.description;
    populateNameOptions();
}

// Populate the datalist with unique names
function populateNameOptions() {
    const datalist = document.getElementById('name-options');
    datalist.innerHTML = ''; // Clear previous options
    const names = [...new Set(descriptions.map(desc => desc.name))];
    names.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        datalist.appendChild(option);
    });
}

// Check the user's answer
function checkAnswer() {
    const userInput = document.getElementById('name-input').value.trim();
    const body = document.body;
    if (userInput === correctName) {
        body.classList.add('correct');
        setTimeout(() => {
            body.classList.remove('correct');
            getRandomDescription();
            document.getElementById('name-input').value = ''; // Clear input
        }, 500);
    } else {
        body.classList.add('incorrect');
        setTimeout(() => {
            body.classList.remove('incorrect');
        }, 500);
    }
}

// Event listener for the submit button
document.getElementById('submit').addEventListener('click', checkAnswer);

// Load descriptions when the page loads
loadDescriptions();
