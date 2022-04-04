<template>
  <div>
    <navigation-bar />
    <v-container>
      <list-item
        :items="items"
        @deleted="removeitem"
        @add="additem"
        @updated="updateitem"
      ></list-item>
    </v-container>
  </div>
</template>

<script>
import ListItem from "@/components/ListItem";
import NavigationBar from "../Layouts/NavigationBar";
import ArticleService from "../services/ArticleService";

export default {
  name: "HomePage",
  components: {
    NavigationBar,
    ListItem,
  },
  data() {
    return {
      items: [],
    };
  },

  computed: {
    facture() {
      var solde = 0;
      this.$store.state.carts.forEach((item) => {
        solde = solde + item.price;
      });
      return solde;
    },
  },
  methods: {
    async getItems() {
      try {
        var articleService = new ArticleService();
        this.items = (await articleService.getArticle()).data;
      } catch (error) {
        console.log(error);
      }
    },
    async additem(item) {
      try {
        var articleService = new ArticleService();
        await articleService.createArticle(item);
      } catch (error) {
        console.log(error);
      } finally {
        this.getItems();
      }
    },
    async updateitem(item, id) {
      try {
        var articleService = new ArticleService();
        await articleService.updateArticle(item, id);
      } catch (error) {
        console.log(error);
      } finally {
        this.getItems();
      }
    },
    async removeitem(id) {
      try {
        var articleService = new ArticleService();
        await articleService.deleteArticle(id);
      } catch (error) {
        console.log(error);
      } finally {
        this.getItems();
      }
    },
  },
  async mounted() {
    await this.getItems();
  },
};
</script>
