(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{318:function(e,t,a){"use strict";a.r(t);var r=a(6),o=a(7),n=a(9),i=a(8),A=a(2),E=a.n(A),l=a(49),S=a(432),I=a(58),T=a(3),c=a(1),s=a(336),O=a(13),R=a(327),D=a(20),L=a(19),_=a(50),d=a(11),N=a(350),u=a(29),M=Object(R.a)({tooltipText:{color:function(e){return"rgb(var(--".concat(e.tooltipTextColor||"foreground_500","))")}}});function H(e){var t=null,a=E.a.useState(null),r=Object(I.a)(a,2),o=r[0],n=r[1],i=Object(_.d)(),l=Object(A.useContext)(N.a),S=l.widgetConfigs,R=l.widgetStrings,H=Object(A.useRef)(null),C=Object(A.useRef)(null),b=M(S),p=function(){D.c.broadcast(D.a.POPUP_CLOSED,{widgetId:L.a.BILL_PROJECTION}),n(null),C.current&&C.current.focus()};Object(A.useEffect)(function(){if(Object(T.L)()){if(H.current&&H.current.offsetParent&&-1===Number(H.current.offsetParent.getAttribute("tabindex"))){var e=H.current.offsetParent;e.setAttribute("tabindex",""),e.setAttribute("role","dialog"),e.setAttribute("aria-modal","true"),H.current.focus()}if(o&&H.current){var a=Array.from(H.current.offsetParent.querySelectorAll(c.r));(t=a[0]).focus()}}},[H.current,Boolean(o)]);var U=Boolean(o),g=U?"simple-popover":void 0,f=S.displayType,m=O.a.getColors().colors,P=e.session.userProfile.fuelType,B=f===c.Hb.COST,G=e.billProjectionData?B?e.billProjectionData.currentPrice||0:e.billProjectionData.currentConsumption||0:0,h=e.billProjectionData?B?e.billProjectionData.projectionPrice||0:e.billProjectionData.projectionConsumption||0:0,v=G&&h?G/h*100:0;v=v<10?10:v>75?75:v;var Y,y,j=B?Object(T.c)({cost:G,round:!0,showCurrency:!0}):Object(T.f)({usage:G,round:!0,showUsageUnit:!0,fuelType:P}),F=B?Object(T.c)({cost:h,round:!0,showCurrency:!0}):Object(T.f)({usage:h,round:!0,showUsageUnit:!0,fuelType:P}),w=i.runMode===c.Lb,V=S.ctaNavUrl,k=!w||w&&V,x=e.billProjectionData&&e.billProjectionData.billStartDateFormatted&&e.billProjectionData.billEndDateFormatted,W=R.tooltip,X=R.tooltipHeader,J=null,K=null;if(x){var q=e.billProjectionData.billStartDateFormatted,z=e.billProjectionData.billEndDateFormatted,Q=c.i.YEAR_MONTH_DAY,Z=S.dateFormatYear,$=S.dateFormatProjectionBar;J=Object(u.a)(q,$,Q),K=Object(u.a)(z,$,Q),Y=Object(u.a)(q,Z,Q),y=Object(u.a)(z,Z,Q)}var ee={start_date:J,end_date:K,proj_usage:F,curr_usage:j},te=Object(T.P)(R.usageAccessibilityLabel,ee);return E.a.createElement("div",{className:"bill-projection-v2"},E.a.createElement("div",{className:"bill-projection-content"},E.a.createElement("div",{className:"bill-period-details"},E.a.createElement("span",{className:"bill-period-container","data-widget-name":e.widgetName,"data-text-color":"foreground_300"},x&&E.a.createElement(E.a.Fragment,null,Y," - ",y)),E.a.createElement("span",{"data-widget-name":e.widgetName,"data-text-color":"foreground_300"},R.daysLeft," :",E.a.createElement("span",{className:"days"}," ",e.billProjectionData?e.billProjectionData.daysLeft:0))),E.a.createElement("div",{className:"summary-container"},E.a.createElement("div",{className:"value-tickers"},E.a.createElement("div",{className:"value-ticker current"+(v?"":" zero"),style:{left:G>0?"calc("+v+"% - 15px)":0,transform:G>0?"translateX(-50%)":void 0}},E.a.createElement("div",{className:"value"},j),E.a.createElement("div",{className:"subtext"},R.current)),E.a.createElement("div",{className:"value-ticker projected"},E.a.createElement("div",{className:"value"},F),E.a.createElement("div",{className:"subtext"},R.projected))),E.a.createElement("div",{className:"projection-bar ".concat(Object(T.L)()?"ada-focus":""),role:"region","aria-label":te,tabIndex:0},x&&E.a.createElement("div",{className:"bill-details bill-start","aria-hidden":"true"},J),v>0&&E.a.createElement("div",{className:"current"+(v?"":" zero"),style:{width:v+"%"}}),x&&E.a.createElement("div",{className:"bill-details bill-end","aria-hidden":"true"},K))),E.a.createElement("div",{className:"info-container"},E.a.createElement("div",{className:"dialog-container"},U&&E.a.createElement("div",{className:"bill-projection-dialog","aria-labelledby":"dialog-header"},E.a.createElement("div",{onKeyDown:function(e){if(27===e.keyCode)return e.preventDefault(),p();if(Object(T.L)()&&H&&H.current){var a=H.current,r=Array.from(a.querySelectorAll(c.r)),o=r[0],n=r[r.length-1],i=t,A=r.indexOf(t);if(39===e.keyCode||40===e.keyCode||9===e.keyCode&&!e.shiftKey)return e.preventDefault(),i===n?(t=o,o.focus()):(t=r[A+1]).focus();if(37===e.keyCode||38===e.keyCode||9===e.keyCode&&e.shiftKey)return e.preventDefault(),i===o?(t=n,n.focus()):(t=r[A-1]).focus()}},className:"bill-projection-window"},E.a.createElement("div",{className:"bill-projection-info",role:"dialog","aria-label":X,ref:H},E.a.createElement("div",{tabIndex:0,id:"dialog-header",role:"heading","aria-level":2,className:"header"},X),E.a.createElement("div",{tabIndex:0,className:"details"},R.tooltipContent))),E.a.createElement("div",{onClick:p,className:"bill-projection-mask"}))),E.a.createElement("div",{className:"bp-tooltip ".concat(b.tooltipText)},W,E.a.createElement("button",{ref:C,tabIndex:0,"aria-label":W,role:"button",className:"tooltip bidgely-icon-faq","aria-describedby":g,onClick:function(e){e.stopPropagation(),D.c.broadcast(D.a.POPUP_OPENED,{widgetId:L.a.BILL_PROJECTION}),D.c.subscribe(D.a.CLOSE_POPUP,p),n(e.target)}})),k&&E.a.createElement("div",{className:"bp-cta"},E.a.createElement(s.a,{btnVariant:"outlined",btnText:R.cta,disableRipple:!0,btnBackground:"rgb(".concat(m["--background_300"],")"),borderColor:"rgb(".concat(m["--primary_500"],")"),textColor:"rgb(".concat(m["--primary_500"],")"),hoverColor:"rgb(".concat(m["--background_300"],")"),btnTextTransform:"none",btnWidth:"50%",onClick:function(t){return e.navigateToUsageInsights(t,w?V:d.q.USAGE)}})))),e.billProjectionError&&E.a.createElement("div",{className:"home-api-error bill-projection-error"},R.apiError))}var C=a(21),b=a(57),p=a(22),U=a(603),g=function(e){Object(n.a)(a,e);var t=Object(i.a)(a);function a(e){var o;return Object(r.a)(this,a),(o=t.call(this,e)).widgetTrackingInfo=void 0,o.widgetTrackingInfo=p.a.getInstance().createWidgetInfo(c.Qb.BILL_PROJECTION,"V2"),o}return Object(o.a)(a,[{key:"componentDidMount",value:function(){this.props.billProjectionData||(this.props.fetchingBillProjectionData(),this.props.fetchBillProjectionData(this.props.userId,{dateFormat:this.props.widgetConfigs.inputDateFormat,templateName:"".concat(c.Pb.HOME.BILL_PROJECTION,".FETCH_BILL_PROJECTION"),locale:this.props.locale,computeLastYear:!1,measurementType:this.props.session.userProfile.fuelType.toUpperCase()}))}},{key:"componentDidUpdate",value:function(e){if(this.widgetTrackingInfo&&e.billProjectionData&&e.billProjectionData.fetchingData&&!this.props.billProjectionData.fetchingData){var t=this.props.billProjectionData.failed?c.f.ERROR:c.f.SUCCESS,a=this.props.billProjectionData.errorInfo;p.a.getInstance().logWidgetInfo(this.widgetTrackingInfo,t,a),this.widgetTrackingInfo=null}}},{key:"navigateToUsageInsights",value:function(e,t){Object(b.f)(t)?window.open(t):Object(b.h)(this.props.history,this.props.location,e,t)}},{key:"render",value:function(){var e=this,t=this.props.widgetConfigs.hideHeader,a=this.props.widgetStrings.title,r=this.props.globalContext.runMode===c.Lb;return E.a.createElement(U.a,{className:"bill-projectionv2-container","aria-labelledby":"bp-v2-title"},!t&&E.a.createElement("div",{className:"".concat(r?"widget-header-cont ".concat(Object(T.J)()?"no-bg":""):"header-container")},E.a.createElement("div",{className:"header-title"},E.a.createElement("span",{id:"bp-v2-title",role:"heading","aria-level":2,"data-widget-name":c.Pb.HOME.BILL_PROJECTION,"data-text-color":"foreground_500",className:"summary-title-main"},a))),null!==this.props.billProjectionData&&E.a.createElement(H,{billProjectionData:this.props.billProjectionData.data,billProjectionError:this.props.billProjectionData.failed,widgetName:c.Pb.HOME.BILL_PROJECTION,session:this.props.session,navigateToUsageInsights:function(t,a){return e.navigateToUsageInsights(t,a)}}))}}]),a}(E.a.Component);t.default=Object(N.b)(L.a.BILL_PROJECTION,Object(C.o)(Object(l.b)(function(e){return{session:e.session,userId:e.session.userProfile.userId,billProjectionData:e.billProjectionData,locale:e.configs.locale}},function(e){return{fetchBillProjectionData:function(t,a){return e(Object(S.a)(t,a))},fetchingBillProjectionData:function(){return e(Object(S.b)())}}})(g)))},336:function(e,t,a){"use strict";a.d(t,"a",function(){return R});var r=a(362),o=a(5),n=a(2),i=a.n(n),A=a(600),E=a(327),l=a(340),S=a.n(l),I=a(601),T=(a(348),a(3)),c=a(602),s=["cssClassName","hoverTextColor","isMobileView","btnTextColor","btnTextSize","btnBoxShadow","btnWidth","btnTextTransform","hoverColor","textColor","borderColor","btnBackground","btnText","btnVariant"],O=Object(E.a)({root:{color:function(e){return e.textColor},border:function(e){return e.borderColor?"1px solid "+e.borderColor:"none"},backgroundColor:function(e){return e.btnBackground},boxShadow:function(e){return e.btnBoxShadow},"&:hover":{backgroundColor:function(e){return e.hoverColor},color:function(e){return e.hoverTextColor},boxShadow:function(e){return e.btnBoxShadow},borderColor:function(e){return e.borderHoverColor||e.borderColor}},height:function(e){return e.btnHeight},width:function(e){return e.btnWidth},padding:function(e){return e.isMobileView?"5px 10px":""},paddingBottom:function(e){return e.paddingBottom}},btnActive:{backgroundColor:function(e){return e.activeColor},color:function(e){return e.activeTextColor},"&:hover":{backgroundColor:function(e){return e.activeColor},color:function(e){return e.activeTextColor}}},label:{fontSize:function(e){return e.btnTextSize},color:function(e){return e.btnTextColor},textTransform:function(e){return e.btnTextTransform?e.btnTextTransform:"Uppercase"},justifyContent:function(e){return e.labelAlign},textOverflow:"ellipsis",overflow:"hidden"},icon:{marginRight:function(e){return e.iconMarginRight?e.iconMarginRight:"25px"}},iconActive:{color:function(e){return e.iconActiveColor}}});function R(e){var t=O(e),a=e.isBidgelyIcon?S()(e.iconLeft,Object(o.a)({},t.iconActive,e.isIconActive)):"",n=e.cssClassName,E=(e.hoverTextColor,e.isMobileView,e.btnTextColor,e.btnTextSize,e.btnBoxShadow,e.btnWidth,e.btnTextTransform,e.hoverColor,e.textColor,e.borderColor,e.btnBackground,e.btnText,e.btnVariant,Object(r.a)(e,s));return i.a.createElement(A.a,Object.assign({"aria-pressed":e.ariaPressed,"aria-label":e.ariaLabel,type:e.type?e.type:"button",display:e.display,className:(e.isActive?t.btnActive:"")+" "+(n||"")+(e.disabled||e.ariaDisabled?" disabled":""),variant:e.btnVariant?e.btnVariant:"text",classes:{root:t.root,label:t.label},onClick:e.onClick,disableRipple:!e.disableRipple||e.disableRipple,disabled:!!e.disabled&&e.disabled,"data-focus-element":!!e.dataFocusElement&&e.dataFocusElement,role:e.role,"aria-checked":e.ariaChecked,"aria-selected":e.ariaSelected,"aria-disabled":e.ariaDisabled,"aria-describedby":e.ariaDescribedby,tabIndex:e.tabIndex,onKeyDown:function(t){return function(t){(e.ariaDisabled||e.disabled)&&Object(T.L)()&&(9===t.keyCode||9===t.keyCode&&t.shiftKey||37===t.keyCode||38===t.keyCode||39===t.keyCode||40===t.keyCode||t.preventDefault())}(t)}},E),e.loading?i.a.createElement(c.a,{color:"inherit",size:30}):i.a.createElement(i.a.Fragment,null,e.iconLeft?e.isBidgelyIcon?i.a.createElement("span",{className:a}):i.a.createElement(I.a,{classes:{root:t.icon},className:e.isIconActive?t.iconActive:""},e.iconLeft):"",e.btnText,e.iconRight?i.a.createElement(I.a,{classes:{root:t.icon},className:e.isIconActive?t.iconActive:""},e.iconRight):""))}},341:function(e,t,a){"use strict";var r={PAGE_NAME:"pageName",WIDGET:"widget",CLICKED:"clicked",CTA_CLICKED:"ctaClicked",CLICK:"click",SCROLL:"scroll",NO_RECO:"noreco",GRID:"grid",FILTER:"filter",FILTER_ITEMS:"filterItems",RECO_ID:"recoId"},o={hideHeader:"DASHBOARD.BILL_PROJECTION_V2.HIDE_HEADER",displayType:"billprojection.displayValue",ctaNavUrl:"DASHBOARD.HOME.BILL_PROJECTION.V2.WC_NAV_URL_USAGE",inputDateFormat:"date_format",tooltipTextColor:"dashboard.billProjection.tooltipTextColor",dateFormatYear:"DATE_FORMATS.YEAR.BILLING_CYCLE_DURATION",dateFormatProjectionBar:"DATE_FORMATS.BILL_PROJECTION.V2.PROJECTION_BAR"},n={title:"HOME.BILL_PROJECTION.PROJECTED_BILL",tooltip:"DASHBOARD.HOME.BILL_PROJECTION.V2.DESCRIPTION_TITLE",tooltipHeader:"DASHBOARD.HOME.BILL_PROJECTION.V2.DESCRIPTION_POPUP_TITLE",tooltipContent:"DASHBOARD.HOME.BILL_PROJECTION.V2.DESCRIPTION",usageAccessibilityLabel:"DASHBOARD.HOME.BILL_PROJECTION.V2.PROJECTION_BAR_TEXT",daysLeft:"DASHBOARD.HOME.BILL_PROJECTION.V2.DAYS_LEFT",current:"DASHBOARD.HOME.BILL_PROJECTION.V2.CURRENT",projected:"DASHBOARD.HOME.BILL_PROJECTION.V2.PROJECTED",cta:"DASHBOARD.HOME.BILL_PROJECTION.V2.SEE_MORE",apiError:"HOME.BILL_PROJECTION.API_ERROR"},i={showDetailsBtn:"DASHBOARD.RECOMMENDATION_DETAILS_ENABLED",showInsights:"DASHBOARD.RECO_INSIGHTS_ENABLED",insightsImg:"DASHBOARD.RECOMMENDATIONS.INSIGHTS_BULB"},A={likeLabel:"RECOMMENDATIONS.TIPS.LIKE",likesLabel:"RECOMMENDATIONS.TIPS.LIKES",btnDetails:"RECOMMENDATIONS.CTA_BUTTON.TEXT"},E={recoCardVariant:"DASHBOARD.RECOMMENDATION.TOP_5.VARIANT",hideSliderDots:"DASHBOARD.RECOMMENDATION.TOP_5.SLIDER_DOTS_DISABLED",moreRecoNavUrl:"DASHBOARD.RECOMMENDATION.TOP_5.WC_NAV_URL_RECO_ALL",showHeader:"DASHBOARD.RECOMMENDATION.TOP_5.SHOW_TOP_HEADER",recoCardSummary:{cardClickEnabled:"DASHBOARD.RECOMMENDATION_DETAILS_ENABLED"},recoCardDetailed:i},l={sliderAriaLabel:"TOP5_RECOMMENDATION_ARIA_LABEL",prevTip:"DASHBOARD.RECOMMENDATION.TOP_5.PREVIOUS_TIP",nextTip:"DASHBOARD.RECOMMENDATION.TOP_5.NEXT_TIP",sliderCount:"DASHBOARD.RECOMMENDATION.TOP_5.SLIDER_COUNT_TEXT",title:"RECOMMENDATIONS.TOP_5.TITLE",btnAllTips:"DASHBOARD.RECOMMENDATION.TOP_5.SEE_ALL_TIPS",noData:"RECOMMENDATIONS.TIPS.EMPTY",recoCardDetailed:A},S={recoDetailsEnabled:"DASHBOARD.RECOMMENDATION_DETAILS_ENABLED",filterAppsList:"recommendationsDropdownAppliancesList",filterAppsListSolar:"recommendationsDropdownAppliancesList.solar",showWholeHomeInFilters:"DASHBOARD.RECOMMENDATIONS.DROPDOWN.SHOW_WHOLE_HOME",showHeader:"DASHBOARD.RECOMMENDATIONS.SHOW_TOP_HEADER",recoCardDetailed:i},I={header:"RECOMMENDATIONS.TIPS.TITLE",btnShowMore:"RECOMMENDATIONS.SHOW_MORE",noData:"RECOMMENDATIONS.TIPS.UNAVAILABLE",filterAppLabel:"RECOMMENDATIONS.FILTER_DESCRIPTION_SINGULAR",filterAppsLabel:"RECOMMENDATIONS.FILTER_DESCRIPTION_PLURAL",filterModal:{header:"RECOMMENDATIONS.APPLIANCE_CATEGORY",btnCancel:"RECOMMENDATIONS.TIPS.DRPOPDOWN.CANCEL",btnApply:"RECOMMENDATIONS.TIPS.DRPOPDOWN.APPLY_FILTERS"},recoCardDetailed:A},T={title:"DASHBOARD.FILTER_MODAL.TITLE",usage:"DASHBOARD.FILTER_MODAL.FILTER.USAGE",viewBy:"DASHBOARD.FILTER_MODAL.FITLER.VIEW_BY",appliance:"DASHBOARD.FILTER_MODAL.FILTER.APPLIANCE",timeScale:"DASHBOARD.FILTER_MODAL.FILTER.TIMESCALE",rate:"DASHBOARD.FILTER_MODAL.FILTER.RATE",display:"DASHBOARD.FILTER_MODAL.FILTER.DISPLAY",btnCancel:"DASHBOARD.FILTER_MODAL.BTN_CANCEL",btnDone:"DASHBOARD.FILTER_MODAL.BTN_DONE",usageViewAppliance:"DASHBOARD.INSIGHT_USAGE_V2_VIEWS.APPLIANCE",usageViewCost:"DASHBOARD.INSIGHT_USAGE_V2_VIEWS.COST",usageViewUsage:"DASHBOARD.INSIGHT_USAGE_V2_VIEWS.USAGE",usageViewApplianceSolar:"DASHBOARD.INSIGHT_USAGE_V2_VIEWS.SOLAR.APPLIANCE",usageViewCostSolar:"DASHBOARD.INSIGHT_USAGE_V2_VIEWS.SOLAR.COST",usageViewUsageSolar:"DASHBOARD.INSIGHT_USAGE_V2_VIEWS.SOLAR.USAGE",usageModeYear:"USAGE.MODE.YEAR",usageModeMonth:"USAGE.MODE.MONTH",usageModeDay:"USAGE.MODE.DAY",usageTouAll:"DASHBOARD.USAGE.TOU.ALL",usageTouOffPeak:"DASHBOARD.USAGE.TOU.OFF_PEAK",usageTouMidPeak:"DASHBOARD.USAGE.TOU.MID_PEAK",usageTouOnPeak:"DASHBOARD.USAGE.TOU.ON_PEAK",usageTier0:"INSIGHTS.USAGE.TIER.0.NAME",usageTier1:"INSIGHTS.USAGE.TIER.1.NAME",usageTier2:"INSIGHTS.USAGE.TIER.2.NAME",graphStyleArea:"USAGE.GRAPH_STYLE.AREA",graphStyleColumn:"USAGE.GRAPH_STYLE.COLUMN",graphTypeBar:"MONTHLY_SUMMARY.CHART.BAR",graphTypePie:"MONTHLY_SUMMARY.CHART.PIE"},c={showHeader:"SIMILAR_HOMES.SHOW_TOP_HEADER",skipOngoingBC:"skipOngoingCycle",consumptionMode:"defaultCostConsumptionModeSHC",dateFormat:"DASHBOARD.INSIGHTS.SHC.DATE_FORMAT",enableApplianceSHC:"enableApplianceSHC",dateFormatChartXAxis:"DASHBOARD.INSIGHTS.SHC_XAXIS.DATE_FORMAT",hideComparison:"DASHBOARD.INSIGHTS.MONTHLY_SUMMARY.HIDE_COMPARISON_DETAILS",recoNavUrl:"SIMILAR_HOMES.WC_NAV_URL_RECO",highlightApplianceToggle:"dashboard.shc.themedApplianceToggle",surveyNavUrl:"SIMILAR_HOMES.WC_NAV_URL_SURVEY",linkUnknownToSurvey:"dashboard.shc.linkUnknownToSurvey"},s={title:"SIMILAR_HOMES.TOP_HEADER",chartLabelYou:"SIMILAR_HOMES.CHART.LABELS.YOU",chartLabelAverage:"SIMILAR_HOMES.CHART.LABELS.AVERAGE",chartLabelEfficient:"SIMILAR_HOMES.CHART.LABELS.EFFICIENT",chartLabelAccessibility:"SIMILAR_HOMES.CHART.ACCESSIBILITY.LABELS",missingIntervalIcon:"DISCLAIMER_ICONS.SHC.ICON1",missingApplianceIcon:"DISCLAIMER_ICONS.SHC.ICON2",missingInterval:"SIMILAR_HOMES.DISCLAIMER_MSG.MISSING_INTERVAL",missingAppliance:"SIMILAR_HOMES.DISCLAIMER_MSG.APPLIANCE_MISSING",accessibilityLabel:"SIMILAR_HOMES.ADA.LABEL",billChargesDisclaimer:"DASHBOARD.BILL_CHARGES_DISCLAIMER",billChargesDisclaimerSHC:"DASHBOARD.SHC.BILL_CHARGES_DISCLAIMER",adaTableTitle:"SIMILAR_HOMES.TOP_HEADER_TABLE",chartHeading:"SIMILAR_HOMES.HEADING",chartDisclaimer:"CHART_DISCLAIMER",chartFooter:"SIMILAR_HOMES.CHART.FOOTER.TEXT",btnTextReco:"SIMILAR_HOMES.CHART.SURVEY_BTN_TEXT",comparisonHeader:"SIMILAR_HOMES.COMPARISON_HEADER",shcComparisonTitle:"SIMILAR_HOMES.NEIGHBOURHOOD_COMPARISON.HEADING",shcComparisonHelp:"SIMILAR_HOMES.NEIGHBOURHOOD_COMPARISON.HELP_TEXT",btnTextSurvey:"SIMILAR_HOMES.UPDATE_HOME_PROFILE_TEXT",filterModal:T},O={dateFormat:"date_format",highestDayDateFormat:"highest_day_date_format",skipOngoingBC:"skipOngoingCycle",defaultChartMode:"DASHBOARD.MONTHLY_SUMMARY.DEFAULT_MODE",defaultChartModeSolar:"DASHBOARD.MONTHLY_SUMMARY.SOLAR.DEFAULT_MODE",defaultChartType:"DASHBOARD.MONTHLY_SUMMARY.DEFAULT_CHART_TYPE",leftToggleUnit:"DASHBOARD.MONTHLY_SUMMARY.MS_LEFT_TOGGLE",rightToggleUnit:"DASHBOARD.MONTHLY_SUMMARY.MS_RIGHT_TOGGLE",surveyNavUrl:"DASHBOARD.MONTHLY_SUMMARY.WC_NAV_URL_SURVEY",faqModal:{navUrl:"CONSUMPTION_BREAKDOWN.WC_NAV_URL_FAQ"}},R={title:"MONTHLY_SUMMARY.TITLE",titleSolar:"MONTHLY_SUMMARY.SOLAR.TITLE",dataNotAvailable:"MONTHLY_SUMMARY.DATA_NOT_AVAILABLE",adaLabel:"MONTHLY_SUMMARY.ADA.LABEL",filterLabel:"COMMON.FILTER",usageLabel:"MONTHLY_SUMMARY.DETAILS.USAGE_HEADER",usageLabelSolar:"MONTHLY_SUMMARY.DETAILS.SOLAR.USAGE_HEADER",billLabel:"MONTHLY_SUMMARY.DETAILS.BILL_HEADER",billLabelSolar:"MONTHLY_SUMMARY.DETAILS.SOLAR.BILL_HEADER",surveyLabel:"MONTHLY_SUMMARY.V2.DETAILS.COMPLETE_SURVEY_TEXT",btnSurvey:"MONTHLY_SUMMARY.V2.HOME_SURVEY_BUTTON_TEXT",loadingLabel:"DASHBOARD.MONTHLY_SUMMARY.LOADING",showingDataLabel:"DASHBOARD.MONTHLY_SUMMARY.DATA.ADA_DESC",totalUsageLabel:"COMMON.TOTAL_TEXT",faqLabel:"MONTHLY_SUMMARY.ITEMISATION_HELPER_TITLE",showMoreAppsLabel:"MONTHLY_SUMMARY.SHOW_MORE_BUTTON_TEXT",chartDisclaimer:"CHART_DISCLAIMER",faqModal:{faqLabel:"MONTHLY_SUMMARY.ITEMISATION_HELPER_TITLE",detail1:"MONTHLY_SUMMARY.ITEMISATION_HELPER_DETAIL_1",detail2:"MONTHLY_SUMMARY.ITEMISATION_HELPER_DETAIL_2",detail3:"MONTHLY_SUMMARY.ITEMISATION_HELPER_DETAIL_3",footer:"MONTHLY_SUMMARY.ITEMISATION_HELPER_FOOTER",btnFaq:"MONTHLY_SUMMARY.ITEMISATION_HELPER_FOOTER_BTN"},filterModal:T},D={enableQueryParams:"dashboard.insights.billAnalysis.enableQueryParams",dateFormat:"date_format",showMoreDetails:"DASHBOARD.INSIGHTS.BILL_ANALYSIS.SHOW_MORE_DETAILS",usageDisplayType:"usageHistoryWidget.displayValue",dateFormatChartXAxis:"DASHBOARD.USAGE_CHART.DATE_FORMAT",showTitle:"HBA.SHOW_TOP_HEADER",weatherUnit:"weather_unit",actionCards:"DASHBOARD.INSIGHTS.BILL_ANALYSIS.FURTHER_ACTIONS.ACTION_CARDS"},L={title:"HBA.TITLE",billAmount:"HBA.DETAILS.BILL_AMOUNT",prevBillHigher:"HBA.BILL_DIFF.HIGHER_THAN_PREVIOUS_BILL",prevBillLower:"HBA.BILL_DIFF.LOWER_THAN_PREVIOUS_BILL",dataNotAvailable:"HBA.BILL_DIFF.INSUFFICIENT_DATA",apiError:"HBA.BILL_DIFF.API_ERROR",ongoingBillingCycle:"HBA.BILL_DIFF.HAS_INCOMPLETE_BILLING_CYCLE",furtherActionsTitle:"HBA.FURTHER_ACTIONS.TITLE",furtherActionsSubTitle:"HBA.FURTHER_ACTIONS.SUB_TITLE",applianceUsage:"HBA.DETAILS.APPLIANCE_USAGE",lessDetails:"HBA.DETAILS.LESS_DETAILS",moreDetails:"HBA.DETAILS.MORE_DETAILS",averageTemp:"HBA.DETAILS.AVG_TEMP",variations:"HBA.DETAILS.VARIATIONS",totals:"HBA.DETAILS.TOTALS",consumption:"HBA.DETAILS.CONSUMPTION",consumptionPerDay:"HBA.DETAILS.CONSUMPTION_PER_DAY",otherDiffs:"HBA.DETAILS.OTHER_KEY_DIFFERENCES",billingCycleDays:"HBA.DETAILS.DAYS_BILLING_CYCLE",consumptionDayLow:"HBA.DETAILS.LOW_CONSUMPTION_DAYS",appDataNotAvailable:"HBA.DETAILS.APPLIANCE_USAGE_UNAVAILABLE",totalDiff:"BILL_ANALYSIS.TOTAL_DIFFERENCE",usageHistory:"HOME.USAGE_HISTORY.TITLE",usageHistoryElectric:"HOME.USAGE_HISTORY.TITLE.ELECTRIC",usageHistoryGas:"HOME.USAGE_HISTORY.TITLE.GAS",usageHistoryWater:"HOME.USAGE_HISTORY.TITLE.WATER",comparedTo:"HBA.BILL_SELECTOR.YOUR_BILL_ANALYSIS_COMPARED_TO",prevBill:"HBA.BILL_SELECTOR.PREVIOUS_BILL",lastYearBill:"HBA.BILL_SELECTOR.SAME_BILL_LAST_YEAR",apiFailed:"HBA.BILL_ANALYSIS.API_ERROR"},_={showHeader:"DASHBOARD.INSIGHTS.USAGE_V2.SHOW_TOP_HEADER",weatherUnit:"weather_unit",dateFormat:"date_format",dateFormatMins:"DATE_FORMATS.DAY.MINUTES.XAXIS",dateFormatYear:"DATE_FORMATS.YEAR.XAXIS",dateFormatMonth:"DATE_FORMATS.MONTH.XAXIS",dateFormatDay:"DATE_FORMATS.DAY.XAXIS",showMinuteUsage:"usageMinutesData",skipOngoingBC:"skipOngoingCycle",showSolarTouRates:"dashboard.showSolarTouRatesInfo",solarPeakInfo:"INSIGHT_USAGE.SOLAR_TOU.DATA",showTemperatureSeries:"showTemperatureSeries",showDemandCharge:"INSIGHTS.USAGE.SHOW_DEMAND_CHARGE.CONSUMPTION_MODE",shcNavUrl:"INSIGHTS.USAGE.WC_NAV_URL_SHC",supportedGranularities:"INSIGHTS.USAGE.V2.SUPPORTED_GRANULARITIES",ctaEnabled:"INSIGHTS.USAGE.CTA_ENABLED"},d={title:"INSIGHTS.USAGE.TOP_HEADER",adaIconLabel:"INSIGHTS.USAGE.ADA.LABEL",apiError:"INSIGHTS.USAGE.API_ERROR",dataLoading:"DASHBOARD.USAGE_INSIGHTS.LOADING",filterLabel:"COMMON.FILTER",applianceTotal:"COMMON.TOTAL_TEXT",applianceTotalSolar:"SOLAR.COMMON.TOTAL_TEXT",peakDemand:"INSIGHTS.USAGE.PEAK_DEMAND",peakDemandYear:"INSIGHTS.USAGE.CHART_DISCLAIMER.DEMAND_CHARGE.YEAR",peakDemandMonth:"INSIGHTS.USAGE.CHART_DISCLAIMER.DEMAND_CHARGE.MONTH",peakDemandDay:"INSIGHTS.USAGE.CHART_DISCLAIMER.DEMAND_CHARGE.DAY",chartTopDisclaimer:{appliance:"INSIGHTS.USAGE.CHART_DISCLAIMER.APPLIANCE",applianceSolar:"INSIGHTS.USAGE.CHART_DISCLAIMER.APPLIANCE.SOLAR",cost:{fixed:{year:"INSIGHTS.USAGE.CHART_DISCLAIMER.FIXED.YEAR",month:"INSIGHTS.USAGE.CHART_DISCLAIMER.FIXED.MONTH",day:"INSIGHTS.USAGE.CHART_DISCLAIMER.FIXED.DAY"},tou:{year:"INSIGHTS.USAGE.CHART_DISCLAIMER.TOU.YEAR",month:"INSIGHTS.USAGE.CHART_DISCLAIMER.TOU.MONTH",day:"INSIGHTS.USAGE.CHART_DISCLAIMER.TOU.DAY"},tier:{year:"INSIGHTS.USAGE.CHART_DISCLAIMER.TIER.YEAR",month:"INSIGHTS.USAGE.CHART_DISCLAIMER.TIER.MONTH",day:"INSIGHTS.USAGE.CHART_DISCLAIMER.TIER.DAY"}},usage:{year:"INSIGHTS.USAGE.CHART_DISCLAIMER.USAGE.YEAR",month:"INSIGHTS.USAGE.CHART_DISCLAIMER.USAGE.MONTH",day:"INSIGHTS.USAGE.CHART_DISCLAIMER.USAGE.DAY",dayGranularity:"INSIGHTS.USAGE.CHART_DISCLAIMER.USAGE.DAY.GRANULARITY"},usageSolar:{year:"INSIGHTS.USAGE.CHART_DISCLAIMER.USAGE.YEAR.SOLAR",month:"INSIGHTS.USAGE.CHART_DISCLAIMER.USAGE.MONTH.SOLAR",day:"INSIGHTS.USAGE.CHART_DISCLAIMER.USAGE.DAY.SOLAR",dayGranularity:"INSIGHTS.USAGE.CHART_DISCLAIMER.USAGE.DAY.SOLAR.GRANULARITY"}},temperatureLabel:"USAGE.TEMPERATURE",otherAppliances:"DASHBOARD.USAGE.REMAINING_CATEGORIES",surveyPrompt:"INSIGHTS.USAGE.SURVEY_PROMPT",demandChargeDisclaimer:"INSIGHTS.USAGE.DEMAND_CHARGE.DISCLAIMER",billChargeDisclaimer:"DASHBOARD.BILL_CHARGES_DISCLAIMER",touDisclaimerYear:"INSIGHTS.USAGE.CHART_TOUDISCLAIMER.YEAR",touDisclaimerMonth:"INSIGHTS.USAGE.CHART_TOUDISCLAIMER.MONTH",touDisclaimerDay:"INSIGHTS.USAGE.CHART_TOUDISCLAIMER.DAY",btnShc:"INSIGHTS.USAGE.SHC_BTN_TEXT",filterModal:T,solarRateInfo:{title:"INSIGHT_USAGE.SOLAR.TOU.INFO.TITLE",subTitle:"INSIGHT_USAGE.SOLAR.TOU.INFO.SUB_TITLE",rateUnit:"INSIGHTS.USAGE.SOLAR.INFO.HOURS_INFO.RATE_UNIT"}},N={showLinkToDashboard:"SURVEY.SHOW_DASHBOARD_LINK",canDeselectAnswer:"enableSurveyDeselect",dashboardNavUrl:"DASHBOARD.SURVEY.WC_NAV_URL_FINISH_SURVEY"},u={title:"SURVEY.HEADER",header:"SURVEY.PAGE_TITLE",surveyProgressLabel:"SURVEY_COMPLETION_PERCENT",apiTimeout:"SURVEY.WIDGET_DISAGG_FAILURE_TEXT",apiSuccess:"SURVEY.WIDGET_DISAGG_SUCCESS_TEXT",btnPrevious:"SURVEY.PREVIOUS",btnNext:"SURVEY.NEXT",btnFinish:"SURVEY.FINISH",finishHeader:"SURVEY.THANK_YOU",finishMessage:"SURVEY.SURVEY_FINISHED_MESSAGE",disaggTimeout:"SURVEY.SURVEY_DISAGG_FAILURE",progressHeader:"SURVEY.DISAGG_RUNNING_1",progressFooter:"SURVEY.DISAGG_RUNNING_2",progressDisclaimer:"SURVEY.DISAGG_RUNNING_DISCLAIMER",btnDashboardLink:"SURVEY.TAKE_ME_TO_MY_DASHBOARD"};a.d(t,"i",function(){return r}),a.d(t,"a",function(){return o}),a.d(t,"b",function(){return n}),a.d(t,"l",function(){return E}),a.d(t,"m",function(){return l}),a.d(t,"j",function(){return S}),a.d(t,"k",function(){return I}),a.d(t,"n",function(){return c}),a.d(t,"o",function(){return s}),a.d(t,"g",function(){return O}),a.d(t,"h",function(){return R}),a.d(t,"c",function(){return D}),a.d(t,"d",function(){return L}),a.d(t,"e",function(){return _}),a.d(t,"f",function(){return d}),a.d(t,"p",function(){return N}),a.d(t,"q",function(){return u})},348:function(e,t,a){var r=a(349);"string"===typeof r&&(r=[[e.i,r,""]]);var o={transform:void 0};a(94)(r,o);r.locals&&(e.exports=r.locals)},349:function(e,t,a){(e.exports=a(93)(!1)).push([e.i,".disableBtn {\n  pointer-events: none; }\n\n.disabled {\n  border-color: rgba(var(--background_600), 1);\n  cursor: not-allowed;\n  color: rgba(var(--foreground_400), 1);\n  background-color: transparent; }\n",""])},350:function(e,t,a){"use strict";var r,o,n=a(6),i=a(7),A=a(9),E=a(8),l=a(2),S=a.n(l),I=a(49),T=a(5),c=a(19),s=a(341),O=(r={},Object(T.a)(r,c.a.BILL_PROJECTION,s.a),Object(T.a)(r,c.a.RECOMMENDATION_TOP_TIPS,s.l),Object(T.a)(r,c.a.RECOMMENDATION_TIPS_LIBRARY,s.j),Object(T.a)(r,c.a.INSIGHTS_SIMILAR_HOMES,s.n),Object(T.a)(r,c.a.INSIGHTS_MONTHLY_SUMMARY,s.g),Object(T.a)(r,c.a.HIGH_BILL_ANALYSER,s.c),Object(T.a)(r,c.a.INSIGHTS_USAGE,s.e),Object(T.a)(r,c.a.SURVEY,s.p),r),R=(o={},Object(T.a)(o,c.a.BILL_PROJECTION,s.b),Object(T.a)(o,c.a.RECOMMENDATION_TOP_TIPS,s.m),Object(T.a)(o,c.a.RECOMMENDATION_TIPS_LIBRARY,s.k),Object(T.a)(o,c.a.INSIGHTS_SIMILAR_HOMES,s.o),Object(T.a)(o,c.a.INSIGHTS_MONTHLY_SUMMARY,s.h),Object(T.a)(o,c.a.HIGH_BILL_ANALYSER,s.d),Object(T.a)(o,c.a.INSIGHTS_USAGE,s.f),Object(T.a)(o,c.a.SURVEY,s.q),o),D=a(50),L=a(379);a.d(t,"a",function(){return _}),a.d(t,"b",function(){return d});var _=Object(l.createContext)({}),d=function(e,t){var a=function(a){Object(A.a)(o,a);var r=Object(E.a)(o);function o(t){var a;Object(n.a)(this,o),a=r.call(this,t);var i=Object(L.cloneDeep)(O[e]),A=Object(L.cloneDeep)(R[e]);return a.state={configs:a.resolveObject(i,a.props.configs,a.props.widgetConfigs[e]),strings:a.resolveObject(A,a.props.translations,a.props.widgetTranslations[e])},a}return Object(i.a)(o,[{key:"resolveObject",value:function(e,t,a){for(var r in a=a||{},e)if("object"===typeof e[r])this.resolveObject(e[r],t,a[r]);else{var o=t[e[r]];"string"===typeof o&&("false"===o.toLowerCase()?o=!1:"true"===o.toLowerCase()&&(o=!0)),e[r]=void 0!==a[r]?a[r]:o}return e}},{key:"render",value:function(){var e=this;return S.a.createElement(D.a.Consumer,null,function(a){return S.a.createElement(_.Provider,{value:{widgetConfigs:e.state.configs,widgetStrings:e.state.strings}},S.a.createElement(_.Consumer,null,function(e){return S.a.createElement(t,{globalContext:a,widgetConfigs:e.widgetConfigs,widgetStrings:e.widgetStrings})}))})}}]),o}(S.a.Component);return Object(I.b)(function(e){return{configs:e.configs.data,translations:e.translationsData.data,widgetConfigs:e.configs.widgetConfigs,widgetTranslations:e.translationsData.widgetTranslations}})(a)}},432:function(e,t,a){"use strict";a.d(t,"a",function(){return l}),a.d(t,"b",function(){return S});var r=a(14),o=a.n(r),n=a(47),i=a(10),A=a(98),E=a(80);function l(e,t){var a={"date-format":t.dateFormat,locale:t.locale,round:!0,"convert-to-kwh":!0,"skip-if-completed-cycle":!0};return void 0!==t.computeLastYear&&(a["compute-last-year"]=t.computeLastYear),t.measurementType&&(a.measurementType=t.measurementType.toUpperCase()),Object(n.b)()&&(a.templateName=t.templateName),function(t){var r=Object(i.e)(A.a.getEndpoint(e));o.a.get(r,{params:a}).then(function(e){var a=e.data;0!==a.projectionStatus?t({type:E.b,payload:{code:"404",message:"Bill Projection data is empty"}}):t({type:E.c,payload:a})}).catch(function(e){var a=e.response?e.response.data.error:e.data.error;t({type:E.b,payload:a})})}}var S=function(){return function(e){e({type:E.a})}}}}]);