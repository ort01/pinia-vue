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
      <div>
        <button @click="taskStore.$reset">Reset</button>
      </div>
      <div>
        <button @click="filter = 'all'">All Tasks</button>
        <button @click="filter = 'favs'">Fav Tasks</button>
      </div>

    </nav>
    <div class="loading" v-if="isLoading">Loading data...</div>
    <div class="task-list" v-if="filter === 'all'">
      <div v-for="task in tasks">
        <TaskDetails :task="task" />
      </div>
      <p>You have {{ totalCount }} tasks left to do</p>
    </div>
    <div class="task-list" v-if="filter === 'favs'">
      <div v-for="task in favs">
        <TaskDetails :task="task" />
      </div>
      <p>You have {{ favCount }} favs left to do</p>
    </div>
  </main>
</template>

<script setup>
import useTaskStore from "./stores/TaskStore"
import TaskForm from "./components/TaskForm.vue";
import TaskDetails from "./components/taskDetails.vue"
import { ref } from "vue";
import { storeToRefs } from "pinia";

//pinia store
const taskStore = useTaskStore()

//storeToRefs; how to use states and getters from the pinia store as REFS; actions can NOT be used like this
const { tasks, isLoading, favs, totalCount, favCount } = storeToRefs(taskStore)

//refs
const filter = ref("all")

//fetch tasks with action; getting data from server
taskStore.getTasks()

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
  display: flex;
  justify-content: space-between;
  align-items: center;

  & button {
    display: inline-block;
    background: #bbb;
    border: 1px solid #ffd859;
    color: #ffd859;
    border-radius: 4px;
    padding: 4px 8px;
    cursor: pointer;
    font-size: .8em;

    &:not(:first-child) {
      margin-left: 10px;
    }
  }
}

.loading {
  max-width: 640px;
  border: 1px solid #ffd859;
  background: #ffe9a0;
  color: #3a3a3a;
  padding: 5px 0;
  text-align: center;
  margin: 30px auto;
  transition: all .3s;
}
</style>
