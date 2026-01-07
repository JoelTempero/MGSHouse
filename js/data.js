// =====================
// STATIC DATA
// Houses, Badges, Heritage Info
// =====================

// House definitions (static info - points come from Firebase)
export const HOUSES = {
    shackleton: {
        name: 'Shackleton',
        icon: '🧊',
        explorer: 'Sir Ernest Shackleton',
        motto: 'By Endurance We Conquer',
        values: ['Endurance', 'Leadership', 'Resilience'],
        colorPrimary: '#1e4a7c',
        colorLight: '#3a7bc8'
    },
    wilson: {
        name: 'Wilson',
        icon: '🎨',
        explorer: 'Dr Edward Wilson',
        motto: 'Art, Science & Compassion',
        values: ['Creativity', 'Compassion', 'Excellence'],
        colorPrimary: '#1a5f3c',
        colorLight: '#2d9d5f'
    },
    bowen: {
        name: 'Bowen',
        icon: '⛰️',
        explorer: 'Sir Charles Bowen',
        motto: 'Service & Education',
        values: ['Service', 'Education', 'Hospitality'],
        colorPrimary: '#8b1e1e',
        colorLight: '#c73838'
    },
    scott: {
        name: 'Scott',
        icon: '🧭',
        explorer: 'Captain Robert Falcon Scott',
        motto: 'Courage, Science & Sacrifice',
        values: ['Courage', 'Science', 'Sacrifice'],
        colorPrimary: '#c4960c',
        colorLight: '#e8b82a'
    }
};

