import { defineStore } from "pinia";

//1 argument - unique name of the store
//2 argument - object where we define things (states, actions...)

const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [
            { id: 1, title: "Buy some milk", isFav: false },
            { id: 2, title: "Play Gloomhaven", isFav: true }
        ]
    }),
    getters: {
        favs() {
            return this.tasks.filter(task => task.isFav)
        }
    }
})

export default useTaskStore