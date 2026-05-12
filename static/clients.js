        const popupForm = document.getElementById('popupForm');
        const openPopupBtn = document.getElementById('openPopupBtn');
        const closePopupBtn = document.getElementById('closePopupBtn');
        const popupPacient = document.getElementById('popupPacient');
        const openPacientBtn = document.getElementById('openPacientBtn');
        const closePacientBtn = document.getElementById('closePacientBtn');        
        
        // Show the popup form when the button is clicked
        openPopupBtn.addEventListener('click', function() {
            popupForm.style.display = 'flex'; // Use flex to center the popup
        });

        // Hide the popup form when the close button is clicked
        closePopupBtn.addEventListener('click', function() {
            popupForm.style.display = 'none';
        });

        // Hide the popup form when clicking outside the form content
        window.addEventListener('click', function(event) {
            if (event.target == popupForm) {
                popupForm.style.display = 'none';
            }
        });

        // Show the popup pacient when the button is clicked
        openPacientBtn.addEventListener('click', function() {
            popupForm.style.display = 'flex'; // Use flex to center the popup
        });

        // Hide the popup pacient when the close button is clicked
        closePacientBtn.addEventListener('click', function() {
            popupForm.style.display = 'none';
        });

        // Hide the popup pacient when clicking outside the form content
        window.addEventListener('click', function(event) {
            if (event.target == popupPacient) {
                popupPacient.style.display = 'none';
            }
        });