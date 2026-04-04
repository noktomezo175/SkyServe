if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(() => console.log("Offline Mode Active!"))
    .catch((err) => console.log("Offline Mode Failed", err));
}



function togMeal() {
    // 1. Check if the checkbox is checked
    let isEnabled = document.getElementById('mTog').checked;
    
    // 2. Find the inventory bar and the meal UI in the popup
    let bar = document.getElementById('inv-bar');
    let mealUI = document.getElementById('m-ui');

    // 3. Show or Hide them
    if (bar) bar.style.display = isEnabled ? 'flex' : 'none';
    if (mealUI) mealUI.style.display = isEnabled ? 'block' : 'none';

    // 4. Refresh the numbers
    upInv();
}
function upInv() {
    if (document.getElementById('cA')) document.getElementById('cA').innerText = mA;
    if (document.getElementById('cB')) document.getElementById('cB').innerText = mB;
    
    // This also disables the buttons if you run out
    if (document.getElementById('bA')) document.getElementById('bA').disabled = (mA <= 0);
    if (document.getElementById('bB')) document.getElementById('bB').disabled = (mB <= 0);
}


function resetAll() {
    if (confirm("Clear all names, orders, and reset meals for the next leg?")) {
        // 1. Reset the core data object
        data = {}; 
        
        // 2. Reset Meal Counts (Standard 7/5)
        mA = 7; 
        mB = 5;

        // 3. Update the Inventory Display
        if (document.getElementById('cA')) document.getElementById('cA').innerText = mA;
        if (document.getElementById('cB')) document.getElementById('cB').innerText = mB;
        
        // 4. Update the Buttons
        if (document.getElementById('bA')) document.getElementById('bA').disabled = false;
        if (document.getElementById('bB')) document.getElementById('bB').disabled = false;

        // 5. Redraw the Cabin
        render(); 
        
        // 6. Provide Haptic Feedback (Optional/Visual)
        console.log("Manifest Cleared for New Flight");
    }
}

// Make sure this is at the very bottom of your script!
window.onload = function() {
    if (typeof setCarrier === "function") setCarrier('AA');
    if (typeof render === "function") render();
};