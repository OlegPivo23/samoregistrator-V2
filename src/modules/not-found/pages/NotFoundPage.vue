<template>
  <div class="fullscreen bg-light-gradient text-black text-center q-pa-md flex flex-center">
    <div class="card-shadow bg-white p-[40px] rounded-[12px]">
      <div style="font-size: 30vh">404</div>
      <div class="text-h2">Такой страницы не существует!</div>

      <q-btn class="q-mt-xl" color="primary" to="/" label="Вернуться на главную" no-caps />
    </div>
  </div>
</template>

<style scoped>
.bg-light-gradient {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.card-shadow {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
</style>
