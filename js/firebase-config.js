// =====================
// FIREBASE CONFIGURATION
// =====================

// Your Firebase configuration - REPLACE WITH YOUR OWN
// Get this from: Firebase Console > Project Settings > Your Apps > Config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "mgs-house-comp.firebaseapp.com",
    projectId: "mgs-house-comp",
    storageBucket: "mgs-house-comp.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get references to services
const db = firebase.firestore();
const auth = firebase.auth();

// =====================
// DATABASE FUNCTIONS
// =====================

// Houses
export async function getHouses() {
    const snapshot = await db.collection('houses').get();
    const houses = {};
    snapshot.forEach(doc => {
        houses[doc.id] = doc.data();
    });
    return houses;
}

export async function updateHouse(houseId, data) {
    await db.collection('houses').doc(houseId).update(data);
}

// Events
export async function getEvents() {
    const snapshot = await db.collection('events').orderBy('date', 'asc').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addEvent(event) {
    const docRef = await db.collection('events').add({
        ...event,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    return docRef.id;
}

export async function updateEvent(eventId, data) {
    await db.collection('events').doc(eventId).update(data);
}

export async function deleteEvent(eventId) {
    await db.collection('events').doc(eventId).delete();
}

// Badges (awarded badges)
export async function getBadgeAwards() {
    const snapshot = await db.collection('badgeAwards').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function awardBadge(badgeData) {
    const docRef = await db.collection('badgeAwards').add({
        ...badgeData,
        awardedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    return docRef.id;
}

// Feed
export async function getFeed(limit = 50) {
    const snapshot = await db.collection('feed')
        .orderBy('createdAt', 'desc')
        .limit(limit)
        .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addFeedPost(post) {
    const docRef = await db.collection('feed').add({
        ...post,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    return docRef.id;
}

// Audit Log
export async function getAuditLog(limit = 100) {
    const snapshot = await db.collection('auditLog')
        .orderBy('timestamp', 'desc')
        .limit(limit)
        .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addAuditEntry(entry) {
    await db.collection('auditLog').add({
        ...entry,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
}

// Badge Hunts
export async function getBadgeHunts() {
    const snapshot = await db.collection('badgeHunts').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addBadgeHunt(hunt) {
    const docRef = await db.collection('badgeHunts').add(hunt);
    return docRef.id;
}

export async function updateBadgeHunt(huntId, data) {
    await db.collection('badgeHunts').doc(huntId).update(data);
}

// Scheduled Posts
export async function getScheduledPosts() {
    const snapshot = await db.collection('scheduledPosts')
        .where('scheduledFor', '>', new Date())
        .orderBy('scheduledFor', 'asc')
        .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addScheduledPost(post) {
    const docRef = await db.collection('scheduledPosts').add(post);
    return docRef.id;
}

// Admin Roles
export async function getAdminRoles() {
    const snapshot = await db.collection('adminRoles').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addAdminRole(admin) {
    const docRef = await db.collection('adminRoles').add(admin);
    return docRef.id;
}

// Records
export async function getRecords() {
    const snapshot = await db.collection('records').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// =====================
// AUTHENTICATION
// =====================

export async function loginAdmin(email, password) {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        return { success: true, user: userCredential.user };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function logoutAdmin() {
    await auth.signOut();
}

export function onAuthStateChanged(callback) {
    return auth.onAuthStateChanged(callback);
}

export function getCurrentUser() {
    return auth.currentUser;
}

// =====================
// REAL-TIME LISTENERS
// =====================

export function subscribeToHouses(callback) {
    return db.collection('houses').onSnapshot(snapshot => {
        const houses = {};
        snapshot.forEach(doc => {
            houses[doc.id] = doc.data();
        });
        callback(houses);
    });
}

export function subscribeToFeed(callback, limit = 50) {
    return db.collection('feed')
        .orderBy('createdAt', 'desc')
        .limit(limit)
        .onSnapshot(snapshot => {
            const feed = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            callback(feed);
        });
}

// Export db and auth for direct access if needed
export { db, auth };
