import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/* =========================================================
   CONFIGURATION
========================================================= */

const ASSESSMENT_DURATION = 30 * 60; // 30 minutes
const PASSING_PERCENTAGE = 80;
const MAX_WARNINGS = 3;
const LOCKOUT_DURATION = 48 * 60 * 60 * 1000; // 48 hours

const STORAGE_KEYS = {
  SESSION: "assessmentSession",
  PASSED: "passedTopics",
  LOCKOUTS: "assessmentLockouts",
  ATTEMPTS: "assessmentAttempts",
  HISTORY: "assessmentHistory",
};

/* =========================================================
   CATEGORIES
========================================================= */

const CATEGORIES = [
  {
    id: "frontend",
    name: "Frontend Development",
    description:
      "Build strong foundations in modern frontend development.",
    topics: [
      {
        id: "react",
        name: "React",
        description:
          "Test your understanding of React components, hooks, props, state and rendering.",
      },
      {
        id: "javascript",
        name: "JavaScript",
        description:
          "Test your knowledge of JavaScript fundamentals, arrays, objects, functions and async programming.",
      },
    ],
  },
  {
    id: "web",
    name: "Web Development",
    description:
      "Evaluate your knowledge of the core technologies behind the web.",
    topics: [
      {
        id: "html",
        name: "HTML",
        description:
          "Test your understanding of semantic HTML, forms, accessibility and document structure.",
      },
      {
        id: "css",
        name: "CSS",
        description:
          "Test your knowledge of layout, flexbox, grid, responsive design and styling.",
      },
    ],
  },
];

/* =========================================================
   QUESTION HELPER
========================================================= */

const makeQuestions = (items) =>
  items.map(([question, options, answer], index) => ({
    id: index + 1,
    question,
    options,
    answer,
  }));

/* =========================================================
   QUESTION BANK
   20 QUESTIONS PER TOPIC
========================================================= */

