"use strict"
   
//burger JS
const headerBurger = document.querySelector('.header__burger');
const headerMenu = document.querySelector('.header__menu');
if (headerBurger){        
    headerBurger.addEventListener('click', function(e){
        document.body.classList.toggle('lock');
        headerBurger.classList.toggle('active');
        headerMenu.classList.toggle('active');
    })
}

 // Прокрутка при клике JS
// const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
// if (menuLinks.length>0) {
// menuLinks.forEach(menuLink=> {
//     menuLink.addEventListener('click', onMenuLinkClick);
// });
// function onMenuLinkClick (e) {
//     const menuLink = e.target;
//     if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
//         const gotoBlock = document.querySelector(menuLink.dataset.goto);
//         const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
        
//     if(headerBurger.classList.contains('active')){
//         document.body.classList.remove('lock');
//         headerBurger.classList.remove('active');
//         headerMenu.classList.remove('active'); 
//         }

        // window.scrollTo({
        //     top: gotoBlockValue,
        //     behavior: "smooth"
        // });
        // e.preventDefault();
//     }
// }
// }

const navToggle = document.querySelector('.menu__list')
// replace this with something more sensible
const navLinkParent = document.querySelector('.menu__link').parentElement;

navToggle.addEventListener('click', () => {
    document.body.classList.remove('lock');
        headerBurger.classList.remove('active');
        headerMenu.classList.remove('active'); 
}
    

)

// // this is adding a click listener to ONE element
// navLinkParent.addEventListener('click', (event) => {
//   // check if the clicked element matches what you're after
//   if (event.target.classList.contains('menu__link')) {
//     document.body.classList.remove('active')
//   }
// })


// Show more js
const btnShowMoreCards = document.querySelector('.btn-more');
const hiddenCards = document.querySelectorAll('.card--hidden');

btnShowMoreCards.addEventListener('click', function () {
    hiddenCards.forEach(function (card) {
        card.classList.remove('card--hidden');
    })  
       
})

document.getElementById('btn-more').onclick = function() {
    document.getElementById('btn-more').classList.add('btn-more--hidden');
  }




$(document).ready(function() {
    "use strict"
    
     // spoller jQuery
     $('.questions-title').click(function(event) {
        if($('.questions').hasClass('one')){
            $('.questions-title').not($(this)).removeClass('active');
            $('.questions-text').not($(this).next()).slideUp(300);      
        }
    $(this).toggleClass('active').next().slideToggle(300);
    });

    //burger  jQuery
    // $(".header__burger").click(function(event) {
    //     $(".header__burger, .header__menu").toggleClass("active");
    //     $("body").toggleClass("lock");
    // }); 

    //scrollup
    var btn = $('.scrollup');  
  $(window).scroll(function() {     
    if ($(window).scrollTop() > 300) {
       btn.addClass('show');
     } else {
       btn.removeClass('show');
     }
   });
   btn.on('click', function(e) {
     e.preventDefault();
     $('html, body').animate({scrollTop:0}, '300');
   });


    //E-mail Ajax Send
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Дякуємо за повідомлення! ");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 500);
		});
		return false;
    });
    

   

        
});








