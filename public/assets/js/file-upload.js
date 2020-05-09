function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
      $('#imagePreview').hide();
      $('#imagePreview').fadeIn(650);
    }
    reader.readAsDataURL(input.files[0]);
  }
}
$("#imageUpload").change(function () {
  readURL(this);
});


(function ($) {

  'use strict';

  $(document).on('show.bs.tab', '.nav-tabs-responsive [data-toggle="tab"]', function (e) {
    var $target = $(e.target);
    var $tabs = $target.closest('.nav-tabs-responsive');
    var $current = $target.closest('li');
    var $parent = $current.closest('li.dropdown');
    $current = $parent.length > 0 ? $parent : $current;
    var $next = $current.next();
    var $prev = $current.prev();
    var updateDropdownMenu = function ($el, position) {
      $el
        .find('.dropdown-menu')
        .removeClass('pull-xs-left pull-xs-center pull-xs-right')
        .addClass('pull-xs-' + position);
    };

    $tabs.find('>li').removeClass('next prev');
    $prev.addClass('prev');
    $next.addClass('next');

    updateDropdownMenu($prev, 'left');
    updateDropdownMenu($current, 'center');
    updateDropdownMenu($next, 'right');
  });

})(jQuery);









$(document).ready(function () {

  $(".filter-button").click(function () {
    var value = $(this).attr('data-filter');

    if (value == "all") {
      //$('.filter').removeClass('hidden');
      $('.filter').show('1000');
    }
    else {
      //            $('.filter[filter-item="'+value+'"]').removeClass('hidden');
      //            $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
      $(".filter").not('.' + value).hide('3000');
      $('.filter').filter('.' + value).show('3000');

    }
  });

  if ($(".filter-button").removeClass("active")) {
    $(this).removeClass("active");
  }
  $(this).addClass("active");

});


(function ($) {
  'use strict';

  $(function () {
    /* Code for attribute data-custom-class for adding custom class to tooltip */
    if (typeof $.fn.tooltip.Constructor === 'undefined') {
      throw new Error('Bootstrap Tooltip must be included first!');
    }

    var Tooltip = $.fn.tooltip.Constructor;

    // add customClass option to Bootstrap Tooltip
    $.extend(Tooltip.Default, {
      customClass: ''
    });

    var _show = Tooltip.prototype.show;

    Tooltip.prototype.show = function () {

      // invoke parent method
      _show.apply(this, Array.prototype.slice.apply(arguments));

      if (this.config.customClass) {
        var tip = this.getTipElement();
        $(tip).addClass(this.config.customClass);
      }

    };
    $('[data-toggle="tooltip"]').tooltip();

  });
})(jQuery);









/*Search Contact list */
$(function () {
  $('#label-network').change(function(){
    
    $('#data').show();
  });

  $('.sendPayment').on('click', function () {
    setTimeout(function() {
      $('#searchpeopleModal').modal('show');
      $('#searchpeopleModal').css('z-index','10000');
      $('#addPhoneNo').css('z-index','100000');
  }, 2000);
  });


function searchpeople() {
  $('.sendPayment').on('click', function () {
    setTimeout(function() {
      $('#searchpeopleModal').modal('show');
      $('#searchpeopleModal').css('z-index','10000');
      $('#addPhoneNo').css('z-index','100000');
  }, 2000);
  });
}

/*
  $("#datepicker").datepicker({
    autoclose: true,
    todayHighlight: true
  }).datepicker('update', new Date());
*/




  $('#contactsearch').keyup(function () {
    var current_query = $('#contactsearch').val();
    if (current_query !== "") {
      $(".list-group li").hide();
      $(".list-group li").each(function () {
        var current_keyword = $(this).text();
        if (current_keyword.indexOf(current_query) >= 0) {
          $(this).show();
        };
      });
    } else {
      $(".list-group li").show();
    };
  });

  $('#inputPost').keyup(function(){
    var inputPost = $('#inputPost').val();
    if (inputPost !== "") {
        $('#btnpost').show();
    }
    else{
      $('#btnpost').hide();

    }

  });

  
  $('#exploreChatsSearch').keyup(function () {
  
    var current_query = $('#exploreChatsSearch').val();
    if (current_query !== "") {
      $(".exploreChatsSearch-group li").hide();
      $(".exploreChatsSearch-group li").each(function () {
        var current_keyword = $(this).text();
        if (current_keyword.indexOf(current_query) >= 0) {
          $(this).show();
        };
      });
    } else {
      $(".exploreChatsSearch-group li").show();
    };
  });





  $('.followerSearch').keyup(function () {
    var current_query = $('#followerSearch').val();
    if (current_query !== "") {
      $(".list-group-follower li").hide();
      $(".list-group-follower li").each(function () {
        var current_keyword = $(this).text();
        if (current_keyword.indexOf(current_query) >= 0) {
          $(this).show();
        };
      });
    } else {
      $(".list-group-follower li").show();
    };
  });


  $('.followingSearch').keyup(function () {
    var current_query = $('#followingSearch').val();
    if (current_query !== "") {
      $(".list-group-following li").hide();
      $(".list-group-following li").each(function () {
        var current_keyword = $(this).text();
        if (current_keyword.indexOf(current_query) >= 0) {
          $(this).show();
        };
      });
    } else {
      $(".list-group-following li").show();
    };
  });



  $('.postlist').keyup(function () {
    var current_query = $('.postlist').val();
    if (current_query !== "") {
      $(".list-group li").hide();
      alert();
      $(".list-group li").each(function () {
        var current_keyword = $(this).text();
        if (current_keyword.indexOf(current_query) >= 0) {
          $(this).show();
        };
      });
    } else {
      $('.errormsg').hide();
    };
  });



  var current_query = $('.postlist').val();

  if (current_query !== "") {
    $('.errormsg').hide();

  } else {
    $('.errormsg').show();
    $(".list-group li").hide();
  };



  /*Filter Button Active in notification */

  var btnContainer = document.getElementById("notificationActive");
  var btns = btnContainer.getElementsByClassName("btn");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
    });
  }
});







/*Invitation Sent */
$(document).ready(function () {
  $(".invitebtn").click(function () {
    $(this).text($(this).text() == 'Invite' ? 'Invite' : 'Message');
  });


  $(".follower").click(function () {
    $(this).text($(this).text() == 'Follower' ? 'Following' : 'Follower');
    $(this).toggleClass("btn-success btn-warning");
    if($(this).text()=="Following"){
      $(this).parents('li').find('a').attr('href','fallowing.html');
    }
    else{
      $(this).parents('li').find('a').attr('href','follower.html');
    }
   
  });
  $('.notfollowingUser').hide();
});


$(".follow").click(function () {
  $(this).text($(this).text() == 'Follow' ? 'Following' : 'Follow');
  $(this).toggleClass("btn-success btn-warning");
  if($(this).text()=="Following"){
    $(this).parents('li').find('a').attr('href','fallowing.html');
  }
  else{
    $(this).parents('li').find('a').attr('href','follower.html');
  }
});


$(".following").click(function () {
  $(this).text($(this).text() == 'Following' ? 'Follow' : 'Following');
  $(this).toggleClass("btn-success btn-warning");
  if($(this).text()=="Follow"){
    $(this).parents('li').find('a').attr('href','follower.html');
  }
  else{
    $(this).parents('li').find('a').attr('href','fallowing.html');
  }
});
function unfollowUSer() {
  $('.followingUser').hide();
  $('.notfollowingUser').show();
}


function notificationActive(_this) {

  $('.filter-button').removeClass('active');

  _this.addClass('active');
}

// Add active class to the current button (highlight it)

