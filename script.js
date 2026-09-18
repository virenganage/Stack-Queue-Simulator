/* =====================================================
   STACK & QUEUE SIMULATOR
   JavaScript Logic
   ===================================================== */


/* ================= DATA ================= */

let currentStructure = "stack";

let stack = [];
let queue = [];

let maxSize = 5;

let operationCount = 0;


/* ================= DOM ELEMENTS ================= */

const stackTab = document.getElementById("stackTab");
const queueTab = document.getElementById("queueTab");

const stackControls = document.getElementById("stackControls");
const queueControls = document.getElementById("queueControls");

const stackVisualization =
    document.getElementById("stackVisualization");

const queueVisualization =
    document.getElementById("queueVisualization");

const sizeInput =
    document.getElementById("sizeInput");

const valueInput =
    document.getElementById("valueInput");

const statusMessage =
    document.getElementById("statusMessage");

const capacityDisplay =
    document.getElementById("capacityDisplay");

const currentSize =
    document.getElementById("currentSize");

const maximumSize =
    document.getElementById("maximumSize");

const positionLabel =
    document.getElementById("positionLabel");

const positionValue =
    document.getElementById("positionValue");

const operationCounter =
    document.getElementById("operationCount");

const historyBox =
    document.getElementById("historyBox");


/* ================= STRUCTURE INFORMATION ================= */

const structureTag =
    document.getElementById("structureTag");

const structureTitle =
    document.getElementById("structureTitle");

const structureDescription =
    document.getElementById("structureDescription");

const principleTitle =
    document.getElementById("principleTitle");

const principleText =
    document.getElementById("principleText");


/* =====================================================
   TAB SWITCHING
   ===================================================== */

stackTab.addEventListener("click", () => {

    if (currentStructure === "stack") return;

    currentStructure = "stack";

    stackTab.classList.add("active");
    queueTab.classList.remove("active");

    stackControls.classList.remove("hidden");
    queueControls.classList.add("hidden");

    stackVisualization.classList.remove("hidden");
    queueVisualization.classList.add("hidden");

    updateStructureInformation();

    render();

});


queueTab.addEventListener("click", () => {

    if (currentStructure === "queue") return;

    currentStructure = "queue";

    queueTab.classList.add("active");
    stackTab.classList.remove("active");

    queueControls.classList.remove("hidden");
    stackControls.classList.add("hidden");

    queueVisualization.classList.remove("hidden");
    stackVisualization.classList.add("hidden");

    updateStructureInformation();

    render();

});


/* =====================================================
   STRUCTURE INFORMATION
   ===================================================== */

function updateStructureInformation() {

    if (currentStructure === "stack") {

        structureTag.textContent = "LIFO";

        structureTitle.textContent =
            "Stack Data Structure";

        structureDescription.textContent =
            "Stack follows the Last In, First Out (LIFO) principle. The element inserted last is removed first.";

        principleTitle.textContent = "LIFO";

        principleText.textContent =
            "Last In → First Out";

        positionLabel.textContent = "Top";

    } else {

        structureTag.textContent = "FIFO";

        structureTitle.textContent =
            "Queue Data Structure";

        structureDescription.textContent =
            "Queue follows the First In, First Out (FIFO) principle. The element inserted first is removed first.";

        principleTitle.textContent = "FIFO";

        principleText.textContent =
            "First In → First Out";

        positionLabel.textContent = "Front";

    }

}


/* =====================================================
   SIZE CONTROL
   ===================================================== */

sizeInput.addEventListener("change", () => {

    let newSize = parseInt(sizeInput.value);

    if (isNaN(newSize) || newSize < 1) {

        newSize = 1;

        sizeInput.value = 1;
    }

    if (newSize > 20) {

        newSize = 20;

        sizeInput.value = 20;
    }

    maxSize = newSize;

    capacityDisplay.textContent = maxSize;
    maximumSize.textContent = maxSize;

    setStatus(
        `Maximum size changed to ${maxSize}.`,
        "success"
    );

    render();

});


/* =====================================================
   STACK OPERATIONS
   ===================================================== */


/* PUSH */

document
    .getElementById("pushBtn")
    .addEventListener("click", () => {

        const value = getValue();

        if (value === null) return;

        if (stack.length >= maxSize) {

            setStatus(
                "Stack Overflow: Stack is full.",
                "error"
            );

            return;
        }

        stack.push(value);

        operationCount++;

        addHistory(`Push "${value}"`);

        setStatus(
            `"${value}" pushed onto the stack.`,
            "success"
        );

        clearInput();

        render();

    });


/* POP */

