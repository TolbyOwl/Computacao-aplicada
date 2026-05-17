        const popupForm = document.getElementById('popupForm');
        const openPopupBtn = document.getElementById('openPopupBtn');
        const closePopupBtn = document.getElementById('closePopupBtn');
        // const popupPacient = document.getElementById('popupPacient');
        const openPacientBtns = document.querySelectorAll('.open-pacient-btn');
        // const closePacientBtn = document.getElementById('closePacientBtn');        
        
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

        openPacientBtns.forEach(btn => {
            btn.addEventListener('click',function(event){
                // popupPacient.style.display = 'flex';
                const eventId = this.dataset.eventId;
                window.location.href = `/client/${eventId}`;
            });
        });

        // // Hide the popup pacient when the close button is clicked
        // closePacientBtn.addEventListener('click', function() {
        //     popupPacient.style.display = 'none';
        // });

        // // Hide the popup pacient when clicking outside the form content
        // window.addEventListener('click', function(event) {
        //     if (event.target == popupPacient) {
        //         popupPacient.style.display = 'none';
        //     }
        // });



