import { buttonCatalog } from "@/utils/constants";

// setting the base data
export const predefinedBars = [
    {
        id: "predefined-1",
        is_shared: true,
        name: "Predefined Preset",
        desc: "This is predefined default bar with some items inside, use it as a start...",
        items: [
            buttonCatalog["Email - Websites"].outlook,
            buttonCatalog["Email - Websites"].gmail,
            buttonCatalog["Social Media Sites"].reddit,
            buttonCatalog["Social Media Sites"].facebook,
            buttonCatalog["Call a Person"].skype
        ]
    },
    {
        id: "predefined-2",
        is_shared: true,
        name: "Predefined Preset",
        desc: "This is predefined default bar with some items inside, use it as a start...",
        items: [
            buttonCatalog["Email - Websites"].gmail,
            buttonCatalog["Social Media Sites"].reddit,
            buttonCatalog["Call a Person"].skype
        ]
    },
    {
        id: "predefined-3",
        is_shared: true,
        name: "Predefined Preset",
        desc: "This is predefined default bar with some items inside, use it as a start...",
        items: [
            buttonCatalog["Email - Websites"].outlook,
            buttonCatalog["Email - Websites"].gmail,
            buttonCatalog["Social Media Sites"].reddit,
            buttonCatalog["Social Media Sites"].facebook
        ]
    },
    {
        id: "predefined-4",
        is_shared: true,
        name: "Predefined Preset",
        desc: "This is predefined default bar with some items inside, use it as a start...",
        items: [
            buttonCatalog["Email - Websites"].gmail,
            buttonCatalog["Call a Person"].skype,
            buttonCatalog["Social Media Sites"].facebook
        ]
    }
];
