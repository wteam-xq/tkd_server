// jquery 官网插件开发： http://learn.jquery.com/plugins/basic-plugin-creation/
// jquery 插件开发经典文章： http://www.cnblogs.com/xcj26/p/3345556.html
$(function(){
	/* jquery 静态方法（插件开发）*/
	var $body = $('body');
	// 1. 弹层复用控件, 
	// opt.text: 提示内容； 
	// opt.id: 弹出提示框ID； 
	// opt.title: 提示框标题； 
	// opt.confirmCb: 点击确定回调函数； 
	// opt.cancelCb: 点击取消回调函数;（如果存在该回调函数，“取消”按钮“data-dismiss='modal'”去除掉）
	$.extend({ confirmModal: function(opt){
			var panelHtmlStr = '<html><head></head><body><div id="mId" class="modal"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" data-dismiss="modal" class="close"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title">弹层标题</h4></div><div class="modal-body"><input type="text" id="modal_val" placeholder="请输入新势力名称" class="form-control"></div><div class="modal-footer"><button type="button" data-dismiss="modal" class="cancle btn btn-default">关闭</button><button type="button" class="confirm btn btn-primary">确定</button></div></div></div></div></body></html>';
			var $confirmModal = $body.find('#' + opt.id);
			if ( $confirmModal.length > 0 ){
				$confirmModal.remove();
				// return false;
			}
			$confirmModal = $(panelHtmlStr);
			$confirmModal.attr('id', opt.id);
			$confirmModal.find('.modal-title').html(opt.title);
			if (opt.text){
				$confirmModal.find('#modal_val').val(opt.text);
			}
			$body.append($confirmModal);
			$confirmModal.modal({backdrop:'static'});
			if (opt.confirmCb){
				$confirmModal.find('.confirm').on('click', function(){
					opt.confirmCb($confirmModal);
				});
			}
		}
	});	
});