const QUESTION_BANK = {
  /* ---------------- REACT ---------------- */

  react: makeQuestions([
    [
      "What is React?",
      [
        "A JavaScript library for building user interfaces",
        "A database",
        "A backend framework",
        "A programming language",
      ],
      0,
    ],
    [
      "React is mainly used for building what?",
      ["User interfaces", "Databases", "Operating systems", "Servers"],
      0,
    ],
    [
      "Which hook is used to manage state in a functional component?",
      ["useState", "useRoute", "useStyle", "useComponent"],
      0,
    ],
    [
      "Which hook is commonly used for side effects?",
      ["useEffect", "useState", "useProps", "useHTML"],
      0,
    ],
    [
      "What does JSX allow developers to write?",
      [
        "HTML-like syntax inside JavaScript",
        "SQL inside CSS",
        "Python inside HTML",
        "Java inside JavaScript",
      ],
      0,
    ],
    [
      "What are props in React?",
      [
        "Data passed from a parent component to a child",
        "Database records",
        "CSS files",
        "Browser cookies",
      ],
      0,
    ],
    [
      "Why is the key prop used when rendering lists?",
      [
        "To help React identify list items",
        "To style the list",
        "To create a database key",
        "To make the list responsive",
      ],
      0,
    ],
    [
      "What is a React component?",
      [
        "A reusable piece of UI",
        "A database table",
        "A CSS property",
        "A browser extension",
      ],
      0,
    ],
    [
      "Which method is commonly used to render a list in React?",
      ["map()", "push()", "join()", "sort()"],
      0,
    ],
    [
      "What is conditional rendering?",
      [
        "Rendering UI based on a condition",
        "Rendering only CSS",
        "Rendering database tables",
        "Rendering without JavaScript",
      ],
      0,
    ],
    [
      "What does useContext help with?",
      [
        "Sharing data through React's context",
        "Creating CSS animations",
        "Connecting directly to SQL",
        "Creating HTML documents",
      ],
      0,
    ],
    [
      "What is a controlled input?",
      [
        "An input whose value is controlled by React state",
        "An input controlled only by CSS",
        "An input controlled by the browser",
        "An input without a value",
      ],
      0,
    ],
    [
      "What can happen when React state changes?",
      [
        "The component can re-render",
        "The browser closes",
        "The database is deleted",
        "CSS stops working",
      ],
      0,
    ],
    [
      "What does lifting state up mean?",
      [
        "Moving shared state to a common parent",
        "Moving state to CSS",
        "Deleting state",
        "Moving state into HTML",
      ],
      0,
    ],
    [
      "What is React Fragment used for?",
      [
        "Grouping elements without adding an extra DOM element",
        "Creating a database",
        "Adding CSS",
        "Creating routes",
      ],
      0,
    ],
    [
      "What does useMemo help with?",
      [
        "Memoizing a calculated value",
        "Creating a component",
        "Changing the URL",
        "Sending an HTTP request automatically",
      ],
      0,
    ],
    [
      "What does useCallback memoize?",
      [
        "A function reference",
        "A CSS class",
        "An HTML element",
        "A database query",
      ],
      0,
    ],
    [
      "What is React StrictMode mainly used for?",
      [
        "Development-time checks",
        "Database management",
        "Production hosting",
        "CSS styling",
      ],
      0,
    ],
    [
      "Which event handler is commonly used for button clicks?",
      ["onClick", "onPressButton", "clickEvent", "buttonClick"],
      0,
    ],
    [
      "Which syntax is commonly used to export a default component?",
      [
        "export default Component",
        "send default Component",
        "default Component",
        "component.export",
      ],
      0,
    ],
  ]),

  /* ---------------- JAVASCRIPT ---------------- */

  javascript: makeQuestions([
    [
      "Which keyword declares a block-scoped variable that can be reassigned?",
      ["let", "const", "static", "define"],
      0,
    ],
    [
      "Which keyword declares a variable that cannot be reassigned?",
      ["const", "let", "var", "fixed"],
      0,
    ],
    [
      "What does === check?",
      [
        "Strict equality",
        "Only value equality",
        "Only type equality",
        "Assignment",
      ],
      0,
    ],
    [
      "Which method creates a new array by transforming each element?",
      ["map()", "filter()", "reduce()", "find()"],
      0,
    ],
    [
      "Which method returns elements that satisfy a condition?",
      ["filter()", "map()", "push()", "join()"],
      0,
    ],
    [
      "Which method is commonly used to accumulate an array into one value?",
      ["reduce()", "map()", "filter()", "slice()"],
      0,
    ],
    [
      "What is a Promise used for?",
      [
        "Representing the eventual result of an asynchronous operation",
        "Creating CSS",
        "Creating HTML",
        "Declaring constants",
      ],
      0,
    ],
    [
      "Which syntax is commonly used to work with Promises in a synchronous-looking way?",
      ["async/await", "try/HTML", "sync/await", "wait/then"],
      0,
    ],
    [
      "What does typeof return?",
      [
        "A string describing the type of a value",
        "The value itself",
        "A Promise",
        "An object only",
      ],
      0,
    ],
    [
      "Which syntax accesses the name property of an object called user?",
      ["user.name", "user->name", "user:name", "user/name"],
      0,
    ],
    [
      "What is object destructuring?",
      [
        "Extracting properties from an object into variables",
        "Deleting an object",
        "Converting CSS to JavaScript",
        "Creating a Promise",
      ],
      0,
    ],
    [
      "What does the spread operator (...) commonly do?",
      [
        "Expands iterable or object values",
        "Stops a function",
        "Creates a loop",
        "Declares a variable",
      ],
      0,
    ],
    [
      "Which syntax creates a template literal?",
      ["Backticks", "Single quotes only", "Double quotes only", "Parentheses"],
      0,
    ],
    [
      "What is a closure?",
      [
        "A function that retains access to its lexical scope",
        "A closed browser tab",
        "A CSS selector",
        "A database connection",
      ],
      0,
    ],
    [
      "Which method attaches an event listener to a DOM element?",
      [
        "addEventListener()",
        "addEvent()",
        "listenEvent()",
        "eventListenerAdd()",
      ],
      0,
    ],
    [
      "What does JSON.parse() do?",
      [
        "Converts JSON text into a JavaScript value",
        "Converts JavaScript into JSON text",
        "Creates HTML",
        "Creates CSS",
      ],
      0,
    ],
    [
      "Which browser API can store key-value data locally?",
      ["localStorage", "browserStorageSQL", "localDatabaseCSS", "sessionCSS"],
      0,
    ],
    [
      "Which method selects the first matching element in the DOM?",
      ["querySelector()", "selectFirst()", "getElement()", "findElement()"],
      0,
    ],
    [
      "Which syntax creates an arrow function?",
      ["() => {}", "function => {}", "arrow() {}", "=> function()"],
      0,
    ],
    [
      "What is the main difference between null and undefined?",
      [
        "null is an intentional empty value, while undefined often means no value was assigned",
        "They are always exactly the same",
        "undefined is always a number",
        "null is always a string",
      ],
      0,
    ],
  ]),

  /* ---------------- HTML ---------------- */

  html: makeQuestions([
    [
      "What does HTML stand for?",
      [
        "HyperText Markup Language",
        "HighText Machine Language",
        "Hyper Transfer Machine Language",
        "Home Tool Markup Language",
      ],
      0,
    ],
    [
      "Which element is used for the main heading?",
      ["<h1>", "<heading>", "<head>", "<title>"],
      0,
    ],
    [
      "Which element creates a hyperlink?",
      ["<a>", "<link>", "<href>", "<url>"],
      0,
    ],
    [
      "Which attribute provides alternative text for an image?",
      ["alt", "src", "href", "title"],
      0,
    ],
    [
      "Which element is used to create a form?",
      ["<form>", "<input>", "<fieldset>", "<submit>"],
      0,
    ],
    [
      "Which attribute connects a label to an input?",
      ["for", "connect", "target", "input-id"],
      0,
    ],
    [
      "Which input type is appropriate for an email address?",
      ["email", "mail", "text-email", "address"],
      0,
    ],
    [
      "Which element creates a button?",
      ["<button>", "<btn>", "<input-button>", "<click>"],
      0,
    ],
    [
      "What is a semantic HTML element?",
      [
        "An element that describes its meaning",
        "An element used only for CSS",
        "An element without attributes",
        "An element used only for JavaScript",
      ],
      0,
    ],
    [
      "Which element represents the main content of a page?",
      ["<main>", "<content>", "<body-main>", "<primary>"],
      0,
    ],
    [
      "Which element represents a standalone section of content?",
      ["<section>", "<part>", "<area>", "<content-section>"],
      0,
    ],
    [
      "Which element creates an unordered list?",
      ["<ul>", "<ol>", "<list>", "<li>"],
      0,
    ],
    [
      "Which element represents a table header cell?",
      ["<th>", "<td>", "<thead-cell>", "<header>"],
      0,
    ],
    [
      "Which attribute makes a form field mandatory?",
      ["required", "must", "validate", "needed"],
      0,
    ],
    [
      "Which element is used for multi-line text input?",
      ["<textarea>", "<text>", "<input-area>", "<multiline>"],
      0,
    ],
    [
      "Which element creates a dropdown list?",
      ["<select>", "<dropdown>", "<option-list>", "<choice>"],
      0,
    ],
    [
      "Which attribute displays a hint inside an input?",
      ["placeholder", "hint", "help", "message"],
      0,
    ],
    [
      "Which attribute should be unique within an HTML document?",
      ["id", "class", "name", "style"],
      0,
    ],
    [
      "Which meta tag helps make a page responsive on mobile devices?",
      [
        'meta name="viewport"',
        'meta name="mobile"',
        'meta name="responsive"',
        'meta name="screen"',
      ],
      0,
    ],
    [
      "Which attribute can improve accessibility by providing an accessible name?",
      ["aria-label", "access-name", "label-text", "accessibility"],
      0,
    ],
  ]),

  /* ---------------- CSS ---------------- */

  css: makeQuestions([
    [
      "What does CSS stand for?",
      [
        "Cascading Style Sheets",
        "Computer Style Syntax",
        "Creative Style System",
        "Cascading Syntax System",
      ],
      0,
    ],
    [
      "What does the CSS box model include?",
      [
        "Content, padding, border and margin",
        "Only content and margin",
        "Only padding and border",
        "Width and height only",
      ],
      0,
    ],
    [
      "Which property creates a flex container?",
      ["display: flex", "flex: display", "position: flex", "layout: flex"],
      0,
    ],
    [
      "Which property creates a grid container?",
      ["display: grid", "grid: display", "layout: grid", "position: grid"],
      0,
    ],
    [
      "What does margin control?",
      [
        "Space outside an element's border",
        "Space inside an element",
        "Text size",
        "Element color",
      ],
      0,
    ],
    [
      "What does padding control?",
      [
        "Space between content and border",
        "Space outside the element",
        "Font size",
        "Element position only",
      ],
      0,
    ],
    [
      "What does display: none do?",
      [
        "Removes the element from the layout",
        "Makes the element transparent",
        "Moves it to the top",
        "Makes it fixed",
      ],
      0,
    ],
    [
      "Which position value keeps an element relative to the viewport?",
      ["fixed", "relative", "static", "inline"],
      0,
    ],
    [
      "Which property controls stacking order?",
      ["z-index", "stack", "layer", "order-index"],
      0,
    ],
    [
      "Which CSS feature is commonly used for responsive design?",
      ["Media queries", "SQL queries", "HTML queries", "DOM queries"],
      0,
    ],
    [
      "What is rem based on by default?",
      [
        "The root element's font size",
        "The parent width",
        "The viewport width",
        "The body height",
      ],
      0,
    ],
    [
      "Which CSS unit is relative to the parent element's font size?",
      ["em", "rem", "vh", "px"],
      0,
    ],
    [
      "Which property controls the space between flex or grid items?",
      ["gap", "space", "spacing", "item-gap"],
      0,
    ],
    [
      "Which property controls horizontal distribution in a flex container?",
      ["justify-content", "align-items", "flex-space", "horizontal-align"],
      0,
    ],
    [
      "Which property controls cross-axis alignment in a flex container?",
      ["align-items", "justify-items", "cross-align", "align-content-only"],
      0,
    ],
    [
      "What does box-sizing: border-box do?",
      [
        "Includes padding and border inside the declared width and height",
        "Removes padding",
        "Removes the border",
        "Makes an element fixed",
      ],
      0,
    ],
    [
      "Which pseudo-class applies styles when an element is hovered?",
      [":hover", ":mouse", ":active-hover", ":pointer"],
      0,
    ],
    [
      "Which selector targets a class named card?",
      [".card", "#card", "card", "*card"],
      0,
    ],
    [
      "Which syntax creates a CSS custom property?",
      ["--primary-color", "$primary-color", "@primary-color", "css-primary"],
      0,
    ],
    [
      "Which property prevents content from extending outside an element?",
      ["overflow", "content-limit", "clip-content", "outside"],
      0,
    ],
  ]),
};

