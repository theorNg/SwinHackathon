// Function to switch to webcam detection page
document.getElementById('cameraBtn').addEventListener('click', function() {
    // Hide the main page and show the webcam section
    document.querySelector('main').style.display = 'none';
    const webcamSection = document.getElementById('webcam-section');
    
    if (webcamSection) {
        webcamSection.style.display = 'block';

        // Start webcam
        const video = document.getElementById('video');
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                video.srcObject = stream;
            })
            .catch(function(err) {
                console.log("Error accessing webcam: " + err);
                alert("Error accessing webcam. Please check your camera permissions.");
            });
    } else {
        console.error("Webcam section not found in the document.");
    }
});

// Handle Save button click for webcam
document.getElementById('saveBtn').addEventListener('click', function() {
    const canvas = document.createElement('canvas');
    const video = document.getElementById('video');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Image Data URL (can be saved or sent to a server)
    const imageUrl = canvas.toDataURL('image/png');
    console.log("Captured Image:", imageUrl);

    // Optional: You can add functionality to save the image to the user's device 
    const link = document.createElement('a');
    link.href = imageUrl;
    link.setAttribute('download', 'captured_image.png');
    link.style.display = 'none';
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
});

document.addEventListener("DOMContentLoaded", () => {
    const saveBtn = document.getElementById("saveBtn");
    const continueBtn = document.getElementById("continueBtn");
    const stopBtn = document.getElementById("stopBtn");  // Get the Stop button

    saveBtn.addEventListener("click", () => {
        alert("Image saved successfully!");
    });

    continueBtn.addEventListener("click", () => {
        alert("Continuing to the next step...");
    });

    // Stop button event
    stopBtn.addEventListener("click", () => {
        // Logic to return to the initial screen
        // This could be reloading the page or resetting elements to default state
        location.reload();  // Reloads the current page
    });
});


// Handle Continue button click (redirect or further process)
document.getElementById('continueBtn').addEventListener('click', function() {
    alert("Proceeding to the next step...");
});

// Handle Image button click for uploading an image
document.getElementById('imageBtn').addEventListener('click', function() {
    // Show the image upload section
    document.getElementById('uploadSection').style.display = 'block';
});

// Handle image upload from file input
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imagePreview = document.getElementById('imagePreview');
            const img = document.createElement('img');
            img.src = e.target.result;
            img.width = 400; // Resize image for preview if needed
            imagePreview.innerHTML = ''; // Clear any previous image
            imagePreview.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
});

//

