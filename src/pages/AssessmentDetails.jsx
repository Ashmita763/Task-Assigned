import React from "react";
import { useLocation } from "react-router-dom";

// Main component for displaying the details of a selected assessment
const AssessmentDetails = () => {

  // useLocation() gives us information about the current URL/location.
  // It also lets us access data passed through React Router's navigate().
  const location = useLocation();

  // location.state contains the assessment object
  // that was passed from the previous page.
  //
  // Example:
  // navigate("/assessment-details", {
  //   state: assessment
  // });
  //
  // So here, "assessment" contains title, category, description,
  // content, materials, etc.
  const assessment = location.state;

  return (
    // Main page container
    // min-h-screen = minimum height of the full screen
    // bg-gray-50 = light gray background
    // pt-20 = padding-top to leave space for the navbar
    <div className="min-h-screen bg-gray-50 pt-20">

      {/* 
        Main content container.
        max-w-7xl = limits the maximum width.
        mx-auto = centers the container horizontally.
        px-6 = horizontal padding.
        py-8 = vertical padding.
      */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* ---------- PAGE HEADER------------ */}
        <div className="mb-8">

          {/* Display the selected assessment title */}
          <h1 className="text-3xl font-bold text-gray-900">
            {assessment.title}
          </h1>

          {/* Display the assessment category */}
          <p className="text-purple-600 mt-2">
            {assessment.category}
          </p>

        </div>


        {/* ---------------- MAIN LAYOUT ------------ */}
        {/*
          Creates a responsive two-column layout.

          grid-cols-1:
          → On small screens, everything appears in one column.

          lg:grid-cols-4:
          → On large screens, the layout has 4 grid columns.

          gap-8:
          → Adds space between the sidebar and main content.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">


          {/* ------------ LEFT SIDEBAR ------------ */}
          <aside className="bg-white rounded-xl shadow-sm p-5 h-fit">

            {/* Sidebar heading */}
            <h2 className="text-lg font-bold mb-5">
              Course
            </h2>

            {/* Sidebar navigation buttons */}
            <div className="space-y-3">

              {/* Currently selected section */}
              <button className="w-full text-left px-4 py-3 rounded-lg bg-purple-100 text-purple-700 font-medium">
                Course Content
              </button>

              {/* Another section */}
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100">
                Learning Materials
              </button>

            </div>

          </aside>


          {/*------------------- RIGHT CONTENT ------------------ */}
          {/*
            lg:col-span-3 means:

            On large screens:
            - Sidebar takes 1 column
            - Main content takes 3 columns

            So the total is 4 columns.
          */}
          <main className="lg:col-span-3 bg-white rounded-xl shadow-sm p-8">


            {/* ----------------- COURSE DESCRIPTION ------------------- */}

            {/* Section heading */}
            <h2 className="text-2xl font-bold">
              Course Content
            </h2>

            {/* 
              Display the description of the selected assessment.

              Because we use {assessment.description},
              React gets the description dynamically from the
              assessment object.
            */}
            <p className="text-gray-600 mt-2">
              {assessment.description}
            </p>


            {/* --------------- TOPICS ---------------- */}
            <div className="mt-8">

              {/*
                assessment.content is expected to be an array.

                Example:
                content: [
                  "HTML Basics",
                  "CSS Basics",
                  "JavaScript",
                  "React"
                ]

                .map() loops through every topic and creates
                one JSX block for each topic.
              */}
              {assessment.content.map((topic, index) => (

                // key helps React identify each item in the list.
                <div
                  key={topic}
                  className="flex items-center gap-4 border-b border-gray-200 py-5"
                >

                  {/* -------------TOPIC NUMBER ------------- */}

                  {/*
                    Displays the topic number.

                    index starts from 0, so we use index + 1
                    to display 1, 2, 3, 4...
                  */}
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>


                  {/* ------------- TOPIC INFORMATION ------------ */}

                  <div className="flex-1">

                    {/* Topic name */}
                    <h3 className="font-medium text-gray-900">
                      {topic}
                    </h3>

                    {/* Small description generated from the topic name */}
                    <p className="text-sm text-gray-500 mt-1">
                      Learn about {topic}.
                    </p>

                  </div>

                </div>

              ))}

            </div>


            {/* -------------- LEARNING MATERIALS ----------- */}
            <div className="mt-10">

              {/* Materials section heading */}
              <h2 className="text-xl font-bold mb-4">
                Learning Materials
              </h2>


              {/*
                Grid for displaying learning materials.

                grid-cols-1:
                → 1 column on small screens.

                md:grid-cols-3:
                → 3 columns on medium and larger screens.
              */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/*
                  assessment.materials should be an array.

                  Example:
                  materials: [
                    "Video Lessons",
                    "PDF Notes",
                    "Practice Questions"
                  ]

                  map() creates one card for each material.
                */}
                {assessment.materials.map((material) => (

                  <div
                    key={material}
                    className="border border-gray-200 rounded-lg p-5 hover:bg-purple-50 transition"
                  >

                    {/* Material name */}
                    <h3 className="font-semibold">
                      {material}
                    </h3>

                    {/* Material description */}
                    <p className="text-sm text-gray-500 mt-2">
                      Access {material} for this course.
                    </p>

                  </div>

                ))}

              </div>

            </div>


            {/* ================= START ASSESSMENT BUTTON ================= */}

            {/*
              This button is currently only UI.

              It does NOT perform any action because there is
              no onClick function attached to it yet.

              Later you can use:
              
              onClick={() => navigate("/assessment")}
              
              to open the actual assessment page.
            */}
            <button
              className="w-full mt-10 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Start Assessment
            </button>

          </main>

        </div>

      </div>

    </div>
  );
};

export default AssessmentDetails;