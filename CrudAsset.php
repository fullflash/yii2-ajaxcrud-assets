<?php
namespace johnitvn\ajaxcrudassets;

use yii\web\AssetBundle;

/**
 * @author John Martin <john.itvn@gmail.com>
 * @since 1.0
 */
class CrudAsset extends AssetBundle
{
    public $sourcePath = '@vendor/fullflash/yii2-ajaxcrud-assets/assets';

    // public $publishOptions = [
    //     'forceCopy' => true,
    // ];
    
    public $css = [
        'ajaxcrud.css'
    ];
    public $js = [
        //'ModalRemote.js',
        //'ajaxcrud.js',
        'ModalRemote.min.js',
        'ajaxcrud.min.js',

    ];
    public $depends = [
        'yii\web\YiiAsset',
        'yii\bootstrap\BootstrapAsset',
        'yii\bootstrap\BootstrapPluginAsset',
        'kartik\grid\GridViewAsset',
    ];

}
