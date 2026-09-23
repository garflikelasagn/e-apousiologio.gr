document.getElementById('addNoteForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const tmima = document.getElementById('tmima').value;

            const response = await fetch('/notes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, tmima })
            });

            if (response.ok) {
                alert('Επιτυχής καταχώρηση!');
                document.getElementById('addNoteForm').reset();
            } else {
                alert('Σφάλμα κατά την καταχώρηση.');
            }
        });

        // Login Modal Logic
        const modal = document.getElementById("loginModal");
        const btn = document.getElementById("loginBtn");
        const span = document.getElementsByClassName("close")[0];

        btn.onclick = () => modal.style.display = "block";
        span.onclick = () => modal.style.display = "none";
        window.onclick = (event) => {
            if (event.target == modal) modal.style.display = "none";
        };

        // Hardcoded Credential Check
        document.getElementById('adminSubmit').addEventListener('click', () => {
            const user = document.getElementById('adminUser').value;
            const pass = document.getElementById('adminPass').value;

            if (user === "Admin123" && pass === "EPALadmin1234") {
                window.location.href = "https://eapousiologio.netlify.app/data";
            } else {
                alert("Λάθος στοιχεία!");
            }
        });