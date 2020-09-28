export default class UserInfo {
    constructor(obj) {
        this.userName = obj.userName;
        this.userJob = obj.userJob;  
    }
    setUserInfo(name, job) {
        this.userName.textContent = name;
        this.userJob.textContent = job;

    }
    updateUserInfo(inputName, inputInfo) {
        inputName.value = this.userName.textContent;
        inputInfo.value = this.userJob.textContent;
    }
}