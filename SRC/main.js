import {Habit, CountableHabit, TimedHabit } from './habit.js'
import { HabitManager } from './manager.js'

const Factory = {
    countable: (name, goal) => new CountableHabit(name, goal),
    timed: (name, goal) => new TimedHabit(name, goal),
};

document.addEventListener('DOMContentLoaded', () => {
    const manager = new HabitManager();
    const form = document.getElementById('form');
    const habitList = document.getElementById('list');
    const stats = document.getElementById('stats');
    const datePick = document.getElementById('date-pick');

    const today = new Date().toISOString().split('T')[0];
    datePick.value = today;

    datePick.addEventListener('change', () => {
        
    })
})