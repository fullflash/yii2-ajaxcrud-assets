<?php
namespace johnitvn\ajaxcrudassets;

use yii\web\AssetBundle;

/**
 * @author John Martin <john.itvn@gmail.com>
 * @since 1.0
 */
class CrudAsset extends AssetBundle
{
    public $sourcePath = '@vendor/johnitvn/yii2-ajaxcrud-assets/assets';
    public $publishOptions = [
        'forceCopy' => true,
    ];
    public $css = [
    ];
    public $js = [
        'jquery.fullscreen.js',
        'ajaxcrud.js',
        // 'jquery.fullscreen.min.js',
        // 'ajaxcrud.min.js',

    ];
    public $depends = [
        'yii\web\YiiAsset',
        'yii\bootstrap\BootstrapAsset',
        'kartik\grid\GridViewAsset',
    ];

}
