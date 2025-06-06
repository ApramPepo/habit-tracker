import { Habit, CountableHabit, TimedHabit } from './habit.js';
import { HabitManager } from './manager.js';

const Factory = {
    counted : (name, goal) => new CountableHabit(name, goal),
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
        updateHabits(datePick.value);
    });

    addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const type = document.getElementById('type').value;
        const goal = document.getElementById('goal').value;

        const habit = Factory[type](name, goal);
        manager.addHabit(habit);
        updateHabits(datePick.value);
        form.reset();
    })

    habitList.addEventListener('click', (e) => {
        if (e.target.classList.contains('log-progress')) {
            const habitId = parseInt(e.target.dataset.habitId);
            const habit = manager.getHabits().find(h => h.id === habitId);
            const progress = parseInt(prompt(`Enter progress for ${habit.name}:`));
            if (!isNaN(progress) && progress >= 0) {
                habit.logProgress(datePick.value, progress);
                manager.saveToStorage();
                updateHabits(datePick.value);
            }
        }
    });

    function updateHabits(date) {
        const dateStr = new Date(date). toLocaleDateString();
        habitList.innerHTML = '';
        manager.getHabits().forEach(habit => {
            const li = document.createElement('li');
            li.className = `item ${habit.isCompleted(dateStr) ? 'completed' : ''}`;
            li.innerHTML = `
                ${habit.getDetails(dateStr)}
                <button class="log-progress" data-habit-id="${habit.id}">Log Progress</button>
            `;
            habitList.appendChild(li);
        });

        stats.innerHTML = `
            <p>Completion Rate: ${manager.getCompletionRate(dateStr)}%</p>
            <p>Total Streaks: ${manager.getTotalStreaks()}</p>
        `
    };
    updateHabits(datePick.value);
})