// Badge definitions - all 150 badges
export const BADGE_DEFINITIONS = {
    explorer: [
        { id: 'community-cleanup', emoji: '🧹', name: 'Community Clean-up', description: 'Participated in community cleaning initiative' },
        { id: 'food-bank-hero', emoji: '🥫', name: 'Food Bank Hero', description: 'Collected food for those in need' },
        { id: 'elderly-companion', emoji: '👴', name: 'Elderly Companion', description: 'Visited and helped elderly residents' },
        { id: 'mission-heart', emoji: '✈️', name: 'Mission Heart', description: 'Participated in mission trip or support' },
        { id: 'fundraiser-champion', emoji: '💰', name: 'Fundraiser Champion', description: 'Led successful fundraising campaign' },
        { id: 'green-warrior', emoji: '🌱', name: 'Green Warrior', description: 'Environmental conservation efforts' },
        { id: 'peer-tutor', emoji: '📖', name: 'Peer Tutor', description: 'Helped fellow students with studies' },
        { id: 'hospital-helper', emoji: '🏥', name: 'Hospital Helper', description: 'Volunteered at hospital or care facility' },
        { id: 'refugee-friend', emoji: '🤝', name: 'Refugee Friend', description: 'Supported refugee families' },
        { id: 'animal-advocate', emoji: '🐾', name: 'Animal Advocate', description: 'Helped animals in need' },
        { id: 'beach-guardian', emoji: '🏖️', name: 'Beach Guardian', description: 'Participated in beach cleanup' },
        { id: 'soup-kitchen-star', emoji: '🍲', name: 'Soup Kitchen Star', description: 'Served meals to those in need' },
        { id: 'blanket-maker', emoji: '🧶', name: 'Blanket Maker', description: 'Made blankets for charity' },
        { id: 'letter-writer', emoji: '✉️', name: 'Letter Writer', description: 'Wrote letters to isolated individuals' },
        { id: 'garden-grower', emoji: '🥕', name: 'Garden Grower', description: 'Grew vegetables for community' },
        { id: 'tech-helper', emoji: '💻', name: 'Tech Helper', description: 'Helped others with technology' },
        { id: 'first-aid-ready', emoji: '🩹', name: 'First Aid Ready', description: 'Completed first aid training' },
        { id: 'disaster-relief', emoji: '🚨', name: 'Disaster Relief', description: 'Helped with disaster response' },
        { id: 'habitat-builder', emoji: '🏠', name: 'Habitat Builder', description: 'Helped build homes for families' },
        { id: 'blood-donor', emoji: '🩸', name: 'Blood Donor', description: 'Organized blood donation drive' },
        { id: 'clothes-collector', emoji: '👕', name: 'Clothes Collector', description: 'Collected clothes for charity' },
        { id: 'toy-drive-leader', emoji: '🧸', name: 'Toy Drive Leader', description: 'Led toy collection for children' },
        { id: 'reading-buddy', emoji: '📚', name: 'Reading Buddy', description: 'Read to younger children' },
        { id: 'special-olympics', emoji: '🏅', name: 'Special Olympics Helper', description: 'Volunteered at Special Olympics' },
        { id: 'recycling-champion', emoji: '♻️', name: 'Recycling Champion', description: 'Led recycling initiative' },
        { id: 'kindness-ambassador', emoji: '💝', name: 'Kindness Ambassador', description: 'Spread kindness in community' },
        { id: 'community-cook', emoji: '👨‍🍳', name: 'Community Cook', description: 'Cooked meals for community events' },
        { id: 'bike-mechanic', emoji: '🚲', name: 'Bike Mechanic', description: 'Fixed bikes for community' },
        { id: 'park-restorer', emoji: '🌳', name: 'Park Restorer', description: 'Helped restore local park' },
        { id: 'service-legend', emoji: '🌟', name: 'Service Legend', description: 'Legendary service achievement', legendary: true }
    ],
    scholar: [
        { id: 'science-fair', emoji: '🔬', name: 'Science Fair Victor', description: 'Won science fair competition' },
        { id: 'essay-excellence', emoji: '✍️', name: 'Essay Excellence', description: 'Outstanding essay writing' },
        { id: 'math-olympiad', emoji: '🔢', name: 'Math Olympiad', description: 'Excelled in math competition' },
        { id: 'spelling-bee', emoji: '🐝', name: 'Spelling Bee Champ', description: 'Won spelling competition' },
        { id: 'debate-master', emoji: '🎤', name: 'Debate Master', description: 'Excellence in debating' },
        { id: 'research-star', emoji: '🔍', name: 'Research Star', description: 'Outstanding research project' },
        { id: 'history-quest', emoji: '🏛️', name: 'History Quest', description: 'Excellence in history' },
        { id: 'language-master', emoji: '🗣️', name: 'Language Master', description: 'Mastery of foreign language' },
        { id: 'innovation-award', emoji: '💡', name: 'Innovation Award', description: 'Innovative thinking award' },
        { id: 'geography-guru', emoji: '🌍', name: 'Geography Guru', description: 'Excellence in geography' },
        { id: 'chemistry-whiz', emoji: '⚗️', name: 'Chemistry Whiz', description: 'Outstanding in chemistry' },
        { id: 'physics-pro', emoji: '⚛️', name: 'Physics Pro', description: 'Excellence in physics' },
        { id: 'biology-brain', emoji: '🧬', name: 'Biology Brain', description: 'Outstanding in biology' },
        { id: 'coding-ninja', emoji: '👨‍💻', name: 'Coding Ninja', description: 'Excellence in programming' },
        { id: 'robotics-builder', emoji: '🤖', name: 'Robotics Builder', description: 'Built outstanding robot' },
        { id: 'economics-expert', emoji: '📈', name: 'Economics Expert', description: 'Excellence in economics' },
        { id: 'philosophy-thinker', emoji: '🤔', name: 'Philosophy Thinker', description: 'Deep philosophical thinking' },
        { id: 'quiz-bowl', emoji: '🧠', name: 'Quiz Bowl Victor', description: 'Won quiz competition' },
        { id: 'book-worm', emoji: '📕', name: 'Book Worm', description: 'Read extensively' },
        { id: 'scholarship-winner', emoji: '🎓', name: 'Scholarship Winner', description: 'Won academic scholarship' },
        { id: 'perfect-score', emoji: '💯', name: 'Perfect Score', description: 'Achieved perfect test score' },
        { id: 'study-group-leader', emoji: '👥', name: 'Study Group Leader', description: 'Led effective study group' },
        { id: 'academic-mentor', emoji: '🧑‍🏫', name: 'Academic Mentor', description: 'Mentored other students' },
        { id: 'library-champion', emoji: '📖', name: 'Library Champion', description: 'Outstanding library use' },
        { id: 'stem-ambassador', emoji: '🚀', name: 'STEM Ambassador', description: 'Promoted STEM subjects' },
        { id: 'writing-workshop', emoji: '📝', name: 'Writing Workshop', description: 'Led writing workshop' },
        { id: 'model-un', emoji: '🌐', name: 'Model UN', description: 'Excellence in Model UN' },
        { id: 'academic-decathlon', emoji: '🏆', name: 'Academic Decathlon', description: 'Won academic decathlon' },
        { id: 'thesis-excellence', emoji: '📜', name: 'Thesis Excellence', description: 'Outstanding thesis' },
        { id: 'scholar-supreme', emoji: '👑', name: 'Scholar Supreme', description: 'Legendary academic achievement', legendary: true }
    ],
    performer: [
        { id: 'drama-star', emoji: '🎭', name: 'Drama Star', description: 'Outstanding drama performance' },
        { id: 'choir-excellence', emoji: '🎵', name: 'Choir Excellence', description: 'Excellence in choir' },
        { id: 'band-performer', emoji: '🎺', name: 'Band Performer', description: 'Outstanding band performance' },
        { id: 'dance-champion', emoji: '💃', name: 'Dance Champion', description: 'Excellence in dance' },
        { id: 'art-exhibition', emoji: '🖼️', name: 'Art Exhibition', description: 'Art displayed in exhibition' },
        { id: 'film-festival', emoji: '🎬', name: 'Film Festival', description: 'Created outstanding film' },
        { id: 'poetry-slam', emoji: '📜', name: 'Poetry Slam', description: 'Won poetry competition' },
        { id: 'musical-theatre', emoji: '🎹', name: 'Musical Theatre', description: 'Starred in musical' },
        { id: 'orchestra-solo', emoji: '🎻', name: 'Orchestra Solo', description: 'Performed orchestra solo' },
        { id: 'creative-writer', emoji: '✒️', name: 'Creative Writer', description: 'Outstanding creative writing' },
        { id: 'photography-pro', emoji: '📷', name: 'Photography Pro', description: 'Excellence in photography' },
        { id: 'kapa-haka', emoji: '🇳🇿', name: 'Kapa Haka Star', description: 'Excellence in Kapa Haka' },
        { id: 'hip-hop', emoji: '🕺', name: 'Hip Hop Hero', description: 'Outstanding hip hop performance' },
        { id: 'ballet', emoji: '🩰', name: 'Ballet Beauty', description: 'Excellence in ballet' },
        { id: 'guitar-legend', emoji: '🎸', name: 'Guitar Legend', description: 'Outstanding guitar performance' },
        { id: 'piano-virtuoso', emoji: '🎹', name: 'Piano Virtuoso', description: 'Excellence in piano' },
        { id: 'drum-major', emoji: '🥁', name: 'Drum Major', description: 'Outstanding percussion' },
        { id: 'voice-of-gold', emoji: '🎙️', name: 'Voice of Gold', description: 'Outstanding vocal performance' },
        { id: 'improv-master', emoji: '😄', name: 'Improv Master', description: 'Excellence in improvisation' },
        { id: 'sculpture-artist', emoji: '🗿', name: 'Sculpture Artist', description: 'Outstanding sculpture' },
        { id: 'mural-painter', emoji: '🎨', name: 'Mural Painter', description: 'Created school mural' },
        { id: 'costume-designer', emoji: '🧵', name: 'Costume Designer', description: 'Outstanding costume design' },
        { id: 'stage-manager', emoji: '🎪', name: 'Stage Manager', description: 'Excellent stage management' },
        { id: 'lighting-tech', emoji: '💡', name: 'Lighting Tech', description: 'Outstanding lighting design' },
        { id: 'sound-engineer', emoji: '🔊', name: 'Sound Engineer', description: 'Excellence in sound' },
        { id: 'lip-sync', emoji: '👄', name: 'Lip Sync Legend', description: 'Won lip sync battle' },
        { id: 'house-singing', emoji: '🎤', name: 'House Singing Star', description: 'Led house singing' },
        { id: 'cultural-festival', emoji: '🎊', name: 'Cultural Festival', description: 'Cultural performance' },
        { id: 'talent-show', emoji: '⭐', name: 'Talent Show', description: 'Won talent show' },
        { id: 'performer-supreme', emoji: '🌟', name: 'Performer Supreme', description: 'Legendary performance', legendary: true }
    ],
    champion: [
        { id: 'athletics-day', emoji: '🏃', name: 'Athletics Day Hero', description: 'Outstanding at athletics day' },
        { id: 'swimming', emoji: '🏊', name: 'Swimming Champion', description: 'Excellence in swimming' },
        { id: 'rugby', emoji: '🏉', name: 'Rugby Excellence', description: 'Outstanding rugby performance' },
        { id: 'netball', emoji: '🏀', name: 'Netball Star', description: 'Excellence in netball' },
        { id: 'cricket', emoji: '🏏', name: 'Cricket Master', description: 'Outstanding cricket performance' },
        { id: 'hockey', emoji: '🏑', name: 'Hockey Hero', description: 'Excellence in hockey' },
        { id: 'tennis', emoji: '🎾', name: 'Tennis Ace', description: 'Outstanding tennis performance' },
        { id: 'basketball', emoji: '⛹️', name: 'Basketball MVP', description: 'Basketball most valuable player' },
        { id: 'football', emoji: '⚽', name: 'Football Glory', description: 'Excellence in football' },
        { id: 'cross-country', emoji: '🏔️', name: 'Cross Country King', description: 'Won cross country' },
        { id: 'volleyball', emoji: '🏐', name: 'Volleyball Victor', description: 'Excellence in volleyball' },
        { id: 'badminton', emoji: '🏸', name: 'Badminton Boss', description: 'Outstanding badminton' },
        { id: 'table-tennis', emoji: '🏓', name: 'Table Tennis Titan', description: 'Excellence in table tennis' },
        { id: 'golf', emoji: '⛳', name: 'Golf Great', description: 'Outstanding golf performance' },
        { id: 'martial-arts', emoji: '🥋', name: 'Martial Artist', description: 'Excellence in martial arts' },
        { id: 'gymnastics', emoji: '🤸', name: 'Gymnastics Grace', description: 'Outstanding gymnastics' },
        { id: 'rowing', emoji: '🚣', name: 'Rowing Champion', description: 'Excellence in rowing' },
        { id: 'cycling', emoji: '🚴', name: 'Cycling Star', description: 'Outstanding cycling' },
        { id: 'triathlon', emoji: '🏊‍♂️', name: 'Triathlon Finisher', description: 'Completed triathlon' },
        { id: 'touch-rugby', emoji: '🏈', name: 'Touch Rugby Titan', description: 'Excellence in touch rugby' },
        { id: 'skiing', emoji: '⛷️', name: 'Skiing Superstar', description: 'Outstanding skiing' },
        { id: 'surfing', emoji: '🏄', name: 'Surfing Champion', description: 'Excellence in surfing' },
        { id: 'skateboard', emoji: '🛹', name: 'Skateboard Pro', description: 'Outstanding skateboarding' },
        { id: 'frisbee', emoji: '🥏', name: 'Ultimate Frisbee', description: 'Excellence in ultimate frisbee' },
        { id: 'archery', emoji: '🏹', name: 'Archery Ace', description: 'Outstanding archery' },
        { id: 'climbing', emoji: '🧗', name: 'Rock Climbing', description: 'Excellence in climbing' },
        { id: 'sports-captain', emoji: '©️', name: 'Sports Captain', description: 'Appointed sports captain' },
        { id: 'fair-play', emoji: '🤝', name: 'Fair Play Award', description: 'Outstanding sportsmanship' },
        { id: 'most-improved', emoji: '📈', name: 'Most Improved', description: 'Most improved athlete' },
        { id: 'champion-supreme', emoji: '🏆', name: 'Champion Supreme', description: 'Legendary sporting achievement', legendary: true }
    ],
    disciple: [
        { id: 'chapel-leader', emoji: '⛪', name: 'Chapel Leader', description: 'Led chapel service' },
        { id: 'bible-study', emoji: '📖', name: 'Bible Study Host', description: 'Hosted Bible study group' },
        { id: 'prayer-warrior', emoji: '🙏', name: 'Prayer Warrior', description: 'Led prayer initiatives' },
        { id: 'worship-team', emoji: '🎶', name: 'Worship Team', description: 'Part of worship team' },
        { id: 'mission-minded', emoji: '🌏', name: 'Mission Minded', description: 'Supported missions' },
        { id: 'kindness-champion', emoji: '💕', name: 'Kindness Champion', description: 'Championed kindness' },
        { id: 'integrity-award', emoji: '⚖️', name: 'Integrity Award', description: 'Demonstrated integrity' },
        { id: 'faith-in-action', emoji: '💪', name: 'Faith in Action', description: 'Lived out faith practically' },
        { id: 'servant-heart', emoji: '❤️', name: 'Servant Heart', description: 'Demonstrated servant leadership' },
        { id: 'grace-ambassador', emoji: '🕊️', name: 'Grace Ambassador', description: 'Extended grace to others' },
        { id: 'encourager', emoji: '💬', name: 'Encourager', description: 'Encouraged fellow students' },
        { id: 'peacemaker', emoji: '☮️', name: 'Peacemaker', description: 'Resolved conflicts peacefully' },
        { id: 'hospitality-hero', emoji: '🏡', name: 'Hospitality Hero', description: 'Showed hospitality' },
        { id: 'generous-giver', emoji: '🎁', name: 'Generous Giver', description: 'Generous with time and resources' },
        { id: 'faithful-friend', emoji: '👫', name: 'Faithful Friend', description: 'Showed faithful friendship' },
        { id: 'humility-award', emoji: '🙇', name: 'Humility Award', description: 'Demonstrated humility' },
        { id: 'patience-prize', emoji: '⏳', name: 'Patience Prize', description: 'Showed patience' },
        { id: 'forgiveness-star', emoji: '💝', name: 'Forgiveness Star', description: 'Demonstrated forgiveness' },
        { id: 'joy-spreader', emoji: '😊', name: 'Joy Spreader', description: 'Spread joy to others' },
        { id: 'thankful-heart', emoji: '🙌', name: 'Thankful Heart', description: 'Showed gratitude' },
        { id: 'truth-teller', emoji: '✨', name: 'Truth Teller', description: 'Spoke truth with love' },
        { id: 'compassion-award', emoji: '🤗', name: 'Compassion Award', description: 'Showed compassion' },
        { id: 'respect-champion', emoji: '🎖️', name: 'Respect Champion', description: 'Showed respect to all' },
        { id: 'self-control', emoji: '🧘', name: 'Self-Control Star', description: 'Demonstrated self-control' },
        { id: 'perseverance', emoji: '🏔️', name: 'Perseverance Prize', description: 'Showed perseverance' },
        { id: 'wisdom-seeker', emoji: '🦉', name: 'Wisdom Seeker', description: 'Sought wisdom' },
        { id: 'love-in-action', emoji: '💗', name: 'Love in Action', description: 'Showed love practically' },
        { id: 'hope-giver', emoji: '🌅', name: 'Hope Giver', description: 'Gave hope to others' },
        { id: 'light-bearer', emoji: '🕯️', name: 'Light Bearer', description: 'Brought light to dark situations' },
        { id: 'disciple-supreme', emoji: '✝️', name: 'Disciple Supreme', description: 'Legendary faith achievement', legendary: true }
    ]
};

