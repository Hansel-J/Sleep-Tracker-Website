import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";

import { 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBaj3amRvZth1N-FnyplNj2LMCho21PCxw",
    authDomain: "vitahabit-7090e.firebaseapp.com",
    projectId: "vitahabit-7090e",
    storageBucket: "vitahabit-7090e.firebasestorage.app",
    messagingSenderId: "243582989990",
    appId: "1:243582989990:web:8da0149c3a057de47d2667",
    measurementId: "G-50D0RWEPHQ"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    const currentPage = window.location.pathname;
    
    if (user) {
        // JIKA USER SEDANG LOGIN:
        console.log("User logged in:", user.email);
        
        // Jika user ada di halaman depan (index.html) atau halaman login,
        // paksa pindah ke halaman dashboard (index_loggedIn.html)
        if (currentPage.includes("index.html") && !currentPage.includes("index_loggedIn.html")) {
            window.location.href = "index_loggedIn.html";
        }
        if (currentPage.includes("Login.html")) {
            window.location.href = "../index_loggedIn.html"; // Sesuaikan path folder
        }

    } else {
        // JIKA USER TIDAK LOGIN (GUEST):
        console.log("No user logged in");

        // Jika user mencoba akses halaman dashboard (index_loggedIn.html) tanpa login,
        // tendang balik ke halaman depan (index.html)
        if (currentPage.includes("index_loggedIn.html")) {
            alert("Anda harus login terlebih dahulu!");
            window.location.href = "index.html";
        }
    }
});

// 2. Fungsi Login (Hanya dijalankan jika ada form login)
const loginForm = document.getElementById('login-form'); // Pastikan form login punya ID ini
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Ambil value dari input HTML
        const email = document.getElementById('email-input').value;
        const password = document.getElementById('password-input').value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Login Berhasil
                const user = userCredential.user;
                alert("Login Berhasil! Selamat datang " + user.email);
                window.location.href = "../index_loggedIn.html"; // Sesuaikan path
            })
            .catch((error) => {
                // Login Gagal
                const errorCode = error.code;
                const errorMessage = error.message;
                alert("Login Gagal: " + errorMessage);
            });
    });
}

// 3. Fungsi Logout
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        signOut(auth).then(() => {
            alert("Anda berhasil logout.");
            window.location.href = "index.html";
        }).catch((error) => {
            console.error("Error signing out:", error);
        });
    });
}