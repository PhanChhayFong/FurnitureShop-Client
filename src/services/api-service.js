// import http from "../api/http-common";
import axios from "axios";
import Alart from "./Alart";
const basePath = `http://localhost:5000/api/v1/`;
const token = localStorage.getItem("token");
const item = token ? JSON.parse(token) : "";
const config = (e) =>
  axios.create({
    baseURL: basePath,
    headers: {
      "Content-type": e ? "application/json" : "multipart/form-data",
      Authorization: "Bearer " + item.token,
    },
  });
class ApiService {
  getAll(tb) {
    return config(true).get(`/${tb}`);
  }
  get(tb, id) {
    return config(true).get(`/${tb}/${id}`);
  }
  getLastOrder(tb) {
    return config(true).get(`/${tb}/get/maxOrder`);
  }
  updateOrder(tb, Cid, Nid) {
    return config(true).put(`/${tb}/update/Order/${Cid}/${Nid}`);
  }
  create(tb, data) {
    return config(false).post(`${tb}`, data);
  }
  updateEnable(tb, id) {
    return config(true).put(`/${tb}/enable/${id}`);
  }
  updateActive(tb, id, data) {
    return config(true).put(`/${tb}/active/${id}`, data);
  }
  updateStatus(tb, id) {
    return config(true).put(`/${tb}/${id}`);
  }
  update(tb, id, data) {
    return config(false).put(`${tb}/${id}`, data);
  }
  updatePassword(tb, id, oldPass, data) {
    console.log(`${tb}/${id}/${oldPass}`);
    return config(true)
      .put(`${tb}/${id}/${oldPass}`, data)
      .catch((err) => {
        if (err.response)
          return Alart.alartLoginError(err.response.status, err.response.data);
      });
  }
  delete(tb, id) {
    return config(true).delete(`/${tb}/${id}`);
  }
  deleteAll(tb) {
    return config(true).delete(`/${tb}`);
  }
  findByTitle(tb, title) {
    return config(true).get(`/${tb}?title=${title}`);
  }
  // forgotPass(tb, data) {
  //   // console.log(data)
    
  //   return (config(true)
  //   .post(`${tb}`, data)
  //   .catch((err) => {
  //     if (err.response)
  //       return Alart.alartLoginError(err.response.status, err.response.data);
  //   }));
  // }
}

export default new ApiService();
