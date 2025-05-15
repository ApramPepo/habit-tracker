export class Habit {
    constructor(name, goal){
        this.id = Date.now();
        this.name = name;
        this.goal = goal;
        this.log = {};
    }

    logging(date, progress) {
        this.log[date] = parseInt(progress);
    }

    getProgress(date) {
        return this.log[date] || 0;
    }

    isComplete(date) {
        return this.getProgress(date) >= this.goal;
    }

    getSteak() {
        let Streak = 0;
        let today = new Date();
        let dateStr = today.toLocaleDateString();

        while (this.isComplete(dateStr)) {
            Streak++;
            today.setDate(today.getDate() - 1)
            dateStr = today.toLocaleDateString();
        }
        return Streak;
    }

    getDetails(date) {
        return `${this.name}: ${this.getProgress(date)} / ${this.goal}`;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            goal: this.goal,
            log: this.log || `habit`,
        };
    }

    static fromJSON(json) {
        const habitClass = {
            habit: Habit,
            countable: CountableHabit,
            timed: TimedHabit,
        };
        const HabitClass = habitClass[json.type] || Habit;
        const habit = new HabitClass(json.name, json.goal);
        habit.id = json.id;
        habit.log = json.logs
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