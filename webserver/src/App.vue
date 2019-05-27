<template>
	  <v-app>
  <div id="app">
    <div id="nav">
      <router-link to="/ws">WS</router-link> |
      <router-link to="/sse1">HTTP/1.1</router-link> |
	  <router-link to="/sses">HTTPS/1.1</router-link> |
	  <router-link to="/sse2">HTTP/2</router-link>
    </div>
    <router-view/>
  </div>
	</v-app>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
