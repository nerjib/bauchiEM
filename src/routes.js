/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import People from "@material-ui/icons/People";
import Settings from "@material-ui/icons/Settings";
import Poll from "@material-ui/icons/Poll";


import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";
import ClosedReports from "./components/reports/closedreports";
import FollowupReports from "components/reports/followupreports";
import KDMap from "components/map/kdmap";
import Projects from "views/projects/projects";
import FunctionalityReports from "views/reports/functionality/functionalityreport";
import Reports from "views/reports/reports";
import ProjectsMap from "components/map/projectsMap";
import ContractorsList from "views/contractors/contractorslist";
import SupervisorsList from "views/supervisors/supervisors";
import Functionality from "views/reports/functionality/functionality";
import Incidents from "views/reports/incidents";
import KDDashboard from "views/kd/dashboard";
import KDPunits from "views/kd/kdpunits";
import KDIncidents from "views/kd/incidents";

let dashboardRoutes;
const dashboardRoutes1 = [
  
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: KDDashboard,
    layout: "/admin"
  },
  
  {
    path: "/kdpunits",
    name: "Polling Units",
    icon: LocationOn,
    component: KDPunits,
    layout: "/admin"
  }  ,
 

  {
    path: "/incidents",
    name: "Incidents",
    icon: LocationOn,
    component: KDIncidents,
    layout: "/admin"
  }  
];


{/*
{
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/punits",
    name: "Polling Units",
    icon: LocationOn,
    component: Projects,
    layout: "/admin"
  }  ,
  {
    path: "/results",
    name: "Results",
    icon: Poll,
    component: Reports,
    layout: "/admin"
  }  ,
  {
    path: "/results",
    name: "Incidents",
    icon: LocationOn,
    component: Reports,
    layout: "/admin"
  }  ,
*/}

export default dashboardRoutes1;
