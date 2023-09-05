<template>
    <div class="task">
        <h3>{{ task.title }}</h3>
        <div class="task__icons">
            <i class="material-icons" @click="taskStore.deleteTask(task.id)">
                delete
            </i>
            <i class="material-icons" :class="{ active: task.isFav }" @click="taskStore.toggleFav(task.id)">
                favorite
            </i>
        </div>
    </div>
</template>

<script setup>
import useTaskStore from '../stores/TaskStore';

//props
defineProps({
    task: Object
})

//pinia
const taskStore = useTaskStore()

</script>

<style lang="scss">
.task {
    padding: 6px 20px;
    background: #fff;
    margin-top: 20px;
    border-radius: 4px;
    box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: space-between;
    align-items: center;

    & h3,
    &__icons {
        display: inline-block;
    }

    &__icons {
        text-align: right;
    }

    & i {
        font-size: 1.4em;
        margin-left: 6px;
        cursor: pointer;
        color: #bbb;
        transition: all .3s;

        &:hover {
            transform: translateY(-2px);
        }

        &.active {
            color: #51be4d;
        }
    }
}
</style>
