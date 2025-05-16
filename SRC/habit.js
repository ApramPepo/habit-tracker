export class Habit {
    constructor(name, goal) {
        this.id = Date.now();
        this.name = name;
        this.goal = parseInt(goal);
        this.logs = {};
    }

    logProgress(date, progress) {
        this.logs[date] = parseInt(progress);
    }

    getProgress(date) {
        return this.logs[date] || 0;
    }

    isCompleted(date) {
        return this.getProgress(date) >= this.goal;
    }

    getStreak() {
        let streak = 0;
        let today = new Date();
        let dateStr = today.toLocaleDateString();
        while (this.isCompleted(dateStr)) {
            streak++;
            today.setDate(today.getDate() - 1);
            dateStr = today.toLocaleDateString();
        }
        return streak;
    }

    getDetails(date) {
        return `${this.name}: ${this.getProgress(date)} / ${this.goal}`;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            goal: this.goal,
            logs: this.logs,
            type: this.type || 'habit',
        };
    }

    static fromJSON(json) {
        const habitClasses = {
            habit: Habit,
            counted: CountableHabit,
            timed: TimedHabit,
        };
        const HabitClass = habitClasses[json.type] || Habit;
        const habit = new HabitClass(json.name, json.goal);
        habit.id = json.id;
        habit.logs = json.logs || {};
        return habit;
    }
}

export class CountableHabit extends Habit {
    constructor(name, goal) {
        super(name, goal);
        this.type = 'counted';
    }

    getDetails(date) {
        return `${super.getDetails(date)} times`;
    }
}

export class TimedHabit extends Habit {
    constructor(name, goal) {
        super(name, goal);
        this.type = 'timed';
    }

    getDetails(date) {
        return `${super.getDetails(date)} minutes`;
    }
}