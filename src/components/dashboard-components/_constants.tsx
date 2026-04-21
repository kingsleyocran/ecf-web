import React from "react";
import DashboardViewBlogs from "./views/DashboardViewBlogs";
import DashboardViewTeam from "./views/DashboardViewTeam";
import DashboardViewOverview from "./views/DashboardViewOverview";
import DashboardViewAdvisory from "./views/DashboardViewAdvisory";
import DashboardViewVideos from "./views/DashboardViewVideos";
import DashboardViewReports from "./views/DashboardViewReports";
import DashboardViewArticles from "./views/DashboardViewArticles";
import DashboardViewOpeds from "./views/DashboardViewOpeds";
import DashboardViewEvents from "./views/DashboardViewEvents";
import DashboardViewNewsletters from "./views/DashboardViewNewsletters";
import DashboardViewCareers from "./views/DashboardViewCareers";
import DashboardViewNews from "./views/DashboardViewNews";

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
  {
    pageName: "Videos & Podcasts",
    view: <DashboardViewVideos />,
  },
  {
    pageName: "Reports",
    view: <DashboardViewReports />,
  },
  {
    pageName: "Articles",
    view: <DashboardViewArticles />,
  },
  {
    pageName: "Op-Eds",
    view: <DashboardViewOpeds />,
  },
  {
    pageName: "Events",
    view: <DashboardViewEvents />,
  },
  {
    pageName: "Newsletters",
    view: <DashboardViewNewsletters />,
  },
  {
    pageName: "Careers",
    view: <DashboardViewCareers />,
  },
  {
    pageName: "News",
    view: <DashboardViewNews />,
  },
];
