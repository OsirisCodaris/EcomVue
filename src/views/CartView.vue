<template>
  <div>
    <navigation-bar />
    <v-container>
      <div class="row">
        <div class="col col-8">
          <v-card
            class="my-12 row"
            min-height="400"
            v-if="this.$store.state.carts.length == 0"
          >
            <v-card-text class="my-auto row">
              <span class="mx-auto"
                >Pas d'article <v-icon>mdi-cart-off</v-icon></span
              >
            </v-card-text>
          </v-card>
          <div class="row">
            <div
              class="col col-6"
              v-for="item in this.$store.state.carts"
              v-bind:key="item.id"
            >
              <card-item
                :item="item"
                @add="additemcart(item)"
                @remove="removeitemcart(item)"
              />
            </div>
          </div>
        </div>
        <div class="col col-4">
          <v-card class="mx-auto my-12">
            <v-card-title>Payement</v-card-title>
            <v-card-text>
              <strong>Montant a payer : </strong>
              {{ facture }} F CFA
            </v-card-text>

            <v-card-text>
              <v-form v-model="valid">
                <v-container>
                  <v-row>
                    <v-radio-group
                      v-model="radio"
                      row
                      class="font-weight-light caption"
                    >
                      <v-radio label="Visa / Mastercard" value="1"></v-radio>
                      <v-radio label="Mobile Money" value="2"></v-radio>
                    </v-radio-group>
                    <div class="row" v-if="radio == '1'">
                      <v-col cols="12" md="9">
                        <v-text-field
                          v-model="ncarte"
                          :rules="NcarteRules"
                          :counter="14"
                          label="Numero de carte"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="3">
                        <v-text-field
                          v-model="cvv"
                          label="CVV"
                          :counter="3"
                          required
                        ></v-text-field>
                      </v-col>
                    </div>
                    <div class="row" v-else>
                      <v-col cols="12">
                        <v-text-field
                          v-model="phonenumber"
                          :rules="phoneNumberRules"
                          :counter="9"
                          label="Numero de téléphone"
                          required
                        ></v-text-field>
                      </v-col>
                    </div>
                    <v-btn
                      color="indigo"
                      dark
                      class="mx-auto my-5 row col-12"
                      @click="submit"
                      >Payer</v-btn
                    >
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import CardItem from "@/components/CardItem";
import NavigationBar from "../Layouts/NavigationBar";
export default {
  name: "HomePage",

  data() {
    return {
      valid: false,
      NcarteRules: [
        (v) => !!v || "Le numéro de carte est requis",
        (v) => v.length <= 14 || "Le numéro de carte doit contenir 14 chiffres",
        (v) => v.isNaN() || "Seul les chiffres sont valide",
      ],
      ncarte: "",
      cvv: "",
      phonenumber: "",
      radio: "1",
    };
  },

  components: {
    NavigationBar,
    CardItem,
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
    additemcart(item) {
      this.$store.dispatch("additems", item);
      console.log(this.$store.state.carts);
    },
    removeitemcart(item) {
      this.$store.dispatch("removeitems", item);
    },
  },
};
</script>
