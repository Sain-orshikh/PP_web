import { create } from "zustand"

export const useBlogStore = create((set) => ({
    blogs: [],
    setBlogs: (blogs) => set({ blogs }),
    createBlog: async (newBlog) => {
        if (!newBlog.title || !newBlog.content || !newBlog.image|| !newBlog.owner_id) {
            return {success: false, message: "Please fill in all fields."};
        }
        const res = await fetch("/api/blogs", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(newBlog),
        });
        const data = await res.json();
        set((state) => ({ blogs: [...state.blogs, data.data] }));
        return {success: true, message: "Blog created successfully"};
    },
    fetchBlogs: async () => {
        const res = await fetch("/api/blogs");
        const data = await res.json();
        set ({blogs: data.data});
    },
    deleteBlog: async (bid) => {
        const res = await fetch(`/api/blogs/${bid}`, {method: "DELETE",});
        const data = await res.json();
        if(!data.success) return {success: false, message: data.message};

        set(state => ({ blogs: state.blogs.filter(blog => blog._id !==bid) }));
        return {success: true, message: data.message};
    },
    updateBlog: async (pid, updatedBlog) => {
		const res = await fetch(`/api/blogs/${pid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedBlog),
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };
		set((state) => ({
			blogs: state.blogs.map((blog) => (blog._id === pid ? data.data : blog)),
		}));

		return { success: true, message: data.message };
	},
}));