/*
 * Ace Editor Plugin for TinyMCE 4.0
 * By Daniel Jones - info@d-k-j.com
 * https://github.com/tradesman/tinymce-ace-plugin
 *
 * Minor edits by Recras - devs@recras.nl
 */

tinymce.PluginManager.add("ace", function(editor) {
	function aceEditor() {
		var innerWidth = $(window).innerWidth() - 30,
			innerHeight = $(window).innerHeight() - 120;
		innerWidth > 1800 && (innerWidth = 1800), innerHeight > 1200 && (innerHeight = 1200);

		var x = (innerWidth - 20) % 138;

		if (innerWidth = innerWidth - x + 10, innerWidth > 600) {
			var x = (innerWidth - 20) % 138;
			innerWidth = innerWidth - x + 10
		}

		editor.windowManager.open({
			title: "Source code",
			type: "container",
			id: "mce-ace-editor",
			name: "ace",
			width: innerWidth,
			height: innerHeight,
			inline: 1,
			buttons:[
				{
					text: "Ok",
					classes: "primary",
					onclick : function() {
						if(typeof mce_editor !== "undefined") {
							var html = mce_editor.getValue();

							editor.focus(), editor.undoManager.transact(function() {
								editor.setContent(html)
							}), editor.selection.setCursorLocation(), editor.nodeChanged();

							editor.windowManager.close();
						}
					}
				},
				{
					text: "Cancel",
					onclick: "close"
				}
			]
		});

		if($('#mce-ace-editor-body').length) {
			$('#mce-ace-editor-body').append('<div id="mce-ace-editor-block"></div>');

			// Load editor
			$('#mce-ace-editor-block').css({'position':'absolute', 'left':'0', 'right':'0', 'top':'0', 'bottom':'0'});

			var mce_editor = ace.edit('mce-ace-editor-block');
			mce_editor.getSession().setMode("ace/mode/html");
			mce_editor.setOptions({
				showPrintMargin: false
			});
			mce_editor.getSession().setUseWrapMode(true);

			// Set editor contents
			mce_editor.getSession().setValue(editor.getContent({
				source_view: !0
			}));
		}

		// Only thing needed to get Ace to work is to remove the mce-container class
		// Tinymce re-adds the class so we need to loop it
		// TODO: Find a less HORRIFIC solution for this
		var countchecks = 0;

		function soddoffmce() {
			// Lets do it say 50 times (for 5 seconds)...
			if(countchecks++ == 50) {
				clearTimeout(soddoffloop);
				return;
			}

			soddoffloop = setTimeout(function () {
				if($('#mce-ace-editor').hasClass('mce-container')) $('#mce-ace-editor').removeClass('mce-container');
				soddoffmce();
			}, 100);
		}

		soddoffmce();
	}

	editor.addCommand("mceace_codeEditor", aceEditor), editor.addButton("ace", {
		icon: "code",
		tooltip: "Source code",
		onclick: aceEditor
	}), editor.addMenuItem("ace", {
		icon: "code",
		text: "Source code",
		context: "tools",
		onclick: aceEditor
	})
});
