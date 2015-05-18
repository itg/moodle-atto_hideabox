YUI.add("moodle-atto_hideabox-button",function(e,t){var n="atto_hideabox",r="hideabox_headline",i="hideabox_content",s="atto_hideabox",o={INPUTSUBMIT:"atto_media_urlentrysubmit",INPUTCANCEL:"atto_media_urlentrycancel",HEADLINE:"headline",CONTENT:"content"},u={HEADLINE:".headline",CONTENT:".content"},a='<form class="atto_form"><div id="{{elementid}}_{{innerform}}"><label for="{{elementid}}_{{HEADLINE}}">{{get_string "headline" component}}</label><input class="{{component}}_{{CSS.HEADLINE}} {{CSS.HEADLINE}} fullwidth" id="{{elementid}}_{{HEADLINE}}"  name="{{elementid}}_{{HEADLINE}}" type="text" value="{{defaultflavor}}" /><label for="{{elementid}}_{{CONTENT}}">{{get_string "content" component}}</label><textarea class="{{component}}_{{CSS.CONTENT}} {{CSS.CONTENT}} fullwidth" style="height: 10em;" id="{{elementid}}_{{CONTENT}}"  name="{{elementid}}_{{CONTENT}}"></textarea><div class="mdl-align"><button type="submit" class="{{CSS.INPUTSUBMIT}}">{{get_string "insert" component}}</button></div><p>This will insert hidden content that can be revealed by clicking on a link.<br /><em>You cannot edit an existing hideabox, only insert new ones!</em><br /><em>Content entered here will be rendered exactly as shown (no HTML here)!</em></p></div></form>',f='<div class="hideabox" id="{{elementid}}_{{component}}"><a class="toggle">{{htext}}</a><div class="boxhidden">{{ctext}}</div></div>';e.namespace("M.atto_hideabox").Button=e.Base.create("button",e.M.editor_atto.EditorPlugin,[],{initializer:function(){if(this.get("disabled"))return;this.addButton({icon:"icon",iconComponent:"atto_hideabox",callback:this._displayDialogue})},_getFlavorControlName:function(){return this.get("host").get("elementid")+"_"+FLAVORCONTROL},_displayDialogue:function(t){t.preventDefault();var r=500,i=this.getDialogue({headerContent:M.util.get_string("dialogtitle",n),width:r+"px"});i.width!==r+"px"&&i.set("width",r+"px");var s=this._getFormContent(),o=e.Node.create("<div></div>");o.append(s),i.set("bodyContent",o),i.show(),this.markUpdated()},_getFormContent:function(){var t=e.Handlebars.compile(a),s=e.Node.create(t({elementid:this.get("host").get("elementid"),CSS:o,HEADLINE:r,CONTENT:i,component:n,defaultflavor:this.get("defaultflavor")}));return this._form=s,this._form.one("."+o.INPUTSUBMIT).on("click",this._doInsert,this),s},_doInsert:function(t){t.preventDefault(),this.getDialogue({focusAfterHide:null}).hide();var s=this._form.one(u.HEADLINE),o=this._form.one(u.CONTENT);if(!o.get("value"))return;this.editor.focus();var a=e.Handlebars.compile(f),l=a({elementid:this.get("host").get("elementid"),HEADLINE:r,CONTENT:i,component:n,htext:s.get("value"),ctext:o.get("value")});this.get("host").insertContentAtFocusPoint(l),this.markUpdated()}},{ATTRS:{disabled:{value:!1},usercontextid:{value:null},defaultflavor:{value:""}}})},"@VERSION@",{requires:["moodle-editor_atto-plugin"]});
