# TinyMCE Ace Editor Plugin
Ace Editor plugin for TinyMCE 4.0

How to use:

* Install and load [Ace Editor](https://github.com/ajaxorg/ace-builds/)
* Minify `ace/plugin.js` to `ace/plugin.min.js`
* Copy ace (or ace_beautify) folder to TinyMCE plugins
* Add to list of plugins where tinymce is called

Example usage:

```javascript
tinymce.init({
    selector: "textarea",
    plugins: [
        "advlist autolink lists link image charmap print preview anchor",
        "searchreplace visualblocks code fullscreen",
        "insertdatetime media table contextmenu paste code ace"
    ],
    toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image ace"
});
```
