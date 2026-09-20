function createPlan() {

    const input = document.getElementById("userInput").value.trim();

    if (input === "") {
        alert("Please tell me about your day first.");
        return;
    }

    // Understand the user's message
    const tasks = extractTasks(input);

    // Find available time
    const availableTime = findAvailableTime(input);

    // Give each task a priority score
    tasks.forEach(function(task) {

        let score = 0;

        if (task.urgent) {
            score += 50;
        }

        if (task.important) {
            score += 30;
        }

        if (task.time <= 30) {
            score += 5;
        }

        task.score = score;
    });


    // Sort according to importance
    tasks.sort(function(a, b) {
        return b.score - a.score;
    });


    // Create realistic plan
    let remainingTime = availableTime;

    const selectedTasks = [];
    const movedTasks = [];


    tasks.forEach(function(task) {

        if (remainingTime >= task.time) {

            selectedTasks.push(task);

            remainingTime -= task.time;

        } else {

            movedTasks.push(task);

        }
    });


    // Show Reality Check
    displayRealityCheck(
        availableTime,
        tasks,
        selectedTasks,
        movedTasks
    );


    // Show plan
    displayPlan(selectedTasks);


    document
        .getElementById("realitySection")
        .classList.remove("hidden");

    document
        .getElementById("planSection")
        .classList.remove("hidden");
}


/* -----------------------------
   UNDERSTAND USER'S MESSAGE
----------------------------- */

function extractTasks(text) {

    const tasks = [];

    const sentences = text.split(/[,.!?]/);


    sentences.forEach(function(sentence) {

        const clean = sentence.trim();

        if (clean.length < 5) {
            return;
        }


        const lowerText = clean.toLowerCase();


        const taskWords = [
            "assignment",
            "study",
            "exam",
            "presentation",
            "project",
            "prepare",
            "revision",
            "submit",
            "learn",
            "practice",
            "homework",
            "report",
            "code"
        ];


        const isTask = taskWords.some(function(word) {

            return lowerText.includes(word);

        });


        if (!isTask) {
            return;
        }


        let time = 45;


        if (
            lowerText.includes("study") ||
            lowerText.includes("revision") ||
            lowerText.includes("exam")
        ) {
            time = 60;
        }


        if (lowerText.includes("assignment")) {
            time = 60;
        }


        if (lowerText.includes("presentation")) {
            time = 45;
        }


        const urgent =
            lowerText.includes("today") ||
            lowerText.includes("tonight") ||
            lowerText.includes("tomorrow");


        const important =
            lowerText.includes("exam") ||
            lowerText.includes("assignment") ||
            lowerText.includes("deadline");


        tasks.push({
            name: clean,
            time: time,
            urgent: urgent,
            important: important,
            score: 0
        });

    });


    // If no recognizable task was found
    if (tasks.length === 0) {

        tasks.push({
            name: "Work on the task you described",
            time: 60,
            urgent: false,
            important: true,
            score: 30
        });
    }


    return tasks;
}


/* -----------------------------
   FIND AVAILABLE TIME
----------------------------- */

function findAvailableTime(text) {

    const hourMatch = text.match(
        /(\d+)\s*(hour|hours|hr|hrs)/i
    );


    if (hourMatch) {

        return Number(hourMatch[1]) * 60;
    }


    const minuteMatch = text.match(
        /(\d+)\s*(minute|minutes|min)/i
    );


    if (minuteMatch) {

        return Number(minuteMatch[1]);
    }


    // Default: 2 hours
    return 120;
}


/* -----------------------------
   REALITY CHECK
----------------------------- */

function displayRealityCheck(
    availableTime,
    tasks,
    selectedTasks,
    movedTasks
) {

    const box =
        document.getElementById("realityMessage");


    const totalTime = tasks.reduce(
        function(total, task) {
            return total + task.time;
        },
        0
    );


    if (totalTime > availableTime) {

        box.innerHTML = `
            <strong>⚠️ Your workload is larger than your available time.</strong>
            <br><br>

            Estimated work:
            <strong>${totalTime} minutes</strong>

            <br>

            Available time:
            <strong>${availableTime} minutes</strong>

            <br><br>

            I selected the most important tasks for today
            and moved the remaining work for later.
        `;

    } else {

        box.innerHTML = `
            <strong>✅ Your workload looks manageable.</strong>

            <br><br>

            Estimated work:
            <strong>${totalTime} minutes</strong>

            <br>

            Available time:
            <strong>${availableTime} minutes</strong>
        `;
    }
}


/* -----------------------------
   DISPLAY PLAN
----------------------------- */

function displayPlan(tasks) {

    const plan =
        document.getElementById("planList");


    plan.innerHTML = "";


    if (tasks.length === 0) {

        plan.innerHTML =
            "<p>No task fits into the available time.</p>";

        return;
    }


    tasks.forEach(function(task, index) {

        const item =
            document.createElement("div");


        item.className = "plan-item";


        item.innerHTML = `
            <div class="plan-number">
                ${index + 1}
            </div>

            <div class="plan-content">

                <h3>${task.name}</h3>

                <p>
                    Suggested focus time:
                    ${task.time} minutes
                </p>

            </div>
        `;


        plan.appendChild(item);

    });
}


/* -----------------------------
   RESET
----------------------------- */

function resetPlanner() {

    document.getElementById("userInput").value = "";


    document
        .getElementById("realitySection")
        .classList.add("hidden");


    document
        .getElementById("planSection")
        .classList.add("hidden");
}