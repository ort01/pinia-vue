import { defineStore } from "pinia";

//1 argument - unique name of the store
//2 argument - object where we define things (states, actions...)

const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [],
        isLoading: false,
        error: null
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

            try {
                const res = await fetch('http://localhost:3000/tasks')
                const data = await res.json()

                if (!res.ok) {
                    throw new Error("Ooops, something went wrong :(")
                } else {
                    this.tasks = data
                    this.error = null
                }

            } catch (err) {
                this.error = err.message
            }

            this.isLoading = false
        },

        async addTask(task) {

            try {
                const res = await fetch('http://localhost:3000/tasks', {
                    method: 'POST',
                    body: JSON.stringify(task),
                    headers: { 'Content-Type': 'application/json' }
                })
                if (!res.ok) {
                    throw new Error("Ooops, something went wrong :(")
                } else {
                    this.tasks.push(task)
                    this.error = null
                }
            } catch (err) {
                this.error = err.message
            }
        },

        async deleteTask(id) {

            try {
                const res = await fetch(`http://localhost:3000/tasks/${id}`, {
                    method: 'DELETE'
                })

                if (!res.ok) {
                    throw new Error("Ooops, something went wrong :(")
                } else {
                    this.tasks = this.tasks.filter((t) => {
                        return t.id !== id
                    })
                    this.error = null
                }

            } catch (err) {
                this.error = err.message
            }
        },

        async toggleFav(id) {
            const task = this.tasks.find((t) => t.id == id)
            task.isFav = !task.isFav

            try {
                const res = await fetch(`http://localhost:3000/tasks/${id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({ isFav: task.isFav }),
                    headers: { 'Content-Type': 'application/json' }
                })

                if (!res.ok) {
                    throw new Error("Ooops, something went wrong :(")
                } else {
                    this.error = null
                }

            } catch (err) {
                this.error = err.message
            }
        }
    }
})

export default useTaskStore