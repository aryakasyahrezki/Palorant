document.addEventListener('DOMContentLoaded', function() {
    const dropdownTrigger = document.querySelector('.mobile-dropdown-trigger');
    const navLinks = document.querySelector('.navbar-links');
    
    dropdownTrigger.addEventListener('click', function(e) {
      e.stopPropagation();
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  
    document.addEventListener('click', function() {
      dropdownTrigger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  
    navLinks.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  });


// document.addEventListener('DOMContentLoaded', function() {
//   const dropdownTrigger = document.querySelector('.mobile-dropdown-trigger');
//   const navLinks = document.querySelector('.navbar-links');
//   const navbarContainer = document.querySelector('.navbar-container');
//   const navbarLogo = document.querySelector('.navbar-logo');
  
//   // Original trigger functionality
//   dropdownTrigger.addEventListener('click', function(e) {
//       e.stopPropagation();
//       toggleMenu();
//   });
  
//   // New: Click anywhere on navbar (except logo) to toggle menu
//   navbarContainer.addEventListener('click', function(e) {
//       // Don't trigger if clicking on logo or directly on dropdown trigger
//       if (!e.target.closest('.navbar-logo') && !e.target.closest('.mobile-dropdown-trigger')) {
//           toggleMenu();
//       }
//   });
  
//   // Logo click closes menu and goes to homepage
//   navbarLogo.addEventListener('click', function() {
//       closeMenu();
//       // Homepage navigation is handled by the link in HTML
//   });
  
//   // Close when clicking outside
//   document.addEventListener('click', function() {
//       closeMenu();
//   });
  
//   // Prevent menu from closing when clicking inside it
//   navLinks.addEventListener('click', function(e) {
//       e.stopPropagation();
//   });
  
//   // Helper functions
//   function toggleMenu() {
//       dropdownTrigger.classList.toggle('active');
//       navLinks.classList.toggle('active');
//   }
  
//   function closeMenu() {
//       dropdownTrigger.classList.remove('active');
//       navLinks.classList.remove('active');
//   }
// });