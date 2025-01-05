import { create } from "zustand"

export const useBlogStore = create((set) => ({
    blogs: [],
    setBlogs: (blogs) => set({ blogs }),
    createBlog: async (newBlog) => {
        if (!newBlog.title || !newBlog.prompt || !newBlog.content || !newBlog.image) {
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
}));