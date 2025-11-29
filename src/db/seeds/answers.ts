import { db } from '@/db';
import { answers } from '@/db/schema';

async function main() {
    const sampleAnswers = [
        // Question 1: Hostel (5 answers)
        {
            questionId: 1,
            content: 'The hostel facilities are actually pretty good! Most rooms are double occupancy with attached bathrooms. Each floor has a common room with TV and a small pantry. The hostel has 24/7 security and wifi. Though wifi speed can be slow during peak hours. Overall, it\'s comfortable and well-maintained.',
            answeredBy: null,
            createdAt: new Date('2024-01-16T10:30:00Z').toISOString(),
            updatedAt: new Date('2024-01-16T10:30:00Z').toISOString(),
            isHelpful: true,
        },
        {
            questionId: 1,
            content: 'I\'ve been living in the hostel for 2 years now. The rooms are decent sized and you get a bed, study table, chair, and wardrobe. The bathrooms are cleaned daily. The best part is the mess food is included in hostel fees. Laundry service is also available. Only downside is the strict 11 PM curfew on weekdays.',
            answeredBy: null,
            createdAt: new Date('2024-01-16T14:20:00Z').toISOString(),
            updatedAt: new Date('2024-01-16T14:20:00Z').toISOString(),
            isHelpful: true,
        },
        {
            questionId: 1,
            content: 'Hostel life is great for making friends! The common areas are always buzzing with activity. We have a gym, indoor games room, and even a small library in the hostel. The warden is strict about discipline but fair. You\'ll definitely enjoy the hostel experience.',
            answeredBy: null,
            createdAt: new Date('2024-01-17T09:15:00Z').toISOString(),
            updatedAt: new Date('2024-01-17T09:15:00Z').toISOString(),
            isHelpful: false,
        },
        {
            questionId: 1,
            content: 'Just a heads up - bring your own bucket and mug because those aren\'t provided. Also get a good study lamp as the room lighting isn\'t always sufficient. The hostel has power backup but it doesn\'t cover AC points. Overall it\'s a good experience though!',
            answeredBy: null,
            createdAt: new Date('2024-01-17T16:45:00Z').toISOString(),
            updatedAt: new Date('2024-01-17T16:45:00Z').toISOString(),
            isHelpful: true,
        },
        {
            questionId: 1,
            content: 'The hostel is located right inside campus which is super convenient. You can literally roll out of bed 10 minutes before class lol. Maintenance requests are usually handled within a day or two. Would definitely recommend staying in hostel for at least the first year.',
            answeredBy: null,
            createdAt: new Date('2024-01-18T11:00:00Z').toISOString(),
            updatedAt: new Date('2024-01-18T11:00:00Z').toISOString(),
            isHelpful: false,
        },

        // Question 2: Electives (5 answers)
        {
            questionId: 2,
            content: 'The elective selection process happens at the start of each semester through the college portal. You get to choose from a list of available electives based on your department and year. Popular ones fill up fast so register as soon as the portal opens! You can see the syllabus and faculty details before choosing.',
            answeredBy: null,
            createdAt: new Date('2024-01-16T13:20:00Z').toISOString(),
            updatedAt: new Date('2024-01-16T13:20:00Z').toISOString(),
            isHelpful: true,
        },
        {
            questionId: 2,
            content: 'I\'d recommend talking to seniors about which electives are interesting and which professors are good. Some electives have heavy workload while others are more chill. Also check if the elective timings clash with your core subjects. You usually need to maintain a certain GPA to get your first choice.',
            answeredBy: null,
            createdAt: new Date('2024-01-17T10:30:00Z').toISOString(),
            updatedAt: new Date('2024-01-17T10:30:00Z').toISOString(),
            isHelpful: true,
        },
        {
            questionId: 2,
            content: 'There are technical electives like Machine Learning, Cloud Computing, Cybersecurity, etc. and also some non-tech ones like Communication Skills, Entrepreneurship, Foreign Languages. You need to complete a certain number of credits from electives to graduate. Choose wisely based on your interests and career goals.',
            answeredBy: null,
            createdAt: new Date('2024-01-17T15:40:00Z').toISOString(),
            updatedAt: new Date('2024-01-17T15:40:00Z').toISOString(),
            isHelpful: false,
        },
        {
            questionId: 2,
            content: 'Pro tip: some electives allow auditing which means you can attend classes without being enrolled for credits. This is great if you want to learn something but don\'t want the exam pressure. However, you won\'t get a grade for audited courses.',
            answeredBy: null,
            createdAt: new Date('2024-01-18T09:25:00Z').toISOString(),
            updatedAt: new Date('2024-01-18T09:25:00Z').toISOString(),
            isHelpful: true,
        },
        {
            questionId: 2,
            content: 'The college also offers MOOCs and online courses that can count as electives. These are flexible and you can do them at your own pace. Good option if you want to explore something outside the regular elective offerings.',
            answeredBy: null,
            createdAt: new Date('2024-01-18T14:50:00Z').toISOString(),
            updatedAt: new Date('2024-01-18T14:50:00Z').toISOString(),
            isHelpful: false,
        },

        // Question 3: Placements (5 answers)
        {
            questionId: 3,
            content: 'The placement record is really good! Last year the average package was around 8 LPA and highest was 45 LPA. Top companies like Google, Microsoft, Amazon, Goldman Sachs, etc. visit for campus placements. The Training & Placement cell is very supportive and conducts mock interviews and resume workshops throughout the year.',
            answeredBy: null,
            createdAt: new Date('2024-01-16T11:45:00Z').toISOString(),
            updatedAt: new Date('2024-01-16T11:45:00Z').toISOString(),
            isHelpful: true,
        },
        {
            questionId: 3,
            content: 'Placement prep starts from 3rd year. The college has tie-ups with coding platforms for free access and regularly invites alumni to share their interview experiences. Core companies also come but software roles get the most attention. Around 85-90% students get placed through campus placements.',
            answeredBy: null,
            createdAt: new Date('2024-01-17T13:10:00Z').toISOString(),
            updatedAt: new Date('2024-01-17T13:10:00Z').toISOString(),
            isHelpful: true,
        },
        {
            questionId: 3,
            content: 'Focus on building your skills from first year itself. Do internships, work on projects, participate in hackathons. The placement process is competitive and companies look for well-rounded candidates. Keep your CGPA above 7.5 to be eligible for most companies. DSA preparation is crucial for software roles.',
            answeredBy: null,
            createdAt: new Date('2024-01-17T16:20:00Z').toISOString(),
            updatedAt: new Date('2024-01-17T16:20:00Z').toISOString(),
            isHelpful: true,
        },
        {
            questionId: 3,
            content: 'The placement season typically runs from August to December in final year. Some companies come for pre-placement offers (PPOs) based on summer internships. Dream companies usually come first, followed by regular companies. You can appear for multiple companies but once you accept an offer, you\'re out of the process.',
            answeredBy: null,
            createdAt: new Date('2024-01-18T10:35:00Z').toISOString(),
            updatedAt: new Date('2024-01-18T10:35:00Z').toISOString(),
            isHelpful: false,
        },
        {
            questionId: 3,
            content: 'Besides placements, many students also opt for higher studies. The college helps with GRE/GATE prep and has a good track record for admissions to top universities abroad and IITs/IIMs. So you have multiple options after graduation.',
            answeredBy: null,
            createdAt: new Date('2024-01-18T15:15:00Z').toISOString(),
            updatedAt: new Date('2024-01-18T15:15:00Z').toISOString(),
            isHelpful: false,
        },

        // Question 4: Ragging (4 answers)
        {
            questionId: 4,
            content: 'There is absolutely NO ragging in our college. It\'s completely banned and the administration is very strict about it. There\'s an anti-ragging squad and helpline. During orientation, they make it very clear that ragging is a punishable offense. Seniors are generally friendly and helpful, not intimidating at all.',
            answeredBy: null,
            createdAt: new Date('2024-01-16T14:50:00Z').toISOString(),
            updatedAt: new Date('2024-01-16T14:50:00Z').toISOString(),
            isHelpful: true,
        },
        {
            questionId: 4,
            content: 'I was worried about ragging too when I joined but it was completely unfounded. The seniors actually organized welcome events for us and helped with academic doubts. The college has a zero-tolerance policy and there are cameras everywhere. If anyone faces any issues, they can report anonymously.',
            answeredBy: null,
            createdAt: new Date('2024-01-17T11:20:00Z').toISOString(),
            updatedAt: new Date('2024-01-17T11:20:00Z').toISOString(),
            isHelpful: true,
        },
        {
            questionId: 4,
            content: 'The college takes student safety very seriously. During the first week, there are orientation sessions specifically about anti-ragging measures. Faculty members and wardens are easily accessible if you have any concerns. The senior-junior culture here is based on mentorship, not harassment.',
            answeredBy: null,
            createdAt: new Date('2024-01-17T17:30:00Z').toISOString(),
            updatedAt: new Date('2024-01-17T17:30:00Z').toISOString(),
            isHelpful: true,
        },
        {
            questionId: 4,
            content: 'Don\'t worry at all! The environment is very safe and welcoming. Seniors often share notes, guide you through the campus, and help with club selections. It\'s more of a friendly introduction culture rather than anything negative. You\'ll feel comfortable from day one.',
            answeredBy: null,
            createdAt: new Date('2024-01-18T12:40:00Z').toISOString(),
            updatedAt: new Date('2024-01-18T12:40:00Z').toISOString(),
            isHelpful: false,
        },

        // Question 5: Clubs (4 answers)
        {
            questionId: 5,
            content: 'We have tons of clubs! Technical clubs like Coding Club, Robotics Club, AI/ML Club for tech enthusiasts. Cultural clubs for dance, music, drama, photography. Sports clubs for every sport you can think of. Plus clubs for social service, entrepreneurship, public speaking, etc. There\'s literally something for everyone!',
            answeredBy: null,
            createdAt: new Date('2024-01-16T16:10:00Z').toISOString(),
            updatedAt: new Date('2024-01-16T16:10:00Z').toISOString(),
            isHelpful: true,
        },
        {
            questionId: 5,
            content: 'Club recruitment happens in the first month of each academic year. Most clubs conduct tasks or interviews to select members. Being part of clubs is a great way to develop skills outside academics and make friends with similar interests. The club activities don\'t interfere much with studies if you manage time well.',
            answeredBy: null,
            createdAt: new Date('2024-01-17T12:25:00Z').toISOString(),
            updatedAt: new Date('2024-01-17T12:25:00Z').toISOString(),
            isHelpful: true,
        },
        {
            questionId: 5,
            content: 'I\'m in the Coding Club and we organize weekly workshops, hackathons, and coding competitions. We also collaborate with other colleges for inter-college events. Club experience looks great on your resume and helps in developing leadership and teamwork skills. Highly recommend joining at least one club!',
            answeredBy: null,
            createdAt: new Date('2024-01-18T10:15:00Z').toISOString(),
            updatedAt: new Date('2024-01-18T10:15:00Z').toISOString(),
            isHelpful: false,
        },
        {
            questionId: 5,
            content: 'Each club has a faculty coordinator and student coordinators who manage activities. The college provides funding for club events and competitions. You can also start a new club if you have 10-15 interested members and a faculty coordinator. The clubs are pretty active throughout the year.',
            answeredBy: null,
            createdAt: new Date('2024-01-18T14:30:00Z').toISOString(),
            updatedAt: new Date('2024-01-18T14:30:00Z').toISOString(),
            isHelpful: false,
        },

        // Question 6: Library (3 answers)
        {
            questionId: 6,
            content: 'The library is huge with over 50,000 books and journals. It\'s open from 8 AM to 10 PM on weekdays and till 6 PM on weekends. There are separate reading rooms, discussion rooms, and computer labs. AC is available in most sections. You can issue up to 5 books at a time for 15 days. The digital library has access to IEEE, Springer, and other databases.',
            answeredBy: null,
            createdAt: new Date('2024-01-16T15:20:00Z').toISOString(),
            updatedAt: new Date('2024-01-16T15:20:00Z').toISOString(),
            isHelpful: true,
        },
        {
            questionId: 6,
            content: 'The library staff is really helpful. If a book you need isn\'t available, you can request them to purchase it. During exams, the library extends hours till midnight. The reference section has all the important textbooks and previous year question papers. There\'s also a newspaper and magazine section if you want to take a break from studying.',
            answeredBy: null,
            createdAt: new Date('2024-01-17T14:40:00Z').toISOString(),
            updatedAt: new Date('2024-01-17T14:40:00Z').toISOString(),
            isHelpful: true,
        },
        {
            questionId: 6,
            content: 'The library has a good collection but it gets crowded during exams. Go early to get a good seat. The digital resources are really useful for research projects and assignments. You can access them from anywhere using your student login. The library also conducts workshops on research paper writing and citation management.',
            answeredBy: null,
            createdAt: new Date('2024-01-18T11:50:00Z').toISOString(),
            updatedAt: new Date('2024-01-18T11:50:00Z').toISOString(),
            isHelpful: false,
        },

        // Question 7: Mess Food (3 answers)
        {
            questionId: 7,
            content: 'The mess food is decent and hygienic. Menu changes daily with North Indian and South Indian options. Breakfast usually has poha, idli, dosa, bread, etc. Lunch and dinner have rice, 2-3 sabzis, dal, roti, and sometimes chicken/egg. The taste is okay - not home food level but definitely edible. There\'s also a canteen for snacks and outside food.',
            answeredBy: null,
            createdAt: new Date('2024-01-16T12:30:00Z').toISOString(),
            updatedAt: new Date('2024-01-16T12:30:00Z').toISOString(),
            isHelpful: true,
        },
        {
            questionId: 7,
            content: 'The mess committee has student representatives so you can give feedback about food quality and menu. Special meals are served on festivals and weekends. The food is nutritious even if not always tasty. Most students get used to it in a month or so. If you have dietary restrictions, inform the mess manager and they\'ll accommodate.',
            answeredBy: null,
            createdAt: new Date('2024-01-17T13:45:00Z').toISOString(),
            updatedAt: new Date('2024-01-17T13:45:00Z').toISOString(),
            isHelpful: true,
        },
        {
            questionId: 7,
            content: 'Honestly, the mess food can get repetitive after a while. But there are food delivery options available and restaurants near campus. Many students cook instant noodles or order food on weekends. The mess is closed on some Sundays so you can explore outside food then. Overall it\'s manageable.',
            answeredBy: null,
            createdAt: new Date('2024-01-18T16:20:00Z').toISOString(),
            updatedAt: new Date('2024-01-18T16:20:00Z').toISOString(),
            isHelpful: false,
        },

        // Question 8: Vehicles (3 answers)
        {
            questionId: 8,
            content: 'Yes, you can bring your bike or scooter. You need to register it with the campus security and get a parking sticker. There are designated parking areas near hostels and academic blocks. You\'ll need to submit your license and vehicle documents. The campus has speed limits and security checks all vehicles entering/exiting.',
            answeredBy: null,
            createdAt: new Date('2024-01-17T10:40:00Z').toISOString(),
            updatedAt: new Date('2024-01-17T10:40:00Z').toISOString(),
            isHelpful: true,
        },
        {
            questionId: 8,
            content: 'Having a vehicle is convenient for going to the city on weekends or running errands. But the campus is well-connected with college buses that run every 30 minutes to nearby areas. Many students don\'t bring vehicles in first year as everything you need is within campus. Also parking can be a hassle during peak hours.',
            answeredBy: null,
            createdAt: new Date('2024-01-17T15:25:00Z').toISOString(),
            updatedAt: new Date('2024-01-17T15:25:00Z').toISOString(),
            isHelpful: false,
        },
        {
            questionId: 8,
            content: 'If you\'re bringing a vehicle, make sure to follow all rules - wear helmet, don\'t overspeeding, park in designated areas. The security is strict about violations. Also get good insurance as minor accidents do happen. Consider getting a lock and parking in well-lit areas to prevent theft.',
            answeredBy: null,
            createdAt: new Date('2024-01-18T13:15:00Z').toISOString(),
            updatedAt: new Date('2024-01-18T13:15:00Z').toISOString(),
            isHelpful: true,
        },

        // Question 9: Part-time Jobs (3 answers)
        {
            questionId: 9,
            content: 'The college doesn\'t officially allow part-time jobs during the semester as they want students to focus on academics. However, you can do freelancing or online work in your free time. Many students do content writing, graphic design, coding projects, etc. Just make sure it doesn\'t affect your studies and attendance.',
            answeredBy: null,
            createdAt: new Date('2024-01-17T11:50:00Z').toISOString(),
            updatedAt: new Date('2024-01-17T11:50:00Z').toISOString(),
            isHelpful: true,
        },
        {
            questionId: 9,
            content: 'During summer and winter breaks, you can definitely do part-time jobs or internships. The placement cell shares opportunities regularly. Some students also work as teaching assistants or research assistants under professors which is great for learning and also provides a small stipend. These on-campus opportunities are easier to manage.',
            answeredBy: null,
            createdAt: new Date('2024-01-17T16:35:00Z').toISOString(),
            updatedAt: new Date('2024-01-17T16:35:00Z').toISOString(),
            isHelpful: true,
        },
        {
            questionId: 9,
            content: 'If you have financial constraints, you can talk to the student welfare office about scholarship programs or campus job opportunities. The college is understanding about genuine cases. But honestly, the academic workload is quite high so balancing a job can be challenging. Plan accordingly.',
            answeredBy: null,
            createdAt: new Date('2024-01-18T14:05:00Z').toISOString(),
            updatedAt: new Date('2024-01-18T14:05:00Z').toISOString(),
            isHelpful: false,
        },

        // Question 10: Scholarships (3 answers)
        {
            questionId: 10,
            content: 'There are several scholarship opportunities available! The college offers merit-based scholarships for students with high marks and need-based scholarships for economically weaker sections. You can apply through the college portal at the start of each semester. There are also government scholarships like NSP, state scholarships, and scholarships from private organizations.',
            answeredBy: null,
            createdAt: new Date('2024-01-16T13:40:00Z').toISOString(),
            updatedAt: new Date('2024-01-16T13:40:00Z').toISOString(),
            isHelpful: true,
        },
        {
            questionId: 10,
            content: 'The scholarship office conducts awareness sessions at the beginning of the year. They help with the application process and documentation. You typically need to submit income certificate, previous year marksheets, bank details, etc. Keep all documents ready beforehand. Some scholarships are automatically credited to fee accounts while others come to your bank.',
            answeredBy: null,
            createdAt: new Date('2024-01-17T12:55:00Z').toISOString(),
            updatedAt: new Date('2024-01-17T12:55:00Z').toISOString(),
            isHelpful: true,
        },
        {
            questionId: 10,
            content: 'Beyond college scholarships, look for external scholarships from companies, NGOs, and foundations. Many offer scholarships for specific categories or fields of study. The placement cell shares information about such opportunities. Also, maintaining a good CGPA increases your chances of getting scholarships in higher semesters.',
            answeredBy: null,
            createdAt: new Date('2024-01-18T15:45:00Z').toISOString(),
            updatedAt: new Date('2024-01-18T15:45:00Z').toISOString(),
            isHelpful: false,
        },

        // Question 11: Sports (2 answers)
        {
            questionId: 11,
            content: 'The sports facilities are excellent! We have grounds for cricket, football, basketball, volleyball, and tennis courts. Indoor facilities for badminton, table tennis, chess, carrom. There\'s also a well-equipped gym and yoga room. The college has professional coaches for most sports. We regularly participate in inter-college tournaments and have won several trophies.',
            answeredBy: null,
            createdAt: new Date('2024-01-17T14:15:00Z').toISOString(),
            updatedAt: new Date('2024-01-17T14:15:00Z').toISOString(),
            isHelpful: true,
        },
        {
            questionId: 11,
            content: 'Sports are encouraged here and there are no fees for using facilities. You can book courts and grounds through the sports office. The college also organizes an annual sports fest with various competitions. If you\'re good at any sport, you can represent the college in inter-college meets. Sports quota students get additional benefits like fee concession.',
            answeredBy: null,
            createdAt: new Date('2024-01-18T11:30:00Z').toISOString(),
            updatedAt: new Date('2024-01-18T11:30:00Z').toISOString(),
            isHelpful: true,
        },

        // Question 12: Balance (2 answers)
        {
            questionId: 12,
            content: 'Time management is key! I make a weekly schedule allocating time for classes, self-study, club activities, and leisure. During exams, I reduce club involvement and focus more on studies. The trick is to be consistent with your study routine so you don\'t have to cram before exams. Also, don\'t skip classes as it makes catching up harder later.',
            answeredBy: null,
            createdAt: new Date('2024-01-17T13:30:00Z').toISOString(),
            updatedAt: new Date('2024-01-17T13:30:00Z').toISOString(),
            isHelpful: true,
        },
        {
            questionId: 12,
            content: 'It\'s definitely doable if you prioritize well. Attend all classes and take good notes - this saves a lot of study time later. Use free periods and weekends for club work and projects. Learn to say no to activities that aren\'t important. Also, take breaks and don\'t burn out. A balanced approach is better than going all out in one area and neglecting others.',
            answeredBy: null,
            createdAt: new Date('2024-01-18T10:50:00Z').toISOString(),
            updatedAt: new Date('2024-01-18T10:50:00Z').toISOString(),
            isHelpful: true,
        },

        // Question 13: Internships (2 answers)
        {
            questionId: 13,
            content: 'Yes, internships are highly encouraged! Most students do internships after 2nd and 3rd year during summer break. The placement cell shares internship opportunities regularly via email and portal. Companies visit campus for internship recruitment similar to placements. You can also apply off-campus through LinkedIn, Internshala, etc. Having internship experience really helps in final placements.',
            answeredBy: null,
            createdAt: new Date('2024-01-16T14:25:00Z').toISOString(),
            updatedAt: new Date('2024-01-16T14:25:00Z').toISOString(),
            isHelpful: true,
        },
        {
            questionId: 13,
            content: 'Start applying for internships early - around February/March for summer internships. Build a good resume highlighting your projects and skills. Prepare for interviews like you would for placements. Many internships offer stipends which is a bonus. Some companies give PPOs (pre-placement offers) based on internship performance. It\'s a great way to get industry exposure and understand what field you want to work in.',
            answeredBy: null,
            createdAt: new Date('2024-01-17T15:55:00Z').toISOString(),
            updatedAt: new Date('2024-01-17T15:55:00Z').toISOString(),
            isHelpful: true,
        },

        // Question 14: WiFi (2 answers)
        {
            questionId: 14,
            content: 'The campus has WiFi coverage in most areas - hostels, academic buildings, library, canteen. The speed is usually 10-20 Mbps which is decent for browsing and streaming. However, it can get slow during peak hours when everyone is online. Each student gets a WiFi login with data limits. The IT department is usually quick to fix connectivity issues if you report them.',
            answeredBy: null,
            createdAt: new Date('2024-01-17T12:10:00Z').toISOString(),
            updatedAt: new Date('2024-01-17T12:10:00Z').toISOString(),
            isHelpful: true,
        },
        {
            questionId: 14,
            content: 'The WiFi is free for all students and works well most of the time. Some areas have better coverage than others. If you need high-speed internet for gaming or heavy downloads, consider getting a personal broadband connection in your room. The college allows that. For academic work, the WiFi is more than sufficient.',
            answeredBy: null,
            createdAt: new Date('2024-01-18T13:45:00Z').toISOString(),
            updatedAt: new Date('2024-01-18T13:45:00Z').toISOString(),
            isHelpful: false,
        },

        // Question 15: Seniors (2 answers)
        {
            questionId: 15,
            content: 'Seniors are really helpful! They share notes, guide about course selection, suggest good professors, and give tips for exams. Many seniors mentor juniors informally. During placements, they share their interview experiences and preparation strategies. Don\'t hesitate to reach out to them - most are friendly and remember being in your shoes. College has a buddy system where each fresher is paired with a senior.',
            answeredBy: null,
            createdAt: new Date('2024-01-16T15:50:00Z').toISOString(),
            updatedAt: new Date('2024-01-16T15:50:00Z').toISOString(),
            isHelpful: true,
        },
        {
            questionId: 15,
            content: 'The senior-junior culture here is based on mutual respect and learning. Seniors organize welcome parties, cultural events, and sports competitions where you can interact with them casually. They also help with club selections and academic doubts. Some seniors run study groups and coaching sessions for tough subjects. It\'s a supportive environment overall.',
            answeredBy: null,
            createdAt: new Date('2024-01-17T16:50:00Z').toISOString(),
            updatedAt: new Date('2024-01-17T16:50:00Z').toISOString(),
            isHelpful: true,
        },
    ];

    await db.insert(answers).values(sampleAnswers);
    
    console.log('✅ Answers seeder completed successfully - 45 answers inserted');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});