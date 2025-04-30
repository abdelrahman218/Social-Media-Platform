import { Post } from "../app.model";

export const dummyPosts: Post[] = [
    {
      id: 1,
      text_content: "Loving this sunny day! 🌞",
      postOwner: { name: "Alex Johnson", email: "alex.johnson@example.com", bio: "Code and coffee enthusiast", profilePicURL: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg", gender: "Male" },
      datePosted: new Date("2024-06-15"),
      attachedImagesURLs: [],
      likes: [{ userId: 101, time: new Date("2024-06-16") }],
      comments: []
    },
    {
      id: 2,
      text_content: "Just finished a great hike! 🏞️",
      postOwner: { name: "Emma Smith", email: "emma.smith@example.com", bio: "Nature lover", profilePicURL: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg", gender: "Female" },
      datePosted: new Date("2024-07-01"),
      attachedImagesURLs: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e","https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c","https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875"],
      likes: [],
      comments: []
    },
    {
      id: 3,
      text_content: "New recipe tried today! 🍳",
      postOwner: { name: "Michael Chen", email: "michael.chen@example.com", bio: "Foodie", profilePicURL: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg", gender: "Male" },
      datePosted: new Date("2024-08-10"),
      attachedImagesURLs: [],
      likes: [{ userId: 102, time: new Date("2024-08-11") }, { userId: 103, time: new Date("2024-08-12") }],
      comments: []
    },
    {
      id: 4,
      text_content: "Movie night was awesome! 🎬",
      postOwner: { name: "Sophia Rodriguez", email: "sophia.rodriguez@example.com", bio: "Film buff", profilePicURL: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg", gender: "Female" },
      datePosted: new Date("2024-09-05"),
      attachedImagesURLs: ["https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c"],
      likes: [{ userId: 104, time: new Date("2024-09-06") }],
      comments: []
    },
    {
      id: 5,
      text_content: "Coding all day! 💻",
      postOwner: { name: "James Lee", email: "james.lee@example.com", bio: "Tech geek", profilePicURL: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg", gender: "Male" },
      datePosted: new Date("2024-10-12"),
      attachedImagesURLs: [],
      likes: [],
      comments: []
    },
    {
      id: 6,
      text_content: "Beautiful sunset! 🌅",
      postOwner: { name: "Olivia Brown", email: "olivia.brown@example.com", bio: "Photographer", profilePicURL: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg", gender: "Female" },
      datePosted: new Date("2024-11-20"),
      attachedImagesURLs: ["https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875"],
      likes: [{ userId: 105, time: new Date("2024-11-21") }],
      comments: []
    },
    {
      id: 7,
      text_content: "Weekend vibes! 😎",
      postOwner: { name: "William Davis", email: "william.davis@example.com", bio: "Adventure seeker", profilePicURL: "https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg", gender: "Male" },
      datePosted: new Date("2024-12-01"),
      attachedImagesURLs: [],
      likes: [{ userId: 106, time: new Date("2024-12-02") }],
      comments: []
    },
    {
      id: 8,
      text_content: "Reading a new book! 📚",
      postOwner: { name: "Isabella Martinez", email: "isabella.martinez@example.com", bio: "Bookworm", profilePicURL: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg", gender: "Female" },
      datePosted: new Date("2025-01-15"),
      attachedImagesURLs: [],
      likes: [],
      comments: []
    },
    {
      id: 9,
      text_content: "Coffee time! ☕",
      postOwner: { name: "Ethan Wilson", email: "ethan.wilson@example.com", bio: "Coffee addict", profilePicURL: "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg", gender: "Male" },
      datePosted: new Date("2025-02-03"),
      attachedImagesURLs: ["https://images.unsplash.com/photo-1495474472257-6a0c2a3b8a5e"],
      likes: [{ userId: 107, time: new Date("2025-02-04") }],
      comments: []
    },
    {
      id: 10,
      text_content: "Grateful for friends! ❤️",
      postOwner: { name: "Ava Taylor", email: "ava.taylor@example.com", bio: "People person", profilePicURL: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg", gender: "Female" },
      datePosted: new Date("2025-03-10"),
      attachedImagesURLs: [],
      likes: [{ userId: 108, time: new Date("2025-03-11") }],
      comments: []
    },
    {
      id: 11,
      text_content: "Gym session done! 💪",
      postOwner: { name: "Noah Anderson", email: "noah.anderson@example.com", bio: "Fitness junkie", profilePicURL: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg", gender: "Male" },
      datePosted: new Date("2024-06-20"),
      attachedImagesURLs: [],
      likes: [],
      comments: []
    },
    {
      id: 12,
      text_content: "Travel plans made! ✈️",
      postOwner: { name: "Mia Thomas", email: "mia.thomas@example.com", bio: "Wanderlust", profilePicURL: "https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg", gender: "Female" },
      datePosted: new Date("2024-07-25"),
      attachedImagesURLs: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e"],
      likes: [{ userId: 109, time: new Date("2024-07-26") }],
      comments: []
    },
    {
      id: 13,
      text_content: "New project started! 🚀",
      postOwner: { name: "Lucas Moore", email: "lucas.moore@example.com", bio: "Innovator", profilePicURL: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg", gender: "Male" },
      datePosted: new Date("2024-08-15"),
      attachedImagesURLs: [],
      likes: [{ userId: 110, time: new Date("2024-08-16") }],
      comments: []
    },
    {
      id: 14,
      text_content: "Chasing dreams! 🌟",
      postOwner: { name: "Charlotte Jackson", email: "charlotte.jackson@example.com", bio: "Dreamer", profilePicURL: "https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg", gender: "Female" },
      datePosted: new Date("2024-09-20"),
      attachedImagesURLs: [],
      likes: [],
      comments: []
    },
    {
      id: 15,
      text_content: "Music festival was epic! 🎶",
      postOwner: { name: "Liam White", email: "liam.white@example.com", bio: "Music lover", profilePicURL: "https://images.pexels.com/photos/1212837/pexels-photo-1212837.jpeg", gender: "Male" },
      datePosted: new Date("2024-10-05"),
      attachedImagesURLs: ["https://images.unsplash.com/photo-1470229722913-7c0e2dbb735d"],
      likes: [{ userId: 111, time: new Date("2024-10-06") }],
      comments: []
    },
    {
      id: 16,
      text_content: "Relaxing by the beach! 🏖️",
      postOwner: { name: "Alex Johnson", email: "alex.johnson@example.com", bio: "Code and coffee enthusiast", profilePicURL: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg", gender: "Male" },
      datePosted: new Date("2024-11-10"),
      attachedImagesURLs: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e"],
      likes: [],
      comments: []
    },
    {
      id: 17,
      text_content: "Learning something new! 🧠",
      postOwner: { name: "Emma Smith", email: "emma.smith@example.com", bio: "Nature lover", profilePicURL: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg", gender: "Female" },
      datePosted: new Date("2024-12-15"),
      attachedImagesURLs: [],
      likes: [{ userId: 112, time: new Date("2024-12-16") }],
      comments: []
    },
    {
      id: 18,
      text_content: "Game night with friends! 🎲",
      postOwner: { name: "Michael Chen", email: "michael.chen@example.com", bio: "Foodie", profilePicURL: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg", gender: "Male" },
      datePosted: new Date("2025-01-20"),
      attachedImagesURLs: [],
      likes: [],
      comments: []
    },
    {
      id: 19,
      text_content: "Art gallery visit! 🎨",
      postOwner: { name: "Sophia Rodriguez", email: "sophia.rodriguez@example.com", bio: "Film buff", profilePicURL: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg", gender: "Female" },
      datePosted: new Date("2025-02-25"),
      attachedImagesURLs: ["https://images.unsplash.com/photo-1516321497487-e288fb19713f"],
      likes: [{ userId: 113, time: new Date("2025-02-26") }],
      comments: []
    },
    {
      id: 20,
      text_content: "Morning run feels great! 🏃",
      postOwner: { name: "James Lee", email: "james.lee@example.com", bio: "Tech geek", profilePicURL: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg", gender: "Male" },
      datePosted: new Date("2025-03-05"),
      attachedImagesURLs: [],
      likes: [],
      comments: []
    },
    {
      id: 21,
      text_content: "Star gazing tonight! 🌌",
      postOwner: { name: "Olivia Brown", email: "olivia.brown@example.com", bio: "Photographer", profilePicURL: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg", gender: "Female" },
      datePosted: new Date("2024-06-25"),
      attachedImagesURLs: ["https://images.unsplash.com/photo-1436891620584-47fd0e565afb"],
      likes: [{ userId: 114, time: new Date("2024-06-26") }],
      comments: []
    },
    {
      id: 22,
      text_content: "New gadget unboxed! 📱",
      postOwner: { name: "William Davis", email: "william.davis@example.com", bio: "Adventure seeker", profilePicURL: "https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg", gender: "Male" },
      datePosted: new Date("2024-07-30"),
      attachedImagesURLs: [],
      likes: [],
      comments: []
    },
    {
      id: 23,
      text_content: "Baking cookies! 🍪",
      postOwner: { name: "Isabella Martinez", email: "isabella.martinez@example.com", bio: "Bookworm", profilePicURL: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg", gender: "Female" },
      datePosted: new Date("2024-08-25"),
      attachedImagesURLs: ["https://images.unsplash.com/photo-1562026723-2f4b4b8b4c5f"],
      likes: [{ userId: 115, time: new Date("2024-08-26") }],
      comments: []
    },
    {
      id: 24,
      text_content: "Team meeting went well! 🤝",
      postOwner: { name: "Ethan Wilson", email: "ethan.wilson@example.com", bio: "Coffee addict", profilePicURL: "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg", gender: "Male" },
      datePosted: new Date("2024-09-15"),
      attachedImagesURLs: [],
      likes: [],
      comments: []
    },
    {
      id: 25,
      text_content: "Family time is the best! 👨‍👩‍👧",
      postOwner: { name: "Ava Taylor", email: "ava.taylor@example.com", bio: "People person", profilePicURL: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg", gender: "Female" },
      datePosted: new Date("2024-10-20"),
      attachedImagesURLs: [],
      likes: [{ userId: 116, time: new Date("2024-10-21") }],
      comments: []
    },
    {
      id: 26,
      text_content: "Yoga session was relaxing! 🧘",
      postOwner: { name: "Noah Anderson", email: "noah.anderson@example.com", bio: "Fitness junkie", profilePicURL: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg", gender: "Male" },
      datePosted: new Date("2024-11-25"),
      attachedImagesURLs: [],
      likes: [],
      comments: []
    },
    {
      id: 27,
      text_content: "City lights at night! 🌃",
      postOwner: { name: "Mia Thomas", email: "mia.thomas@example.com", bio: "Wanderlust", profilePicURL: "https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg", gender: "Female" },
      datePosted: new Date("2024-12-20"),
      attachedImagesURLs: ["https://images.unsplash.com/photo-1519501025264-65ba15a82390"],
      likes: [{ userId: 117, time: new Date("2024-12-21") }],
      comments: []
    },
    {
      id: 28,
      text_content: "Debugging code like a pro! 🐞",
      postOwner: { name: "Lucas Moore", email: "lucas.moore@example.com", bio: "Innovator", profilePicURL: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg", gender: "Male" },
      datePosted: new Date("2025-01-25"),
      attachedImagesURLs: [],
      likes: [],
      comments: []
    },
    {
      id: 29,
      text_content: "Spring flowers blooming! 🌸",
      postOwner: { name: "Charlotte Jackson", email: "charlotte.jackson@example.com", bio: "Dreamer", profilePicURL: "https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg", gender: "Female" },
      datePosted: new Date("2025-02-15"),
      attachedImagesURLs: ["https://images.unsplash.com/photo-1588964895597-cf89ed1882b5"],
      likes: [{ userId: 118, time: new Date("2025-02-16") }],
      comments: []
    },
    {
      id: 30,
      text_content: "Concert was unforgettable! 🎤",
      postOwner: { name: "Liam White", email: "liam.white@example.com", bio: "Music lover", profilePicURL: "https://images.pexels.com/photos/1212837/pexels-photo-1212837.jpeg", gender: "Male" },
      datePosted: new Date("2025-03-20"),
      attachedImagesURLs: [],
      likes: [{ userId: 119, time: new Date("2025-03-21") }],
      comments: []
    }
];