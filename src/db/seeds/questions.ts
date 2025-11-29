import { db } from '@/db';
import { questions } from '@/db/schema';

async function main() {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const getRandomDate = (start: Date, end: Date): string => {
        const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return date.toISOString();
    };

    const getViewCount = (createdAt: string): number => {
        const daysSinceCreation = Math.floor((now.getTime() - new Date(createdAt).getTime()) / (24 * 60 * 60 * 1000));
        if (daysSinceCreation > 20) return Math.floor(Math.random() * 150) + 100;
        if (daysSinceCreation > 10) return Math.floor(Math.random() * 100) + 50;
        return Math.floor(Math.random() * 50) + 10;
    };

    const sampleQuestions = [
        {
            title: 'Hostel room allocation - single or sharing?',
            content: 'Hey everyone! I just got my admission confirmation and I\'m super excited! But I\'m confused about hostel rooms. The form asks if I want single occupancy or sharing (2/3 people). I\'m an introvert and value my personal space, but I also don\'t want to miss out on the college experience and making friends. What would you guys recommend? Also, is there a big price difference between single and sharing rooms? Thanks in advance!',
            askedBy: null,
            isAnonymous: false,
            createdAt: getRandomDate(thirtyDaysAgo, new Date(now.getTime() - 25 * 24 * 60 * 60 * 1000)),
            updatedAt: getRandomDate(thirtyDaysAgo, new Date(now.getTime() - 25 * 24 * 60 * 60 * 1000)),
            viewCount: 0,
            answerCount: 0,
        },
        {
            title: 'Which electives should I choose in first semester?',
            content: 'I\'m a CS fresher and totally lost with the elective selection. The portal shows options like Python Programming, Web Development, Data Structures, and Mobile App Development. I have basic coding knowledge from school but nothing advanced. Which one would be best for a beginner? Also, do these electives affect placements or just GPA? Need to submit the form by tomorrow, please help!',
            askedBy: null,
            isAnonymous: false,
            createdAt: getRandomDate(thirtyDaysAgo, new Date(now.getTime() - 22 * 24 * 60 * 60 * 1000)),
            updatedAt: getRandomDate(thirtyDaysAgo, new Date(now.getTime() - 22 * 24 * 60 * 60 * 1000)),
            viewCount: 0,
            answerCount: 0,
        },
        {
            title: 'How good is campus placement for CS students?',
            content: 'I\'ve heard mixed reviews about placements. Some seniors say companies like TCS, Infosys come regularly, but others say the packages are not that great. What\'s the reality? What\'s the average package for CS graduates? Do top companies like Google, Microsoft, Amazon visit our campus? Also, how important is CGPA for placements - is 8+ enough or do we need 9+? Should I focus more on CGPA or building projects and skills?',
            askedBy: null,
            isAnonymous: false,
            createdAt: getRandomDate(thirtyDaysAgo, new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000)),
            updatedAt: getRandomDate(thirtyDaysAgo, new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000)),
            viewCount: 0,
            answerCount: 0,
        },
        {
            title: 'Is ragging still a thing in our college?',
            content: 'I\'m really worried about ragging. I\'ve heard horror stories from other colleges and I\'m genuinely scared. My parents are also concerned. Is there any ragging in hostels or campus? What happens during the first few weeks? Are seniors friendly or should I be careful? Also, is there any anti-ragging committee that actually works? Please be honest, I need to know what to expect.',
            askedBy: null,
            isAnonymous: true,
            createdAt: getRandomDate(thirtyDaysAgo, new Date(now.getTime() - 18 * 24 * 60 * 60 * 1000)),
            updatedAt: getRandomDate(thirtyDaysAgo, new Date(now.getTime() - 18 * 24 * 60 * 60 * 1000)),
            viewCount: 0,
            answerCount: 0,
        },
        {
            title: 'Best clubs to join for networking and resume building?',
            content: 'There are so many clubs - coding club, robotics club, cultural club, NSS, NCC, entrepreneurship cell, etc. I\'m interested in tech and want to build a strong resume for placements. Which clubs should I prioritize? Can I join multiple clubs or is it too much workload along with academics? Also, do these club activities really help in placements or internships? Looking for honest advice from seniors who\'ve been through this!',
            askedBy: null,
            isAnonymous: false,
            createdAt: getRandomDate(thirtyDaysAgo, new Date(now.getTime() - 16 * 24 * 60 * 60 * 1000)),
            updatedAt: getRandomDate(thirtyDaysAgo, new Date(now.getTime() - 16 * 24 * 60 * 60 * 1000)),
            viewCount: 0,
            answerCount: 0,
        },
        {
            title: 'Library timings and book borrowing rules?',
            content: 'Can someone tell me the library schedule? Is it open on weekends? I prefer studying in the library rather than my room. Also, how many books can we borrow at once? Is there a digital library for ebooks and research papers? Do we need to pay any fine if we return books late? And most importantly, are there enough seats in the library during exam time or do we need to go very early to get a spot?',
            askedBy: null,
            isAnonymous: false,
            createdAt: getRandomDate(thirtyDaysAgo, new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)),
            updatedAt: getRandomDate(thirtyDaysAgo, new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)),
            viewCount: 0,
            answerCount: 0,
        },
        {
            title: 'Mess food quality - vegetarian options available?',
            content: 'I\'m a pure vegetarian and quite picky about food. How\'s the mess food? Is it hygienic? Are there enough vegetarian options or is it mostly non-veg? Can we opt out of the mess and cook our own food in hostels? Also, heard there are multiple mess options - which one is the best for vegetarians? Is outside food allowed in hostels? What about food delivery from Swiggy/Zomato? Thanks!',
            askedBy: null,
            isAnonymous: false,
            createdAt: getRandomDate(thirtyDaysAgo, new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000)),
            updatedAt: getRandomDate(thirtyDaysAgo, new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000)),
            viewCount: 0,
            answerCount: 0,
        },
        {
            title: 'Can we use our own vehicles on campus?',
            content: 'My home is just 50km away and I\'m planning to bring my bike/scooty to college. Is it allowed? Do we need special permission or parking pass? Is parking safe - any theft issues? What about petrol bunks nearby? Also, are there any restrictions on vehicle timings like can we go out on weekends freely? Some seniors said only final year students can have vehicles, is that true? Need clarification on this.',
            askedBy: null,
            isAnonymous: false,
            createdAt: getRandomDate(thirtyDaysAgo, new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000)),
            updatedAt: getRandomDate(thirtyDaysAgo, new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000)),
            viewCount: 0,
            answerCount: 0,
        },
        {
            title: 'Part-time job opportunities while studying?',
            content: 'I want to be financially independent and not burden my parents too much. Are there any part-time job opportunities on campus or nearby? Like tutoring, content writing, freelancing, campus ambassador programs, etc.? Will it affect my studies and attendance? Also, is the college okay with students doing part-time work or are there any rules against it? What about online freelancing - is that allowed? Would love to hear from anyone who\'s done this!',
            askedBy: null,
            isAnonymous: true,
            createdAt: getRandomDate(thirtyDaysAgo, new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000)),
            updatedAt: getRandomDate(thirtyDaysAgo, new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000)),
            viewCount: 0,
            answerCount: 0,
        },
        {
            title: 'Scholarship criteria and application deadlines?',
            content: 'My family\'s financial situation is not great and I really need scholarship to continue my education. What scholarships are available? I got 85% in 12th - is that enough for merit scholarship? Are there need-based scholarships too? What documents do I need to submit? When is the deadline - is it already over? Also, can we apply for multiple scholarships or just one? Please help, this is really important for me.',
            askedBy: null,
            isAnonymous: true,
            createdAt: getRandomDate(thirtyDaysAgo, new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000)),
            updatedAt: getRandomDate(thirtyDaysAgo, new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000)),
            viewCount: 0,
            answerCount: 0,
        },
        {
            title: 'Sports facilities - gym, cricket ground, basketball court?',
            content: 'I\'m really into fitness and sports. What sports facilities does the college have? Is there a proper gym with equipment? Cricket ground, football field, basketball court? Are these facilities free to use or do we need membership? What are the timings? Also, are there any sports competitions or inter-college tournaments? I want to stay fit and active during college, so this is important for me. Any sports enthusiasts here?',
            askedBy: null,
            isAnonymous: false,
            createdAt: getRandomDate(thirtyDaysAgo, new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000)),
            updatedAt: getRandomDate(thirtyDaysAgo, new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000)),
            viewCount: 0,
            answerCount: 0,
        },
        {
            title: 'How to balance academics and extracurriculars?',
            content: 'Everyone says college is not just about studies, we should enjoy and participate in events, clubs, fests, etc. But I\'m worried about my CGPA. How do seniors manage to do both? What\'s more important for career - good grades or diverse experiences? I don\'t want to regret missing out on college life, but I also can\'t compromise on my career. How much time should I dedicate to studies vs other activities? Any time management tips? Really confused about priorities here.',
            askedBy: null,
            isAnonymous: true,
            createdAt: getRandomDate(thirtyDaysAgo, new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000)),
            updatedAt: getRandomDate(thirtyDaysAgo, new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000)),
            viewCount: 0,
            answerCount: 0,
        },
        {
            title: 'Internship opportunities in first and second year?',
            content: 'I want to start building my resume early. Are there any internship opportunities for first and second year students? Or do companies only consider third and fourth year? What about summer internships? Should I start applying from first year itself or wait? Also, does the college help with internship placements or do we need to find them ourselves? What skills should I focus on developing to get good internships? Any guidance would be helpful!',
            askedBy: null,
            isAnonymous: false,
            createdAt: getRandomDate(thirtyDaysAgo, new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)),
            updatedAt: getRandomDate(thirtyDaysAgo, new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)),
            viewCount: 0,
            answerCount: 0,
        },
        {
            title: 'Wifi speed and availability in hostel rooms?',
            content: 'This might sound silly but it\'s important - how\'s the wifi in hostels? Is it fast enough for online classes, streaming, gaming? Is wifi available 24/7 or only during certain hours? What\'s the speed - can we attend video calls without lag? Do we need to bring our own router or is the college wifi sufficient? Also, is there any data limit per day/month? I need good internet for my online courses and staying connected with family.',
            askedBy: null,
            isAnonymous: false,
            createdAt: getRandomDate(thirtyDaysAgo, new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)),
            updatedAt: getRandomDate(thirtyDaysAgo, new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)),
            viewCount: 0,
            answerCount: 0,
        },
        {
            title: 'Senior-junior interaction - mentor programs?',
            content: 'How is the senior-junior relationship in our college? Are seniors approachable and helpful? I\'ve heard some colleges have formal mentorship programs where each fresher gets a senior mentor. Do we have something like that? I\'m a bit nervous and would really appreciate having a senior guide to help navigate college life, academics, placements, etc. Also, how do we even approach seniors - in classes, clubs, hostels? Any tips on building good relationships with seniors?',
            askedBy: null,
            isAnonymous: true,
            createdAt: getRandomDate(thirtyDaysAgo, new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)),
            updatedAt: getRandomDate(thirtyDaysAgo, new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)),
            viewCount: 0,
            answerCount: 0,
        },
    ];

    const questionsWithViewCounts = sampleQuestions.map(q => ({
        ...q,
        viewCount: getViewCount(q.createdAt),
    }));

    await db.insert(questions).values(questionsWithViewCounts);
    
    console.log('✅ Questions seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});