"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FileText,
    Download,
    ThumbsUp,
    Search,
    Filter,
    Upload,
    BookOpen,
    FlaskConical,
    Calculator,
    Code,
    Atom,
    X,
    CheckCircle2
} from "lucide-react";
import { toast } from "sonner";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Mock Data
const SUBJECTS = ["All", "Maths", "Physics", "Chemistry", "CSE", "ECE", "Mechanical"];
const TYPES = ["All", "Notes", "PYQ", "Lab Manual", "Cheatsheet", "Assignment"];

const INITIAL_RESOURCES = [
    { id: 1, title: "Engineering Maths - Unit 1 Notes", author: "Rahul Sharma", type: "Notes", subject: "Maths", upvotes: 120, date: "2 days ago", size: "2.4 MB", fileUrl: "/documents/engineering-maths-unit-1.pdf" },
    { id: 2, title: "Physics PYQ 2023", author: "Admin", type: "PYQ", subject: "Physics", upvotes: 85, date: "1 week ago", size: "1.1 MB", fileUrl: "/documents/physics-pyq-2023.pdf" },
    { id: 3, title: "Data Structures - Trees & Graphs", author: "Ananya Roy", type: "Notes", subject: "CSE", upvotes: 200, date: "3 days ago", size: "5.6 MB", fileUrl: "/documents/data-structures-trees-graphs.pdf" },
    { id: 4, title: "Chemistry Lab Manual", author: "Priya Patel", type: "Lab Manual", subject: "Chemistry", upvotes: 45, date: "2 weeks ago", size: "3.2 MB", fileUrl: "/documents/chemistry-lab-manual.pdf" },
    { id: 5, title: "Basic Electronics - Formula Sheet", author: "Vikram Malhotra", type: "Cheatsheet", subject: "ECE", upvotes: 150, date: "1 day ago", size: "0.8 MB", fileUrl: "/documents/basic-electronics-formula-sheet.pdf" },
    { id: 6, title: "Thermodynamics Basics", author: "Arjun Singh", type: "Notes", subject: "Mechanical", upvotes: 95, date: "5 days ago", size: "4.1 MB", fileUrl: "/documents/thermodynamics-basics.pdf" },
    { id: 7, title: "Algorithms Assignment 1", author: "Neha Gupta", type: "Assignment", subject: "CSE", upvotes: 30, date: "1 day ago", size: "1.5 MB", fileUrl: "/documents/algorithms-assignment-1.pdf" },
];

const getSubjectIcon = (subject: string) => {
    switch (subject) {
        case "Maths": return <Calculator className="w-5 h-5" />;
        case "Physics": return <Atom className="w-5 h-5" />;
        case "Chemistry": return <FlaskConical className="w-5 h-5" />;
        case "CSE": return <Code className="w-5 h-5" />;
        default: return <BookOpen className="w-5 h-5" />;
    }
};

