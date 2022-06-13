import axios from 'axios';
const body = `http://192.168.1.176:8080`; // `http://localhost:8080/`;

class CatsService {
    getCats() {
        return axios.get(body);
    }

    deleteCat(objId) {
        return axios.delete(body, objId);
    }

    addCat(objCat) {
        return axios.post(body + `/create`, objCat);
    }

    updateCat(objCat) {
        return axios.post(body + `/update`, objCat);
    }
}

// export object of this class
export default new CatsService();