/* =========================================================
   STORAGE HELPERS
========================================================= */

const readStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);

    if (!raw) {
      return fallback;
    }

    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};

const writeStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage errors.
  }
};

const removeStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore storage errors.
  }
};

/* =========================================================
   TIME FORMAT
========================================================= */

const formatTime = (seconds) => {
  const safeSeconds = Math.max(0, seconds);

  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = safeSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
};

const formatDateTime = (timestamp) => {
  if (!timestamp) return "";

  return new Date(timestamp).toLocaleString();
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const Assessment = () => {
  const navigate = useNavigate();

  /* -------------------------------------------------------
     INITIAL STORED DATA
  ------------------------------------------------------- */

  const [initialSession] = useState(() =>
    readStorage(STORAGE_KEYS.SESSION, null)
  );

  const [initialPassedTopics] = useState(() =>
    readStorage(STORAGE_KEYS.PASSED, {})
  );

  const [initialLockouts] = useState(() =>
    readStorage(STORAGE_KEYS.LOCKOUTS, {})
  );

  const [initialAttempts] = useState(() =>
    readStorage(STORAGE_KEYS.ATTEMPTS, {})
  );

  const sessionIsActive =
    initialSession &&
    initialSession.active === true &&
    initialSession.endAt &&
    initialSession.endAt > Date.now();

  /* -------------------------------------------------------
     STAGE
  ------------------------------------------------------- */

  const [stage, setStage] = useState(
    sessionIsActive ? "assessment" : "category"
  );

  /* -------------------------------------------------------
     CATEGORY / TOPIC
  ------------------------------------------------------- */

  const [selectedCategoryId, setSelectedCategoryId] = useState(
    sessionIsActive ? initialSession.categoryId : null
  );

  const [selectedTopicId, setSelectedTopicId] = useState(
    sessionIsActive ? initialSession.topicId : null
  );

  /* -------------------------------------------------------
     DEVICE STATES
  ------------------------------------------------------- */

  const [cameraStatus, setCameraStatus] = useState("pending");
  const [microphoneStatus, setMicrophoneStatus] = useState("pending");
  const [screenStatus, setScreenStatus] = useState("pending");
  const [browserStatus, setBrowserStatus] = useState("pending");
  const [connectionStatus, setConnectionStatus] = useState("pending");

  const [cameraStream, setCameraStream] = useState(null);

  /* -------------------------------------------------------
     ASSESSMENT STATE
  ------------------------------------------------------- */

  const [answers, setAnswers] = useState(
    sessionIsActive ? initialSession.answers || {} : {}
  );

  const [currentQuestion, setCurrentQuestion] = useState(
    sessionIsActive ? initialSession.currentQuestion || 0 : 0
  );

  const [assessmentEndAt, setAssessmentEndAt] = useState(
    sessionIsActive ? initialSession.endAt : null
  );

  const [timeLeft, setTimeLeft] = useState(
    sessionIsActive
      ? Math.max(
          0,
          Math.ceil((initialSession.endAt - Date.now()) / 1000)
        )
      : ASSESSMENT_DURATION
  );

  /* -------------------------------------------------------
     WARNINGS / RESULT
  ------------------------------------------------------- */

  const [warnings, setWarnings] = useState(
    sessionIsActive ? initialSession.warnings || 0 : 0
  );

  const [warningReason, setWarningReason] = useState("");

  const [result, setResult] = useState(null);

  /* -------------------------------------------------------
     STORED USER DATA
  ------------------------------------------------------- */

  const [passedTopics, setPassedTopics] = useState(initialPassedTopics);

  const [lockouts, setLockouts] = useState(initialLockouts);

  const [attempts, setAttempts] = useState(initialAttempts);

  /* -------------------------------------------------------
     REFS
  ------------------------------------------------------- */

  const videoRef = useRef(null);

  const cameraStreamRef = useRef(null);
  const screenStreamRef = useRef(null);

  const stageRef = useRef(stage);
  const warningsRef = useRef(warnings);
  const isFinishedRef = useRef(false);

  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  useEffect(() => {
    warningsRef.current = warnings;
  }, [warnings]);

  /* -------------------------------------------------------
     SELECTED CATEGORY / TOPIC
  ------------------------------------------------------- */

  const selectedCategory = useMemo(
    () =>
      CATEGORIES.find(
        (category) => category.id === selectedCategoryId
      ),
    [selectedCategoryId]
  );

  const selectedTopic = useMemo(
    () =>
      selectedCategory?.topics.find(
        (topic) => topic.id === selectedTopicId
      ),
    [selectedCategory, selectedTopicId]
  );

  const questions = selectedTopicId
    ? QUESTION_BANK[selectedTopicId] || []
    : [];

  /* -------------------------------------------------------
     TOPIC STATUS
  ------------------------------------------------------- */

  const topicPassed = selectedTopicId
    ? Boolean(passedTopics[selectedTopicId])
    : false;

  const topicLockoutUntil = selectedTopicId
    ? lockouts[selectedTopicId]
    : null;

  const topicIsLocked =
    topicLockoutUntil && topicLockoutUntil > Date.now();

  /* -------------------------------------------------------
     STOP MEDIA
  ------------------------------------------------------- */

  const stopMedia = () => {
    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach((track) => {
        track.stop();
      });

      cameraStreamRef.current = null;
    }

    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((track) => {
        track.stop();
      });

      screenStreamRef.current = null;
    }

    setCameraStream(null);
  };

  /* -------------------------------------------------------
     CLEANUP MEDIA
  ------------------------------------------------------- */

  useEffect(() => {
    return () => {
      stopMedia();
    };
  }, []);

  /* -------------------------------------------------------
     CAMERA PREVIEW
  ------------------------------------------------------- */

  useEffect(() => {
    if (!videoRef.current || !cameraStream) {
      return;
    }

    videoRef.current.srcObject = cameraStream;

    videoRef.current
      .play()
      .catch(() => {
        // Browser may require user interaction.
      });
  }, [cameraStream]);

  /* =========================================================
     VIOLATION HANDLING
  ========================================================= */

  const disqualifyAssessment = (reason) => {
    if (isFinishedRef.current) {
      return;
    }

    isFinishedRef.current = true;

    const topicId = selectedTopicId;

    const currentAttempts = attempts[topicId] || 0;
    const nextAttempt = currentAttempts + 1;

    const retryAt = Date.now() + LOCKOUT_DURATION;

    const updatedAttempts = {
      ...attempts,
      [topicId]: nextAttempt,
    };

    const updatedLockouts = {
      ...lockouts,
      [topicId]: retryAt,
    };

    setAttempts(updatedAttempts);
    setLockouts(updatedLockouts);

    writeStorage(STORAGE_KEYS.ATTEMPTS, updatedAttempts);
    writeStorage(STORAGE_KEYS.LOCKOUTS, updatedLockouts);

    const history = readStorage(STORAGE_KEYS.HISTORY, []);

    history.push({
      categoryId: selectedCategoryId,
      topicId,
      score: 0,
      status: "disqualified",
      warnings: MAX_WARNINGS,
      attempts: nextAttempt,
      completedAt: Date.now(),
      reason,
    });

    writeStorage(STORAGE_KEYS.HISTORY, history);

    removeStorage(STORAGE_KEYS.SESSION);

    setResult({
      status: "disqualified",
      score: 0,
      correct: 0,
      total: questions.length,
      warnings: MAX_WARNINGS,
      attempts: nextAttempt,
      retryAt,
      reason,
    });

    stopMedia();

    setStage("result");
  };

  const handleViolation = (reason) => {
    if (
      stageRef.current !== "assessment" ||
      isFinishedRef.current
    ) {
      return;
    }

    const nextWarnings = Math.min(
      warningsRef.current + 1,
      MAX_WARNINGS
    );

    warningsRef.current = nextWarnings;

    setWarnings(nextWarnings);
    setWarningReason(reason);

    if (nextWarnings >= MAX_WARNINGS) {
      disqualifyAssessment(reason);
    }
  };

  /* =========================================================
     FINISH ASSESSMENT
  ========================================================= */

  const finishAssessment = () => {
    if (isFinishedRef.current) {
      return;
    }

    isFinishedRef.current = true;

    const totalQuestions = questions.length;

    let correct = 0;

    questions.forEach((question) => {
      if (answers[question.id] === question.answer) {
        correct += 1;
      }
    });

    const score =
      totalQuestions > 0
        ? Math.round((correct / totalQuestions) * 100)
        : 0;

    const passed = score >= PASSING_PERCENTAGE;

    const currentAttempts = attempts[selectedTopicId] || 0;
    const nextAttempt = currentAttempts + 1;

    const updatedAttempts = {
      ...attempts,
      [selectedTopicId]: nextAttempt,
    };

    setAttempts(updatedAttempts);
    writeStorage(STORAGE_KEYS.ATTEMPTS, updatedAttempts);

    let retryAt = null;

    if (passed) {
      const updatedPassedTopics = {
        ...passedTopics,
        [selectedTopicId]: true,
      };

      setPassedTopics(updatedPassedTopics);

      writeStorage(
        STORAGE_KEYS.PASSED,
        updatedPassedTopics
      );
    } else {
      retryAt = Date.now() + LOCKOUT_DURATION;

      const updatedLockouts = {
        ...lockouts,
        [selectedTopicId]: retryAt,
      };

      setLockouts(updatedLockouts);

      writeStorage(
        STORAGE_KEYS.LOCKOUTS,
        updatedLockouts
      );
    }

    const history = readStorage(STORAGE_KEYS.HISTORY, []);

    history.push({
      categoryId: selectedCategoryId,
      topicId: selectedTopicId,
      score,
      correct,
      total: totalQuestions,
      status: passed ? "passed" : "failed",
      warnings,
      attempts: nextAttempt,
      completedAt: Date.now(),
    });

    writeStorage(STORAGE_KEYS.HISTORY, history);

    removeStorage(STORAGE_KEYS.SESSION);

    setResult({
      status: passed ? "passed" : "failed",
      score,
      correct,
      total: totalQuestions,
      warnings,
      attempts: nextAttempt,
      retryAt,
    });

    stopMedia();

    setStage("result");
  };

  /* =========================================================
     TIMER
  ========================================================= */

  useEffect(() => {
    if (
      stage !== "assessment" ||
      !assessmentEndAt
    ) {
      return;
    }

    const tick = () => {
      const remaining = Math.max(
        0,
        Math.ceil(
          (assessmentEndAt - Date.now()) / 1000
        )
      );

      setTimeLeft(remaining);

      if (remaining <= 0) {
        finishAssessment();
      }
    };

    tick();

    const timer = setInterval(tick, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [stage, assessmentEndAt]);

  /* =========================================================
     PERSIST ACTIVE ASSESSMENT
  ========================================================= */

  useEffect(() => {
    if (
      stage !== "assessment" ||
      !selectedTopicId ||
      !assessmentEndAt
    ) {
      return;
    }

    writeStorage(STORAGE_KEYS.SESSION, {
      active: true,
      categoryId: selectedCategoryId,
      topicId: selectedTopicId,
      answers,
      currentQuestion,
      warnings,
      endAt: assessmentEndAt,
    });
  }, [
    stage,
    selectedCategoryId,
    selectedTopicId,
    answers,
    currentQuestion,
    warnings,
    assessmentEndAt,
  ]);

  /* =========================================================
     INTERNET MONITORING
  ========================================================= */

  useEffect(() => {
    const handleOffline = () => {
      setConnectionStatus("failed");

      handleViolation(
        "Internet connection was lost during the assessment."
      );
    };

    const handleOnline = () => {
      setConnectionStatus("passed");
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  /* =========================================================
     TAB VISIBILITY MONITORING
  ========================================================= */

  useEffect(() => {
    const handleVisibility = () => {
      if (
        document.hidden &&
        stageRef.current === "assessment"
      ) {
        handleViolation(
          "The assessment tab was hidden or you switched tabs."
        );
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );
    };
  }, []);

  /* =========================================================
     BEFORE UNLOAD
  ========================================================= */

  useEffect(() => {
    if (stage !== "assessment") {
      return;
    }

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener(
      "beforeunload",
      handleBeforeUnload
    );

    return () => {
      window.removeEventListener(
        "beforeunload",
        handleBeforeUnload
      );
    };
  }, [stage]);

  /* =========================================================
     BROWSER CHECK
  ========================================================= */

  const checkBrowser = () => {
    const isChrome =
      /Chrome/.test(navigator.userAgent) &&
      !/Edg|OPR/.test(navigator.userAgent);

    setBrowserStatus(isChrome ? "passed" : "failed");

    return isChrome;
  };

  /* =========================================================
     DEVICE CHECK
  ========================================================= */

  const runDeviceCheck = async () => {
    stopMedia();

    setStage("device-check");

    setCameraStatus("checking");
    setMicrophoneStatus("checking");
    setScreenStatus("checking");
    setBrowserStatus("checking");
    setConnectionStatus("checking");

    const browserPassed = checkBrowser();

    setConnectionStatus(
      navigator.onLine ? "passed" : "failed"
    );

    /* ---------------- CAMERA + MICROPHONE ---------------- */

    try {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

      cameraStreamRef.current = stream;

      setCameraStream(stream);

      const videoTracks = stream.getVideoTracks();
      const audioTracks = stream.getAudioTracks();

      setCameraStatus(
        videoTracks.length > 0 ? "passed" : "failed"
      );

      setMicrophoneStatus(
        audioTracks.length > 0 ? "passed" : "failed"
      );

      videoTracks.forEach((track) => {
        track.onended = () => {
          handleViolation(
            "Camera access was stopped."
          );
        };
      });

      audioTracks.forEach((track) => {
        track.onended = () => {
          handleViolation(
            "Microphone access was stopped."
          );
        };
      });
    } catch {
      setCameraStatus("failed");
      setMicrophoneStatus("failed");
    }

    /* ---------------- SCREEN SHARING ---------------- */

    try {
      if (!navigator.mediaDevices?.getDisplayMedia) {
        setScreenStatus("failed");
      } else {
        const screenStream =
          await navigator.mediaDevices.getDisplayMedia({
            video: true,
          });

        screenStreamRef.current = screenStream;

        setScreenStatus("passed");

        const screenTrack =
          screenStream.getVideoTracks()[0];

        if (screenTrack) {
          screenTrack.onended = () => {
            handleViolation(
              "Screen sharing was stopped."
            );
          };
        }
      }
    } catch {
      setScreenStatus("failed");
    }

    /*
      Browser and connection were already checked.
      We intentionally keep this function frontend-only.
    */

    return browserPassed;
  };

  /* =========================================================
     START ASSESSMENT
  ========================================================= */

  const startAssessment = () => {
    const deviceChecksPassed =
      cameraStatus === "passed" &&
      microphoneStatus === "passed" &&
      screenStatus === "passed" &&
      browserStatus === "passed" &&
      connectionStatus === "passed";

    if (!deviceChecksPassed) {
      return;
    }

    isFinishedRef.current = false;

    const endAt =
      Date.now() + ASSESSMENT_DURATION * 1000;

    setAnswers({});
    setCurrentQuestion(0);
    setWarnings(0);
    warningsRef.current = 0;
    setWarningReason("");

    setAssessmentEndAt(endAt);
    setTimeLeft(ASSESSMENT_DURATION);

    setStage("assessment");
  };

  /* =========================================================
     SELECT CATEGORY
  ========================================================= */

  const selectCategory = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setSelectedTopicId(null);
    setStage("topic");
  };

  /* =========================================================
     SELECT TOPIC
  ========================================================= */

  const selectTopic = (topicId) => {
    setSelectedTopicId(topicId);
    setWarningReason("");
  };

  /* =========================================================
     START SELECTED TOPIC
  ========================================================= */

  const continueToInstructions = () => {
    if (!selectedTopicId) {
      return;
    }

    const currentLockout =
      lockouts[selectedTopicId];

    if (
      currentLockout &&
      currentLockout > Date.now()
    ) {
      return;
    }

    setStage("instructions");
  };

  /* =========================================================
     ANSWER QUESTION
  ========================================================= */

  const selectAnswer = (optionIndex) => {
    if (isFinishedRef.current) {
      return;
    }

    const question = questions[currentQuestion];

    if (!question) {
      return;
    }

    setAnswers((previous) => ({
      ...previous,
      [question.id]: optionIndex,
    }));
  };

  /* =========================================================
     QUESTION NAVIGATION
  ========================================================= */

  const goToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(
        (previous) => previous + 1
      );
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(
        (previous) => previous - 1
      );
    }
  };

  /* =========================================================
     GO BACK
  ========================================================= */

  const goToCategories = () => {
    stopMedia();

    setSelectedCategoryId(null);
    setSelectedTopicId(null);

    setStage("category");
  };

  const goToTopics = () => {
    stopMedia();

    setSelectedTopicId(null);

    setStage("topic");
  };

  /* =========================================================
     DEVICE STATUS HELPER
  ========================================================= */

  const getStatusText = (status) => {
    switch (status) {
      case "checking":
        return "Checking...";

      case "passed":
        return "Ready";

      case "failed":
        return "Not ready";

      default:
        return "Not checked";
    }
  };

  /* =========================================================
     COMMON STYLES
  ========================================================= */

  const pageClass =
    "min-h-screen bg-white text-gray-900";

  const containerClass =
    "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

  const purpleButton =
    "bg-purple-700 text-white px-5 py-3 rounded-lg font-semibold hover:bg-purple-800 transition disabled:opacity-40 disabled:cursor-not-allowed";

  const outlineButton =
    "border border-purple-700 text-purple-700 px-5 py-3 rounded-lg font-semibold hover:bg-purple-50 transition disabled:opacity-40 disabled:cursor-not-allowed";

  /* =========================================================
     CATEGORY STAGE
  ========================================================= */

  if (stage === "category") {
    return (
      <div className={pageClass}>
        <div className={containerClass}>
          <div className="py-10">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-purple-700 font-medium mb-8"
            >
              ← Back to Dashboard
            </button>

            <div className="mb-10">
              <p className="text-purple-700 font-semibold mb-2">
                FREE ASSESSMENT
              </p>

              <h1 className="text-3xl sm:text-4xl font-bold mb-3">
                Choose an Assessment Category
              </h1>

              <p className="text-gray-600 max-w-2xl">
                Select a category to see its available topics.
                Each topic has its own free assessment and
                course access is unlocked only after passing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() =>
                    selectCategory(category.id)
                  }
                  className="text-left border border-gray-200 rounded-2xl p-6 hover:border-purple-500 hover:shadow-md transition"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold mb-5">
                    {category.name.charAt(0)}
                  </div>

                  <h2 className="text-xl font-bold mb-2">
                    {category.name}
                  </h2>

                  <p className="text-gray-600 mb-5">
                    {category.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {category.topics.length} topics
                    </span>

                    <span className="text-purple-700 font-semibold">
                      View topics →
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     TOPIC STAGE
  ========================================================= */

  if (stage === "topic") {
    return (
      <div className={pageClass}>
        <div className={containerClass}>
          <div className="py-10">
            <button
              onClick={goToCategories}
              className="text-purple-700 font-medium mb-8"
            >
              ← Categories
            </button>

            <div className="mb-8">
              <p className="text-purple-700 font-semibold mb-2">
                {selectedCategory?.name}
              </p>

              <h1 className="text-3xl font-bold mb-3">
                Choose a Topic
              </h1>

              <p className="text-gray-600">
                Pass the assessment for a topic to unlock
                its related course.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedCategory?.topics.map((topic) => {
                const passed = Boolean(
                  passedTopics[topic.id]
                );

                const lockedUntil =
                  lockouts[topic.id];

                const currentlyLocked =
                  lockedUntil &&
                  lockedUntil > Date.now();

                const topicAttempts =
                  attempts[topic.id] || 0;

                return (
                  <div
                    key={topic.id}
                    className={`border rounded-2xl p-6 transition ${
                      selectedTopicId === topic.id
                        ? "border-purple-700 bg-purple-50"
                        : "border-gray-200"
                    }`}
                  >
                    <button
                      onClick={() =>
                        selectTopic(topic.id)
                      }
                      className="text-left w-full"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 className="text-xl font-bold mb-2">
                            {topic.name}
                          </h2>

                          <p className="text-gray-600 text-sm">
                            {topic.description}
                          </p>
                        </div>

                        <span className="text-purple-700 font-bold">
                          {passed ? "Passed" : "Free"}
                        </span>
                      </div>
                    </button>

                    <div className="grid grid-cols-3 gap-3 mt-6 text-sm">
                      <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <p className="text-gray-500">
                          Questions
                        </p>
                        <p className="font-bold mt-1">
                          20
                        </p>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <p className="text-gray-500">
                          Duration
                        </p>
                        <p className="font-bold mt-1">
                          30 min
                        </p>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <p className="text-gray-500">
                          Pass
                        </p>
                        <p className="font-bold mt-1">
                          80%
                        </p>
                      </div>
                    </div>

                    <div className="mt-5">
                      {passed && (
                        <p className="text-sm text-purple-700 font-semibold">
                          Course unlocked for this topic.
                        </p>
                      )}

                      {!passed &&
                        currentlyLocked && (
                          <p className="text-sm text-gray-600">
                            Retry available after{" "}
                            {formatDateTime(lockedUntil)}.
                          </p>
                        )}

                      {!passed &&
                        !currentlyLocked &&
                        topicAttempts > 0 && (
                          <p className="text-sm text-gray-600">
                            Previous attempts:{" "}
                            {topicAttempts}
                          </p>
                        )}
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedTopic && (
              <div className="mt-8 border border-purple-200 rounded-2xl p-6 bg-purple-50">
                <h2 className="text-xl font-bold mb-2">
                  {selectedTopic.name}
                </h2>

                <p className="text-gray-600 mb-5">
                  {selectedTopic.description}
                </p>

                {topicPassed ? (
                  <div>
                    <p className="text-purple-700 font-semibold mb-4">
                      You have already passed this assessment.
                      The related course is unlocked.
                    </p>

                    <button
                      onClick={() =>
                        navigate("/courses")
                      }
                      className={purpleButton}
                    >
                      Go to Courses
                    </button>
                  </div>
                ) : topicIsLocked ? (
                  <div>
                    <p className="text-gray-700 mb-4">
                      This assessment is temporarily locked
                      because the previous attempt did not
                      meet the required score or was
                      disqualified.
                    </p>

                    <p className="font-semibold mb-4">
                      Retry after:{" "}
                      {formatDateTime(topicLockoutUntil)}
                    </p>

                    <button
                      disabled
                      className={purpleButton}
                    >
                      Assessment Locked
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={continueToInstructions}
                    className={purpleButton}
                  >
                    Start Free Assessment
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     INSTRUCTIONS STAGE
  ========================================================= */

  if (stage === "instructions") {
    return (
      <div className={pageClass}>
        <div className={containerClass}>
          <div className="py-10 max-w-4xl mx-auto">
            <button
              onClick={goToTopics}
              className="text-purple-700 font-medium mb-8"
            >
              ← Back to Topics
            </button>

            <div className="border border-gray-200 rounded-2xl p-6 sm:p-8">
              <p className="text-purple-700 font-semibold mb-2">
                FREE ASSESSMENT
              </p>

              <h1 className="text-3xl font-bold mb-3">
                {selectedTopic?.name} Assessment
              </h1>

              <p className="text-gray-600 mb-8">
                Read the instructions carefully before
                starting your assessment.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="border border-gray-200 rounded-xl p-4">
                  <p className="text-gray-500 text-sm">
                    Questions
                  </p>
                  <p className="text-xl font-bold mt-1">
                    20 MCQs
                  </p>
                </div>

                <div className="border border-gray-200 rounded-xl p-4">
                  <p className="text-gray-500 text-sm">
                    Time
                  </p>
                  <p className="text-xl font-bold mt-1">
                    30 minutes
                  </p>
                </div>

                <div className="border border-gray-200 rounded-xl p-4">
                  <p className="text-gray-500 text-sm">
                    Passing score
                  </p>
                  <p className="text-xl font-bold mt-1">
                    80%
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="border border-gray-200 rounded-xl p-4">
                  <p className="font-semibold mb-1">
                    1. Camera and microphone
                  </p>
                  <p className="text-gray-600 text-sm">
                    You must allow camera and microphone
                    access during the assessment.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-xl p-4">
                  <p className="font-semibold mb-1">
                    2. Screen sharing
                  </p>
                  <p className="text-gray-600 text-sm">
                    Your screen must remain shared during
                    the assessment.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-xl p-4">
                  <p className="font-semibold mb-1">
                    3. Warnings
                  </p>
                  <p className="text-gray-600 text-sm">
                    You can receive up to 3 assessment
                    warnings. The third warning will
                    disqualify the attempt.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-xl p-4">
                  <p className="font-semibold mb-1">
                    4. Course access
                  </p>
                  <p className="text-gray-600 text-sm">
                    You must score at least 80% to unlock
                    the course related to this topic.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-xl p-4">
                  <p className="font-semibold mb-1">
                    5. Failed assessment
                  </p>
                  <p className="text-gray-600 text-sm">
                    If you fail, the related course remains
                    locked and the assessment will be locked
                    for 48 hours.
                  </p>
                </div>
              </div>

              <button
                onClick={runDeviceCheck}
                className={purpleButton}
              >
                Continue to Device Check
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     DEVICE CHECK STAGE
  ========================================================= */

  if (stage === "device-check") {
    const allDeviceChecksPassed =
      cameraStatus === "passed" &&
      microphoneStatus === "passed" &&
      screenStatus === "passed" &&
      browserStatus === "passed" &&
      connectionStatus === "passed";

    const deviceChecks = [
      ["Camera", cameraStatus],
      ["Microphone", microphoneStatus],
      ["Screen sharing", screenStatus],
      ["Browser", browserStatus],
      ["Internet connection", connectionStatus],
    ];

    return (
      <div className={pageClass}>
        <div className={containerClass}>
          <div className="py-10 max-w-5xl mx-auto">
            <button
              onClick={() =>
                setStage("instructions")
              }
              className="text-purple-700 font-medium mb-8"
            >
              ← Back to Instructions
            </button>

            <div className="border border-gray-200 rounded-2xl p-6 sm:p-8">
              <div className="mb-8">
                <p className="text-purple-700 font-semibold mb-2">
                  DEVICE CHECK
                </p>

                <h1 className="text-3xl font-bold mb-2">
                  Prepare for your assessment
                </h1>

                <p className="text-gray-600">
                  Every requirement below must be ready
                  before you can begin.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-3">
                  {deviceChecks.map(
                    ([label, status]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between border border-gray-200 rounded-xl p-4"
                      >
                        <span className="font-medium">
                          {label}
                        </span>

                        <span
                          className={
                            status === "passed"
                              ? "text-purple-700 font-semibold"
                              : "text-gray-500"
                          }
                        >
                          {getStatusText(status)}
                        </span>
                      </div>
                    )
                  )}
                </div>

                <div>
                  <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-video">
                    {cameraStream ? (
                      <video
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        Camera preview
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-gray-500 mt-3">
                    Camera preview will remain active while
                    you take the assessment.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={runDeviceCheck}
                  className={outlineButton}
                >
                  Check Again
                </button>

                <button
                  onClick={startAssessment}
                  disabled={!allDeviceChecksPassed}
                  className={purpleButton}
                >
                  Start Assessment
                </button>
              </div>

              {!allDeviceChecksPassed && (
                <p className="text-gray-600 text-sm mt-4">
                  Complete all device checks before
                  starting.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     ASSESSMENT STAGE
  ========================================================= */

  if (stage === "assessment") {
    const question = questions[currentQuestion];

    const answeredCount =
      Object.keys(answers).length;

    const progress =
      questions.length > 0
        ? ((currentQuestion + 1) /
            questions.length) *
          100
        : 0;

    return (
      <div className={pageClass}>
        <div className={containerClass}>
          <div className="py-6">
            {/* HEADER */}

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
              <div>
                <p className="text-purple-700 font-semibold text-sm">
                  {selectedCategory?.name}
                </p>

                <h1 className="text-2xl font-bold">
                  {selectedTopic?.name} Assessment
                </h1>
              </div>

              <div className="flex items-center gap-5">
                <div>
                  <p className="text-gray-500 text-xs">
                    Answered
                  </p>

                  <p className="font-bold">
                    {answeredCount}/{questions.length}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-xs">
                    Warnings
                  </p>

                  <p className="font-bold">
                    {warnings}/{MAX_WARNINGS}
                  </p>
                </div>

                <div className="border border-purple-700 rounded-lg px-4 py-2">
                  <p className="text-gray-500 text-xs">
                    Time left
                  </p>

                  <p className="text-purple-700 font-bold text-lg">
                    {formatTime(timeLeft)}
                  </p>
                </div>
              </div>
            </div>

            {/* PROGRESS */}

            <div className="h-2 bg-gray-100 rounded-full mb-6 overflow-hidden">
              <div
                className="h-full bg-purple-700 transition-all"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            {/* WARNING */}

            {warningReason && (
              <div className="border border-purple-200 bg-purple-50 rounded-xl p-4 mb-6">
                <p className="font-semibold text-purple-800">
                  Assessment warning
                </p>

                <p className="text-gray-700 text-sm mt-1">
                  {warningReason}
                </p>

                <p className="text-gray-700 text-sm mt-1">
                  Warnings: {warnings}/{MAX_WARNINGS}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* QUESTION */}

              <div className="lg:col-span-3">
                <div className="border border-gray-200 rounded-2xl p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-sm text-gray-500">
                      Question {currentQuestion + 1} of{" "}
                      {questions.length}
                    </p>

                    <p className="text-sm text-gray-500">
                      Select one answer
                    </p>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold leading-relaxed mb-7">
                    {question?.question}
                  </h2>

                  <div className="space-y-3">
                    {question?.options.map(
                      (option, index) => {
                        const selected =
                          answers[question.id] ===
                          index;

                        return (
                          <button
                            key={option}
                            onClick={() =>
                              selectAnswer(index)
                            }
                            className={`w-full text-left border rounded-xl p-4 transition ${
                              selected
                                ? "border-purple-700 bg-purple-50"
                                : "border-gray-200 hover:border-purple-400"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <span
                                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold ${
                                  selected
                                    ? "bg-purple-700 text-white"
                                    : "bg-gray-100 text-gray-700"
                                }`}
                              >
                                {String.fromCharCode(
                                  65 + index
                                )}
                              </span>

                              <span className="pt-1">
                                {option}
                              </span>
                            </div>
                          </button>
                        );
                      }
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
                    <button
                      onClick={goToPreviousQuestion}
                      disabled={currentQuestion === 0}
                      className={outlineButton}
                    >
                      ← Previous
                    </button>

                    {currentQuestion ===
                    questions.length - 1 ? (
                      <button
                        onClick={finishAssessment}
                        className={purpleButton}
                      >
                        Submit Assessment
                      </button>
                    ) : (
                      <button
                        onClick={goToNextQuestion}
                        className={purpleButton}
                      >
                        Next →
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* SIDEBAR */}

              <div className="space-y-5">
                <div className="border border-gray-200 rounded-2xl p-5">
                  <h3 className="font-bold mb-4">
                    Questions
                  </h3>

                  <div className="grid grid-cols-5 gap-2">
                    {questions.map(
                      (item, index) => {
                        const answered =
                          answers[item.id] !==
                          undefined;

                        const current =
                          currentQuestion === index;

                        return (
                          <button
                            key={item.id}
                            onClick={() =>
                              setCurrentQuestion(
                                index
                              )
                            }
                            className={`h-9 rounded-lg text-sm font-semibold border ${
                              current
                                ? "bg-purple-700 text-white border-purple-700"
                                : answered
                                ? "bg-purple-50 text-purple-700 border-purple-300"
                                : "bg-white text-gray-700 border-gray-200"
                            }`}
                          >
                            {index + 1}
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>

                <div className="border border-gray-200 rounded-2xl p-5">
                  <h3 className="font-bold mb-4">
                    Monitoring
                  </h3>

                  <div className="bg-gray-100 rounded-xl overflow-hidden aspect-video">
                    {cameraStream ? (
                      <video
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        Camera unavailable
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-gray-500 mt-3">
                    Camera and screen sharing must remain
                    active.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-2xl p-5">
                  <h3 className="font-bold mb-2">
                    Passing requirement
                  </h3>

                  <p className="text-gray-600 text-sm">
                    You need at least{" "}
                    <strong>80%</strong> to unlock the
                    related course.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     RESULT STAGE
  ========================================================= */

  if (stage === "result") {
    const passed =
      result?.status === "passed";

    const disqualified =
      result?.status === "disqualified";

    return (
      <div className={pageClass}>
        <div className={containerClass}>
          <div className="py-12 max-w-3xl mx-auto">
            <div className="border border-gray-200 rounded-2xl p-6 sm:p-10 text-center">
              <p className="text-purple-700 font-semibold mb-3">
                ASSESSMENT RESULT
              </p>

              <h1 className="text-3xl font-bold mb-3">
                {passed
                  ? "Assessment Passed"
                  : disqualified
                  ? "Assessment Disqualified"
                  : "Assessment Not Passed"}
              </h1>

              <p className="text-gray-600 mb-8">
                {passed
                  ? "You achieved the required score. The related course is now unlocked."
                  : disqualified
                  ? "This attempt was disqualified because the maximum number of warnings was reached."
                  : "You did not reach the required 80%. The related course remains locked."}
              </p>

              <div className="border border-purple-200 bg-purple-50 rounded-2xl p-8 mb-8">
                <p className="text-gray-600">
                  Your score
                </p>

                <p className="text-5xl font-bold text-purple-700 mt-2">
                  {result?.score || 0}%
                </p>

                <p className="text-gray-600 mt-3">
                  Required: {PASSING_PERCENTAGE}%
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                <div className="border border-gray-200 rounded-xl p-4">
                  <p className="text-gray-500 text-sm">
                    Correct
                  </p>

                  <p className="font-bold text-lg">
                    {result?.correct || 0}
                  </p>
                </div>

                <div className="border border-gray-200 rounded-xl p-4">
                  <p className="text-gray-500 text-sm">
                    Questions
                  </p>

                  <p className="font-bold text-lg">
                    {result?.total || 0}
                  </p>
                </div>

                <div className="border border-gray-200 rounded-xl p-4">
                  <p className="text-gray-500 text-sm">
                    Attempts
                  </p>

                  <p className="font-bold text-lg">
                    {result?.attempts || 0}
                  </p>
                </div>

                <div className="border border-gray-200 rounded-xl p-4">
                  <p className="text-gray-500 text-sm">
                    Warnings
                  </p>

                  <p className="font-bold text-lg">
                    {result?.warnings || 0}
                  </p>
                </div>
              </div>

              {passed && (
                <div className="border border-purple-200 rounded-xl p-5 mb-8">
                  <p className="font-bold text-purple-700 mb-2">
                    Course access unlocked
                  </p>

                  <p className="text-gray-600 text-sm">
                    You can now access courses associated
                    with the {selectedTopic?.name} assessment.
                  </p>
                </div>
              )}

              {!passed && (
                <div className="border border-gray-200 rounded-xl p-5 mb-8">
                  <p className="font-bold mb-2">
                    Course remains locked
                  </p>

                  <p className="text-gray-600 text-sm">
                    You must pass this assessment with at
                    least 80% before accessing the related
                    course.
                  </p>

                  {result?.retryAt && (
                    <p className="text-gray-600 text-sm mt-3">
                      Retry available after:{" "}
                      <strong>
                        {formatDateTime(
                          result.retryAt
                        )}
                      </strong>
                    </p>
                  )}
                </div>
              )}

              {disqualified && result?.reason && (
                <div className="border border-gray-200 rounded-xl p-5 mb-8 text-left">
                  <p className="font-semibold mb-1">
                    Reason
                  </p>

                  <p className="text-gray-600 text-sm">
                    {result.reason}
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-center gap-3">
                {passed ? (
                  <>
                    <button
                      onClick={() =>
                        navigate("/courses")
                      }
                      className={purpleButton}
                    >
                      Go to Courses
                    </button>

                    <button
                      onClick={goToCategories}
                      className={outlineButton}
                    >
                      Other Assessments
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={goToCategories}
                      className={outlineButton}
                    >
                      Back to Assessments
                    </button>

                    <button
                      onClick={() =>
                        navigate("/dashboard")
                      }
                      className={purpleButton}
                    >
                      Dashboard
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     FALLBACK
  ========================================================= */

  return null;
};

export default Assessment;