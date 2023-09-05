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

        async addTask(task) {
            this.tasks.push(task)

            const res = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                body: JSON.stringify(task),
                headers: { 'Content-Type': 'application/json' }
            })

            if (res.error) {
                console.log(res.error);
            }
        },
        async deleteTask(id) {
            this.tasks = this.tasks.filter((t) => {
                return t.id !== id
            })

            const res = await fetch(`http://localhost:3000/tasks/${id}`, {
                method: 'DELETE'
            })

            if (res.error) {
                console.log(res.error);
            }
        },
        async toggleFav(id) {
            const task = this.tasks.find((t) => t.id == id)
            task.isFav = !task.isFav

            const res = await fetch(`http://localhost:3000/tasks/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({ isFav: task.isFav }),
                headers: { 'Content-Type': 'application/json' }
            })

            if (res.error) {
                console.log(res.error);
            }
        }
    }
})

export default useTaskStore