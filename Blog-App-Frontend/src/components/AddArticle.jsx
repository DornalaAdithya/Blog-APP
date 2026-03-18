import { useForm } from "react-hook-form";

function AddArticle() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const formSubmit = (articleData) => {
    console.log(articleData);
    reset();
  };
  return (
    <div className="min-h-screen">
      <h1 className="text-center text-[clamp(36px,10vw,52px)] font-bold">Add Article</h1>
      <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col gap-9 p-3 mt-5 sm:p-6 sm:gap-6">
        <input
          type="text"
          {...register("title", { required: "Title is required" })}
          placeholder="Title"
          className="px-2 py-1 bg-gray-200 h-12 rounded placeholder:font-bold placeholder:text-lg sm:h-15"
        />
        {errors.title?.message && <span className="text-red-600">{errors.title.message}</span>}
        <div className="flex items-center gap-2 flex-wrap sm:gap-4 justify-center sm:justify-start">
          <p className="font-semibold">Category</p>
          <select
            {...register("category")}
            className="
            px-3 py-1
            rounded-md
            border border-gray-300
            bg-white
            text-gray-700
            cursor-pointer"
          >
            <option value="technology">Technology</option>
            <option value="programming">Programming</option>
            <option value="education">Education</option>
            <option value="lifestyle">Lifestyle</option>
          </select>
        </div>
        <textarea
          placeholder="Content"
          {...register("content", { required: "Content is required" })}
          className="px-2 py-1 h-90 bg-gray-200 rounded placeholder:font-bold placeholder:text-lg"
        ></textarea>
        {errors.content?.message && <span className="text-red-600">{errors.content.message}</span>}
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="border text-white bg-sky-500 cursor-pointer rounded-2xl w-35 h-10 hover:bg-sky-400 sm:w-40 sm:h-12 sm:text-xl"
          >
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddArticle;
