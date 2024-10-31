import { create } from "zustand";

export const useAssignmentStore = create((set) => ({
    assignments: [],
    setAssignments: (assignments) => set({ assignments }),
    createAssignment: async (newAssignment) => {
        if (!newAssignment.title || !newAssignment.description) {
            return { success: false, message: "Please fill in all fields." };
        }
        const res = await fetch("/api/assignments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newAssignment),
        });

        const data = await res.json();
        set((state) => ({ assignments: [...state.assignments, data.data] }));
        return { success: true, message: "Assignment created successfully" };
    },
    fetchAssignments: async () => {
        const res = await fetch("/api/assignments");
        const data = await res.json();
        set({ assignments: data.data });
    },
    deleteAssignment: async (pid) => {
        const res = await fetch(`/api/assignments/${pid}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set((state) => ({ assignments: state.assignments.filter((assignment) => assignment._id !== pid) }));
        return { success: true, message: data.message };
    },
    updateAssignment: async (pid, updatedAssignment) => {
        const res = await fetch(`/api/assignments/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedAssignment),
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set((state) => ({
            assignments: state.assignments.map((assignment) => (assignment._id === pid ? data.data : assignment)),
        }));

        return { success: true, message: data.message };
    },
}));