// Badge categories
export const BADGE_CATEGORIES = {
    explorer: { name: 'Explorer', icon: '🧭', description: 'Service & Community' },
    scholar: { name: 'Scholar', icon: '📚', description: 'Academic Excellence' },
    performer: { name: 'Performer', icon: '🎭', description: 'Arts & Culture' },
    champion: { name: 'Champion', icon: '🏆', description: 'Sports & Athletics' },
    disciple: { name: 'Disciple', icon: '✝️', description: 'Faith & Character' }
};

// Badge tier system
export const BADGE_TIERS = [
    { name: 'Bronze', icon: '🥉', min: 0, max: 29 },
    { name: 'Silver', icon: '🥈', min: 30, max: 59 },
    { name: 'Gold', icon: '🥇', min: 60, max: 99 },
    { name: 'Platinum', icon: '💎', min: 100, max: 149 },
    { name: 'Legendary', icon: '👑', min: 150, max: Infinity }
];

// Heritage - Explorer biographies
export const EXPLORERS = {
    shackleton: {
        name: 'Sir Ernest Shackleton',
        dates: '1874-1922',
        icon: '🧊',
        quote: '"Difficulties are just things to overcome, after all."',
        bio: 'Sir Ernest Shackleton was an Anglo-Irish Antarctic explorer who led three British expeditions to the Antarctic. He is best known for his leadership of the Endurance expedition (1914-17), where his ship was crushed by ice but he saved all 28 of his crew through an incredible 800-mile open boat journey to South Georgia.',
        expeditions: [
            { year: '1901-04', name: 'Discovery Expedition', description: 'First Antarctic expedition with Scott' },
            { year: '1907-09', name: 'Nimrod Expedition', description: 'Came within 97 miles of South Pole' },
            { year: '1914-17', name: 'Endurance Expedition', description: 'Ship crushed by ice, rescued all crew' }
        ]
    },
    scott: {
        name: 'Captain Robert Falcon Scott',
        dates: '1868-1912',
        icon: '🧭',
        quote: '"I do not regret this journey... we took risks, we knew we took them."',
        bio: 'Captain Robert Falcon Scott was a Royal Navy officer and explorer who led two expeditions to Antarctica. He reached the South Pole on 17 January 1912, only to find that Roald Amundsen had arrived 34 days earlier. Scott and his four companions died on the return journey. His connection to Middleton Grange comes through his cousin Robert J. Scott, who married Sir Charles Bowen\'s daughter Gertrude.',
        expeditions: [
            { year: '1901-04', name: 'Discovery Expedition', description: 'First expedition, established bases' },
            { year: '1910-13', name: 'Terra Nova Expedition', description: 'Reached South Pole, January 1912' }
        ]
    },
    wilson: {
        name: 'Dr Edward Adrian Wilson',
        dates: '1872-1912',
        icon: '🎨',
        quote: '"He was the closest friend I\'ve ever had." - Robert Falcon Scott',
        bio: 'Dr Edward Wilson, known affectionately as "Uncle Bill", was a physician, naturalist, and artist who accompanied Scott on both Antarctic expeditions. He was known for his beautiful watercolor paintings of Antarctica and his compassionate nature. Wilson led the famous winter journey to Cape Crozier, later described in "The Worst Journey in the World".',
        expeditions: [
            { year: '1901-04', name: 'Discovery Expedition', description: 'Physician, naturalist, and artist' },
            { year: '1910-13', name: 'Terra Nova Expedition', description: 'Chief scientist, died with Scott' }
        ]
    },
    bowen: {
        name: 'Sir Charles Christopher Bowen',
        dates: '1830-1917',
        icon: '⛰️',
        quote: '"Education is the key to unlocking the potential of every child."',
        bio: 'Sir Charles Bowen was born in Ireland and arrived in Canterbury on the Charlotte Jane in December 1850. He became the owner of Middleton Grange property and served as Minister of Justice. He was the architect of the Education Act 1877, which established free, compulsory education for all New Zealand children. His connection to Antarctic exploration came through his brother-in-law Clements Markham, President of the Royal Geographical Society, who organized Scott\'s expeditions. Bowen hosted both Antarctic expeditions at Middleton Grange.',
        expeditions: [
            { year: '1850', name: 'Canterbury Settlement', description: 'Arrived on Charlotte Jane' },
            { year: '1877', name: 'Education Act', description: 'Architect of free education' },
            { year: '1901', name: 'Discovery Visit', description: 'Hosted expedition at Middleton' }
        ]
    }
};

