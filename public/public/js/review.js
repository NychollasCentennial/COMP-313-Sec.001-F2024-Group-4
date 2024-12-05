// Array to store both existing reviews (simulated) and user-submitted reviews
let reviews = [
    // Simulated data for initial reviews from other patients
    {
        rating: 5,
        review: "Dr. Juned Ahmed Opu was very attentive and knowledgeable. Highly recommend!",
        patientName: "Sadman Habib Tausif",
        date: "2024-10-01"
    },
    {
        rating: 4,
        review: "Good experience. The doctor explained everything clearly.",
        patientName: "Mahfuj Ahmed",
        date: "2024-10-15"
    }
];

// Load reviews when the page is ready
document.addEventListener('DOMContentLoaded', function() {
    loadReviews(); // Load existing reviews on page load

    // Event listener for the review form submission
    document.getElementById('review-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const rating = document.getElementById('rating').value;
        const reviewText = document.getElementById('review').value;

        // Create a new review object based on form input
        const newReview = {
            rating: parseInt(rating),
            review: reviewText,
            patientName: "Anonymous", // Default name; you could modify this to take input if needed
            date: new Date().toISOString().split('T')[0] // Format date as YYYY-MM-DD
        };

        // Add the new review to the reviews array
        reviews.push(newReview);

        // Add the new review to the display
        addReviewToDisplay(newReview);

        // Clear the form
        document.getElementById('rating').value = '';
        document.getElementById('review').value = '';
    });
});

// Function to load and display reviews
function loadReviews() {
    const reviewsList = document.getElementById('reviews-list');
    reviewsList.innerHTML = ''; // Clear current reviews

    // Display each review in the reviews array
    reviews.forEach(review => addReviewToDisplay(review));
}

// Helper function to add a review to the reviews display section
function addReviewToDisplay(review) {
    const reviewsList = document.getElementById('reviews-list');

    const reviewItem = document.createElement('div');
    reviewItem.classList.add('review-item');
    reviewItem.innerHTML = `
        <strong>${review.rating} stars</strong> - ${review.review} <br>
        <em>- ${review.patientName}, ${review.date}</em>
    `;

    reviewsList.appendChild(reviewItem);
}
