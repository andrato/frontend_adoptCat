import axios from 'axios';
const body = `http://192.168.1.176:8080`; // `http://localhost:8080/`;

class UserService {
    addUser(obj) {
        console.log(objCat)
        return axios.post(body + `/user/create`, obj);
    }

    getUser(obj) {
        return axios.post(body + `/user`, obj);
    }
}

// export object of this class
export default new UserService();