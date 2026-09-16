import { useState } from "react"
import { ArrowLeft, Plus } from "lucide-react"
import { Link, useNavigate } from "react-router"
import toast, { Toaster } from "react-hot-toast"
import api from "../../lib/axios"

const CreatePage = () => {

  const navigate = useNavigate()
  const intialFormData = {
    title: '',
    description: ''
  }

  const [ formData, setFormData ] = useState(intialFormData);
  const [ isLoading, setIsLoading ] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name, vakue", name, value)

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!formData?.title?.trim() && !formData?.description?.trim()){
      toast.error("All form fields are reuired")
      return 
    }

    try {
      setIsLoading(true);
      await api.post('/notes', formData);
      navigate('/')
      toast.success('Successfully created the note')
    } catch (error) {
      toast.error('failed to create note')
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-2 lg:mx-auto max-w-6xl">

      {/* <header className="flex justify-between items-center my-2 bg-white/10 rounded-xl p-2">
        <Link to='/' className="btn btn-link">
          <ArrowLeft />
          <span>Back to home</span>
        </Link>
      </header> */}

      <div className="card bg-base-100 border border-white/10 max-w-2xl mx-auto p-4 mt-8">
          <h2 className="card-title mb-4 text-white">Add New Note</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div className="form-control">
                  <label className="label">
                      <span className="label-text text-white">Title</span>
                  </label>

                  <input
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter note title"
                      className="input input-bordered w-full"
                      name="title"
                  />
              </div>

              {/* Content */}
              <div className="form-control">
                  <label className="label">
                      <span className="label-text text-white">Content</span>
                  </label>

                  <textarea
                      onChange={handleChange}
                      placeholder="Write your note..."
                      className="textarea textarea-bordered w-full h-40"
                      name="description"
                  />
              </div>

              {/* Submit */}
              <button
                  type="submit"
                  className="btn btn-primary w-full"
              >
                  {isLoading ? <span class="loading loading-spinner"></span> : <Plus />}
                  Add Note
              </button>
          </form>
      </div>
  </div>
  )
}

export default CreatePage