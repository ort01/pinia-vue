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
        //works kinda like a computed property; its a function that return a value
        favs() {
            return this.tasks.filter(task => task.isFav)
        },
        favCount() {
            return this.tasks.reduce((previousValue, currentValue) => {
                return currentValue.isFav ? previousValue + 1 : previousValue
            }, 0)
        },
        totalCount: (state) => {
            return state.tasks.length
        }
    },
    actions: {
        addTask(task) {
            this.tasks.push(task)
        },
        deleteTask(id) {
            this.tasks = this.tasks.filter((t) => {
                return t.id !== id
            })
        },
        toggleFav(id) {
            const task = this.tasks.find((t) => t.id == id)
            task.isFav = !task.isFav
        }
    }
})

export default useTaskStore