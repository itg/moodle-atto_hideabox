YUI.add('moodle-atto_hideabox-button', function (Y, NAME) {

// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/*
 * @package    atto_hideabox
 * @copyright  COPYRIGHTINFO
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * @module moodle-atto_hideabox-button
 */

/**
 * Atto text editor hideabox plugin.
 *
 * @namespace M.atto_hideabox
 * @class button
 * @extends M.editor_atto.EditorPlugin
 */

var COMPONENTNAME = 'atto_hideabox';
var HEADLINE = 'hideabox_headline';
var CONTENT = 'hideabox_content';
var LOGNAME = 'atto_hideabox';

var CSS = {
        INPUTSUBMIT: 'atto_media_urlentrysubmit',
        INPUTCANCEL: 'atto_media_urlentrycancel',
        HEADLINE:    'headline',
        CONTENT:     'content'
    },
    SELECTORS = {
        HEADLINE:   '.headline',
        CONTENT:    '.content'
    };

var TEMPLATE = '' +
    '<form class="atto_form">' +
        '<div id="{{elementid}}_{{innerform}}" class="mdl-align">' +
            '<label for="{{elementid}}_{{HEADLINE}}">{{get_string "headline" component}}</label>' +
            '<input class="{{CSS.HEADLINE}}" id="{{elementid}}_{{HEADLINE}}" name="{{elementid}}_{{HEADLINE}}" value="{{defaultflavor}}" />' +
            '<label for="{{elementid}}_{{CONTENT}}">{{get_string "content" component}}</label>' +
            '<input class="{{CSS.CONTENT}}" id="{{elementid}}_{{CONTENT}}" name="{{elementid}}_{{CONTENT}}" value="" />' +
            '<div class="mdl-align">' +
                '<button type="submit" class="{{CSS.INPUTSUBMIT}}">{{get_string "insert" component}}</button>' +
            '</div>' +
        '</div>' +
    '</form>';

var HTML_TEMPLATE = '' +
    '<div class="hideabox" id="{{elementid}}_{{component}}">' +
        '<a class="toggle">{{htext}}</a>' +
        '<div class="boxhidden">{{ctext}}</div>' +
    '</div>';

Y.namespace('M.atto_hideabox').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {

  
	/**
     * Initialize the button
     *
     * @method Initializer
     */
    initializer: function() {
        // If we don't have the capability to view then give up.
        if (this.get('disabled')){
            return;
        }

        this.addButton({
            icon: 'icon',
            iconComponent: 'atto_hideabox',
            callback: this._displayDialogue
        });

    },

    /**
     * Get the id of the flavor control where we store the ice cream flavor
     *
     * @method _getFlavorControlName
     * @return {String} the name/id of the flavor form field
     * @private
     */
    _getFlavorControlName: function(){
        return(this.get('host').get('elementid') + '_' + FLAVORCONTROL);
    },

     /**
     * Display the hideabox Dialogue
     *
     * @method _displayDialogue
     * @private
     */
    _displayDialogue: function(e) {
        e.preventDefault();
        var width=500;


        var dialogue = this.getDialogue({
            headerContent: M.util.get_string('dialogtitle', COMPONENTNAME),
            width: width + 'px'
        });
		//dialog doesn't detect changes in width without this
		//if you reuse the dialog, this seems necessary
        if(dialogue.width !== width + 'px'){
            dialogue.set('width',width+'px');
        }

        //append buttons to iframe
        var buttonform = this._getFormContent();

        var bodycontent =  Y.Node.create('<div></div>');
        bodycontent.append(buttonform);

        //set to bodycontent
        dialogue.set('bodyContent', bodycontent);
        dialogue.show();
        this.markUpdated();
    },


     /**
     * Return the dialogue content for the tool, attaching any required
     * events.
     *
     * @method _getDialogueContent
     * @return {Node} The content to place in the dialogue.
     * @private
     */
    _getFormContent: function() {
        var template = Y.Handlebars.compile(TEMPLATE),
            content = Y.Node.create(template({
                elementid: this.get('host').get('elementid'),
                CSS: CSS,
                HEADLINE: HEADLINE,
                CONTENT: CONTENT,
                component: COMPONENTNAME,
                defaultflavor: this.get('defaultflavor')
            }));

        this._form = content;
        this._form.one('.' + CSS.INPUTSUBMIT).on('click', this._doInsert, this);
        return content;
    },

    /**
     * Inserts the users input onto the page
     * @method _getDialogueContent
     * @private
     */
    _doInsert : function(e){
        e.preventDefault();
        this.getDialogue({
            focusAfterHide: null
        }).hide();

        var htext = this._form.one(SELECTORS.HEADLINE);
        var ctext  = this._form.one(SELECTORS.CONTENT);

        // If there is no content to, don't.
        if (!ctext.get('value')){
            return;
        }

        this.editor.focus();
        var template = Y.Handlebars.compile(HTML_TEMPLATE);
        var content = template({
                elementid: this.get('host').get('elementid'),
                HEADLINE: HEADLINE,
                CONTENT: CONTENT,
                component: COMPONENTNAME,
                htext: htext.get('value'),
                ctext: ctext.get('value')
            });


        this.get('host').insertContentAtFocusPoint(content);
        this.markUpdated();

    }
}, { ATTRS: {
		disabled: {
			value: false
		},

		usercontextid: {
			value: null
		},

		defaultflavor: {
			value: ''
		}
	}
});


}, '@VERSION@', {"requires": ["moodle-editor_atto-plugin"]});
