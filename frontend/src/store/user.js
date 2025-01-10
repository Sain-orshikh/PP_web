import { create } from "zustand"

export const useUserStore = create((set) => ({
    users: [],
    setUsers: (users) => set({ users }),
    createUser: async (newUser) => {
        if (!newUser.name || !newUser.email || !newUser.password) {
            return {success: false, message: "Please fill in all fields."};
        }
        const res = await fetch("/api/users", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(newUser),
        });
        const data = await res.json();
        set((state) => ({ users: [...state.users, data.data] }));
        return {success: true, message: "Account created successfully"};
    },
    fetchUsers: async () => {
        const res = await fetch("/api/users");
        const data = await res.json();
        set ({users: data.data});
    },
    updateUser: async (pid, updatedUser) => {
		const res = await fetch(`/api/users/${pid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedUser),
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };
		set((state) => ({
			users: state.users.map((user) => (user._id === pid ? data.data : user)),
		}));

		return { success: true, message: data.message };
	},
}));