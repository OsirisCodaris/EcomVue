<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="40"
      />

      ECOM
    </div>

    <v-spacer></v-spacer>
    <v-btn href="#/" text>
      <span class="mr-2">Magasin</span>
      <v-icon>mdi-store</v-icon>
    </v-btn>
    <v-btn href="#/paniers" text>
      <span class="mr-2">Mon Panier</span>
      <v-badge
        color="green"
        :content="$store.state.carts.length"
        v-if="$store.state.carts.length > 0"
      >
        <v-icon>mdi-cart</v-icon></v-badge
      >
      <v-icon v-else>mdi-cart</v-icon>
    </v-btn>
    <v-btn href="#/storemanager" v-if="$store.state.token" text>
      <span class="mr-2">Stock</span>
      <v-icon>mdi-cog-outline</v-icon>
    </v-btn>
    <v-btn href="#/login" text v-else>
      <span class="mr-2">Connexion</span>
      <v-icon>mdi-account-circle</v-icon>
    </v-btn>
    <v-btn @click="logout" text v-if="$store.state.token">
      <span class="mr-2">Déconnexion</span>
      <v-icon>mdi-run-fast</v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("settoken", null);
      this.$router.push("/");
    },
  },
};
</script>
