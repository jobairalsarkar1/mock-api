import crypto from "crypto";

export const generateApiKey = () => {
    return `df_live_${crypto.randomBytes(24).toString("hex")}`;
}