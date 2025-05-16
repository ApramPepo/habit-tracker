import { Habit } from './habit.js'

export class HabitManager {
    constructor() {
        this.habits = [];
        this.loadFromStorage();
    }

    addHabit(habit) {
        this.habits.push(habit);
        this.saveToStorage();
    }

    getHabits() {
        return this.habits;
    }

    getCompRate(date) {
        const completed = this.habits.filter(h => h.isCompleted(date)).length;
        return this.habits.length ? (completed / this.habits.length * 100).toFixed(2) : 0;
    }

    getTotalStreaks() {
        return this.habits.reduce((sum, h) => sum + h.getStreaks(), 0);
    }

    saveToStorage() {
        localStorage.setItem('habits', JSON.stringify(this.habits.map(h => h.toJSON())));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('habits');
        if (stored) {
            this.habits = JSON.parse(stored).map(json => Habit.fromJSON(json));
        }
    }
}