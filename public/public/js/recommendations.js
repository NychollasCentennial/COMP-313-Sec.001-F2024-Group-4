document.addEventListener('DOMContentLoaded', function() {
    // Initial load of recommendations based on default or prior data
    loadClinicRecommendations();
});

// Function to handle search input and show recommendations based on input
function handleSearch() {
    const searchInput = document.getElementById('search-input').value.toLowerCase().trim();
    
    if (!searchInput) {
        alert("Please enter a location or specialty to search.");
        return;
    }

    // Expanded data for clinics in Toronto, Scarborough, North York, and additional specialties
    const allClinics = [
        { name: "City Health Clinic", location: "Downtown Toronto - 5 miles away", specialty: "general practitioner" },
        { name: "Uptown Wellness Center", location: "Uptown Toronto - 8 miles away", specialty: "dermatology" },
        { name: "Green Valley Pediatrics", location: "Scarborough - 3 miles away", specialty: "pediatrics" },
        { name: "Northside Cardiac Care", location: "North York - 4 miles away", specialty: "cardiology" },
        { name: "East End Family Clinic", location: "East Toronto - 6 miles away", specialty: "family medicine" },
        { name: "Scarborough Skin Care", location: "Scarborough - 2 miles away", specialty: "dermatology" },
        { name: "Toronto Women's Health", location: "Downtown Toronto - 5 miles away", specialty: "obstetrics and gynecology" },
        { name: "North York Heart Center", location: "North York - 4 miles away", specialty: "cardiology" },
        { name: "Midtown Mental Health Clinic", location: "Midtown Toronto - 5 miles away", specialty: "psychiatry" },
        { name: "Scarborough Dental Clinic", location: "Scarborough - 3 miles away", specialty: "dentistry" },
        { name: "West End Vision Center", location: "West Toronto - 7 miles away", specialty: "ophthalmology" },
        { name: "Toronto Allergy Specialists", location: "North Toronto - 6 miles away", specialty: "allergy and immunology" },
        { name: "Scarborough Orthopedic Clinic", location: "Scarborough - 5 miles away", specialty: "orthopedics" },
        { name: "Downtown Pediatric Care", location: "Downtown Toronto - 5 miles away", specialty: "pediatrics" },
        { name: "North York Gastroenterology", location: "North York - 3 miles away", specialty: "gastroenterology" },
        { name: "Toronto Physical Therapy", location: "Toronto - 6 miles away", specialty: "physical therapy" },
        { name: "Scarborough Cardiac Clinic", location: "Scarborough - 4 miles away", specialty: "cardiology" },
        { name: "North York Women's Health Center", location: "North York - 3 miles away", specialty: "gynecology" },
        { name: "East Toronto Rehabilitation", location: "East Toronto - 5 miles away", specialty: "rehabilitation" },
        { name: "Uptown Neurology Center", location: "Uptown Toronto - 8 miles away", specialty: "neurology" }
    ];

    // Filter clinics based on search input (location or specialty)
    const filteredClinics = allClinics.filter(clinic =>
        clinic.location.toLowerCase().includes(searchInput) ||
        clinic.specialty.toLowerCase().includes(searchInput)
    );

    // Display the filtered recommendations
    displayClinics(filteredClinics);
}

// Function to display clinics based on search results or initial recommendations
function displayClinics(clinics) {
    const recommendedClinicsList = document.getElementById('recommended-clinics-list');
    recommendedClinicsList.innerHTML = ''; // Clear current list

    if (clinics.length === 0) {
        recommendedClinicsList.innerHTML = "<li>No clinics found matching your search.</li>";
        return;
    }

    // Display each recommended clinic
    clinics.forEach(clinic => {
        const clinicItem = document.createElement('li');
        clinicItem.innerHTML = `
            <strong>${clinic.name}</strong> - ${clinic.location} <br>
            <em>Specialty: ${clinic.specialty}</em>
        `;
        recommendedClinicsList.appendChild(clinicItem);
    });
}

// Initial function to load default recommendations
function loadClinicRecommendations() {
    // Default recommendations shown without search
    const defaultClinics = [
        { name: "City Health Clinic", location: "Downtown Toronto - 5 miles away", specialty: "general practitioner" },
        { name: "Green Valley Pediatrics", location: "Scarborough - 3 miles away", specialty: "pediatrics" }
    ];
    displayClinics(defaultClinics);
}
