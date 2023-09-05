<template>
  <main>
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia logo">
      <h1>Pinia Tasks</h1>
    </header>
    <div class="new-task-form">
      <TaskForm />
    </div>
    <nav class="filter">
      <button @click="filter = 'all'">All Tasks</button>
      <button @click="filter = 'favs'">Fav Tasks</button>
    </nav>
    <div class="task-list" v-if="filter === 'all'">
      <div v-for="task in taskStore.tasks">
        <TaskDetails :task="task" />
      </div>
      <p>You have {{ taskStore.totalCount }} tasks left to do</p>
    </div>
    <div class="task-list" v-if="filter === 'favs'">
      <div v-for="task in taskStore.favs">
        <TaskDetails :task="task" />
      </div>
      <p>You have {{ taskStore.favCount }} favs left to do</p>
    </div>
  </main>
</template>

<script setup>
import useTaskStore from "./stores/TaskStore"
import TaskForm from "./components/TaskForm.vue";
import TaskDetails from "./components/taskDetails.vue"
import { ref } from "vue";

//pinia store
const taskStore = useTaskStore()

//refs
const filter = ref("all")

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

.new-task-form {
  background: #e7e7e7;
  padding: 20px 0;
}

.task-list {
  max-width: 640px;
  margin: 20px auto;

  & p {
    text-align: center;
    font-size: .8em;
    color: #bbb;
  }
}

.filter {
  width: 640px;
  margin: 20px auto 10px;
  text-align: right;

  & button {
    display: inline-block;
    margin-left: 10px;
    background: #bbb;
    border: 1px solid #ffd859;
    color: #ffd859;
    border-radius: 4px;
    padding: 4px 8px;
    cursor: pointer;
    font-size: .8em;
  }
}
</style>
