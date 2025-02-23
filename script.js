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

let currentIndex = 0;
const slides = document.querySelector('.slides');
function showNextImage() {
  currentIndex = (currentIndex + 1) % 7; // عدد الصور
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}
setInterval(showNextImage, 2000); // تغيير الصورة كل 3 ثوانٍ
