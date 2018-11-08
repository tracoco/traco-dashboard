export default [
    {
        type: "link",
        url: "/dashboard",
        icon: "dashboard",
        text: "Dashboard",
        id: 'db',
        children: [
            {
                id: "vol",
                icon: "timeline",
                text: "Volume"
            },
            {
                id: "cpty",
                icon: "contacts",
                text: "Counterparty"
            },
            {
                id: "clear",
                icon: "all_inclusive",
                text: "Clearing"
            }
        ]
    },
    {
        type: "link",
        url: "/mon",
        icon: "desktop_windows",
        id: "mon",
        text: "Monitor"
    },    
    {
        type: "link",
        url: "/hawtio",
        icon: "queue_play_next",
        id: "hawtio",
        text: "Hawtio"
    },
    {
        type: "divider",
        id: 'div'
    },
    {
        type: "link",
        url: "/about",
        icon: "info",
        text: "About",
        id: "about"
    }
]