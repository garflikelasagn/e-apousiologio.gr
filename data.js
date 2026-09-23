document.addEventListener('DOMContentLoaded', () => {
    if (window.location.protocol === 'file:') {
        document.getElementById('urlWarning').style.display = 'block';
        return;
    }
    loadData();
});

async function loadData() {
    try {
        const response = await fetch('/notes');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        const tbody = document.getElementById('tableBody');
        tbody.innerHTML = ''; 

        data.forEach(row => {
            const tr = document.createElement('tr');
            
            let formattedTime = '';
            let rawDate = '';
            
            if (row.time) {
                const dateObj = new Date(row.time);
                formattedTime = dateObj.toLocaleString('el-GR');
                
                // Extract YYYY-MM-DD in local time for precise calendar matching
                const year = dateObj.getFullYear();
                const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                const day = String(dateObj.getDate()).padStart(2, '0');
                rawDate = `${year}-${month}-${day}`;
            }

            // Store the raw date as a data attribute to easily filter it later
            tr.setAttribute('data-date', rawDate);

            tr.innerHTML = `
                <td>${row.id ?? ''}</td>
                <td>${row.firstName ?? ''}</td>
                <td>${row.lastName ?? ''}</td>
                <td>${row.tmima ?? ''}</td>
                <td>${formattedTime}</td>
            `;
            tbody.appendChild(tr);
        });

        runAllFilters();
    } catch (error) {
        console.error("Σφάλμα κατά την ανάκτηση δεδομένων:", error);
    }
}

// Unified filter function to handle both text inputs and the date picker
function runAllFilters() {
    const inputs = document.getElementsByClassName("search-input");
    const selectedDate = document.getElementById("dateFilter") ? document.getElementById("dateFilter").value : "";
    const table = document.getElementById("dataTable");
    const tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {
        let rowMatches = true;

        // 1. Check text inputs
        for (let j = 0; j < inputs.length; j++) {
            const filterValue = inputs[j].value.trim().toUpperCase();
            if (filterValue) {
                let td = tr[i].getElementsByTagName("td")[j];
                if (td) {
                    let txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(filterValue) === -1) {
                        rowMatches = false;
                        break; // Move to the next row immediately
                    }
                }
            }
        }

        // 2. Check date picker
        if (rowMatches && selectedDate) {
            const rowDate = tr[i].getAttribute("data-date");
            if (rowDate !== selectedDate) {
                rowMatches = false;
            }
        }

        // Apply visibility
        tr[i].style.display = rowMatches ? "" : "none";
    }
}

// Helper function for the "Καθαρισμός" (Clear) button
function clearDateFilter() {
    document.getElementById("dateFilter").value = "";
    runAllFilters();
}