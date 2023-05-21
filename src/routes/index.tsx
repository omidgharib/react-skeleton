import React from 'react';
import { lazy } from 'react';
// import Support from "../views/Workspace/Support";
// import GettingStarted from "../views/Workspace/GettingStarted";
// import Account from "../views/Workspace/Account";
// import ChangePassword from "../views/Workspace/Account/ChangePassword";
// import Workflow from '../views/Workflow'
// import { WorkflowDeploy } from "../views/Workflow/Deploy";
// import { WorkflowTemplate } from "../views/Workflow/Template";

// const Billing = lazy(() => import('../views/Workspace/Billing'))
// const Workspace = lazy(() => import('../views/Workspace'));
// const Tasks = lazy(() => import('../Views/Tasks'));
import Tasks from "../Views/Tasks";

const mainRoutes = [
    // {
    //     id: 9,
    //     path: "workflow/template",
    //     component: WorkflowTemplate,
    //     sidebarName: "",
    //     pageCategory: '',
    //     iconClass: '',
    //     bottomNavigation: true,
    // },
    // {
    //     id: 8,
    //     path: "workflow/deploy",
    //     component: WorkflowDeploy,
    //     sidebarName: "",
    //     pageCategory: '',
    //     iconClass: '',
    //     bottomNavigation: true,
    // },
    // {
    //     id: 7,
    //     path: "Workflow",
    //     sidebarName: "",
    //     pageCategory: '',
    //     iconClass: '',
    //     component: Workflow,
    //     bottomNavigation: true,
    // },
    // {
    //     id: 6,
    //     path: "Account/ChangePassword",
    //     title: "",
    //     pageCategory: '',
    //     iconClass: '',
    //     component: ChangePassword,
    //     bottomNavigation: true,
    // },
    // {
    //     id: 2,
    //     path: "GettingStarted",
    //     sidebarName: "Getting Started",
    //     pageCategory: 'Getting Started',
    //     iconClass: 'icon icon-24 icon-launch icon-space mb-1',
    //     component: GettingStarted,
    //     bottomNavigation: true,
    // },
    // {
    //     id: 3,
    //     path: "ContactForm",
    //     sidebarName: "Support",
    //     pageCategory: 'Support',
    //     iconClass: 'icon icon-24 icon-headset icon-space mb-1',
    //     component: Support,
    //     bottomNavigation: true,
    // },

    // {
    //     id: 4,
    //     path: "Billing",
    //     sidebarName: "Billing",
    //     pageCategory: 'Billing',
    //     iconClass: 'icon icon-24 icon-master-card icon-space mb-1',
    //     component: Billing,
    //     bottomNavigation: true,
    // },
    // {
    //     id: 5,
    //     path: "Account",
    //     sidebarName: "Account",
    //     pageCategory: 'Account',
    //     iconClass: 'icon icon-24 icon-account icon-space mb-1',
    //     component: Account,
    //     bottomNavigation: true,
    // },
    // {
    //     id: 1,
    //     path: "Workspace",
    //     sidebarName: "Home",
    //     pageCategory: 'Workspace',
    //     iconClass: 'icon icon-24 icon-home icon-space mb-1',
    //     component: Workspace,
    //     bottomNavigation: true,
    // },
    // {
    //     // id: 0,
    //     path: "/Tasks",
    //     element: Tasks
    // },
    {
        path: "/Tasks",
        element: <Tasks />,
    },

    // { redirect: true, path: "/", to: "/Tasks" }
];

export default mainRoutes;
