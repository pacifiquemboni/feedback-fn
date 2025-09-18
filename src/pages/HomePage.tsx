import { useEffect, useRef, useState } from 'react';
import Header from "../components/Header";
import bgImage from '../assets/feedback.jpg';
import logo from '../assets/logo.png';
import phone from '../assets/phone.svg';
import linkedin from '../assets/linkedin.svg';
import instagram from '../assets/instagram.svg';
import facebook from '../assets/facebook.svg';
// import CharacterSlideshow from '../components/characterSlideShow';
import arrow from '../assets/right-arrow.svg';
import ContactUs from '../components/contactUs';
import Footer from '../components/footer';
import Property from '../components/properties';
import FeedbackBoard from '../components/properties';

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [category, setCategory] = useState("bug");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const categories = [
    { value: "bug", label: "bug" },
    { value: "feature", label: "Feature" },
    { value: "improvement", label: "Improvement" },

  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const feedback = { category, title, description };
    console.log("Submitting feedback:", feedback);
    // TODO: send to backend (e.g. via fetch or axios)
  };

  useEffect(() => {
    const children = containerRef.current?.children;
    if (children) {
      Array.from(children).forEach((child, index) => {
        (child as HTMLElement).style.opacity = '0';
        (child as HTMLElement).style.transform = 'translateY(70px)';
        setTimeout(() => {
          (child as HTMLElement).style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          (child as HTMLElement).style.opacity = '1';
          (child as HTMLElement).style.transform = 'translateY(0)';
        }, index * 200); // Stagger the animations
      });
    }
  }, []);

  return (
    <div>
      {/* <div className='bg-gray-900 text-white h-8 p-1'>
        <div className='flex justify-between items-center lg:mx-12'>
          <div className='flex justify-between items-center gap-5  text-white'>
            <img src={phone} alt="" className='w-5' />
            <p>+ (250)-787-299-001</p>
          </div>
          <div className='flex justify-between items-center gap-5  text-white'>
            <img src={linkedin} alt="" className='w-5' />
            <img src={instagram} alt="" className='w-5' />
            <img src={facebook} alt="" className='w-5' />

          </div>
        </div>
      </div> */}
      {/* <Header /> */}
      <div className="bg-gray-900 h-screen flex flex-row justify-center items-center p-10 gap-10">
        {/* LEFT SIDE - INTRO */}
        <div className="flex flex-col justify-center items-center border-2 border-white w-[600px] rounded-2xl p-6">
          <h1 className="text-4xl font-bold font-teko text-white text-center mb-3">
            Welcome to the Feedback Board App!
          </h1>

          <div className="flex justify-center items-center gap-5 w-full mb-3">
            <hr className="flex-grow h-1 bg-white rounded" />
            <img src={logo} alt="App Logo" className="w-20" />
            <hr className="flex-grow h-1 bg-white rounded" />
          </div>

          <p className="text-center text-white text-lg leading-relaxed max-w-[90%]">
            Share your thoughts, suggestions, and ideas with the community!
            Whether it’s a new feature, a bug report, or just some constructive
            feedback — your voice matters. Let’s make this platform better,
            together. 🚀
          </p>
        </div>

        {/* RIGHT SIDE - FEEDBACK FORM */}
        <div className="bg-white rounded-2xl shadow-xl p-8 w-[400px]">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Submit Your Feedback
          </h2>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Category */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Title
              </label>
              <input
                type="text"
                placeholder="Enter feedback title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Description
              </label>
              <textarea
                placeholder="Describe your feedback in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border rounded-lg p-3 resize-none w-full focus:ring-2 focus:ring-blue-400"
                rows={4}
                required
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex justify-between items-center mt-3">
              <button
                type="button"
                onClick={() => {
                  setTitle("");
                  setDescription("");
                  setCategory("formative");
                }}
                className="text-blue-500 font-semibold hover:underline"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <FeedbackBoard />
      {/* <Property /> */}
      <ContactUs />
      <Footer />

    </div>
  );
}
