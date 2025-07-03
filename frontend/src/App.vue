<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Mail Server Admin</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="refreshData">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }} - Mail Server for iiex.tech</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  methods: {
    refreshData() {
      this.$root.$emit('refresh-data');
    }
  }
};
</script>
