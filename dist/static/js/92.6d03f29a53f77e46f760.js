webpackJsonp([92],{ZOtE:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("etTB"),l=i.n(a),r=i("Tr1n"),s={components:{VuePerfectScrollbar:l.a},props:{mailType:{type:String,default:"All"}},data:function(){return{selected:[2],mailActions:[{href:"#",title:"Delete",click:function(t){console.log(t)}},{href:"Mark as read",title:"Mark as read",click:function(t){console.log(t)}},{href:"Spam",title:"Spam",click:function(t){console.log(t)}}]}},computed:{mails:function(){return Object(r.d)(this.$route.params.mailType)}},created:function(){var t=this;this.$on("MAIL_REPLY_DIALOG_CLOSE",function(){t.replayDialog=!1}),window.AppMail=this},methods:{computeMailPath:function(t){return{path:"/mail/0/"+t}},formatDate:function(t){return new Date(t).toLocaleString()},toggle:function(t){var e=this.selected.indexOf(t);e>-1?this.selected.splice(e,1):this.selected.push(t)}}},n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-container",{staticClass:"pa-0 mail-list",attrs:{fluid:"","fill-height":"",id:"mailList"}},[i("v-layout",{staticClass:"mail-list--layout",attrs:{column:""}},[i("v-toolbar",{staticClass:"elevation-1 mail-list--toolbar",attrs:{fixed:"",app:""}},[i("v-checkbox",{staticClass:"check-all",attrs:{row:"","hide-details":""}}),t._v(" "),i("v-menu",{attrs:{"offset-y":"",origin:"center center","nudge-bottom":0,transition:"scale-transition"}},[i("v-btn",{attrs:{slot:"activator",icon:"",large:"",flat:""},slot:"activator"},[i("v-avatar",{attrs:{size:"32px"}},[i("v-icon",[t._v("arrow_drop_down")])],1)],1),t._v(" "),i("v-list",{staticClass:"pa-0"},t._l(t.mailActions,function(e,a){return i("v-list-tile",{key:a,attrs:{to:e.href?null:{name:e.name},href:e.href,ripple:"ripple",disabled:e.disabled,target:e.target,rel:"noopener"},on:{click:e.click}},[e.icon?i("v-list-tile-action",[i("v-icon",[t._v(t._s(e.icon))])],1):t._e(),t._v(" "),i("v-list-tile-content",[i("v-list-tile-title",[t._v(t._s(e.title))])],1)],1)}))],1),t._v(" "),i("v-spacer"),t._v(" "),i("v-btn",{attrs:{icon:"",flat:""}},[i("v-icon",[t._v("refresh")])],1),t._v(" "),i("v-btn",{attrs:{icon:"",flat:""}},[i("v-icon",[t._v("keyboard_arrow_left")])],1),t._v(" "),i("v-btn",{attrs:{icon:"",flat:""}},[i("v-icon",[t._v("keyboard_arrow_right")])],1)],1),t._v(" "),i("vue-perfect-scrollbar",{staticClass:"mail-list--scrollbar"},[i("v-flex",{staticClass:"mail-content white"},[i("v-tabs",{attrs:{"fixed-tabs":"",grow:""}},[i("v-tab",[t._v("\n            Primary\n          ")]),t._v(" "),i("v-tab",[t._v("\n            Social\n          ")]),t._v(" "),i("v-tab",[t._v("\n            Promotions\n          ")])],1),t._v(" "),i("v-list",{staticClass:"mail-list--list",attrs:{"two-line":""}},[t._l(t.mails,function(e,a){return[i("v-list-tile",{key:a,attrs:{avatar:"",ripple:"",to:t.computeMailPath(e.uuid)}},[i("v-list-tile-action",[i("v-checkbox")],1),t._v(" "),i("v-list-tile-avatar",[i("img",{attrs:{src:e.from.avatar}})]),t._v(" "),i("v-list-tile-content",[i("v-list-tile-title",[t._v(t._s(e.from.name))]),t._v(" "),i("v-list-tile-sub-title",[t._v(t._s(e.title))])],1),t._v(" "),i("v-list-tile-action",[i("v-list-tile-action-text",[t._v(t._s(t.formatDate(e.created_at)))]),t._v(" "),t.selected.indexOf(a)<0?i("v-icon",{attrs:{color:"grey lighten-1"},on:{click:function(e){t.toggle(a)}}},[t._v("star_border")]):i("v-icon",{attrs:{color:"yellow darken-2"}},[t._v("star")])],1)],1),t._v(" "),i("v-divider",{key:"divider"+a})]})],2)],1)],1)],1)],1)},staticRenderFns:[]},o=i("VU/8")(s,n,!1,null,null,null);e.default=o.exports}});
//# sourceMappingURL=92.6d03f29a53f77e46f760.js.map