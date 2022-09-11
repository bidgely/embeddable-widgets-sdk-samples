/* eslint-disable */
import { useEffect, useState } from "react";
import { CNavItem, CNavLink, CNav, CTabContent, CTabPane } from "@coreui/react";
import "./TabView.css";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { RenderWidgetSdk } from "../../service/bidgely-sdk-service";

function TabViewWidgets(props) {
  const history = useHistory();
  if (
    !props.widgetResponseObject ||
    props.widgetResponseObject.messageType !== "SUCCESS"
  ) {
    //route back to form page
    history.push("/");
  }

  const [activeKey, setActiveKey] = useState(1);

  // console.log("instance id dekh", props.widgetResponseObject.data);
  // useEffect(() => {
  //   RenderWidgetSdk(
  //     props.widgetResponseObject.data.instanceId,
  //     "bidgely-home-survey",
  //     {},
  //     {}
  //   ).then((res) => {
  //     console.log(res);
  //   });
  // });

  // const changeWidget = (widgetId) => {
  //   setActiveKey(widgetId);
  //   console.log("trying wid4 ", props.widgetResponseObject.data.instanceId);
  //   RenderWidgetSdk(
  //     props.widgetResponseObject.data.instanceId,
  //     "bidgely-bill-itemisation",
  //     {},
  //     {}
  //   ).then((res) => {
  //     console.log(res);
  //   });
  // };

  return (
    <div className="tab-view">
      <CNav className="tab-list" variant="tabs" role="tablist">
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 1}
            onClick={() => setActiveKey(1)}
          >
            Home Survey
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 2}
            onClick={() => setActiveKey(2)}
          >
            User Insights
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 3}
            onClick={() => setActiveKey(3)}
          >
            Similar Home Insights
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 4}
            onClick={() => changeWidget(4)}
          >
            Bill Itemisation
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 5}
            onClick={() => setActiveKey(5)}
          >
            Rate Plan Comparision
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 6}
            onClick={() => setActiveKey(6)}
          >
            Next Bill Projection
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 7}
            onClick={() => setActiveKey(7)}
          >
            Recommendation top tips
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 8}
            onClick={() => setActiveKey(8)}
          >
            Recommendation tips
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 9}
            onClick={() => setActiveKey(9)}
          >
            High Bill analyser
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

const mapStatetoProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStatetoProps)(TabViewWidgets);
