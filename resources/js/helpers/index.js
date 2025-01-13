import moment from "moment/moment";

export default {
    tokenIsValid(){
        const tokenExpiresAt = localStorage.getItem("token_expiresAt");
        if(!tokenExpiresAt) return false;

        return moment(tokenExpiresAt).format("YYYY-MM-DD HH:mm:ss") >= moment().format("YYYY-MM-DD HH:mm:ss");
    }
}