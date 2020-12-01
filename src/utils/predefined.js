import { allButtons } from "@/utils/constants";

// setting the base data
export const predefinedBars = [
    {
        id: "predefined-1",
        is_shared: true,
        name: "Predefined Preset",
        desc: "This is predefined default bar with some items inside, use it as a start...",
        items: [
            allButtons.outlook_com_mail,
            allButtons.gmail,
            allButtons.reddit,
            allButtons.facebook,
            allButtons.skype
        ]
    },
    {
        id: "predefined-2",
        is_shared: true,
        name: "Predefined Preset",
        desc: "This is predefined default bar with some items inside, use it as a start...",
        items: [
            allButtons.gmail,
            allButtons.reddit,
            allButtons.skype
        ]
    },
    {
        id: "predefined-3",
        is_shared: true,
        name: "Predefined Preset",
        desc: "This is predefined default bar with some items inside, use it as a start...",
        items: [
            allButtons.outlook_com_mail,
            allButtons.gmail,
            allButtons.reddit,
            allButtons.facebook
        ]
    },
    {
        id: "predefined-4",
        is_shared: true,
        name: "Predefined Preset",
        desc: "This is predefined default bar with some items inside, use it as a start...",
        items: [
            allButtons.gmail,
            allButtons.skype,
            allButtons.facebook
        ]
    }
];
