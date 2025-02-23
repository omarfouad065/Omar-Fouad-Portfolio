function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

function copyPhoneNumber(event) {
  event.preventDefault(); // Prevent default link behavior
  const phoneNumber = '+201227218710'; // Replace with your actual phone number

  navigator.clipboard.writeText(phoneNumber)
    .then(() => {
      // Show success feedback
      alert('Phone number copied to clipboard: ' + phoneNumber);
      // Or use a more subtle notification system
      // showNotification('Phone number copied!');
    })
    .catch(err => {
      console.error('Failed to copy phone number: ', err);
      alert('Failed to copy phone number. Please try again.');
    });
}

