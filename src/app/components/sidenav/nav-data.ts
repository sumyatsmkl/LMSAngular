import { INavbarData } from "./helper";

export const navbarData: INavbarData[] =[
    {
        routeLink:'/dashboard',
        icon:'fal fa-home',
        label: 'Dashboard'
    },
{
    routeLink: '/setup',
    icon: 'fal fa-cog',
    label: 'Setup',
    items:[
        {
            routeLink: 'setup/language',
            label: 'Language',
        },
        {
            routeLink: 'setup/country',
            label: 'Salutation',
        },
        {
            routeLink: 'setup/salutation',
            label: 'Marital Status',
        }
    ]
},
{
    routeLink: '/manageuser',
    icon: 'fal fa-chart-bar',
    label: 'Manage User'
}
];