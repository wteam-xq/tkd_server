$(function(){
  var $main_nav = $('#main-nav'),
      $li_list = $main_nav.find('li');
  var pathname = location.pathname;

  $li_list.each(function(i){
    var $this = $(this);
    var _adminType = $this.find('a').attr('data-id'),
        _pathname = '';
    _pathname = pathname.split('/')[2];
    if (_adminType == _pathname){
      $this.addClass('active');
      return false;
    }
  });

  $li_list.on('click', function(){
    var $this = $(this);
    $main_nav.find('li').removeClass('active');
    $this.addClass('active');
  });

});