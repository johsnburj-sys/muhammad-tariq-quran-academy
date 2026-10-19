// Muhammad Tariq — Online Quran Teacher
// Interactive features for static deployment

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const mobileBtn = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Inquiry form submission simulation
  const inquiryForm = document.getElementById('inquiry-form');
  const inquirySuccess = document.getElementById('inquiry-success');

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name-input')?.value || 'Student';
      const course = document.getElementById('course-select')?.value || 'Quran Course';
      const contact = document.getElementById('contact-input')?.value || '';

      if (!name || !contact) {
        alert('Please fill in your name and contact details.');
        return;
      }

      if (inquirySuccess) {
        inquiryForm.style.display = 'none';
        inquirySuccess.style.display = 'block';
        const summary = document.getElementById('inquiry-summary');
        if (summary) {
          summary.textContent = `Name: ${name}\nCourse: ${course}\nContact: ${contact}`;
        }
      }
    });
  }
});
