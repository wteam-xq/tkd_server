$(function(){
	/* 通用模块：*/
	var $body = $("body");
	var CommonObj = null;
	CommonObj = {
		// 1. 弹层复用控件, 
		// opt.text: 提示内容； 
		// opt.id: 弹出提示框ID； 
		// opt.title: 提示框标题； 
		// opt.confirmCb: 点击确定回调函数； 
		// opt.cancelCb: 点击取消回调函数;
		confirmModal: function(opt){
			var panelHtmlStr = '<div id="mId" class="modal"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" data-dismiss="modal" class="close"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button><h4 class="modal-title">弹层标题</h4></div><div class="modal-body"><p class="modal-text">弹层文本</p></div><div class="modal-footer"><button type="button" data-dismiss="modal" class="cancel" class="btn btn-default">关闭</button><button type="button" class="confirm btn btn-primary">确定</button></div></div></div></div>';
			var $confirmModal = $body.find('#' + opt.id);
			if ( $confirmModal.length > 0 ){
				$confirmModal.modal({backdrop:'static'});
				return false;
			}
			$confirmModal = $(panelHtmlStr);
			$confirmModal.attr('id', opt.id);
			$confirmModal.find('.modal-title').html(opt.title);
			$confirmModal.find('.modal-text').html(opt.text);
			$body.append($confirmModal);
			$confirmModal.modal({backdrop:'static'});
		}
	};
	
});