// Historical timeline
export const TIMELINE = [
    { year: 1850, title: 'Charlotte Jane Arrives', description: 'The Bowen family arrives in Canterbury on the Charlotte Jane', highlight: false },
    { year: 1856, title: 'Middleton Grange Established', description: 'Sir Charles Bowen establishes Middleton Grange property', highlight: false },
    { year: 1877, title: 'Education Act', description: 'Bowen\'s Education Act establishes free, compulsory education in NZ', highlight: false },
    { year: 1901, title: 'Discovery Expedition Visits', description: 'Scott, Wilson and crew hosted at Middleton Grange before sailing to Antarctica', highlight: true },
    { year: 1902, title: 'Furthest South', description: 'Scott, Wilson, and Shackleton reach 82°17\'S - furthest south yet achieved', highlight: false },
    { year: 1909, title: 'Nimrod\'s Near Miss', description: 'Shackleton comes within 97 miles of the South Pole', highlight: false },
    { year: 1910, title: 'Terra Nova Expedition Visits', description: 'Scott\'s final expedition hosted at Middleton Grange', highlight: true },
    { year: 1912, title: 'South Pole Reached', description: 'Scott, Wilson and team reach the South Pole on 17 January', highlight: false },
    { year: 1912, title: 'Scott, Wilson & Bowers Die', description: 'Perished in blizzard just 11 miles from supply depot, 29 March', highlight: false },
    { year: 1915, title: 'Endurance Sinks', description: 'Shackleton\'s ship crushed by ice in the Weddell Sea', highlight: false },
    { year: 1916, title: 'Endurance Crew Rescued', description: 'All 28 crew members saved after incredible survival journey', highlight: false },
    { year: 1917, title: 'Sir Charles Bowen Dies', description: 'Founder of the Middleton Grange legacy passes away', highlight: false },
    { year: 1964, title: 'Middleton Grange School Founded', description: 'The school is established on the historic Middleton property', highlight: true },
    { year: 1967, title: 'House System Established', description: 'The four houses named after Antarctic heroes and Bowen', highlight: true },
    { year: 2022, title: 'Endurance Discovered', description: 'Shackleton\'s ship found on the seafloor after 107 years', highlight: false }
];

