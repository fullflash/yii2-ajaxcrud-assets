/*!
 * Ajax Crud Modal
 * =================================
 * Use for johnitvn/yii2-ajaxcrud extension
 * @author John Martin john.itvn@gmail.com
 */
(function( $ ) {
	$.fn.hasAttr = function(name) {  
	            return this.attr(name) !== undefined;
	};
}( jQuery ));

function ModalRemote(modalId){

	this.modal = $(modalId);

	this.header = $(modalId).find('.modal-header');

	this.content = $(modalId).find('.modal-body');

	this.footer = $(modalId).find('.modal-footer');

	/**
	* Show the modal
	*/
	this.show = function(){	
		this.clear();
		$(this.modal).modal('show');
	}

	/**
	* Hide the modal
	*/
	this.hide = function(){
		$(this.modal).modal('hide');
	}

	/**
	* Toogle show/hide modal
	*/
	this.toggle = function(){
		$(this.modal).modal('toggle');
	}

	/**
	* Clear modal
	*/
	this.clear = function(){
		$(this.modal).find('.modal-title').remove();
		$(this.content).html("");
		$(this.footer).html("");
	}


	/**
	* Set modal header
	* @param string content The content of modal header
	*/
	this.setHeader = function(content){
		$(this.header).html(content);
	}

	/**
	* Set modal content
	* @param string content The content of modal content
	*/
	this.setContent = function(content){
		$(this.content).html(content);
	}

	/**
	* Set modal footer
	* @param string content The content of modal footer
	*/
	this.setFooter = function(content){
		$(this.footer).html(content);
	}

	/**
	* Set modal footer
	* @param string title The title of modal
	*/
	this.setTitle = function(title){
		// remove old title
		$(this.header).find('h4.modal-title').remove();
		// add new title
		$(this.header).append('<h4 class="modal-title">'+title+'</h4>');
	}

	/**
	* Hiden close button
	*/
	this.hidenCloseButton = function(){
		$(this.header).find('button.close').hide();
	}

	/**
	* Show close button
	*/
	this.showCloseButton = function(){
		$(this.header).find('button.close').show();
	}

	/**
	* Add Button 
	* @param string label The label of button
	* @param string classes The class of button
	* @param callable callback the callback when button click
	*/
	this.addButton = function(label,classes,callback){
		buttonElm = document.createElement('button');
        buttonElm.setAttribute('class', classes===null?'btn btn-primary':classes);
        buttonElm.innerHTML = label;

		$(this.footer).append(buttonElm);
		if(callback!==null){
			$(buttonElm).click(callback);
		}
	}

	/**
	* Show loading state in modal
	*/
	this.displayLoading = function(){
		this.setContent('<div class="progress progress-striped active" style="margin-bottom:0;"><div class="progress-bar" style="width: 100%"></div></div>');
		this.setTitle('Loading');
	}

	/**
	* Show the confirm dialog 
	* @param string title The title of modal
	* @param string message The message for ask user
	* @param string okLabel The label of ok button
	* @param string cancelLabel The class of cancel button
	* @param callable okCallback the callback when user cancel confirm
	* @param callable cancelCallback the callback when user accept confirm
	*/
	this.confirm = function(title,message,okLabel,cancelLabel,okCallback,cancelCallback){		
		if(title!==undefined){
			this.setTitle(title);
		}
		if(message!==undefined){
			this.setContent(message);
		}
		this.addButton(okLabel===undefined?"OK":okLabel,'btn btn-primary',okCallback);
		this.addButton(cancelLabel===undefined?"Cancel":cancelLabel,'btn btn-default pull-left',cancelCallback);
	}

	/**
	* Auto load content from a tag
	* Attribute to use for blind 
	* 	- href/data-url(If not set href will get data-url)
	* 	- data-request-method
	*   - data-comfirm-ok
	*   - data-confirm-cancel
	*   - data-confirm-title
	*	- data-confirm-message
	* Response json field
	*	- error
	*	- title
	*   - content
	*   - footer
	*/
	this.remote = function(elm,callback){
		if($(elm).hasAttr('data-confirm-title')||$(elm).hasAttr('data-confirm-message')){
			this.show();
			var instance = this;
			this.confirm(
				$(elm).attr('data-confirm-title'),
				$(elm).attr('data-confirm-message'),
				$(elm).attr('data-comfirm-ok'),
				$(elm).attr('data-comfirm-cancel'),
				function(e){
					doRemote(instance,elm,callback);
				},
				function(e){
					this.hide();
				}
			)
		}else{
			doRemote(this,elm);
		}
	}

	function doRemote(modalRemote,elm,callback){
		var url = $(elm).hasAttr('href')?$(elm).attr('href'):$(elm).attr('data-url');
		var method = $(elm).hasAttr('data-request-method')?$(elm).attr('data-request-method'):'GET';

		$.ajax({
			url:url,
			method:method,
			beforeSend:function(){
				modalRemote.show();
				modalRemote.displayLoading();
			},
			error:function(response){
				modalRemote.setTitle(response.status + response.statusText);
				modalRemote.setContent(response.responseText);
				modalRemote.addButton('Close','btn btn-default',function(){
					modalRemote.close();
				})					
			},
			success:function(response){		
				if(response.forceReload){
					$.pjax.reload({container:'#crud-datatable-pjax'});
				}

				if(response.forceClose){
					modalRemote.hide();					
				}
				console.log(response.error !== undefined);
				console.log( response.error !== false);
				if(response.error !== undefined && response.error === false){
					modalRemote.setTitle(response.title);
					modalRemote.setContent(response.content);
					modalRemote.setFooter(response.footer);
				}				
			}
		});
	}

}