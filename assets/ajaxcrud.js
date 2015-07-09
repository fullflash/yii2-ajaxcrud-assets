/*!
 * Ajax Crud 
 * =================================
 * Use for johnitvn/yii2-ajaxcrud extension
 * @author John Martin john.itvn@gmail.com
 */

modal = new ModalRemote('#ajaxCrubModal');

$(document).on('click','[role="modal-remote"]',function(event){
	if(event.preventDefault){
        event.preventDefault(); // () was missing here
    }
    if (event.stopPropagation) {
        event.stopPropagation();
    }
	modal.remote(this,function(){
		$.pjax.reload({container:'#crud-datatable-pjax'});
	});	
});