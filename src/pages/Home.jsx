
import React from "react";
import { useNavigate } from "react-router-dom";
import image from "../assets/image.png";

const Home = () => {
  const navigate = useNavigate();

  const assessments = [
    {
      id: 1,
      title: "Web Development",
      category: "HTML and CSS Fundamentals",
      description: "Learn the fundamentals of HTML and CSS.",
      content: [
        "Introduction to HTML",
        "HTML Elements and Attributes",
        "HTML Forms",
        "Introduction to CSS",
        "CSS Selectors",
        "CSS Box Model",
        "CSS Flexbox",
        "Responsive Web Design",
      ],
      materials: ["Videos", "Images", "Lecture Slides"],
      image: image,
    },

    {
      id: 2,
      title: "UI/UX Designing",
      category: "Prototyping and Wireframing",
      description: "Learn the fundamentals of UI/UX design.",
      content: [
        "Introduction to UI/UX",
        "User Research",
        "User Personas",
        "Wireframing",
        "Prototyping",
        "Usability Testing",
        "Design Principles",
      ],
      materials: ["Videos", "Images", "Lecture Slides"],
      image: image,
    },

    {
      id: 3,
      title: "Graphic Design",
      category: "Design Fundamentals",
      description: "Learn the basic principles of graphic design.",
      content: [
        "Introduction to Graphic Design",
        "Design Principles",
        "Typography",
        "Color Theory",
        "Composition",
        "Images and Graphics",
        "Visual Hierarchy",
      ],
      materials: ["Videos", "Images", "Lecture Slides"],
      image: image,
    },

    {
      id: 4,
      title: "JavaScript",
      category: "JavaScript Fundamentals",
      description: "Learn the fundamentals of JavaScript programming.",
      content: [
        "Introduction to JavaScript",
        "Variables and Data Types",
        "Operators",
        "Conditional Statements",
        "Loops",
        "Functions",
        "Arrays",
        "Objects",
        "DOM Manipulation",
      ],
      materials: ["Videos", "Images", "Lecture Slides"],
      image: image,
    },

    {
      id: 5,
      title: "React JS",
      category: "React Fundamentals",
      description: "Learn the fundamentals of React JS.",
      content: [
        "Introduction to React",
        "Components",
        "JSX",
        "Props",
        "State",
        "Event Handling",
        "React Hooks",
        "Conditional Rendering",
        "React Router",
      ],
      materials: ["Videos", "Images", "Lecture Slides"],
      image: image,
    },

    {
      id: 6,
      title: "Python",
      category: "Python Fundamentals",
      description: "Learn the fundamentals of Python programming.",
      content: [
        "Introduction to Python",
        "Variables and Data Types",
        "Operators",
        "Conditional Statements",
        "Loops",
        "Functions",
        "Lists and Tuples",
        "Dictionaries",
        "Object-Oriented Programming",
      ],
      materials: ["Videos", "Images", "Lecture Slides"],
      image: image,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">

      {/* Welcome Section */}
      <section className="bg-purple-100">
        <div className="max-w-7xl mx-auto px-6 py-12">

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Welcome Back!
          </h1>

          <p className="mt-3 text-lg text-gray-600">
            Explore free assessments, learn from study materials, and test
            your skills.
          </p>

        </div>
      </section>


      {/* Assessments */}
      <section className="max-w-7xl mx-auto px-6 py-10">

        <h2 className="text-2xl md:text-3xl font-bold mb-8">
          Free Assessments
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">

          {assessments.map((assessment) => (

            <div
              key={assessment.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300"
            >

              {/* Image */}
              <img
                src={assessment.image}
                alt={assessment.title}
                className="w-full h-48 object-cover"
              />


              {/* Card Content */}
              <div className="p-5">

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900">
                  {assessment.title}
                </h3>


                {/* Category */}
                <p className="text-sm mt-1 text-purple-600 font-medium">
                  {assessment.category}
                </p>


                {/* Description */}
                <p className="text-sm mt-3 text-gray-600">
                  {assessment.description}
                </p>


                {/* Learning Materials */}
                <div className="mt-4">

                  <p className="font-semibold text-sm mb-2">
                    Learning Materials
                  </p>

                  <div className="flex flex-wrap gap-2">

                    {assessment.materials.map((material) => (

                      <span
                        key={material}
                        className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs"
                      >
                        {material}
                      </span>

                    ))}

                  </div>

                </div>


                {/* View Assessment Button */}
                <button
                  onClick={() =>
                    navigate(`/assessment/${assessment.id}`, {
                      state: assessment,
                    })
                  }
                  className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition"
                >
                  
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
};

export default Home;

