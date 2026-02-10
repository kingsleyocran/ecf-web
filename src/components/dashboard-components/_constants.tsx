import React from "react";
import DashboardViewBlogs from "./views/DashboardViewBlogs";
import DashboardViewTeam from "./views/DashboardViewTeam";
import DashboardViewOverview from "./views/DashboardViewOverview";
import DashboardViewAdvisory from "./views/DashboardViewAdvisory";

export const dashboardViews = [
  {
    pageName: "Overview",
    view: <DashboardViewOverview />,
  },
  {
    pageName: "Team",
    view: <DashboardViewTeam />,
  },
  {
    pageName: "Advisory Circle",
    view: <DashboardViewAdvisory />,
  },
  {
    pageName: "Blogs",
    view: <DashboardViewBlogs />,
  },
];
