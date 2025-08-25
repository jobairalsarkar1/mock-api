import crypto from "crypto";

export const generateApiKey = () => {
    return `pa_live_${crypto.randomBytes(24).toString("hex")}`;
}