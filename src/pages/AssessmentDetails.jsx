import React from "react";
import { useLocation } from "react-router-dom";

const AssessmentDetails = () => {
  const location = useLocation();
  const assessment = location.state;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {assessment.title}
          </h1>

          <p className="text-purple-600 mt-2">
            {assessment.category}
          </p>
        </div>


        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Left Sidebar */}
          <aside className="bg-white rounded-xl shadow-sm p-5 h-fit">

            <h2 className="text-lg font-bold mb-5">
              Course
            </h2>

            <div className="space-y-3">

              <button className="w-full text-left px-4 py-3 rounded-lg bg-purple-100 text-purple-700 font-medium">
                Course Content
              </button>

              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100">
                Learning Materials
              </button>

            </div>

          </aside>


          {/* Right Content */}
          <main className="lg:col-span-3 bg-white rounded-xl shadow-sm p-8">

            {/* Course Description */}
            <h2 className="text-2xl font-bold">
              Course Content
            </h2>

            <p className="text-gray-600 mt-2">
              {assessment.description}
            </p>


            {/* Topics */}
            <div className="mt-8">

              {assessment.content.map((topic, index) => (

                <div
                  key={topic}
                  className="flex items-center gap-4 border-b border-gray-200 py-5"
                >

                  {/* Number */}
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>

                  {/* Topic */}
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {topic}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Learn about {topic}.
                    </p>
                  </div>

                </div>

              ))}

            </div>


            {/* Materials */}
            <div className="mt-10">

              <h2 className="text-xl font-bold mb-4">
                Learning Materials
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {assessment.materials.map((material) => (

                  <div
                    key={material}
                    className="border border-gray-200 rounded-lg p-5 hover:bg-purple-50 transition"
                  >
                    <h3 className="font-semibold">
                      {material}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                      Access {material} for this course.
                    </p>
                  </div>

                ))}

              </div>

            </div>


            {/* Start Assessment */}
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