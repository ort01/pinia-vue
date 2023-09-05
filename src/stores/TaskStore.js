import { defineStore } from "pinia";

//1 argument - unique name of the store
//2 argument - object where we define things (states, actions...)

const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [],
        isLoading: false
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
        async getTasks() {
            this.isLoading = true

            const res = await fetch('http://localhost:3000/tasks')
            const data = await res.json()

            this.tasks = data
            this.isLoading = false
        },

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