const getTypeColor = (type: string) => {
    switch (type) {
        case "Notes": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
        case "PYQ": return "bg-orange-500/10 text-orange-400 border-orange-500/20";
        case "Lab Manual": return "bg-green-500/10 text-green-400 border-green-500/20";
        case "Cheatsheet": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
        default: return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
};

export default function ResourcesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("All");
    const [selectedType, setSelectedType] = useState("All");
    const [resources, setResources] = useState(INITIAL_RESOURCES);
    const [isUploadOpen, setIsUploadOpen] = useState(false);

    // Upload Form State
    const [newResource, setNewResource] = useState({ title: "", subject: "", type: "" });

    const filteredResources = resources.filter(res => {
        const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            res.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSubject = selectedSubject === "All" || res.subject === selectedSubject;
        const matchesType = selectedType === "All" || res.type === selectedType;
        return matchesSearch && matchesSubject && matchesType;
    });

    const [likedResources, setLikedResources] = useState<Set<number>>(new Set());

    const handleLike = (id: number) => {
        const isLiked = likedResources.has(id);
        const newLikedResources = new Set(likedResources);

        if (isLiked) {
            newLikedResources.delete(id);
            toast.info("Removed like");
        } else {
            newLikedResources.add(id);
            toast.success("Liked resource");
        }

        setLikedResources(newLikedResources);

        setResources(resources.map(res => {
            if (res.id === id) {
                return {
                    ...res,
                    upvotes: isLiked ? res.upvotes - 1 : res.upvotes + 1
                };
            }
            return res;
        }));
    };

    const handleDownload = (resource: typeof INITIAL_RESOURCES[0]) => {
        if (resource.fileUrl) {
            const link = document.createElement('a');
            link.href = resource.fileUrl;
            link.download = resource.title; // Optional: sets the filename
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            toast.success(`Downloading ${resource.title}`, {
                description: "Your download has started.",
                icon: <Download className="w-4 h-4 text-green-400" />,
            });
        } else {
            toast.error("File not available");
        }
    };

    const handleUpload = () => {
        if (!newResource.title || !newResource.subject || !newResource.type) {
            toast.error("Please fill in all fields");
            return;
        }

        const resource = {
            id: resources.length + 1,
            title: newResource.title,
            author: "You", // Mock user
            subject: newResource.subject,
            type: newResource.type,
            upvotes: 0,
            date: "Just now",
            size: "1.2 MB", // Mock size
            fileUrl: "" // Mock file URL
        };

        setResources([resource, ...resources]);
        setIsUploadOpen(false);
        setNewResource({ title: "", subject: "", type: "" });

        toast.success("Resource Uploaded Successfully!", {
            description: "Thank you for contributing to the community.",
            icon: <CheckCircle2 className="w-4 h-4 text-green-400" />,
        });
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12 relative">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-purple-400 mb-6 tracking-tight">
                        Resource Hub
                    </h1>
                    <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Access a curated collection of notes, PYQs, and study materials shared by the community.
                        Level up your preparation together.
                    </p>
                </motion.div>

                {/* Search & Action Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto items-center"
                >
                    <div className="relative flex-1 w-full">
                        <Input
                            placeholder="Search for notes, subjects, authors..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-12 h-12 bg-white/5 border-white/10 focus:border-purple-500/50 focus:ring-purple-500/20 transition-all rounded-xl"
                        />
                        <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                    </div>

                    <div className="flex gap-2 w-full md:w-auto">
                        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
                            <DialogTrigger asChild>
                                <Button className="h-12 px-6 bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20 rounded-xl w-full md:w-auto transition-all hover:scale-105 active:scale-95">
                                    <Upload className="w-4 h-4 mr-2" />
                                    Share Resource
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-black/90 border-white/10 backdrop-blur-xl text-white sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-bold">Share a Resource</DialogTitle>
                                    <DialogDescription className="text-gray-400">
                                        Upload notes, papers, or assignments to help your peers.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title" className="text-gray-300">Title</Label>
                                        <Input
                                            id="title"
                                            placeholder="e.g. Engineering Maths Unit 1"
                                            value={newResource.title}
                                            onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                                            className="bg-white/5 border-white/10"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label className="text-gray-300">Subject</Label>
                                            <Select
                                                onValueChange={(val) => setNewResource({ ...newResource, subject: val })}
                                            >
                                                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-zinc-900 border-white/10 text-white">
                                                    {SUBJECTS.filter(s => s !== "All").map(s => (
                                                        <SelectItem key={s} value={s}>{s}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-gray-300">Type</Label>
                                            <Select
                                                onValueChange={(val) => setNewResource({ ...newResource, type: val })}
                                            >
                                                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-zinc-900 border-white/10 text-white">
                                                    {TYPES.filter(t => t !== "All").map(t => (
                                                        <SelectItem key={t} value={t}>{t}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="pt-2">
                                        <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-purple-500/50 transition-colors cursor-pointer bg-white/5">
                                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                            <p className="text-sm text-gray-400">Click to upload file or drag and drop</p>
                                            <p className="text-xs text-gray-500 mt-1">PDF, DOCX up to 10MB</p>
                                        </div>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="ghost" onClick={() => setIsUploadOpen(false)} className="hover:bg-white/10 text-gray-300">Cancel</Button>
                                    <Button onClick={handleUpload} className="bg-purple-600 hover:bg-purple-700 text-white">Upload</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-2 mt-8"
                >
                    {SUBJECTS.map((subject) => (
                        <button
                            key={subject}
                            onClick={() => setSelectedSubject(subject)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${selectedSubject === subject
                                ? "bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                                : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            {subject}
                        </button>
                    ))}
                </motion.div>
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredResources.map((resource, index) => (
                        <motion.div
                            key={resource.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                            <Card className="glass h-full p-0 overflow-hidden group hover:border-purple-500/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] bg-black/40 backdrop-blur-md border-white/10">
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`p-3 rounded-xl ${getTypeColor(resource.type)} border`}>
                                            {getSubjectIcon(resource.subject)}
                                        </div>
                                        <Badge variant="outline" className={`${getTypeColor(resource.type)}`}>
                                            {resource.type}
                                        </Badge>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
                                        {resource.title}
                                    </h3>

                                    <div className="flex items-center text-sm text-gray-400 mb-4 space-x-2">
                                        <span>{resource.subject}</span>
                                        <span>•</span>
                                        <span>{resource.size}</span>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-[10px] font-bold text-black">
                                                {resource.author[0]}
                                            </div>
                                            <span className="text-xs text-gray-400">{resource.author}</span>
                                        </div>
                                        <span className="text-xs text-gray-500">{resource.date}</span>
                                    </div>
                                </div>

                                <div className="p-4 bg-white/5 flex items-center justify-between gap-3">
                                    <Button
                                        variant="ghost"
                                        onClick={() => handleLike(resource.id)}
                                        className={`flex-1 h-9 transition-colors ${likedResources.has(resource.id)
                                            ? "text-purple-400 bg-purple-500/10 hover:bg-purple-500/20"
                                            : "text-gray-400 hover:text-purple-400 hover:bg-purple-500/10"
                                            }`}
                                    >
                                        <ThumbsUp className={`w-4 h-4 mr-2 ${likedResources.has(resource.id) ? "fill-current" : ""}`} />
                                        {resource.upvotes}
                                    </Button>
                                    <Button
                                        onClick={() => handleDownload(resource)}
                                        className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/10 h-9 group-hover:bg-purple-600 group-hover:border-purple-500 transition-all duration-300"
                                    >
                                        <Download className="w-4 h-4 mr-2" />
                                        Download
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredResources.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20"
                >
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-10 h-10 text-gray-600" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No resources found</h3>
                    <p className="text-gray-400">Try adjusting your search or filters</p>
                    <Button
                        variant="link"
                        onClick={() => {
                            setSearchTerm("");
                            setSelectedSubject("All");
                            setSelectedType("All");
                        }}
                        className="text-purple-400 mt-2"
                    >
                        Clear all filters
                    </Button>
                </motion.div>
            )}
        </div>
    );
}
