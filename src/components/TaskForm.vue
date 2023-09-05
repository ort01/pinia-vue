<template>
    <form @submit.prevent="handleSubmit">
        <input type="text" placeholder="I need to..." v-model="newTask">
        <button>Add Task</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import useTaskStore from '../stores/TaskStore';



//pinia store
const taskStore = useTaskStore()

//refs
const newTask = ref('')

//functions
const handleSubmit = () => {
    if (newTask.value.length) {
        taskStore.addTask({
            title: newTask.value,
            isFav: false,
            id: Math.floor(Math.random() * 100000)
        })
        newTask.value = ""
    }
}

</script>

<style lang="scss">
form {
    max-width: 400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 10px;

    & input {
        color: #555;
        border: none;
        padding: 10px;
        border-radius: 6px;
        text-align: center;
    }

    & button {
        background: #ffd859;
        border: 0;
        padding: 10px;
        font-family: "Poppins";
        border-radius: 6px;
        cursor: pointer;
        font-size: .8em;
    }
}
</style>