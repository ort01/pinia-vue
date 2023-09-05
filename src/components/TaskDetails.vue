<template>
    <div class="task">
        <h3>{{ task.title }}</h3>
        <div class="task__icons">
            <i class="material-icons">delete</i>
            <i class="material-icons">favorite</i>
        </div>
    </div>
</template>

<script setup>

defineProps({
    task: Object
})

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
    }
}
</style>
