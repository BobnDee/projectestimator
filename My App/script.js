// Get references to all the important HTML elements
const lengthInput = document.getElementById('length');
const widthInput = document.getElementById('width');
const projectCards = document.querySelectorAll('.option-card');
const displayLength = document.getElementById('display-length');
const displayWidth = document.getElementById('display-width');
const displayProject = document.getElementById('display-project');
const estimateValue = document.getElementById('estimate-value');

// A variable to store the selected project type
let selectedProject = null; 

// An object to hold the base cost per square foot for each project type
// You can adjust these numbers based on your pricing!
const costPerSqFt = {
    fence: 25,    // $25 per square foot for a fence
    patio: 20,    // $20 per square foot for a patio
    deck: 20,     // $20 per square foot for a deck
};
// Function to calculate and update the estimate
function updateEstimate() {
    const length = parseFloat(lengthInput.value);
    const width = parseFloat(widthInput.value);

    // Check if both dimensions are valid numbers
    if (isNaN(length) || isNaN(width) || length <= 0 || width <= 0) {
        // If not, reset the display and show a default message
        displayLength.textContent = '0';
        displayWidth.textContent = '0';
        estimateValue.textContent = '$0.00';
        return; // Stop the function here
    }

    const area = length * width;
    
    // Check if a project has been selected
    if (selectedProject) {
        // Get the cost from our costPerSqFt object
        const cost = costPerSqFt[selectedProject];
        // Calculate the total estimate
        const totalEstimate = area * cost;
        
        // Update the display with the calculated values
        displayLength.textContent = length;
        displayWidth.textContent = width;
        estimateValue.textContent = `$${totalEstimate.toFixed(2)}`;
    } else {
        // If no project is selected, just update the dimensions
        displayLength.textContent = length;
        displayWidth.textContent = width;
        estimateValue.textContent = '$0.00';
    }
}

// Add an 'input' event listener to the length and width fields
// This makes the estimate update as the user types
lengthInput.addEventListener('input', updateEstimate);
widthInput.addEventListener('input', updateEstimate);

// Add a 'click' event listener to each project card
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        // First, remove the 'selected' class from any other card
        projectCards.forEach(otherCard => {
            otherCard.classList.remove('selected');
        });
        
        // Add the 'selected' class to the card that was just clicked
        card.classList.add('selected');
        
        // Update our selectedProject variable
        selectedProject = card.dataset.project;
        
        // Update the project display text
        displayProject.textContent = selectedProject.charAt(0).toUpperCase() + selectedProject.slice(1);
        
        // Finally, run the estimate function to update the price
        updateEstimate();
    });
});
