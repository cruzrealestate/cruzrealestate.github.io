/*!
* Start Bootstrap - Creative v7.0.6 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2022 Start Bootstrap.. Modified by LC 2022
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/
//
// Scripts
// 

function Translate() {
  //initialization
  this.init = function (attribute, lng) {
    this.attribute = attribute;
    this.lng = lng;
  }
  //translate 
  this.process = function () {
    _self = this;
    var xrhFile = new XMLHttpRequest();
    //load content data 
    xrhFile.open("GET", "lng/" + this.lng + ".json", false);
    xrhFile.onreadystatechange = function () {
      if (xrhFile.readyState === 4) {
        if (xrhFile.status === 200 || xrhFile.status == 0) {
          var LngObject = JSON.parse(xrhFile.responseText);
          var allDom = document.getElementsByTagName("*");
          for (var i = 0; i < allDom.length; i++) {
            var elem = allDom[i];
            var key = elem.getAttribute(_self.attribute);
            if (key != null) {
              elem.innerHTML = LngObject[key];
            }
          }

        }
      }
    }
    xrhFile.send();
  }
}

function translate(lng, tagAttr) {
  var translate = new Translate();
  translate.init(tagAttr, lng);
  translate.process();
  if (lng == 'en') {
    $("#enTranslator").css('color', '#f4623a');
    $("#esTranslator").css('color', '#212529');
  }
  if (lng == 'es') {
    $("#esTranslator").css('color', '#f4623a');
    $("#enTranslator").css('color', '#212529');
  }
}

function contactSubmit() {
  if ($("#name").val().length == 0) { $("#name").addClass("is-invalid"); return; }
  else { $("#name").removeClass("is-invalid"); }

  if (!ValidEmail($("#email").val())) { $("#email").addClass("is-invalid"); $("#phone").addClass("is-invalid"); return; }
  else { $("#email").removeClass("is-invalid"); $("#phone").removeClass("is-invalid"); }

  if (!ValidPhone($("#phone").val())) { $("#email").addClass("is-invalid"); $("#phone").addClass("is-invalid"); return; }
  else { $("#email").removeClass("is-invalid"); $("#phone").removeClass("is-invalid"); }

  if ($("#message").val().length < 5) { $("#message").addClass("is-invalid"); return; }
  else { $("#message").removeClass("is-invalid"); }

  emailjs.sendForm('service_7av2auf', 'template_5ywa2ln', document.getElementById('contactForm'))
    .then(function () {
      console.log('SUCCESS!');
      //Clear form values
      $("#name").val('');
      $("#email").val('');
      $("#phone").val('');
      $("#message").val('');
     // $("#contactForm").hide();
      $("#submitSuccessMessage").removeClass("d-none");
    }, function (error) {
      console.log('FAILED...', error);
      $("#submitErrorMessage").removeClass("d-none");
    });
}

var debug;

function SimpleLightbox_Show(data) {
  debug = data;

  SimpleLightbox.open({
    items: ['assets/img/portfolio/fullsize/1.jpg', 'assets/img/portfolio/fullsize/2.jpg', 'assets/img/portfolio/fullsize/3.jpg']
  });
}

function ValidEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) { return (true) }
  else { return (false) }
}

function ValidPhone(phone) {
  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (phone.match(phoneno)) { return true; }
  else { return false; }
}

$(document).ready(function () {
  //This is id of HTML element (English) with attribute lng-tag
  $("#enTranslator").click(function () {
    translate('en', 'lng-tag');
  });
  //This is id of HTML element (Spanish) with attribute lng-tag
  $("#esTranslator").click(function () {
    translate('es', 'lng-tag');
  });

  //set spanish as main language
  translate('es', 'lng-tag');

  // Navbar shrink function
  var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector('#mainNav');
    if (!navbarCollapsible) {
      return;
    }
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove('navbar-shrink')
    } else {
      navbarCollapsible.classList.add('navbar-shrink')
    }
  };

  // Shrink the navbar 
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener('scroll', navbarShrink);

  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector('#mainNav');
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: '#mainNav',
      offset: 74,
    });
  };

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector('.navbar-toggler');
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll('#navbarResponsive .nav-link')
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener('click', () => {
      if (window.getComputedStyle(navbarToggler).display !== 'none') {
        navbarToggler.click();
      }
    });
  });

  // Activate SimpleLightbox plugin for portfolio items
  new SimpleLightbox({
    elements: '#portfolio a.portfolio-box'
  });

  //add event for contact form submission
  $("#submitButton").on("click", function (evt) {
    evt.preventDefault();
    contactSubmit();
  });
  
  //init email service for contact form
  emailjs.init('N3bHuDe6WEAy8bYbM');

  //$(".portfolio-box").on("click", function (evt) {
  //  SimpleLightbox_Show(evt);
  //  return false;
  //});
});
