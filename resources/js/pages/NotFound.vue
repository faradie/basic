<template>
  <div>
    <section class="content-header">
      <h1>Halaman tidak ditemukan</h1>
    </section>
    <section class="content">
      <div class="error-page">
        <h2 class="headline text-red">404</h2>

        <div class="error-content">
          <h3>
            <i class="fa fa-warning text-red"></i> Oops! Something went wrong.
          </h3>

          <p>
            We will work on fixing that right away.
            Meanwhile, you may
            <router-link :to="{ name: 'index' }"><a >return to dashboard</a></router-link> or try to go home.
          </p>

        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>