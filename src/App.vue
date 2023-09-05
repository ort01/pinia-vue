<template>
  <main>
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia logo">
      <h1>Pinia Tasks</h1>
    </header>
    <p>all</p>
    <div class="task-list">
      <div v-for="task in taskStore.tasks">
        <TaskDetails :task="task" />
      </div>
    </div>
    <p>favs</p>
    <div class="task-list">
      <div v-for="task in taskStore.favs">
        <TaskDetails :task="task" />
      </div>
    </div>
  </main>
</template>

<script setup>
import useTaskStore from "./stores/TaskStore"
import TaskDetails from "./components/taskDetails.vue"

//pinia store
const taskStore = useTaskStore()

</script>

<style lang="scss">
header {
  text-align: center;
  background: #e7e7e7;
  padding: 20px 0px 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  & img {
    max-width: 60px;
    transform: rotate(-10deg);
  }

  h1 {
    margin: 0;
    font-size: 2em;
    padding-top: 25px;
    margin-left: 15px;
    color: #777;
    transform: rotate(2deg);
  }
}

.task-list {
  max-width: 640px;
  margin: 20px auto;
}
</style>
