import { atom, selector } from "recoil";

export const notifications = atom({
    key: "networkAtom",
    default: {
        network: 4, 
        jobs: 6, 
        messaging: 3, 
        notifications: 3
    }
});

export const totalNotificationSelector = selector({
    key: "totalNotificationSelector",
    get: ({get}) => {
        const allNotifications = get(notifications);
        return allNotifications.network + 
        allNotifications.jobs + 
        allNotifications.notifications + 
        allNotifications.messaging
    }
})

// async version

// const notifications1 = atom({
//     key: "networkAtom1",
//     default: selector({
//         key: "networkAtom1/Default",
//         get: async () => {
//             const response = await fetch("https://sum-server.100xdevs.com/notifications");
//             const data = await response.json();
//             return data;
//         }
//     })  
// });