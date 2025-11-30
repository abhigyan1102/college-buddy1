import { useSession } from "@/lib/auth-client";
import { UserProfile, currentUser as mockUser } from "./mock-data";

export function useCurrentUser() {
    const { data: session, isPending } = useSession();

    if (isPending) {
        return { user: null, isLoading: true };
    }

    if (session?.user) {
        // Generate a deterministic handle/username
        const sanitizedName = (session.user.name || "User").toLowerCase().replace(/[^a-z0-9]/g, "");
        const shortId = session.user.id.slice(0, 4);
        const formattedId = `${sanitizedName}${shortId}`;

        const user: UserProfile = {
            id: formattedId,
            name: session.user.name || "User",
            avatar: session.user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.id}`,
            // Default values for fields not in session
            year: 1,
            bio: "Student at Vedam School",
            questionsAnswered: 0,
            questionsPending: 0,
            badges: ["new"],
        };
        return { user, isLoading: false };
    }

    // Fallback to mock user if not logged in (or return null if you want to force login)
    // For now, returning mockUser to keep the UI populated for guests, 
    // but you might want to return null to show a "Login" prompt.
    return { user: mockUser, isLoading: false };
}
