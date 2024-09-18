document.addEventListener("DOMContentLoaded", () => {
    // Ensure all DOM elements are ready before attaching events

    const cameraBtn = document.getElementById('cameraBtn');
    const saveBtn = document.getElementById("saveBtn");
    const continueBtn = document.getElementById("continueBtn");
    const stopBtn = document.getElementById("stopBtn");  // Get the Stop button
    const stopBtnImg = document.getElementById("stopBtnImg"); // For stop button after image detection

    // Webcam detection logic
    if (cameraBtn) {
        cameraBtn.addEventListener('click', function() {
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
                        detectingText.style.display = 'block'; // Show "Detecting..." when webcam is started
                    })
                    .catch(function(err) {
                        console.log("Error accessing webcam: " + err);
                        alert("Error accessing webcam. Please check your camera permissions.");
                    });
            } else {
                console.error("Webcam section not found in the document.");
            }
        });
    }

     // Handle Save button click for webcam
     if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            const canvas = document.createElement('canvas');
            const video = document.getElementById('video');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Image Data URL (can be saved or sent to a server)
            const imageUrl = canvas.toDataURL('image/png');
            console.log("Captured Image:", imageUrl);

            // Save the image
            const link = document.createElement('a');
            link.href = imageUrl;
            link.setAttribute('download', 'captured_image.png');
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            alert("Image saved successfully!");
        });
    }

     // Continue button event
     if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            alert("Continuing to the next step...");
        });
    }

   // Stop button for webcam section
   if (stopBtn) {
        stopBtn.addEventListener('click', () => {
            alert('Detection Stopped');
            location.reload();  // Reloads the current page
        });
    }

    // Handle Upload Image button click
    const uploadImageBtn = document.getElementById('uploadImageBtn');
    const fileInput = document.getElementById('fileInput');
    const imagePreview = document.getElementById('imagePreview');
    const changeImageBtn = document.getElementById('changeImageBtn');
    const detectingText = document.getElementById('detecting'); // Get the "Detecting..." element

    if (uploadImageBtn && fileInput) {
        document.getElementById('detecting').style.display = 'none';
        uploadImageBtn.addEventListener('click', function() {
            document.getElementById('uploadSection').style.display = 'block';
        });

        fileInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    imagePreview.innerHTML = ''; // Clear any previous image
                    imagePreview.appendChild(img);

                    // Show detecting section and buttons after image is uploaded
                    changeImageBtn.style.display = 'inline-block';
                    stopBtnImg.style.display = 'inline-block';
                    detectingText.style.display = 'block'; // Show "Detecting..."
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Change Image button event
    if (changeImageBtn) {
        changeImageBtn.addEventListener('click', function() {
            fileInput.click();
        });
    }

    // Stop button event for image detection
    if (stopBtnImg) {
        stopBtnImg.addEventListener('click', function() {
            alert('Detection Stopped');
            detectingText.style.display = 'none'; // Hide "Detecting..." 
            location.reload();  // Reload the page or return to the initial state
        });
    }
});

