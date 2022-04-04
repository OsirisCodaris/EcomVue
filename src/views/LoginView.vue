<template>
  <div>
    <navigation-bar />
    <v-container>
      <div class="col col-8 mx-auto my-12">
        <v-card class="row">
          <v-card-title>Connexion</v-card-title>
          <v-card-text>
            <v-form>
              <form>
                <v-text-field
                  v-model="user.name"
                  label="Nom d'utilisateur"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="user.password"
                  label="Mot de passe"
                  required
                ></v-text-field>

                <v-btn class="mx-auto" @click="submit" color="secondary">
                  submit
                </v-btn>
              </form>
            </v-form>
          </v-card-text>
        </v-card>
        <v-alert
          class="my-5"
          dismissible
          border="top"
          color="red lighten-2"
          dark
          v-if="errors"
        >
          {{ errors }}
        </v-alert>

        {{ token }}
      </div>
    </v-container>
  </div>
</template>

<script>
import NavigationBar from "../Layouts/NavigationBar";
import AuthService from "../services/AuthService";

export default {
  name: "LoginPage",

  components: {
    NavigationBar,
  },
  data() {
    return {
      user: {
        name: "",
        password: "",
      },
      token: "",
      errors: false,
    };
  },
  methods: {
    async submit() {
      try {
        this.errors = false;
        var authService = new AuthService();
        this.token = (await authService.getToken(this.user)).data.token;
        this.$store.dispatch("settoken", this.token);
        this.$router.push("/storemanager");
      } catch (error) {
        if (error.response.status == 401) {
          this.errors = "Les informations entrées sont incorrectes";
        } else {
          this.errors = error.response.data.title;
        }
      }
    },
  },
};
</script>
