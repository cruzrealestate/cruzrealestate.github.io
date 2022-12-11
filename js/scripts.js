/*!
* Start Bootstrap - Creative v7.0.6 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/
//
// Scripts
// 

function Translate2() {
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
  // this is the id of the submit button
  $("#submitButtonId").click(function () {

    var url = "path/to/your/script.php"; // the script where you handle the form input.

    $.ajax({
      type: "POST",
      url: url,
      data: $("#idForm").serialize(), // serializes the form's elements.
      success: function (data) {
        alert(data); // show response from the php script.
      }
    });

    return false; // avoid to execute the actual submit of the form.
  });
}

$(document).ready(function () {
  //This is id of HTML element (English) with attribute lng-tag
  $("#enTranslator").click(function () {
    translate('en', 'lng-tag');
  });
  //This is id of HTML element (Spanish) with attribute lng-tag
  $("#khTranslator").click(function () {
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
});
