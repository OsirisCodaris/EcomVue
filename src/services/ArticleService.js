import axios from "../plugins/axios";

class ArticleService {
  getArticle() {
    return axios.get("/products");
  }
  createArticle(item) {
    return axios.post("/products", item);
  }
  updateArticle(item, id) {
    return axios.put(`/products/${id}`, item);
  }
  deleteArticle(id) {
    return axios.delete(`/products/${id}`);
  }
}

export default ArticleService;
