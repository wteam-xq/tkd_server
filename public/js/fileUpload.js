/*
 * author: wteam-xq 
 * date: 2015-12-19
 * jquery.fileupload.js 库公共处理类，依赖的fileupload库 只支持主流浏览器， 不支持IE9（包括IE9）以下浏览器
 * 本脚本严重依赖对应html dom 节点；（后期改成自动生成dom节点形式）
 */

var fileUploadUtil = {};

// file-upload控件事件
function fileUploadInit($file_dom){
    var $upload_tips = null,
        $upload_pro = null;

    // 文件点击事件
    $file_dom.on('click', function(){
      var $this = $(this),
          $parnet_grounp = $this.parents('.form-group');

      $upload_tips = $parnet_grounp.find('.upload-tips');
      $upload_pro = $parnet_grounp.find('.upload-pro');
      $upload_tips.empty().hide();
      $upload_pro.hide();
      $upload_pro.find('.progress-bar').css('width', '0%').html('');
    });
    // 上传图标 代码
    $file_dom.fileupload({
      url: '/admin/upload/ico',
      dataType: 'json',
      //autoUpload: false,
      //acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
      maxFileSize: 5000000, // 5 MB
      // Enable image resizing, except for Android and Opera,
      // which actually support image resizing, but fail to
      // send Blob objects via XHR requests:
      disableImageResize: /Android(?!.*Chrome)|Opera/
          .test(window.navigator.userAgent),
      previewMaxWidth: 100,
      previewMaxHeight: 100,
      previewCrop: true
    }).on('fileuploadadd', function (e, data) {
        // 显示上传图片的文件名
        $upload_tips.show();
        data.context = $('<div/>').appendTo($upload_tips);
        $.each(data.files, function (index, file) {
            var node = $('<p/>').append($('<span/>').text(file.name));
            node.appendTo(data.context);
        });
    }).on('fileuploadprocessalways', function (e, data) {
      var index = data.index,
          file = data.files[index],
          node = $(data.context.children()[index]);
      if (file.preview) {
        node.prepend('<br>').prepend(file.preview);
      }
      if (file.error) {
        node.append('<br>').append($('<span class="text-danger"/>').text(file.error));
      }
      if (index + 1 === data.files.length) {
        data.context.find('button').text('Upload').prop('disabled', !!data.files.error);
      }
    }).on('fileuploadprogressall', function (e, data) {
        // 文件上传完成后， 前端进度条样式改变
        $upload_pro.show();
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $upload_pro.find('.progress-bar').css(
            'width',
            progress + '%'
        );
        $upload_pro.find('.progress-bar').html(progress + '%');
    }).on('fileuploaddone', function (e, data) {
      // 文件上传完成
      $.each(data.result.files, function (index, file) {
          if (file.url) {
            // 保存图片路径
            $upload_tips.parent().prev('div.prelative').find('input.icoPath').val(file.url);
            // 保存图片名字
            $upload_tips.next('input.icoName').val($upload_tips.text());
          } else if (file.error) {
            $upload_tips.append('<span class="red">' + file.error + '<span/>');
          }
      });
    }).on('fileuploadfail', function (e, data) {
      $.each(data.files, function (index, file) {
        var error = $('<span class="text-danger"/>').text('File upload failed.');
        $(data.context.children()[index]).append('<br>').append(error);
      });
    }); 
}

fileUploadUtil.fileUploadInit = fileUploadInit;