// Anniversary dates
export const ANNIVERSARIES = [
    { date: '01-17', title: '🏔️ South Pole Anniversary', description: 'Scott, Wilson & team reached the South Pole (1912)', baseYear: 1912 },
    { date: '02-15', title: '🧊 Shackleton Birthday', description: 'Sir Ernest Shackleton was born (1874)', baseYear: 1874 },
    { date: '03-29', title: '✝️ Scott & Wilson Memorial', description: 'Scott, Wilson & Bowers died in their tent (1912)', baseYear: 1912 },
    { date: '06-06', title: '🧭 Scott Birthday', description: 'Captain Robert Falcon Scott was born (1868)', baseYear: 1868 },
    { date: '07-23', title: '🎨 Wilson Birthday', description: 'Dr Edward Wilson was born (1872)', baseYear: 1872 },
    { date: '08-29', title: '⛰️ Bowen Birthday', description: 'Sir Charles Bowen was born (1830)', baseYear: 1830 },
    { date: '11-21', title: '🚢 Endurance Sank', description: 'Shackleton\'s ship sank in Weddell Sea (1915)', baseYear: 1915 },
    { date: '12-16', title: '🏠 Charlotte Jane Arrived', description: 'Bowen family arrived in Canterbury (1850)', baseYear: 1850 }
];

// Points configuration
export const POINTS_CONFIG = {
    event: { first: 50, second: 30, third: 20, fourth: 10 },
    badge: { first: 10, second: 5, third: 2, fourth: 1 },
    spiritConversion: 0.5,
    streakBonus: { 2: 0.05, 3: 0.10, 4: 0.15, 5: 0.20 }
};
