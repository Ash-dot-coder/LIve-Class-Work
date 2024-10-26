document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    // Variable to keep track of the currently selected card
    let selectedCard = null;

    // Card click event for interaction
    cards.forEach((card, index) => {
        card.textContent = index + 1; // Display card number

        card.addEventListener('click', () => {
            // If a card is already selected, reset its style
            if (selectedCard && selectedCard !== card) {
                selectedCard.classList.remove('selected');
                resetOtherCards();
            }

            // Toggle the clicked card's selection
            card.classList.toggle('selected');

            if (card.classList.contains('selected')) {
                selectedCard = card;
                animateOtherCards(card);
            } else {
                selectedCard = null;
                resetOtherCards();
            }
        });
    });

    // Animate other cards based on the selected card
    function animateOtherCards(selectedCard) {
        cards.forEach(card => {
            if (card !== selectedCard) {
                // Add an effect to move other cards away
                card.classList.add('hidden');
            }
        });
    }

    // Reset all cards to original state
    function resetOtherCards() {
        cards.forEach(card => {
            card.classList.remove('hidden');
        });
    }
});
