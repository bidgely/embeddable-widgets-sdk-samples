/* eslint-disable */
import { useEffect, useState } from "react";
import { CNavItem, CNavLink, CNav, CTabContent, CTabPane } from "@coreui/react";
import "./TabView.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function TabViewWidgets(props) {
  const history = useHistory();
  const [activeKey, setActiveKey] = useState(0);
  const [widgetRendered, setWidgetRendered] = useState(new Set())
  const bidgelySdkState = useSelector((state) => state.bidgelySdk)

  const widgetResp = useSelector(state => state.auth.widgetResponseObject)

  useEffect(() => {
    if (!widgetResp || widgetResp.messageType !== "SUCCESS") {
      //route back to form page
      history.push("/");
      return
    }
    setActive(1, BidgelyWebSdk.WIDGET_TAG.SURVEY)
  }, [])

  function setActive(index, widgetId) {

    setActiveKey(index)

    if (!widgetRendered.has(widgetId)) {
      BidgelyWebSdk.renderWidget({
        instanceId : bidgelySdkState.instances[0].instanceId,
        widgetId : widgetId
      })
      const newSet = new Set()
      widgetRendered.forEach(widget => {
        newSet.add(widget)
      })
      newSet.add(widgetId)
      setWidgetRendered(newSet)
    }
  }

  return (
    <div className="tab-view">
      <CNav className="tab-list" variant="tabs" role="tablist">
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 1}
            onClick={() => setActive(1, BidgelyWebSdk.WIDGET_TAG.SURVEY)}
          >
            Home Survey
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 2}
            onClick={() => setActive(2, BidgelyWebSdk.WIDGET_TAG.INSIGHTS_USAGE)}
          >
            Usage History
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 3}
            onClick={() => setActive(3, BidgelyWebSdk.WIDGET_TAG.INSIGHTS_SIMILAR_HOMES)}
          >
            Similar Homes Comparison History
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 4}
            onClick={() => setActive(4, BidgelyWebSdk.WIDGET_TAG.INSIGHTS_MONTHLY_SUMMARY)}
          >
            Bill Itemization
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 5}
            onClick={() => setActive(5, BidgelyWebSdk.WIDGET_TAG.RATE_PLAN_COMPARISON
            )}
          >
            Rate Comparison
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 6}
            onClick={() => setActive(6, BidgelyWebSdk.WIDGET_TAG.BILL_PROJECTION)}
          >
            Bill Projection
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 7}
            onClick={() => setActive(7, BidgelyWebSdk.WIDGET_TAG.RECOMMENDATION_TOP_TIPS)}
          >
            Top Tips
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 8}
            onClick={() => setActive(8, BidgelyWebSdk.WIDGET_TAG.RECOMMENDATION_TIPS_LIBRARY)}
          >
            Tips Library
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 9}
            onClick={() => setActive(9, BidgelyWebSdk.WIDGET_TAG.RECOMMENDATION_TOP_PROGRAMS)}
          >
            Program Tips
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 10}
            onClick={() => setActive(10, BidgelyWebSdk.WIDGET_TAG.HIGH_BILL_ANALYSER)}
          >
            High Bill Analyzer
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 11}
            onClick={() => setActive(11, BidgelyWebSdk.WIDGET_TAG.CARE_ENGAGEMENT_VIEW)}
          >
            Engagement View (CSR Role)
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 12}
            onClick={() => setActive(12, BidgelyWebSdk.WIDGET_TAG.GB_DOWNLOAD)}
          >
            Green Button Download
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 13}
            onClick={() => setActive(13, BidgelyWebSdk.WIDGET_TAG.HOME_PROFILE_SURVEY)}
          >
            Home Profile Survey (CSR Role)
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 14}
            onClick={() => setActive(14, BidgelyWebSdk.WIDGET_TAG.USER_PREFERENCES)}
          >
            User Preferences
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane className="widget-container"
          role="tabpanel"
          aria-labelledby="home-tab"
          visible={activeKey === 1}
        >
          <bidgely-home-survey></bidgely-home-survey>
        </CTabPane>
        <CTabPane className="widget-container"
          role="tabpanel"
          aria-labelledby="profile-tab"
          visible={activeKey === 2}
        >
          <bidgely-usage-insights></bidgely-usage-insights>
        </CTabPane>
        <CTabPane className="widget-container"
          role="tabpanel"
          aria-labelledby="contact-tab"
          visible={activeKey === 3}
        >
          <bidgely-similar-homes-insights></bidgely-similar-homes-insights>
        </CTabPane>
        <CTabPane className="widget-container"
          role="tabpanel"
          aria-labelledby="contact-tab"
          visible={activeKey === 4}
        >
          <bidgely-bill-itemisation></bidgely-bill-itemisation>
        </CTabPane>
        <CTabPane className="widget-container"
          role="tabpanel"
          aria-labelledby="contact-tab"
          visible={activeKey === 5}
        >
          <bidgely-rate-plan-comparison></bidgely-rate-plan-comparison>
        </CTabPane>
        <CTabPane className="widget-container"
          role="tabpanel"
          aria-labelledby="contact-tab"
          visible={activeKey === 6}
        >
          <bidgely-next-bill-projection></bidgely-next-bill-projection>
        </CTabPane>
        <CTabPane className="widget-container"
          role="tabpanel"
          aria-labelledby="contact-tab"
          visible={activeKey === 7}
        >
          <bidgely-recommendation-top-tips></bidgely-recommendation-top-tips>
        </CTabPane>
        <CTabPane className="widget-container"
          role="tabpanel"
          aria-labelledby="contact-tab"
          visible={activeKey === 8}
        >
          <bidgely-recommendation-tips></bidgely-recommendation-tips>
        </CTabPane>
        <CTabPane className="widget-container"
          role="tabpanel"
          aria-labelledby="contact-tab"
          visible={activeKey === 9}
        >
          <bidgely-recommendation-top-programs></bidgely-recommendation-top-programs>
        </CTabPane>
        <CTabPane className="widget-container"
          role="tabpanel"
          aria-labelledby="contact-tab"
          visible={activeKey === 10}
        >
          <bidgely-high-bill-analyser></bidgely-high-bill-analyser>
        </CTabPane>
        <CTabPane className="widget-container"
          role="tabpanel"
          aria-labelledby="contact-tab"
          visible={activeKey === 11}
        >
          <bidgely-engagement-view></bidgely-engagement-view>
        </CTabPane>
        <CTabPane className="widget-container"
          role="tabpanel"
          aria-labelledby="contact-tab"
          visible={activeKey === 12}
        >
          <bidgely-gb-download></bidgely-gb-download>
        </CTabPane>
        <CTabPane className="widget-container"
          role="tabpanel"
          aria-labelledby="contact-tab"
          visible={activeKey === 13}
        >
          <bidgely-home-profile-survey></bidgely-home-profile-survey>
        </CTabPane>
        <CTabPane className="widget-container"
          role="tabpanel"
          aria-labelledby="contact-tab"
          visible={activeKey === 14}
        >
          <bidgely-user-preferences></bidgely-user-preferences>
        </CTabPane>
      </CTabContent>
    </div>
  );
}

export default TabViewWidgets;
