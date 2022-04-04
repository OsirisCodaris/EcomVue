<template>
  <div>
    <navigation-bar />
    <v-container>
      <div class="row justify-center">
        <div class="col col-3" v-for="item in items" v-bind:key="item.id">
          <card-item
            :item="item"
            @add="additemcart(item)"
            @remove="removeitemcart(item)"
          />
        </div>
        <p class="mx-auto my-auto" v-if="items.length == 0">Pas d'articles</p>
      </div>
    </v-container>
  </div>
</template>

<script>
import CardItem from "@/components/CardItem";
import NavigationBar from "../Layouts/NavigationBar";
import ArticleService from "../services/ArticleService";
export default {
  name: "HomePage",

  components: {
    NavigationBar,
    CardItem,
  },
  data() {
    return {
      items: [],
    };
  },
  computed: {
    isoncart(item) {
      return this.$store.state.carts.includes(item);
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
    additemcart(item) {
      this.$store.dispatch("additems", item);
      console.log(this.$store.state.carts);
    },
    removeitemcart(item) {
      this.$store.dispatch("removeitems", item);
    },
  },
  async mounted() {
    await this.getItems();
  },
};
</script>
