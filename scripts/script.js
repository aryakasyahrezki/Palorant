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