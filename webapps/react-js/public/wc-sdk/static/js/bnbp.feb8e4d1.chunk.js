"use strict";(self.webpackChunkmeraki=self.webpackChunkmeraki||[]).push([[338],{9033:function(e,t,a){a.r(t),a.d(t,{default:function(){return O}});var i=a(15671),r=a(43144),o=a(60136),n=a(98557),s=a(47313),l=a(1084),c=a(63669),d=a(29439),u=a(56955),p=a(16404),b=a(69140),h=a(19615),f=a(26915),j=a(62791),m=a(21629),g=a(76720),v=a(83450),P=a(61939),x=a(11698),D="UPDATE_DYNAMIC_LAYOUT_DATE_CURRENT_MONTH",y="UPDATE_DYNAMIC_LAYOUT_DAYS_LEFT";var N=a(46417),C=(0,f.ZL)()((function(e,t){return{tooltipText:{color:"rgb(var(--".concat(t.tooltipTextColor||"foreground_500","))")}}}));function T(e){var t=null,a=s.useState(null),i=(0,d.Z)(a,2),r=i[0],o=i[1],n=s.useState(!1),c=(0,d.Z)(n,2),f=c[0],T=c[1],I=(0,g.WS)(),_=(0,s.useContext)(P.R),E=_.widgetConfigs,L=_.widgetStrings,O=(0,s.useRef)(null),k=(0,s.useRef)(null),w=(0,s.useRef)(null),R=C(E).classes,U=function(){j.bs.broadcast(j.FP.POPUP_CLOSED,{widgetId:m.Z$.BILL_PROJECTION}),o(null),k.current&&k.current.focus()};(0,s.useEffect)((function(){if((0,u.IR)()){if(O.current&&O.current.offsetParent&&-1===Number(O.current.offsetParent.getAttribute("tabindex"))){var e=O.current.offsetParent;e.setAttribute("tabindex",""),e.setAttribute("role","dialog"),e.setAttribute("aria-modal","true"),O.current.focus()}if(r&&O.current){var a=Array.from(O.current.offsetParent.querySelectorAll(p.bTR));(t=a[0]).focus()}}}),[O.current,Boolean(r)]);var A=Boolean(r),B=A?"simple-popover":void 0,S=e.billProjectionData&&Boolean(e.billProjectionData.adjustedProjectionPrice),F=S?Number(e.billProjectionData.adjustedProjectionPrice):0,Z=e.billProjectionData?Number(e.billProjectionData.projectionPrice):0,M=S&&Z>F?Z-F:0,H=e.billProjectionData&&e.billProjectionData.tips?e.billProjectionData.tips:[],W=E.displayType,Y=h.V.getColors().colors,J=e.session.userProfile.fuelType,$=W===p.AgQ.COST,z=e.billProjectionData?$?e.billProjectionData.currentPrice||0:e.billProjectionData.currentConsumption||0:0,K=e.billProjectionData?$?e.billProjectionData.projectionPrice||0:e.billProjectionData.projectionConsumption||0:0;(0,s.useEffect)((function(){console.log(w),T(!V&&w.current.clientWidth>600)}),[w]);var V=e.responsiveness.isMobileView,q=V?65:f?88:75,G=V?15:f?6:12.5,Q=z&&K?z/K*100:0;Q<=G&&(Q=G);var X=S?F/Z*100:0;Q>=95&&(S=!1),Q<95&&X>97&&(X=97);var ee,te,ae,ie,re=$?(0,u.xB)({cost:z,round:!0,showCurrency:!0}):(0,u.ub)({usage:z,round:!0,showUsageUnit:!0,fuelType:J}),oe=$?(0,u.xB)({cost:K,round:!0,showCurrency:!0}):(0,u.ub)({usage:K,round:!0,showUsageUnit:!0,fuelType:J}),ne=(0,u.xB)({cost:M,round:!0,showCurrency:!0}),se=I.runMode===p.K8z,le=E.ctaNavUrl,ce=!e.isTouWebEnabled&&(!se||se&&le),de=e.billProjectionData&&e.billProjectionData.billStartDateFormatted&&e.billProjectionData.billEndDateFormatted,ue=L.tooltip,pe=L.tooltipHeader,be=(0,l.I0)();if(de){var he=e.billProjectionData.billStartDateFormatted,fe=e.billProjectionData.billEndDateFormatted,je=p.ZFD.YEAR_MONTH_DAY,me=V?p.ZFD.MONTH_IN_WORDS_SPACE_DAY_COMMA_YEAR:E.dateFormatYear,ge=E.dateFormatProjectionBar;ee=(0,x.p6)(he,ge,je),te=(0,x.p6)(fe,ge,je),ae=(0,x.p6)(he,me,je),ie=(0,x.p6)(fe,me,je),e.dynamicLayout&&be({type:D,payload:{date:"".concat(ae," - ").concat(ie)}})}e.dynamicLayout&&e.billProjectionData&&e.billProjectionData.daysLeft>=0&&be({type:y,payload:{daysLeft:"".concat(e.billProjectionData.daysLeft," ").concat(L.daysLeft)}});var ve={start_date:ee,end_date:te,proj_usage:oe,curr_usage:re},Pe=(0,u.Z7)(L.usageAccessibilityLabel,ve),xe=h.V.getConfiguration(),De=(0,N.jsxs)("div",{className:"ticker"+(S?"":" zero"),style:{"--ticker_point":"calc("+X+"% - 10px)","--ticker_content":S?"'":"none"},children:[(0,N.jsx)("div",{className:"header",children:S?(0,u.Z7)(e.translations["HOME.BILL_PROJECTION.REDUCE_BILL_UPTO"],{reducedPrice:ne}):e.translations["HOME.BILL_PROJECTION.REDUCE_BILL"]}),(0,N.jsx)("ul",{children:H.map((function(e,t){return(0,N.jsx)("li",{children:e},t)}))})]});return(0,N.jsxs)(N.Fragment,{children:[!e.hideHeader&&(0,N.jsxs)("div",{className:"".concat(se?"widget-header-cont ".concat((0,u.jP)()?"no-bg":""):"header-container"),children:[(0,N.jsx)("div",{className:"header-title",children:(0,N.jsx)("span",{id:"bp-v2-title",role:"heading","aria-level":2,"data-widget-name":p.wY4.HOME.BILL_PROJECTION,"data-text-color":"foreground_500",className:"summary-title-main",children:e.headerTitle})}),(0,N.jsx)("div",{className:"bp-tooltip ".concat(R.tooltipText),children:(0,N.jsx)("button",{ref:k,tabIndex:0,"aria-label":ue,role:"button",className:"tooltip bidgely-icon-faq","aria-describedby":B,onClick:function(e){e.stopPropagation(),j.bs.broadcast(j.FP.POPUP_OPENED,{widgetId:m.Z$.BILL_PROJECTION}),j.bs.subscribe(j.FP.CLOSE_POPUP,U),o(e.target)}})})]}),(0,N.jsxs)("div",{className:"bill-projection-v2",ref:w,children:[(0,N.jsxs)("div",{className:"bill-projection-content",children:[!e.dynamicLayout&&(0,N.jsxs)("div",{className:"bill-period-details",children:[(0,N.jsx)("span",{className:"bill-period-container","data-widget-name":e.widgetName,"data-text-color":"foreground_300",children:de&&(0,N.jsxs)(N.Fragment,{children:[ae," - ",ie]})}),(0,N.jsxs)("span",{"data-widget-name":e.widgetName,"data-text-color":"foreground_300",children:[L.daysLeft," :",(0,N.jsxs)("span",{className:"days",children:[" ",e.billProjectionData?e.billProjectionData.daysLeft:0]})]})]}),A&&(0,N.jsxs)("div",{className:"bill-projection-dialog","aria-labelledby":"dialog-header",children:[(0,N.jsx)("div",{onKeyDown:function(e){if(27===e.keyCode)return e.preventDefault(),U();if((0,u.IR)()&&O&&O.current){var a=O.current,i=Array.from(a.querySelectorAll(p.bTR)),r=i[0],o=i[i.length-1],n=t,s=i.indexOf(t);if(39===e.keyCode||40===e.keyCode||9===e.keyCode&&!e.shiftKey)return e.preventDefault(),n===o?(t=r,r.focus()):(t=i[s+1]).focus();if(37===e.keyCode||38===e.keyCode||9===e.keyCode&&e.shiftKey)return e.preventDefault(),n===r?(t=o,o.focus()):(t=i[s-1]).focus()}},className:"bill-projection-window",children:(0,N.jsxs)("div",{className:"bill-projection-info",role:"dialog","aria-label":pe,ref:O,children:[(0,N.jsxs)("div",{tabIndex:0,id:"dialog-header",role:"heading","aria-level":2,className:"header",children:[(0,N.jsx)("img",{src:"".concat(xe.assetsUrl,"/images/faq.png"),height:"35px",width:"35px","aria-hidden":"true"}),(0,N.jsx)("span",{tabIndex:0,"aria-level":2,className:"tooltip-header",children:pe})]}),(0,N.jsx)("div",{tabIndex:0,className:"details",children:L.tooltipContent})]})}),(0,N.jsx)("div",{onClick:U,className:"bill-projection-mask"})]}),(0,N.jsxs)("div",{className:"summary-container",children:[(0,N.jsxs)("div",{className:"value-tickers",children:[(0,N.jsxs)("div",{className:"value-ticker current"+(Q?"":" zero"),style:{left:Q>q?"calc(100% - 160px)":"calc(".concat(Q,"% - 55px)")},children:[(0,N.jsx)("div",{className:"value",children:re}),(0,N.jsx)("div",{className:"subtext",children:L.current})]}),(0,N.jsxs)("div",{className:"value-ticker projected",children:[(0,N.jsx)("div",{className:"value",children:oe}),(0,N.jsx)("div",{className:"subtext",children:L.projected})]})]}),(0,N.jsxs)("div",{className:"projection-bar ".concat((0,u.IR)()?"ada-focus":""),role:"region","aria-label":Pe,tabIndex:0,children:[de&&(0,N.jsx)("div",{className:"bill-details bill-start","aria-hidden":"true"}),Q>0&&(0,N.jsx)("div",{className:"current"+(Q?"":" zero"),style:{width:Q+"%"},children:(0,N.jsx)("div",{className:"marker-container",style:{left:"calc(100% - 15px)"},children:(0,N.jsx)("div",{className:"circle",style:{backgroundColor:"#FFF"}})})}),e.isTouWebEnabled&&S&&(0,N.jsxs)("div",{className:"marker-container",style:{left:X+"%"},children:[(0,N.jsx)("div",{className:"circle"}),(0,N.jsx)("div",{className:"vertical-dotted-line"})]}),de&&(0,N.jsx)("div",{className:"bill-details bill-end","aria-hidden":"true"})]}),e.isTouWebEnabled&&(0,N.jsx)("div",{className:"reduce-tip-ticker",children:De})]}),ce&&(0,N.jsx)("div",{className:"info-container",children:(0,N.jsx)("div",{className:"bp-cta",children:(0,N.jsx)(b.Z,{btnVariant:"outlined",btnText:L.cta,disableRipple:!0,btnBackground:"rgb(".concat(Y["--background_300"],")"),borderColor:"rgb(".concat(Y["--primary_500"],")"),textColor:"rgb(".concat(Y["--primary_500"],")"),hoverColor:"rgb(".concat(Y["--background_300"],")"),btnTextTransform:"none",btnWidth:"50%",onClick:function(t){return e.navigateToUsageInsights(t,se?le:v.Ub.USAGE)}})})})]}),e.billProjectionError&&(0,N.jsx)("div",{className:"home-api-error bill-projection-error",dangerouslySetInnerHTML:{__html:L.apiError}})]})]})}var I=a(21911),_=a(88291),E=a(70501),L=function(e){(0,o.Z)(a,e);var t=(0,n.Z)(a);function a(){var e;(0,i.Z)(this,a);for(var r=arguments.length,o=new Array(r),n=0;n<r;n++)o[n]=arguments[n];return(e=t.call.apply(t,[this].concat(o))).widgetTrackingInfo=void 0,e}return(0,r.Z)(a,[{key:"componentDidMount",value:function(){this.widgetTrackingInfo=this.context.rc.analytics.createWidgetInfo(p.xDZ.BILL_PROJECTION,"V2"),this.props.billProjectionData||(this.props.fetchingBillProjectionData(),this.props.fetchBillProjectionData(this.context.rc,this.props.userId,{dateFormat:this.props.widgetConfigs.inputDateFormat,templateName:"".concat(p.wY4.HOME.BILL_PROJECTION,".FETCH_BILL_PROJECTION"),locale:this.props.locale,computeLastYear:!1,measurementType:this.props.session.userProfile.fuelType.toUpperCase()}))}},{key:"componentDidUpdate",value:function(e){if(this.widgetTrackingInfo&&e.billProjectionData&&e.billProjectionData.fetchingData&&!this.props.billProjectionData.fetchingData){var t=this.props.billProjectionData.failed?p.WW8.ERROR:p.WW8.SUCCESS,a=this.props.billProjectionData.errorInfo;this.context.rc.analytics.logWidgetInfo(this.widgetTrackingInfo,t,a),this.widgetTrackingInfo=null}}},{key:"navigateToUsageInsights",value:function(e,t){(0,_.K2)(t)?window.open(t):(0,_.m3)(m.Z$.BILL_PROJECTION,this.props.history,this.props.location,e,t)}},{key:"render",value:function(){var e,t,a=this,i=this.props.widgetConfigs.hideHeader,r=this.props.widgetStrings.title,o=this.props.billProjectionData&&this.props.billProjectionData.data&&this.props.billProjectionData.data.touUser,n=(0,u.ib)(o),s=this.context.rc.session.isDynamicLayout();return(0,N.jsx)(E.Z,{className:"bill-projectionv2-container","aria-labelledby":"bp-v2-title",children:(0,N.jsx)(T,{hideHeader:i,headerTitle:r,billProjectionData:null===(e=this.props.billProjectionData)||void 0===e?void 0:e.data,billProjectionError:null===(t=this.props.billProjectionData)||void 0===t?void 0:t.failed,widgetName:p.wY4.HOME.BILL_PROJECTION,session:this.props.session,responsiveness:this.props.responsiveness,navigateToUsageInsights:function(e,t){return a.navigateToUsageInsights(e,t)},dynamicLayout:s,isTouWebEnabled:n,translations:this.props.translationsData})})}}]),a}(s.Component);L.contextType=g.zO;var O=(0,P.$)(m.Z$.BILL_PROJECTION,(0,I.EN)((0,l.$j)((function(e){return{session:e.session,userId:e.session.userProfile.userId,billProjectionData:e.billProjectionData,locale:e.configs.locale,responsiveness:e.responsiveness,translationsData:e.translationsData.data}}),(function(e){return{fetchBillProjectionData:function(t,a,i){return e((0,c.S)(t,a,i))},fetchingBillProjectionData:function(){return e((0,c.a)())}}}))(L)))}}]);