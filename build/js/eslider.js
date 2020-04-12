window.onload = function() {
  var slider = new ESlider("#slider-1", [
   '<img src="../img/laura_background.jpg"/>,' 
    "https://static.pexels.com/photos/9574/pexels-photo.jpeg",
    "http://www.hd-wallpapersdownload.com/script/bulk-upload/download-hd-wallpapers-hd-for-mobile-3D.jpg",
    "http://allpicts.in/wp-content/uploads/2015/02/3d-nature-wallpaper-landscape-photo-of-mountaint.jpg",
    "http://www.ultrahdwallpapers.net/images/6.jpg",
    "https://4.bp.blogspot.com/-jS9AKEwPeHQ/UxeSbPDXWjI/AAAAAAAApWM/-emBFoRWuwU/s0/Aston+Martin+Supercars_Ultra+HD.jpg",
    "http://hdfreewallpaper.net/wp-content/uploads/2016/03/stain-glass-window-free-hd-wallpapers.jpg"
  ]);
}

/* 
    Name: ESlider v1.0
    Author: Evyatar Daud
*/

var ESlider = function(slider, images) {
  /* Function: Get Element by Selector */
  var _ = function(selector) {
    return document.querySelector(selector);
  }

  /* Function: Get All Elements by Selector */
  var __ = function(selector) {
    return document.querySelectorAll(selector);
  }

  /* Declare class variables */
  this.slider = _(slider);
  this.images = images;
  this.slides = "";
  this.currentSlide;

  /* Add ESlider class to the slider */
  this.slider.classList.add("ESlider");

  /* Create slides */
  this.slides = "";
  this.bulks = "<div class='ESlider-bulks-container'>";
  this.images.forEach(function(image, index) {
    this.slides += "<img class='ESlider-slide ESlider-slide-" + (index + 1) + "' src='" + image + "' />";
    this.bulks += "<span class='ESlider-bulk' data-slide-id='"+ (index+1) + "'><img src='" + image + "' class='ESlider-thumbnail' /></span>";
  }.bind(this));

  /* Set slides */
  this.bulks += "</div>";
  this.contronls = "<span class='ESlider-previous'></span><span class='ESlider-next'></span>";
  this.slider.innerHTML += this.slides + this.bulks + this.contronls;

  /* Function: Set Slider Auto Sliding */
  this.interval = function() {
    this.autoSlide = setInterval(function() {
      this.next();
    }.bind(this), 5000);
  }.bind(this);

  /* Function: Change Slide */
  this.setSlide = function(id) {
    clearInterval(this.autoSlide);
    /* hide current slide */
    if (_(slider + " .ESlider-active-slide") != null)
      _(slider + " .ESlider-active-slide").classList.remove("ESlider-active-slide");

    /* reset active bulk */
    if (_(slider + " .ESlider-active-bulk") != null)
      _(slider + " .ESlider-active-bulk").classList.remove("ESlider-active-bulk");

    /* show new slide */
    _(slider + " .ESlider-slide-" + id).classList.add("ESlider-active-slide");
    _(slider + " .ESlider-bulk[data-slide-id='" + id + "']").classList.add("ESlider-active-bulk");
    _(slider).style.height = _(slider + " .ESlider-slide-" + id).clientHeight + "px";

    this.currentSlide = id;

    this.interval();
  }

  /* Function: Next Slide */
  this.next = function() {
    if (this.currentSlide == this.images.length)
      this.currentSlide = 1;

    else
      this.currentSlide++;

    this.setSlide(this.currentSlide);
  }

  /* Function: Previous Slide */
  this.previous = function() {
    if (this.currentSlide == 1)
      this.currentSlide = this.images.length;

    else
      this.currentSlide--;

    this.setSlide(this.currentSlide);
  }

  /* Set Bulks event listeners */
  var bulks = __(slider + " .ESlider-bulk");
  for (var i = 0; i < bulks.length; i++) {
    bulks[i].addEventListener("click", function(e) {
      var slideID = e.target.dataset.slideId;
      this.setSlide(slideID);
    }.bind(this));
  }

  _(slider + " .ESlider-previous").addEventListener("click", function(e) {
    this.previous();
  }.bind(this));

  _(slider + " .ESlider-next").addEventListener("click", function(e) {
    this.next();
  }.bind(this));

  /* Set First Slide */
  this.setSlide(1);
}