$(function(){
  var $main_nav = $('#main-nav');
  var $li_list = $main_nav.find('li');

  var _href = location.href;
  var _host = location.host;
  var _url = _href.split(_host)[1];

  $li_list.each(function(i){
    var $this = $(this);
    var _href = $this.find('a').attr('href');
    if (_url == _href){
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