document
    .getElementById("popBtn")
    .addEventListener("click", () => {

        if (stack.length === 0) {

            setStatus(
                "Stack Underflow: Stack is empty.",
                "error"
            );

            return;
        }

        const value = stack.pop();

        operationCount++;

        addHistory(`Pop "${value}"`);

        setStatus(
            `"${value}" removed from the stack.`,
            "success"
        );

        render();

    });


/* PEEK */

document
    .getElementById("peekBtn")
    .addEventListener("click", () => {

        if (stack.length === 0) {

            setStatus(
                "Stack is empty. Nothing to peek.",
                "error"
            );

            return;
        }

        const value =
            stack[stack.length - 1];

        operationCount++;

        addHistory(`Peek → "${value}"`);

        setStatus(
            `Top element is "${value}".`,
            "success"
        );

    });


/* DISPLAY */

document
    .getElementById("displayBtn")
    .addEventListener("click", () => {

        operationCount++;

        if (stack.length === 0) {

            setStatus(
                "Stack is empty.",
                "success"
            );

            addHistory("Display → Empty Stack");

            return;
        }

        const values =
            stack.slice().reverse().join(" → ");

        setStatus(
            `Stack: ${values}`,
            "success"
        );

        addHistory("Display Stack");

    });


/* isEmpty */

document
    .getElementById("emptyBtn")
    .addEventListener("click", () => {

        operationCount++;

        const empty =
            stack.length === 0;

        setStatus(
            `isEmpty() → ${empty}`,
            "success"
        );

        addHistory(
            `isEmpty() → ${empty}`
        );

    });


/* isFull */

document
    .getElementById("fullBtn")
    .addEventListener("click", () => {

        operationCount++;

        const full =
            stack.length >= maxSize;

        setStatus(
            `isFull() → ${full}`,
            "success"
        );

        addHistory(
            `isFull() → ${full}`
        );

    });


/* CLEAR STACK */

document
    .getElementById("clearBtn")
    .addEventListener("click", () => {

        if (stack.length === 0) {

            setStatus(
                "Stack is already empty.",
                "success"
            );

            return;
        }

        stack = [];

        operationCount++;

        addHistory("Clear Stack");

        setStatus(
            "Stack cleared successfully.",
            "success"
        );

        render();

    });


/* =====================================================
   QUEUE OPERATIONS
   ===================================================== */


/* ENQUEUE */

document
    .getElementById("enqueueBtn")
    .addEventListener("click", () => {

        const value = getValue();

        if (value === null) return;

        if (queue.length >= maxSize) {

            setStatus(
                "Queue Overflow: Queue is full.",
                "error"
            );

            return;
        }

        queue.push(value);

        operationCount++;

        addHistory(`Enqueue "${value}"`);

        setStatus(
            `"${value}" added to the queue.`,
            "success"
        );

        clearInput();

        render();

    });


/* DEQUEUE */

document
    .getElementById("dequeueBtn")
    .addEventListener("click", () => {

        if (queue.length === 0) {

            setStatus(
                "Queue Underflow: Queue is empty.",
                "error"
            );

            return;
        }

        const value = queue.shift();

        operationCount++;

        addHistory(`Dequeue "${value}"`);

        setStatus(
            `"${value}" removed from the queue.`,
            "success"
        );

        render();

    });


/* QUEUE PEEK */

document
    .getElementById("queuePeekBtn")
    .addEventListener("click", () => {

        if (queue.length === 0) {

            setStatus(
                "Queue is empty. Nothing to peek.",
                "error"
            );

            return;
        }

        const value = queue[0];

        operationCount++;

        addHistory(`Peek → "${value}"`);

        setStatus(
            `Front element is "${value}".`,
            "success"
        );

    });


/* QUEUE DISPLAY */

document
    .getElementById("queueDisplayBtn")
    .addEventListener("click", () => {

        operationCount++;

        if (queue.length === 0) {

            setStatus(
                "Queue is empty.",
                "success"
            );

            addHistory("Display → Empty Queue");

            return;
        }

        setStatus(
            `Queue: ${queue.join(" → ")}`,
            "success"
        );

        addHistory("Display Queue");

    });


/* QUEUE isEmpty */

document
    .getElementById("queueEmptyBtn")
    .addEventListener("click", () => {

        operationCount++;

        const empty =
            queue.length === 0;

        setStatus(
            `isEmpty() → ${empty}`,
            "success"
        );

        addHistory(
            `isEmpty() → ${empty}`
        );

    });


/* QUEUE isFull */

document
    .getElementById("queueFullBtn")
    .addEventListener("click", () => {

        operationCount++;

        const full =
            queue.length >= maxSize;

        setStatus(
            `isFull() → ${full}`,
            "success"
        );

        addHistory(
            `isFull() → ${full}`
        );

    });


/* CLEAR QUEUE */

