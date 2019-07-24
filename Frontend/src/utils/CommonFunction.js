const CryptoJS = require('crypto-js');

const main_url = "http://192.168.1.10:8082/";
// const php_url = "http://103.29.91.26:8032/marter_hrm/admin/dashboard";
const remote_url = "http://192.168.43.59/marter_hrm";

function getUserInfo() {

    fetch(`${main_url}main/getUserInfo`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.length > 0) {
                setCookieData("user_info=", JSON.stringify(data[0]));
            }
            else {
                window.location = "http://192.168.43.59/marter_hrm"
            }
        })
}

function setCookieData(name, value) {
    var encrypt_text = CryptoJS.AES.encrypt(value, 'encrypt');
    sessionStorage.setItem(name, encrypt_text);
}

function getCookieData(name) {
    var data = sessionStorage.getItem(name);
    if (data !== null) {
        var decrypt_text = CryptoJS.AES.decrypt(data, 'encrypt');
        data = JSON.parse(decrypt_text.toString(CryptoJS.enc.Utf8));
    }
    return data;
}

function getUserId(name) {
    let user = getCookieData(name);
    if (user !== null) {
        let id = user.user_id;
        if (id > 0) {
            return id;
        }
        else return 0;
    }
}

function getActionStatus(status, data, createdBy) {
    var action = {
        checked_by: data.checked_by,
        verified_by: data.verified_by,
        approved_by: data.approved_by,
        rejected_by: data.rejected_by,
        status: data.status
    }
    if (status === 'checked') {
        action.checked_by = createdBy;
        action.status = 1;
    }
    else if (status === 'verified') {
        action.verified_by = createdBy;
        action.status = 2;
    }
    else if (status === 'approved') {
        action.approved_by = createdBy;
        action.status = 3
    }
    else if (status === 'rejected') {
        action.rejected_by = createdBy;
        action.status = 4;
    }
    return action;
}


export { main_url, remote_url, getUserInfo, setCookieData, getCookieData, getUserId, getActionStatus }