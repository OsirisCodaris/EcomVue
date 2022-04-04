<template>
  <v-data-table
    :headers="headers"
    :items="items"
    sort-by="calories"
    expanded.sync="true"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Mon stock</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Ajouter
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.img"
                      label="Image url"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Nom de l'article"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.price"
                      label="Prix"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Annuler </v-btn>
              <v-btn color="blue darken-1" text @click="save">
                Enregistrer
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >L'article sera supprimer?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Annuler</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >Continuer</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <!-- eslint-disable-next-line -->
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <!-- eslint-disable-next-line -->
    <template v-slot:item.img="{ item }">
      <v-img :src="item.img" aspect-ratio="1.7" max-height="50" contain></v-img>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Nom de l'article",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Prix (en F CFA)", value: "price" },
      { text: "Image", value: "img" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      idproduct: 0,
      img: "",
      name: "",
      price: 0,
    },
    defaultItem: {
      idproduct: 0,
      img: "",
      name: "",
      price: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Ajouter un article"
        : "Modifier un article";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    editItem(item) {
      this.editedIndex = item.idproduct;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = item.idproduct;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$emit("deleted", this.editedIndex);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        this.$emit("updated", this.editedItem, this.editedIndex);
      } else {
        this.$emit("add", this.editedItem);
      }
      this.close();
    },
  },
};
</script>
