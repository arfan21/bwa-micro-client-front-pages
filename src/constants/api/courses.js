import axios from "src/configs/axios";

export default {
    all: () => axios.get(`/courses`).then((res) => res.data),
    detail: (id) => axios(`/courses/${id}`).then((res) => res.data),
};
