(function () {
  'use strict';

  $(document).ready(function() {

    var headerNavDropdown = function() {
      $('.header-main--desktop__nav-main > ul li').each(function(){
        $(this).has('.dropdown').on('mouseenter', function() {
          $(this).find('.dropdown').css('display', 'block').animate({
            'top': '100%', 'opacity': '1'}, 200);
        })
        $(this).on('mouseleave', function() {
          $(this).find('.dropdown').animate({
            'top': '50%', 'opacity': '0'}, 200, function(){
              $(this).css('display', 'none');
            });
        })
      })
    };
    headerNavDropdown();

    var sidebarMenu = function() {
      $('.btn--open-sidebar').on('click', function() {
        $('body').addClass('sidebar-open');
        $('.sidebar-mobile').css('display', 'block').animate({
          'left': '0'
        }, 200);
      });
      $('.btn--close-sidebar').on('click', function() {
        $('body').removeClass('sidebar-open');
        $('.sidebar-mobile').animate({
          'left': '100%'
        }, 200, function() {
          $(this).css('display', 'none');
        });
      });
    };
    sidebarMenu();

  });

})();