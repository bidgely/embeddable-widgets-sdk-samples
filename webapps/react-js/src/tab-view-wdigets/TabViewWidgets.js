/* eslint-disable */
import { useState } from "react";
import { CNavItem, CNavLink, CNav, CTabContent, CTabPane } from "@coreui/react";
import "./TabView.css";
function TabViewWidgets(props) {
  const [activeKey, setActiveKey] = useState(1);
  return (
    <div className="tab-view">
      <CNav className="tab-list" variant="tabs" role="tablist">
        <CNavItem>
          <CNavLink
            // href="javascript:void(0);"
            active={activeKey === 1}
            onClick={() => setActiveKey(1)}
          >
            Home Survey
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            //href="javascript:void(0);"
            active={activeKey === 2}
            onClick={() => setActiveKey(2)}
          >
            User Insights
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            // href="javascript:void(0);"
            active={activeKey === 3}
            onClick={() => setActiveKey(3)}
          >
            Similar Home Insights
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            // href="javascript:void(0);"
            active={activeKey === 4}
            onClick={() => setActiveKey(4)}
          >
            Bidgely Bill Itemisation
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            // href="javascript:void(0);"
            active={activeKey === 5}
            onClick={() => setActiveKey(5)}
          >
            Bidgely Rate Plan Comparision
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            // href="javascript:void(0);"
            active={activeKey === 6}
            onClick={() => setActiveKey(6)}
          >
            Bidgely Next Bill Projection
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            // href="javascript:void(0);"
            active={activeKey === 7}
            onClick={() => setActiveKey(7)}
          >
            Bidgely Recommendation top tips
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            // href="javascript:void(0);"
            active={activeKey === 8}
            onClick={() => setActiveKey(8)}
          >
            Bidgely Recommendation tips
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            // href="javascript:void(0);"
            active={activeKey === 9}
            onClick={() => setActiveKey(9)}
          >
            Bidgely High Bill analyser
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane
          role="tabpanel"
          aria-labelledby="home-tab"
          visible={activeKey === 1}
        >
          <bidgely-home-survey></bidgely-home-survey>
        </CTabPane>
        <CTabPane
          role="tabpanel"
          aria-labelledby="profile-tab"
          visible={activeKey === 2}
        >
          <bidgely-usage-insights></bidgely-usage-insights>
        </CTabPane>
        <CTabPane
          role="tabpanel"
          aria-labelledby="contact-tab"
          visible={activeKey === 3}
        >
          <bidgely-similar-homes-insights></bidgely-similar-homes-insights>
        </CTabPane>
        <CTabPane
          role="tabpanel"
          aria-labelledby="contact-tab"
          visible={activeKey === 4}
        >
          <bidgely-bill-itemisation></bidgely-bill-itemisation>
        </CTabPane>
        <CTabPane
          role="tabpanel"
          aria-labelledby="contact-tab"
          visible={activeKey === 5}
        >
          <bidgely-rate-plan-comparison></bidgely-rate-plan-comparison>
        </CTabPane>
        <CTabPane
          role="tabpanel"
          aria-labelledby="contact-tab"
          visible={activeKey === 6}
        >
          <bidgely-next-bill-projection></bidgely-next-bill-projection>
        </CTabPane>
        <CTabPane
          role="tabpanel"
          aria-labelledby="contact-tab"
          visible={activeKey === 7}
        >
          <bidgely-recommendation-top-tips></bidgely-recommendation-top-tips>
        </CTabPane>
        <CTabPane
          role="tabpanel"
          aria-labelledby="contact-tab"
          visible={activeKey === 8}
        >
          <bidgely-recommendation-tips></bidgely-recommendation-tips>
        </CTabPane>
        <CTabPane
          role="tabpanel"
          aria-labelledby="contact-tab"
          visible={activeKey === 9}
        >
          <bidgely-high-bill-analyser></bidgely-high-bill-analyser>
        </CTabPane>
      </CTabContent>
    </div>
  );
}

export default TabViewWidgets;
