export type CategoryResolvable = "general" | "miscellaneous" | "fun" | "games" | "moderation" | "backup";
export const Categories = ["general", "miscellaneous", "fun", "games", "moderation", "backup"];
export const validFlags = [
    "--messages:false", 
    "--roles:false", 
    "--roles-perms:false", 
    "--channels:false", 
    "--channel-perms:false", 
    "--emojis:false", 
    "--server-name:false", 
    "--server-icon:false", 
    "--server-settings:false"
];