document
    .getElementById("queueClearBtn")
    .addEventListener("click", () => {

        if (queue.length === 0) {

            setStatus(
                "Queue is already empty.",
                "success"
            );

            return;
        }

        queue = [];

        operationCount++;

        addHistory("Clear Queue");

        setStatus(
            "Queue cleared successfully.",
            "success"
        );

        render();

    });


/* =====================================================
   INPUT HELPERS
   ===================================================== */

function getValue() {

    const value =
        valueInput.value.trim();

    if (value === "") {

        setStatus(
            "Please enter a value first.",
            "error"
        );

        valueInput.focus();

        return null;
    }

    return value;
}


function clearInput() {

    valueInput.value = "";

}


/* =====================================================
   STATUS
   ===================================================== */

function setStatus(message, type = "success") {

    statusMessage.textContent = message;

    const indicator =
        document.querySelector(".status-indicator");

    if (type === "error") {

        indicator.style.background =
            "var(--danger)";

    } else {

        indicator.style.background =
            "var(--success)";

    }

}


/* =====================================================
   RENDER
   ===================================================== */

function render() {

    renderStack();

    renderQueue();

    updateStatistics();

}


/* =====================================================
   STACK VISUALIZATION
   ===================================================== */

function renderStack() {

    stackVisualization.innerHTML = "";

    const slots = [];

    /*
        Display empty slots first and filled elements
        above them.
    */

    for (
        let i = 0;
        i < maxSize;
        i++
    ) {

        slots.push(null);

    }


    stack.forEach((value, index) => {

        slots[index] = value;

    });


    for (
        let i = 0;
        i < maxSize;
        i++
    ) {

        const slot =
            document.createElement("div");

        slot.className = "stack-slot";

        if (slots[i] !== null) {

            slot.classList.add("filled");

            if (
                i === stack.length - 1
            ) {

                slot.classList.add(
                    "top-element"
                );

            }

            slot.textContent =
                slots[i];

        } else {

            slot.textContent = "Empty";

        }

        stackVisualization.appendChild(slot);

    }

}


/* =====================================================
   QUEUE VISUALIZATION
   ===================================================== */

function renderQueue() {

    queueVisualization.innerHTML = "";

    for (
        let i = 0;
        i < maxSize;
        i++
    ) {

        const slot =
            document.createElement("div");

        slot.className = "queue-slot";

        if (queue[i] !== undefined) {

            slot.classList.add("filled");

            slot.textContent =
                queue[i];

            if (i === 0) {

                slot.classList.add(
                    "front-element"
                );

            }

            if (
                i === queue.length - 1
            ) {

                slot.classList.add(
                    "rear-element"
                );

            }

        } else {

            slot.textContent = "Empty";

        }

        queueVisualization.appendChild(slot);

    }

}


/* =====================================================
   STATISTICS
   ===================================================== */

function updateStatistics() {

    const data =
        currentStructure === "stack"
            ? stack
            : queue;

    currentSize.textContent =
        data.length;

    maximumSize.textContent =
        maxSize;

    capacityDisplay.textContent =
        maxSize;

    operationCounter.textContent =
        operationCount;


    if (data.length === 0) {

        positionValue.textContent = "-";

    } else {

        positionValue.textContent =
            currentStructure === "stack"
                ? data[data.length - 1]
                : data[0];

    }

}


/* =====================================================
   HISTORY
   ===================================================== */

function addHistory(operation) {

    const emptyMessage =
        historyBox.querySelector(
            ".empty-history"
        );

    if (emptyMessage) {

        emptyMessage.remove();

    }

    const item =
        document.createElement("div");

    item.className =
        "history-item";

    const operationText =
        document.createElement("span");

    operationText.className =
        "history-operation";

    operationText.textContent =
        operation;


    const time =
        document.createElement("span");

    time.className =
        "history-time";

    time.textContent =
        new Date().toLocaleTimeString();


    item.appendChild(operationText);

    item.appendChild(time);

    historyBox.prepend(item);

}


/* =====================================================
   CLEAR HISTORY
   ===================================================== */

document
    .getElementById("clearHistoryBtn")
    .addEventListener("click", () => {

        historyBox.innerHTML = `

            <div class="empty-history">

                <span>◌</span>

                <p>
                    No operations performed yet.
                </p>

            </div>

        `;

    });


/* =====================================================
   KEYBOARD SUPPORT
   ===================================================== */

valueInput.addEventListener(
    "keydown",
    (event) => {

        if (event.key !== "Enter") return;


        if (
            currentStructure === "stack"
        ) {

            document
                .getElementById("pushBtn")
                .click();

        } else {

            document
                .getElementById("enqueueBtn")
                .click();

        }

    }
);


/* =====================================================
   INITIALIZATION
   ===================================================== */

updateStructureInformation();

render();