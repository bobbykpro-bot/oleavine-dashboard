// Firebase Configuration for Oleavine Dashboard
// This enables real-time sync across all tabs, devices, and browser modes (including incognito)

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js';
import { getDatabase, ref, onValue, set, update } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyALQWpu1-MLonEDjsKacniNwzIqPCe_YUQ", // Reusing YouTube API key (read-only, safe)
    authDomain: "oleavine-dashboard.firebaseapp.com",
    databaseURL: "https://oleavine-dashboard-default-rtdb.firebaseio.com",
    projectId: "oleavine-dashboard",
    storageBucket: "oleavine-dashboard.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Device/Session ID for this browser
const SESSION_ID = 'bobbykpro-' + Math.random().toString(36).substr(2, 9);

// Reference to the checklist data
const checklistRef = ref(database, 'ads_checklist');

// Export functions for use in dashboard
window.firebaseSync = {
    // Save checklist state
    save: async (state) => {
        try {
            await set(checklistRef, {
                ...state,
                _lastUpdated: Date.now(),
                _updatedBy: SESSION_ID
            });
            console.log('✅ Saved to Firebase');
        } catch (error) {
            console.error('Firebase save error:', error);
            // Fallback to localStorage
            localStorage.setItem('oleavine_ads_checklist', JSON.stringify(state));
        }
    },
    
    // Listen for changes (works across all tabs/devices)
    listen: (callback) => {
        onValue(checklistRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Remove metadata fields
                const { _lastUpdated, _updatedBy, ...state } = data;
                
                // Don't re-render if we were the ones who updated
                if (_updatedBy !== SESSION_ID) {
                    console.log('🔄 Firebase sync received');
                    callback(state);
                }
            }
        });
    }
};

console.log('🔥 Firebase sync loaded. Session:', SESSION_ID);
