<template>
  <v-card class="mx-auto my-12">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img height="250" :src="item.img"></v-img>

    <v-card-title>{{ item.name }}</v-card-title>

    <v-divider class="mx-4"></v-divider>

    <v-card-text>
      <v-chip-group active-class="deep-purple accent-4 white--text" column>
        <p class="headline" color="light-green accent-3" text>
          {{ item.price }} F CFA
        </p>
      </v-chip-group>
    </v-card-text>
    <div>
      <v-card-actions class="justify-end">
        <div>
          <v-btn
            color="deep-purple lighten-2"
            text
            @click="add"
            v-if="selected"
          >
            Ajouter
            <v-icon>mdi-cart-plus</v-icon>
          </v-btn>
          <v-btn color="deep-orange lighten-2" text @click="remove" v-else>
            Retirer
            <v-icon>mdi-cart-remove</v-icon>
          </v-btn>
        </div>
      </v-card-actions>
    </div>
  </v-card>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    selected() {
      return !this.$store.state.idcarts.includes(this.item.idproduct);
    },
  },
  methods: {
    add() {
      return this.$emit("add");
    },
    remove() {
      return this.$emit("remove");
    },
  },
};
</script>
